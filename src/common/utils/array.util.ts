import { MapUtil } from '@/common/utils/map.util';

export class ArrayUtil {
  static isSame<T>(list1: T[], list2: T[], checkSort: boolean): boolean {
    if (list1.length !== list2.length) {
      return false;
    }

    if (checkSort) {
      return list1.every((v, i) => v === list2[i]);
    }

    const t1Map = new Map(list1.map((t) => [t, true]));
    return list2.every((t) => t1Map.has(t));
  }

  static except<T>(list: T[], omit: T[], _getKey?: (t: T) => any): T[] {
    const getKey = _getKey || ((t: T) => t);
    const map = MapUtil.by(list, getKey);
    omit.forEach((t) => map.delete(getKey(t)));
    return Array.from(map.values());
  }

  static distinct<T>(list: T[], pickKey?: (t: T) => any): T[] {
    pickKey = pickKey || ((t: T) => t);
    const map = MapUtil.by(list, pickKey);
    return Array.from(map.values());
  }

  static isContain<T>(list1: T[], list2: T[]): boolean {
    const set = new Set(list1);
    return list2.every((t) => set.has(t));
  }

  static isUnique<T>(list: T[]): boolean {
    return new Set(list).size === list.length;
  }

  static overlaps<T>(list1: T[], list2: T[]): boolean {
    const map = MapUtil.by(list1, (t) => t);
    return list2.some((t) => map.has(t));
  }

  static sum<T>(list: T[], valueGetter: (t: T) => number): number {
    return list.reduce((sum, t) => sum + valueGetter(t), 0);
  }
}
