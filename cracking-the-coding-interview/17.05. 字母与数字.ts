/**
 * 
给定一个放有字母和数字的数组，找到最长的子数组，且包含的字母和数字的个数相同。
返回该子数组，若存在多个最长子数组，返回左端点下标值最小的子数组。若不存在这样的数组，返回一个空数组。

示例 1:
输入: ["A","1","B","C","D","2","3","4","E","5","F","G","6","7","H","I","J","K","L","M"]
输出: ["A","1","B","C","D","2","3","4","E","5","F","G","6","7"]

示例 2:
输入: ["A","A"]
输出: []

提示：

array.length <= 100000

难度：中等

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-longest-subarray-lcci/description/
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

function findLongestSubarray(array: string[]): string[] {
  const indices: Map<number, number> = new Map();
  indices.set(0, -1);
  let sum = 0;
  let maxLength = 0;
  let startIndex = -1;
  const n = array.length;
  for (let i = 0; i < n; i++) {
    if (isLetter(array[i][0])) {
      sum++;
    } else {
      sum--;
    }
    if (indices.has(sum)) {
      const firstIndex = indices.get(sum)!;
      if (i - firstIndex > maxLength) {
        maxLength = i - firstIndex;
        startIndex = firstIndex + 1;
      }
    } else {
      indices.set(sum, i);
    }
  }
  if (maxLength === 0) {
    return [];
  }
  return [...array.slice(startIndex, startIndex + maxLength)];

  function isLetter(ch: string) {
    return ("a" <= ch && ch <= "z") || ("A" <= ch && ch <= "Z");
  }
}
