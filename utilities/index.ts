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

export function defaultToString(item: any): string {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}

export class MyObj {
  constructor(public el1: any, public el2: any) {}
  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`
  }
}
