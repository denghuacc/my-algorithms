// 算法步骤
// 1. 从数列中挑出一个元素，称为 “基准”（pivot）;
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
// 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序

/**
 * @name quickSort 快速排序
 * @description 快速排序也许是最常用的排序算法了。
 * 它的复杂度为 O(nlogn) ，且它的性能通常比其他的复杂度为 O(nlogn) 的排序算法要好。
 * 和归并排序一样，快速排序也使用分治的方法，将原始数组分为较小的数组。
 * @param { Array<Number> } arr
 * @param { Number } left
 * @param { Number } right
 */
function quickSort(arr, left, right) {
  const len = arr.length
  let partitionIndex

    // 判断范围参数的类型
  ;(left = typeof left !== 'number' ? 0 : left),
    (right = typeof right !== 'number' ? len - 1 : right)

  // 递归终止条件 left >= right
  if (left < right) {
    partitionIndex = partition(arr, left, right) // 分区的索引值
    quickSort(arr, left, partitionIndex - 1) // 递归索引左边部分
    quickSort(arr, partitionIndex + 1, right) // 递归索引右边部分
  }
  return arr
}

// 分区操作
function partition(arr, left, right) {
  let pivot = left, // 基准点，设置初始为 0
    index = pivot + 1 // 开始遍历的索引

  // 后面的值和基准点的值进行对比
  // 如果比基准点小，交换它和 index 的值
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }

  // 更新基准点的位置 (交换原基准点和最后一个比它小的值的位置)
  // 此时，基准点左边的值都小于它，右边的值大于它
  if (pivot !== index - 1) {
    swap(arr, pivot, index - 1)
  }
  return index - 1
}

// 交换位置
function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

// test
const arr = [6, 7, 5, 10, 3, 4, 5, 2]
console.log(quickSort(arr))
