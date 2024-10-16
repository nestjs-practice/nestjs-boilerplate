export class StringUtil {
  static camelize(str: string) {
    return str
      .split('_')
      .map((t, i) => {
        if (i === 0) {
          return t;
        }

        return (t[0] || '').toUpperCase() + t.slice(1);
      })
      .join('');
  }

  /**
   * 양끝 공백 제거
   * 공백 2칸 이상 -> 한칸으로 변경
   * 한글 사이에 공백은 제거
   * @param name
   */
  static removeBlank(name: string) {
    return name
      .trim()
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*([가-힣])\s*([가-힣])/g, '$1$2');
  }

  /**
   * 입력한 문자열 순서를 랜덤하게 바꿈
   *
   * @param value
   */
  static shuffle(value: string): string {
    const array = value.split('');
    let m = array.length,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [array[m], array[i]] = [array[i], array[m]];
    }

    return array.join('');
  }

  static trimStartMultilines(value: string) {
    return value
      .split(/\n/)
      .map((t) => t.trimStart())
      .join('\n');
  }
}
