export function swap<T>(array: Array<T>, a: number, b: number) {
  ;[array[a], array[b]] = [array[b], array[a]]
}

export function findMinValue<T = number>(array: Array<T>) {
  let min = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i]
    }
  }
  return min
}

export function findMaxValue<T = number>(array: Array<T>) {
  let max = array[0]
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  return max
}
