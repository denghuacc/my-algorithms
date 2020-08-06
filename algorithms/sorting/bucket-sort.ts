// Bucket Sort 桶排序

import { insertionSort } from "./insertion-sort";

export function bucketSort(array: number[], bucketSize = 5): number[] {
  if (array.length < 2) return array;
  const buckets = createBuckets(array, bucketSize);
  return sortBuckets(buckets);
}

function createBuckets(array: number[], bucketSize: number): number[][] {
  let minValue = array[0];
  let maxValue = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }

  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  const buckets: number[][] = [];
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets: number[][]): number[] {
  const sortedArray: number[] = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i]) {
      insertionSort(buckets[i]);
      sortedArray.push(...buckets[i]);
    }
  }
  return sortedArray;
}
