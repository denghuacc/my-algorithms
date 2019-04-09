// 算法步骤
// 1. 在未排序序列中找到最小元素，存放到排序序列的起始位置
// 2. 从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾。
// 3. 重复第二步，直到所有元素均排序完毕。

/**
 * @name selectionSort 选择排序
 * @param { Array<Number> } arr
 * @returns { Array<Number> }
 */
function selectionSort(arr) {
  let len = arr.length,
    minIndex
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      // 寻找最小数
      if (arr[j] < arr[minIndex]) {
        minIndex = j // 将最小数索引保存
      }
    }
    // 如果一样就不用交换，节省时间
    if (minIndex !== i) {
      ;[arr[i], arr[minIndex]] = [arr[minIndex], arr[i]] // 交换变量
    }
  }
  return arr
}

// test
let arr = [1, 4, 2, 90, 3, 4]
console.log(selectionSort(arr))
