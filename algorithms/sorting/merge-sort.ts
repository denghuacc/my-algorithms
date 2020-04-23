// 归并排序

// 算法步骤
// 1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
// 2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
// 3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
// 4. 重复步骤 3 直到某一指针达到序列尾；
// 5. 将另一序列剩下的所有元素直接复制到合并序列尾

// 归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置。
// 接着将小数组（只有一个值）之间进行比较排序，之后归并成较大的数组，直到最后只有一个排序完毕的大数组。

import { defaultCompare, ICompareFunction, Compare } from '../util'

export function mergeSort<T>(array: T[], compareFn = defaultCompare): T[] {
  if (array.length > 1) {
    const { length } = array
    let mid = Math.floor(length / 2) // 中间点
    let left = mergeSort(array.slice(0, mid), compareFn)
    let right = mergeSort(array.slice(mid), compareFn)
    array = merge(left, right, compareFn)
  }
  return array
}

// 归并方法
// 从初始的只有一个值的数组两两比较开始，归并之后的数组变成排好序的有两个值的小数组。
// 之后继续两两比较，小数组变成较大的数组，最后成为一个新的排序好的新数组。
function merge<T>(left: T[], right: T[], compareFn: ICompareFunction<T>): T[] {
  const ret: T[] = [] // 新数组，用来保存归并后的值

  // 比较 left 和 right 两个数组值的第一个值
  // 谁小就把谁从原来的数组中提取出来并放入到新数组中
  while (left.length && right.length) {
    if (compareFn(left[0], right[0]) === Compare.LESS_THAN) {
      ret.push(left.shift()!)
    } else {
      ret.push(right.shift()!)
    }
  }

  // 当其中一个数组已经清空后，另外一个数组如果还有值
  // 把这些值依次从数组前面取出放入到新数组的后面，这些值都是比较后剩余的较大的值
  while (left.length) ret.push(left.shift()!)
  while (right.length) ret.push(right.shift()!)
  return ret
}
