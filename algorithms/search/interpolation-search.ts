// 内插搜索
// 内插搜索是改良版的二分搜索。二分搜索总是检查 mid 位置上的值，
// 而内插搜索可能会根据要搜索的值检查数组中的不同地方

import {
  defaultCompare,
  defaultEquals,
  defaultDiff,
  biggerEquals,
  lesserEquals,
  Compare,
  DOES_NOT_EXIST,
} from "../util";

export function interpolationSearch<T>(
  array: T[], // sorted array
  target: T,
  compareFn = defaultCompare,
  equalsFn = defaultEquals,
  diffFn = defaultDiff
) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;

  while (
    low <= high &&
    biggerEquals(target, array[low], compareFn) &&
    lesserEquals(target, array[high], compareFn)
  ) {
    delta = diffFn(target, array[low]) / diffFn(array[high], array[low]);
    position = low + Math.floor((high - low) * delta);

    if (equalsFn(array[position], target)) return position;

    if (compareFn(array[position], target) === Compare.LESS_THAN) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return DOES_NOT_EXIST;
}
