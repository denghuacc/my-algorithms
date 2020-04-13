function swap(array, a, b) {
  ;[array[a], array[b]] = [array[b], array[a]]
}

function findMinValue(array) {
  let min = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
  }
  return min
}

function findMaxValue(array) {
  let max = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  return max
}

module.exports = {
  swap,
  findMinValue,
  findMaxValue
}
