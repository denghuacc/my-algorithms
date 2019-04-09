// 1. 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；
// 2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置；
// 3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；
// 4. 重复步骤 3 直到某一指针达到序列尾；
// 5. 将另一序列剩下的所有元素直接复制到合并序列尾

/**
 * @name mergeSort 归并排序
 * @description 归并排序是一种分治算法。
 * 其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置；
 * 接着将小数组（只有一个值）之间进行比较排序，之后归并成较大的数组，直到最后只有一个排序完毕的大数组。
 * @param { Array<Number> } arr
 * @returns { Array<Number> }
 */
function mergeSort(arr) {
  const len = arr.length
  if (len === 1) {
    return arr
  }

  let mid = Math.floor(len / 2), // 中间点
    // 对半分成 2 部分。这是左边部分，原数组的 1 / 2
    // 然后递归，再分 （... => 4 => 2 => 1），直到数组的 len === 1 时，再返回这个数组。
    // 此时开始使用 merge 方法（比较 + 合并），归并数组，数组的长度：1 => 2 => 4 => ...
    // 最后返回排好序的左边部分。
    // 下同，最后返回排好序的右边部分
    left = arr.slice(0, mid),
    // 右边部分
    right = arr.slice(mid)
  // 最后一步是：左边部分和右边部分进行归并，返回一个排好序的原数组
  return merge(mergeSort(left), mergeSort(right))
}

/**
 * @name merge 归并方法
 * @description 主要分 2 步
 * 1. 比较
 * 2. 合并
 * @param { Array<Number> } left
 * @param { Array<Number> } right
 */
function merge(left, right) {
  let result = []

  while (left.length && right.length) {
    // 比较 2个 数组值第一个值， 谁小把谁从原来的数组中取出来放到新的数组里
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  // 剩下的数组如果还有值，说明是比较之后剩下的，是较大的值，然后把这个值从原来的数组取出来，再放到新的数组里面即可。
  // 因为有些数组的长度是奇数时，拆分2个数组后， left 和 right 的长度是不一致的，所以会出现这种情况
  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result // 返回这个新的数组
}

// test
let arr = [1, 4, 2, 90, 3, 4]
console.log(mergeSort(arr))
