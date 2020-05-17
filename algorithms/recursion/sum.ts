// 使用递归实现数组求和

export function sum(array: number[]) {
  return _sum(array, 0);

  function _sum(array: number[], index: number): number {
    if (index === array.length) return 0;
    return array[index] + _sum(array, index + 1); // 递归
  }
}
