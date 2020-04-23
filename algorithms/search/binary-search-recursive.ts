// Binary Search 二分搜索递归版 -> 分而治之

import { defaultCompare, Compare, DOES_NOT_EXIST } from '../util'
import { quickSort } from '../sorting/quicksort'

export function binarySearch<T>(
  array: T[],
  target: T,
  compareFn = defaultCompare
): number {
  const sortedArray = quickSort(array)
  const low = 0
  const high = sortedArray.length - 1

  return binarySearchRecursive(array, target, low, high, compareFn)
}

function binarySearchRecursive<T>(
  array: T[],
  target: T,
  low: number,
  high: number,
  compareFn = defaultCompare
): number {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = array[mid]

    if (compareFn(element, target) === Compare.LESS_THAN) {
      return binarySearchRecursive(array, target, mid + 1, high, compareFn)
    } else if (compareFn(element, target) === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, target, low, mid - 1, compareFn)
    } else {
      return mid
    }
  }

  return DOES_NOT_EXIST
}
