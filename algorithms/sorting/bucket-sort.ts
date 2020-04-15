// Bucket Sort 桶排序

import { insertionSort } from './insertion-sort'

export function bucketSort<T extends number>(
  array: Array<T>,
  bucketSize: number = 5
) {
  if (array.length < 2) return array

  const buckets = createBuckets(array, bucketSize)
  return sortBuckets(buckets)
}

function createBuckets<T extends number>(array: Array<T>, bucketSize: number) {
  let minVal = array[0]
  let maxVal = array[0]

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minVal) {
      minVal = array[i]
    } else if (array[i] > maxVal) {
      maxVal = array[i]
    }
  }

  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1
  const buckets: Array<Array<T>> = []
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minVal) / bucketSize)
    buckets[bucketIndex].push(array[i])
  }
  return buckets
}

function sortBuckets<T>(buckets: Array<Array<T>>) {
  const sortedArr = []
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      insertionSort(buckets[i])
      sortedArr.push(...buckets[i])
    }
  }
  return sortedArr
}
