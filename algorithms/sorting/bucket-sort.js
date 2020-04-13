// Bucket Sort 桶排序

const { insertionSort } = require('./insertion-sort')

function bucketSort(array, bucketSize = 5) {
  if (array.length < 2) return array

  const buckets = createBuckets(array, bucketSize)
  return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
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
  const buckets = []
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minVal) / bucketSize)
    buckets[bucketIndex].push(array[i])
  }
  return buckets
}

function sortBuckets(buckets) {
  const sortedArr = []
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i] != null) {
      insertionSort(buckets[i])
      sortedArr.push(...buckets[i])
    }
  }
  return sortedArr
}

module.exports = {
  bucketSort
}
