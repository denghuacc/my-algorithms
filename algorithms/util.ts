export type ICompareFunction<T> = (a: T, b: T) => number
export type IEqualsFunction<T> = (a: T, b: T) => boolean
export type IDiffFunction<T> = (a: T, b: T) => number

export const DOES_NOT_EXIST = -1

export enum Compare {
  EQUALS = 0,
  LESS_THAN = -1,
  BIGGER_THAN = 1
}

export function swap<T>(array: Array<T>, a: number, b: number) {
  ;[array[a], array[b]] = [array[b], array[a]]
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) return Compare.EQUALS
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}

export function defaultDiff<T>(a: T, b: T): number {
  return Number(a) - Number(b)
}

export function lesserEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>) {
  const comp = compareFn(a, b)
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

export function biggerEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>) {
  const comp = compareFn(a, b)
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS
}
