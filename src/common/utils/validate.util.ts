export class ValidateUtil {
  // todo : custom 필요
  static isAccount(value: string): boolean {
    return /^((?=.*[A-Za-z])|((?=.*[A-Za-z])(?=.*\d)))(?!.*\W).{6,16}$/.test(value);
  }

  // todo : custom 필요
  static isPassword(value: string): boolean {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/~`\-|=]).{6,20}$/.test(
      value,
    );
  }

  static isBirthFormat(value: string): boolean {
    return /^(\d{4})-(\d{2})-(\d{2})$/.test(value);
  }

  static isContainKorean(value: string): boolean {
    return /[ㄱ-힣]/.test(value);
  }

  static isContainEnglish(value: string): boolean {
    return /[a-zA-Z]/.test(value);
  }

  static isContainNumber(value: string): boolean {
    return /[0-9]/.test(value);
  }

  static isContainUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  static isContainLowerCase(value: string): boolean {
    return /[a-z]/.test(value);
  }

  static isContainSpecialCharacter(value: string): boolean {
    return /[~!@#$%^&*()\-_=+?]/.test(value);
  }

  static isEmail(value: string): boolean {
    return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,40})+$/.test(value);
  }

  static isPhone(value: string): boolean {
    return /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/.test(value);
  }

  static isNumber(value: string): boolean {
    return /^[0-9]*$/.test(value);
  }

  static isKorean(value: string): boolean {
    return /^[가-힣0-9]*$/.test(value);
  }

  static isEnglish(value: string): boolean {
    return /^[A-Za-z0-9]*$/.test(value);
  }
}
