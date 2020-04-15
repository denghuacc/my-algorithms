// Radix Sort 基数排序

import { findMinValue, findMaxValue } from '../../utilities'

export function radixSort<T extends number>(array: Array<T>, radixBase: number = 10) {
  if (array.length < 2) return array
  const minValue = findMinValue(array)
  const maxValue = findMaxValue(array)

  let significantDigit = 1

  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue)
    significantDigit *= radixBase
  }

  return array
}

function countingSortForRadix<T extends number>(
  array: Array<T>,
  radixBase: number,
  significantDigit: number,
  minValue: number
) {
  let bucketsIndex
  const buckets = []
  const aux = []
  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0
  }
  for (let i = 0; i < array.length; i++) {
    bucketsIndex =
      Math.floor((array[i] - minValue) / significantDigit) % radixBase
    buckets[bucketsIndex]++
  }
  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1]
  }
  for (let i = array.length - 1; i >= 0; i--) {
    bucketsIndex =
      Math.floor((array[i] - minValue) / significantDigit) % radixBase
    aux[--buckets[bucketsIndex]] = array[i]
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = aux[i]
  }
  return array
}
