// 快速排序

// 算法步骤
// 1. 从数列中挑出一个元素，称为 “基准”（pivot）;
// 2. 重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面（相同的数可以到任一边）。
// 在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作；
// 3. 递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序

// 快速排序的复杂度为 O(n*log(n)) ，且它的性能通常比其他的复杂度为 O(n*log(n)) 的排序算法要好。
// 和归并排序一样，快速排序也使用分治的方法，将原始数组分为较小的数组。

import { swap, defaultCompare, ICompareFunction, Compare } from "../util";

export function quickSort<T>(array: T[], compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}

function quick<T>(
  array: T[],
  left: number,
  right: number,
  compareFn: ICompareFunction<T>
) {
  let index: number;
  if (array.length > 1) {
    index = partition(array, left, right, compareFn);
    if (left < index - 1) quick(array, left, index - 1, compareFn);
    if (index < right) quick(array, index, right, compareFn);
  }
  return array;
}

// 分区操作
function partition<T>(
  array: T[],
  left: number,
  right: number,
  compareFn: ICompareFunction<T>
) {
  let pivot = array[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) i++;
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) j--;

    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }

  return i;
}
