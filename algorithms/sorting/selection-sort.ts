// 选择排序

// 算法步骤
// 1. 在未排序序列中找到最小元素，存放到排序序列的起始位置
// 2. 从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾。
// 3. 重复第二步，直到所有元素均排序完毕。

import { swap, defaultCompare, Compare } from "../util";

export function selectionSort<T>(array: T[], compareFn = defaultCompare): T[] {
  const len = array.length;
  let minIndex: number;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i; // 寻找最小值索引，初始值为 i

    for (let j = i + 1; j < len; j++) {
      if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
        minIndex = j; // 更新最小值索引
      }
    }

    if (i !== minIndex) swap(array, i, minIndex);
  }
  return array;
}
