# ====== Build Stage ======
FROM node:18 AS build

# 애플리케이션 디렉토리 생성
RUN mkdir -p /var/app
WORKDIR /var/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build


# ====== Run Stage ======
FROM node:18 AS run

# 애플리케이션 디렉토리 생성
RUN mkdir -p /var/app
WORKDIR /var/app

# 빌드 단계에서 생성된 파일 복사
COPY --from=build /var/app/dist ./dist
COPY --from=build /var/app/package*.json ./

# 의존성 설치
RUN npm install

# 환경 변수 설정(production 환경)
ENV NODE_ENV=production

# 포트 노출
EXPOSE 3000


# 애플리케이션 실행
CMD [ "node", "dist/main.js" ]