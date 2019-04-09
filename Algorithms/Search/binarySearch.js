/**
 * @name binarySearch 二分搜索
 * @description 二分搜索算法的原理和猜数字游戏类似。
 * 这个算法要求被搜索的数据结构已排序。
 * 没有排序，先使用排序算法排序。
 * @param { Array<Number> } arr
 * @param { Number } target
 */
function binarySearch(arr, target) {
  let low = 0, // 最小值索引
    high = arr.length - 1, // 最大值索引
    mid, // 中间值索引
    element // 中间值

  while (low <= high) {
    mid = Math.floor((low + high) / 2)
    element = arr[mid] // 抽取一个中间值；这个中间值把数据分成 2个部分，前半部分（小）和后半部分（大）
    // 如果中间值比目标值小，说明目标值在后半部分
    if (element < target) {
      low = mid + 1 // 最小索引为比中间索引大 1，在后半部分找，把后半部分又分成 2 个部分继续找
      // 如果中间值比目标值大，说明目标值在前半部分
    } else if (element > target) {
      high = mid - 1 // 大小索引为比中间索引小 1，在前半部分找，把前半部分又分成 2 个部分继续找
    } else {
      return mid // 中间值刚好等于目标值时，返回中间值的索引
    }
  }

  return -1
}

// test
const arr = [1, 3, 5, 11, 13, 15, 22, 33]
console.log(binarySearch(arr, 13)) // 4
console.log(binarySearch(arr, 22)) // 6
