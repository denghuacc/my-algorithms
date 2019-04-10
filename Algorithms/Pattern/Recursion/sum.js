/**
 * 使用递归实现数组求和
 * @param {Number[]} arr
 */
function sum(arr) {
  return _sum(arr, 0)

  function _sum(arr, index) {
    // 递归终止条件
    if (index === arr.length) {
      return 0
    }

    return arr[index] + _sum(arr, index + 1) // 递归
  }
}

// test

arr = [1, 2, 3, 4, 5, 6, 7, 8]

const sums = sum(arr)

console.log(sums)
