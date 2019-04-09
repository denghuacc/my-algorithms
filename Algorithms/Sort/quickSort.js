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
  ;(left = typeof left !== 'number' ? 0 : left),
    (right = typeof right !== 'number' ? len - 1 : right)

  if (left < right) {
    partitionIndex = partition(arr, left, right)
    // 基准点左边的区域继续分区排序
    quickSort(arr, left, partitionIndex - 1)
    // 基准点右边的区域继续分区
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr
}

// 分区操作
function partition(arr, left, right) {
  let pivot = left, // 基准点，初始为 0
    index = pivot + 1 // 存储指数

  // 从指数位置开始遍历，和基准点的值进行对比
  for (let i = index; i <= right; i++) {
    // 当小于基准点的值时
    if (arr[i] < arr[pivot]) {
      // 交换初始和指数位置，把比基准点小的值移到前面来
      swap(arr, i, index)
      index++ // 指数递增
    }
  }

  // 交换基准点和指数（首次比基准点值大的那个位置，因为在遍历的最后它递增了，所以现在要减去 1）的位置
  // 相当于更新基准点的位置，把基准点后移，前面的已经拍好序了，继续拍后面的。
  swap(arr, pivot, index - 1)
  return index - 1 // 返回新的基准点的值
}

// 交换位置
function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

// test
const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]
console.log(quickSort(arr))
