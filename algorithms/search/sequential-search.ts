// sequentialSearch 顺序搜索（遍历）

// 它的机制是，将每一个数据结构中的元素和我们要找的元素做比较。
// 顺序搜索是最低效的一种搜索算法。

export function sequentialSearch<T = any>(array: Array<T>, target: T) {
  // 遍历所有值，一个一个对比查找
  for (let i = 0; i < array.length; i++) {
    if (target === array[i]) {
      return i
    }
  }
  return -1
}
