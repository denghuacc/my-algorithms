import { defaultCompare, Compare } from "../util";

export function findMinValue<T>(
  array: T[],
  compareFn = defaultCompare
): T | undefined {
  if (array && array.length > 0) {
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
      if (compareFn(min, array[i]) === Compare.BIGGER_THAN) {
        min = array[i];
      }
    }
    return min;
  }
  return undefined;
}

export function findMaxValue<T>(
  array: T[],
  compareFn = defaultCompare
): T | undefined {
  if (array && array.length > 0) {
    let max = array[0];
    for (let i = 0; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN) {
        max = array[i];
      }
    }
    return max;
  }
  return undefined;
}
