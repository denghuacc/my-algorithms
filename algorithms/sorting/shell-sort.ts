// 希尔排序

// 算法步骤
// 1. 选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1；
// 2. 按增量序列个数 k，对序列进行 k 趟排序；
// 3. 每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。
// 仅增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

import { defaultCompare, Compare } from "../util";

export function shellSort<T>(array: T[], compareFn = defaultCompare) {
  let increment = array.length / 2;

  while (increment > 0) {
    for (let i = increment; i < array.length; i++) {
      let j = i;
      const temp = array[i];

      while (
        j >= increment &&
        compareFn(array[j - increment], temp) === Compare.BIGGER_THAN
      ) {
        array[j] = array[j - increment];
        j = j - increment;
      }

      array[j] = temp;
    }

    if (increment === 2) {
      increment = 1;
    } else {
      increment = Math.floor((increment * 5) / 11);
    }
  }

  return array;
}

export function shellSort2<T>(array: T[], compareFn = defaultCompare) {
  let len = array.length;
  let temp;
  let gap = 1;

  while (gap < len / 3) {
    gap = gap * 3 + 1; // 动态定义间隔序列
  }

  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (let i = gap; i < len; i++) {
      temp = array[i];
      let j;
      for (
        j = i - gap;
        j >= 0 && compareFn(array[j], temp) === Compare.BIGGER_THAN;
        j -= gap
      ) {
        array[j + gap] = array[j];
      }
      array[j + gap] = temp;
    }
  }
  return array;
}
