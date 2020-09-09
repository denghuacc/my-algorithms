// 使用递归实现数组求和

export function sum(array: number[]): number {
  return _sum(array, 0);

  function _sum(array: number[], index: number): number {
    if (index === array.length) return 0;
    return array[index] + _sum(array, index + 1); // 递归
  }
}

// with memo
export function sumMemo(array: number[]): number {
  const memo: number[] = [];
  return _sum(array, 0);

  function _sum(array: number[], index: number): number {
    if (index === array.length) return 0;
    if (memo[index]) return memo[index];

    const ret = (memo[index] = array[index] + _sum(array, index + 1)); // 递归
    return ret;
  }
}
