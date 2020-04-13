/**
 * 使用递归实现数组求和
 * @param {Number[]} array
 */
function sum(array) {
  return _sum(array, 0)

  function _sum(array, index) {
    // 递归终止条件
    if (index === array.length) {
      return 0
    }

    return array[index] + _sum(array, index + 1) // 递归
  }
}

// test

array = [1, 2, 3, 4, 5, 6, 7, 8]

const sums = sum(array)

console.log(sums)
