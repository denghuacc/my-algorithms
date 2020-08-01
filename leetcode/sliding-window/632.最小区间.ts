/*
 * @lc app=leetcode.cn id=632 lang=typescript
 *
 * [632] 最小区间
 *
 * https://leetcode-cn.com/problems/smallest-range-covering-elements-from-k-lists/
 *
 * algorithms
 * hard (28.74%)
 * Likes:    129
 * Dislikes: 0
 * Total Accepted:    25.9K
 * Total Submissions: 76.8K
 * Testcase Example:  '5'
 *
 * 你有 k 个升序排列的整数数组。找到一个最小区间，使得 k 个列表中的每个列表至少有一个数包含在其中。
 *
 * 我们定义如果 b-a < d-c 或者在 b-a == d-c 时 a < c，则区间 [a,b] 比 [c,d] 小。
 *
 * 示例1:
 *
 *
 * 输入: [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]
 * 输出: [20,24]
 * 解释:
 * 列表 1：[4, 10, 15, 24, 26]，24 在区间 [20,24] 中。
 * 列表 2：[0, 9, 12, 20]，20 在区间 [20,24] 中。
 * 列表 3：[5, 18, 22, 30]，22 在区间 [20,24] 中。
 *
 * 注意:
 * 1. 给定的列表可能包含重复元素，所以在这里升序表示 >= 。
 * 2. 1 <= k <= 3500
 * 3. -10^5 <= 元素的值 <= 10^5
 * 4. 对于使用Java的用户，请注意传入类型已修改为List<List<Integer>>。重置代码模板后可以看到这项改动。
 *
 */

// @lc code=start
// hash map + sliding window
function smallestRange(nums: number[][]): number[] {
  const size = nums.length;
  const map: Map<number, number[]> = new Map();
  let xMin = Infinity;
  let xMax = -Infinity;

  for (let i = 0; i < size; i++) {
    for (const x of nums[i]) {
      const list = map.get(x) ?? [];
      list.push(i);
      map.set(x, list);
      xMin = Math.min(xMin, x);
      xMax = Math.max(xMax, x);
    }
  }

  const freq: number[] = new Array(size).fill(0);
  let inside = 0;
  let left = xMin;
  let right = xMin - 1;
  let bestLeft = xMin;
  let bestRight = xMax;

  while (right < xMax) {
    right++;
    if (map.has(right)) {
      for (const x of map.get(right)!) {
        freq[x]++;
        if (freq[x] === 1) {
          inside++;
        }
      }

      while (inside === size) {
        if (right - left < bestRight - bestLeft) {
          bestLeft = left;
          bestRight = right;
        }
        if (map.has(left)) {
          for (const x of map.get(left)!) {
            freq[x]--;
            if (freq[x] === 0) {
              inside--;
            }
          }
        }
        left++;
      }
    }
  }

  return [bestLeft, bestRight];
}
// @lc code=end
// 这道题目暂时无法提交！！！
