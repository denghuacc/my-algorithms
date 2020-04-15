// heapSort 堆排序（最大堆结构）

// 算法步骤
// 1. 创建一个堆 H[0……n - 1]；
// 2. 把堆首（最大值）和堆尾互换；
// 3. 把堆的尺寸缩小 1，并调用 shift_down(0) ，目的是把新的数组顶端数据调整到相应位置；
// 4. 重复步骤 2，直到堆的尺寸为 1。

// 这个算法会根据以下信息，把数组当作二叉树来管理：
// 索引 0 是树的根节点；
// 除根节点外，任意节点 N 的父节点是 N/2；
// 非叶子节点 N 的左子节点是 2N+1，右子节点是 2N+2。

import { swap } from '../../utilities'

export function heapSort<T>(array: Array<T>) {
  let size = array.length
  buildHeap(array)

  while (size > 1) {
    size-- // 堆的 size 减 1， 此时把堆尾，同时也是堆的最大值取出来了。递归，再把剩下的值的最大值再取出来
    swap(array, 0, size) // 交换堆首和堆尾的值。使得堆尾变成了最大值。这时可能会丢失堆的属性，成为普通数组
    heapify(array, size, 0) // 需要重新转换成堆
  }

  return array // 直到数组长度 === 1时，返回原数组
}

function buildHeap<T>(array: Array<T>) {
  let size = array.length
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, size, i)
  }
}

function heapify<T>(array: Array<T>, size: number, i: number) {
  let left = i * 2 + 1, // 左子节点
    right = i * 2 + 2, // 右子节点
    largest = i // 节点

  // 左右子节点比父节点大时，互换位置
  if (left < size && array[left] > array[largest]) largest = left
  if (right < size && array[right] > array[largest]) largest = right

  // 当最大的值不是根节点时，互换位置，保证根节点是最大值，然后重新转换成堆
  if (largest !== i) {
    swap(array, i, largest)
    heapify(array, size, largest)
  }
}
