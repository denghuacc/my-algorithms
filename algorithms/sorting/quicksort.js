// 快速排序

// 算法步骤
// 1. 从数列中挑出一个元素，称为 “基准”（pivot）;
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
// 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序

// 快速排序的复杂度为 O(n*log(n)) ，且它的性能通常比其他的复杂度为 O(n*log(n)) 的排序算法要好。
// 和归并排序一样，快速排序也使用分治的方法，将原始数组分为较小的数组。

const { swap } = require('../../utilities')

function quickSort(array, left, right) {
  const len = array.length
  let partitionIndex
  ;(left = typeof left !== 'number' ? 0 : left),
    (right = typeof right !== 'number' ? len - 1 : right)

  if (left < right) {
    partitionIndex = partition(array, left, right) // 分区的索引值
    quickSort(array, left, partitionIndex - 1) // 递归索引左边部分
    quickSort(array, partitionIndex + 1, right) // 递归索引右边部分
  }
  return array
}

// 分区操作
function partition(array, left, right) {
  let pivot = left, // 基准点，设置初始为 0
    index = pivot + 1 // 开始遍历的索引

  for (let i = index; i <= right; i++) {
    if (array[i] < array[pivot]) {
      swap(array, i, index)
      index++
    }
  }

  // 更新基准点的位置，基准点左边的值都小于它，右边的值都大于它
  swap(array, pivot, index - 1)
  return index - 1
}

function quickSort2(array, left, right) {
  let len = array.length
  ;(left = typeof left !== 'number' ? 0 : left),
    (right = typeof right !== 'number' ? len - 1 : right)

  if (left < right) {
    partitionIndex = partition2(array, left, right)
    quickSort2(array, left, partitionIndex - 1)
    quickSort2(array, partitionIndex + 1, right)
  }
  return array
}

function partition2(array, low, high) {
  let pivot = array[low]
  while (low < high) {
    while (low < high && array[high] > pivot) {
      --high
    }
    array[low] = array[high]
    while (low < high && array[low] <= pivot) {
      ++low
    }
    array[high] = array[low]
  }
  array[low] = pivot
  return low
}

module.exports = {
  quickSort,
  quickSort2
}
