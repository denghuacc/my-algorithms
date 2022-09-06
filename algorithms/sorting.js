function quickSort(arr) {
  return quick(arr, 0, arr.length - 1);
}

function quick(arr, left, right) {
  const pivot = partition(arr, left, right);
  if (left < pivot - 1) quick(arr, left, pivot - 1);
  if (right > pivot) quick(arr, pivot, right);
  return arr;
}

function partition(arr, left, right) {
  const mid = left + Math.floor((right - left) / 2);
  while (left <= right) {
    while (arr[left] < arr[mid]) left++;
    while (arr[right] > arr[mid]) right--;
    if (left <= right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }
  return left;
}

function mergeSort(arr) {
  if (arr.length > 1) {
    const mid = Math.floor(arr.length / 2);
    const leftArr = mergeSort(arr.slice(0, mid));
    const rightArr = mergeSort(arr.slice(mid));
    arr = merge(leftArr, rightArr);
  }
  return arr;
}

function merge(leftArr, rightArr) {
  let i = 0;
  let j = 0;
  const res = [];
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      res.push(leftArr[i]);
      i++;
    } else {
      res.push(rightArr[j]);
      j++;
    }
  }
  if (i < leftArr.length) {
    res.push(...leftArr.slice(i));
  } else {
    res.push(...rightArr.slice(j));
  }
  return res;
}

function countingSort(arr) {
  const counts = new Array(256).fill(0); // length >= maxItem + 1
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i]]++;
  }
  let idx = 0;
  for (let i = 0; i < counts.length; i++) {
    while (counts[i] > 0) {
      arr[idx++] = i;
      counts[i]--;
    }
  }
  return arr;
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] < arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    let j = i;
    while (j > 0 && arr[j - 1] > current) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = current;
  }
  return arr;
}

function heapSort(arr) {
  let size = arr.length;
  buildHeap(arr);

  while (size > 1) {
    size--;
    [arr[0], arr[size]] = [arr[size], arr[0]];
    heapify(arr, size, 0);
  }

  return arr;
}

function buildHeap(arr) {
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, arr.length, i);
  }
}

function heapify(arr, size, idx) {
  let parent = idx;
  const left = 2 * idx + 1;
  const right = 2 * idx + 2;

  if (left < size && arr[left] > arr[parent]) parent = left;
  if (right < size && arr[right] > arr[parent]) parent = right;
  if (parent !== idx) {
    [arr[idx], arr[parent]] = [arr[parent], arr[idx]];
    heapify(arr, size, parent);
  }
}

const arr = [5, 3, 4, 1, 2];
console.log(heapSort(arr));
