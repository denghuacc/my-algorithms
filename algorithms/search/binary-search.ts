// Binary Search 二分搜索

// 输入一个已经排好序的数组和目标值，返回目标值的索引
// 如果数组没有排好序，需要使用排序算法进行排序

import { quickSort } from "../sorting/quicksort";
import { defaultCompare, Compare, DOES_NOT_EXIST } from "../util";

export function binarySearch<T = number>(
  array: T[],
  target: T,
  compareFn = defaultCompare
): number {
  const sortedArray = quickSort(array); // 排序
  let low = 0; // 最小值索引
  let high = array.length - 1; // 最大值索引
  let mid; // 中间值索引

  while (low <= high) {
    const mid = Math.floor((low + high) / 2); // or left + Math.floor((right - left) / 2)
    const element = sortedArray[mid];

    if (compareFn(element, target) === Compare.LESS_THAN) {
      low = mid + 1;
    } else if (compareFn(element, target) === Compare.BIGGER_THAN) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return DOES_NOT_EXIST;
}
