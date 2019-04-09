// 算法步骤
// 1. 创建一个堆 H[0……n - 1]；
// 2. 把堆首（最大值）和堆尾互换；
// 3. 把堆的尺寸缩小 1，并调用 shift_down(0) ，目的是把新的数组顶端数据调整到相应位置；
// 4. 重复步骤 2，直到堆的尺寸为 1。

/**
 * @name heapSort 堆排序
 * @description 堆排序也是一种很高效的算法，因其把数组当作二叉树来排序而得名。
 * 这个算法会根据以下信息，把数组当作二叉树来管理：
 * - 索引 0 是树的根节点；
 * - 除根节点外，任意节点 N 的父节点是 N/2；
 * - 节点 L 的左子节点是 2*L；
 * - 节点 R 的右子节点是 2*R+1。
 * @param { Array<Number> } arr
 * @returns { Array<Number> }
 */
function heapSort(arr) {
  let heapSize = arr.length
  buildHeap(arr)

  while (heapSize > 1) {
    heapSize-- // 堆的size减 1， 此时把堆尾，同时也是堆的最大值取出来了。递归，再把剩下的值的最大值再取出来
    swap(arr, 0, heapSize) // 交换堆首和堆尾的值。使得堆尾变成了最大值。这是可能会丢失堆的属性，成为数组
    heapify(arr, heapSize, 0) // 重新转换成堆
  }

  return arr // 直到数组长度 === 1时，返回原数组
}

function buildHeap(arr) {
  let heapSize = arr.length
  for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
    heapify(arr, heapSize, i)
  }
}

function heapify(arr, heapSize, i) {
  let left = i * 2 + 1, // 左子节点
    right = i * 2 + 2, // 右子节点
    largest = i // 节点

  // 左子节点 比 节点大时，互换位置
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left
  }

  // 右子节点 比 节点大时，互换位置
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right
  }

  // 当最大的值不是根节点时，互换位置，保证根节点是最大值，然后重新转换成堆
  if (largest !== i) {
    swap(arr, i, largest)
    heapify(arr, heapSize, largest)
  }
}

function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

// test
const arr = [1, 4, 2, 90, 3, 4]
console.log(heapSort(arr))
