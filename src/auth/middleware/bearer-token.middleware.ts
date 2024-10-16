import { envVariableKeys } from '@/common/config/env';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      next();
      return;
    }

    const token = this.validateBearerToken(authHeader);

    // * 차단된 토큰 예외처리
    const blockedToken = await this.cacheManager.get(`BLOCK_TOKEN_${token}`);
    if (blockedToken) {
      throw new UnauthorizedException('Blocked Token');
    }

    const tokenKey = `TOKEN_${token}`;
    const cachedPayload = await this.cacheManager.get(tokenKey);

    // * 캐시에 토큰이 남아있을 경우 캐시를 사용
    if (cachedPayload) {
      request.user = cachedPayload;

      return next();
    }

    // * 캐시가 없을 경우 토큰 decode
    const decodedPayload = this.jwtService.decode(token);

    if (decodedPayload.type !== 'refresh' && decodedPayload.type !== 'access') {
      throw new UnauthorizedException('Invalid Token');
    }

    try {
      const secretKey =
        decodedPayload.type === 'refresh'
          ? envVariableKeys.refreshTokenSecret
          : envVariableKeys.accessTokenSecret;

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>(secretKey),
      });

      // * 페이로드 내의 'exp'의 필드를 가져와 밀리초 단위의 타임스탬프로 변환(+를 붙여 숫자로 변환)
      const expiredDate = +new Date(payload['exp'] * 1000);
      // * 현재 시간
      const now = +Date.now();

      // * 만료까지 남은 시간 계산
      const differenceInSeconds = (expiredDate - now) / 1000;

      // * 캐시의 만료시간을 포함하여 저장(만료 30초전에 캐시 만료 - 요청시 만료에러를 방지)
      await this.cacheManager.set(
        tokenKey,
        payload,
        Math.max((differenceInSeconds - 30) * 1000, 1),
      );

      request.user = payload;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Expired Token');
      }

      next();
    }
  }

  // * 토큰 유효성 검증
  validateBearerToken(rawToken: string) {
    const basicSplit = rawToken.split(' ');

    if (basicSplit.length !== 2) {
      throw new BadRequestException('Invalid Bearer token');
    }

    const [bearer, token] = basicSplit;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new BadRequestException('Invalid Bearer token');
    }

    return token;
  }
}
