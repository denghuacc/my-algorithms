// 算法步骤
// 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。
// 从第二个元素开始，依次和前面的元素进行比较，如果发现元素比它大，交换位置，这样前二个的元素排序完成。
// 再第三个元素开始...以此类推，最后完成排序。

/**
 * @name insertionSort 插入排序
 * @param { Array<Number> } arr
 * @returns { Array<Number> }
 */
function insertionSort(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    // 寻找元素 arr[i] 合适的插入位置
    // for (let j = i; j > 0; j--) {
    //   if (arr[j] < arr[j - 1]) {
    //     ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
    //   } else {
    //     break
    //   }
    // }

    // 写法优化
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]] // 交换变量
    }
  }

  return arr
}

// 优化 内循环只交换一次
function insertionSort2(arr) {
  const len = arr.length

  for (let i = 0; i < len; i++) {
    let cur = arr[i], // 保存待插入的元素
      j = i // 保存元素 cur 应该插入的位置

    // 依次和前面的元素进行比较，如果它前一个元素比它大，这个元素往后挪一个位置，然后继续比较寻找
    // 直到找到前一个比它小的元素时，前面的元素不用往后挪了，待插入的元素就放在这个位置 j 上
    // 如果找不到，说明这个元素和前面的元素作比较是最小值，直接放到第一个位置，此时 j = 0
    for (; j > 0 && arr[j - 1] > cur; j--) {
      arr[j] = arr[j - 1]
    }
    arr[j] = cur
  }
  return arr
}

// test
const arr = [1, 7, 5, 90, 3, 4]
console.log(insertionSort(arr))
// console.log(insertionSort2(arr))
