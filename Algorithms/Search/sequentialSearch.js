/**
 * @name sequentialSearch 顺序搜索
 * @description 顺序或线性搜索是最基本的搜索算法；
 * 它的机制是，将每一个数据结构中的元素和我们要找的元素做比较;
 * 顺序搜索是最低效的一种搜索算法。
 * @param { Array<Number | String> } arr
 * @param { Number | String } target
 * @returns { Number }
 */
function sequentialSearch(arr, target) {
  // 遍历所有值，一个一个对比查找
  for (let i = 0; i < arr.length; i++) {
    if (target === arr[i]) {
      return i
    }
  }
  return -1
}

// test
const arr = ['a', 1, 3, 'c']
console.log(sequentialSearch(arr, 'a')) // 0
console.log(sequentialSearch(arr, 3)) // 2
