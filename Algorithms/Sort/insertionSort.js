// 算法步骤
// 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
// 从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。
//（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）

/**
 * 插入排序
 * @param { Array<Number> } arr
 * @returns { Array<Number> }
 */
function insertionSort(arr) {
  let len = arr.length,
    preIndex,
    current
  for (let i = 1; i < len; i++) {
    preIndex = i - 1 // 初始索引为 0
    current = arr[i] // 待插入的值，从第二个数开始

    // 当 current 比前一个的元素小时 并且索引 >= 0
    while (preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex] // 交换位置
      preIndex-- // 索引递减，继续比较
    }

    // 直到待交换的元素比前面的一个元素大或者相等时，不用交换了，插入到这个元素的后面即可。
    // 还有一种情况就是，找不到比它还大的。
    // 说明这个值是最小值，把这个值放在第一个位置上。此时 preIndex = -1，再加 1等于 0。
    arr[preIndex + 1] = current
  }
  return arr
}

// test
const arr = [1, 4, 2, 90, 3, 4]
console.log(insertionSort(arr))
