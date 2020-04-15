// Bubble Sort 冒泡排序

// 算法步骤
// 1. 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
// 2. 对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。
// 3. 针对所有的元素重复以上的步骤，除了最后一个。
// 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

import { swap } from '../../utilities'

export function bubbleSort<T>(array: Array<T>) {
  const len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

// 优化：减少内循环中不必要的比较
export function bubbleSort2<T>(array: Array<T>) {
  const len = array.length
  for (let i = 0; i < len; i++) {
    // 优化：j< len -1 -> j < len - 1 - i
    // 后面的已经是排好序的比较大的数，不用重复比较
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

export function bubbleSort3<T>(array: Array<T>) {
  let i = array.length - 1

  while (i > 0) {
    let pos = 0
    for (let j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        pos = j
        swap(array, j, j + 1)
      }
    }
    i = pos
  }
  return array
}
