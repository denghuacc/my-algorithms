// binarySearch 二分搜索
// 输入一个已经排好序的数组和目标值，返回目标值的索引
// 如果数组没有排好序，需要使用排序算法进行排序

function binarySearch(arr, target) {
  let lower = 0, // 最小值索引
    upper = arr.length - 1, // 最大值索引
    mid, // 中间值索引
    val // 中间值

  while (lower <= upper) {
    mid = Math.floor((lower + upper) / 2)
    val = arr[mid] // 抽取一个中间值；这个中间值把数据分成 2个部分，前半部分（小）和后半部分（大）

    // 中间值刚好等于目标值时，返回中间值的索引
    if (val === target) {
      return mid
      // 如果中间值比目标值小，说明目标值在后半部分
    } else if (val < target) {
      lower = mid + 1 // 最小索引为比中间索引大 1，在后半部分找，把后半部分又分成 2 个部分继续找
      // 如果中间值比目标值大，说明目标值在前半部分
    } else {
      upper = mid - 1 // 大小索引为比中间索引小 1，在前半部分找，把前半部分又分成 2 个部分继续找
    }
  }

  return -1
}

module.exports = {
  binarySearch
}
