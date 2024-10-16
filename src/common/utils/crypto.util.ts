import { createHash } from 'crypto';

export class CryptoUtil {
  static generateSHA256(str: string) {
    if (str.trim() === '') {
      return null;
    }
    const hashedData = createHash('sha256').update(str, 'utf-8').digest('hex');
    return hashedData;
  }
}
