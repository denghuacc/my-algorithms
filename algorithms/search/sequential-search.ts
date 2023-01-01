// sequentialSearch 顺序搜索（遍历）

// 它的机制是，将每一个数据结构中的元素和我们要找的元素做比较。
// 顺序搜索是最低效的一种搜索算法。

import { defaultCompare, DOES_NOT_EXIST, Compare } from "../util";

export function sequentialSearch<T>(
  array: T[],
  target: T,
  compareFn = defaultCompare
): number {
  // 遍历所有值，一个一个对比查找
  for (let i = 0; i < array.length; i++) {
    if (compareFn(target, array[i]) === Compare.EQUALS) {
      return i;
    }
  }
  return DOES_NOT_EXIST;
}
