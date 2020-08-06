// 计数排序

import { findMaxValue } from "../search/min-max-search";

export function countingSort(array: number[]): number[] {
  if (array.length < 2) return array;

  const maxValue = findMaxValue(array)!;
  const counts: number[] = new Array(maxValue + 1);
  array.forEach((val) => {
    if (!counts[val]) counts[val] = 0;
    counts[val]++;
  });

  let sortedIndex = 0;
  counts.forEach((count, i) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  });

  return array;
}
