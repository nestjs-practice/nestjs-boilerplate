export class MapUtil {
  static by<T, K>(list: T[], keyGetter: (t: T, i: number) => K): Map<K, T>;
  static by<T, K, V>(
    list: T[],
    keyGetter: (t: T, i: number) => K,
    valueGetter?: (t: T, i: number) => V,
  ): Map<K, V>;
  static by<T, K, V = T>(
    list: T[],
    keyGetter: (t: T, i: number) => K,
    _valueGetter?: (t: T, i: number) => V,
  ): Map<K, T | V> {
    const valueGetter = _valueGetter || ((t) => t);

    return new Map((list || []).map((t, i) => [keyGetter(t, i), valueGetter(t, i)]));
  }

  static groupBy<T, K>(list: T[], keyGetter: (t: T, i: number) => K): Map<K, T[]>;
  static groupBy<T, K, V>(
    list: T[],
    keyGetter: (t: T, i: number) => K,
    valueGetter: (t: T, i: number) => V,
  ): Map<K, V[]>;
  static groupBy<T, K, V>(
    list: T[],
    keyGetter: (t: T, i: number) => K,
    valueGetter?: (t: T, i: number) => V,
  ): Map<K, (T | V)[]> {
    return (list || []).reduce((acc: any, t, i) => {
      const key: K = keyGetter(t, i);
      const list: (T | V)[] = acc.get(key) || [];
      const value = valueGetter ? valueGetter(t, i) : t;
      list.push(value);
      acc.set(key, list);
      return acc;
    }, new Map());
  }

  static nestedBy<T, K, J>(
    list: T[],
    key1Getter: (t: T) => K,
    key2Getter: (t: T) => J,
  ): Map<K, Map<J, T>> {
    return new Map(
      Array.from(this.groupBy(list, key1Getter).entries()).map(([key1, subList]) => [
        key1,
        this.by(subList, key2Getter),
      ]),
    );
  }
}
