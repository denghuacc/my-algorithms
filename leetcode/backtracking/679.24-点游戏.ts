/*
 * @lc app=leetcode.cn id=679 lang=typescript
 *
 * [679] 24 点游戏
 *
 * https://leetcode-cn.com/problems/24-game/description/
 *
 * algorithms
 * Hard (44.58%)
 * Likes:    124
 * Dislikes: 0
 * Total Accepted:    7.1K
 * Total Submissions: 15.3K
 * Testcase Example:  '[4,1,8,7]'
 *
 * 你有 4 张写有 1 到 9 数字的牌。你需要判断是否能通过 *，/，+，-，(，) 的运算得到 24。
 *
 * 示例 1:
 *
 * 输入: [4, 1, 8, 7]
 * 输出: True
 * 解释: (8-4) * (7-1) = 24
 *
 *
 * 示例 2:
 *
 * 输入: [1, 2, 1, 2]
 * 输出: False
 *
 *
 * 注意:
 *
 *
 * 除法运算符 / 表示实数除法，而不是整数除法。例如 4 / (1 - 2/3) = 12 。
 * 每个运算符对两个数进行运算。特别是我们不能用 - 作为一元运算符。例如，[1, 1, 1, 1] 作为输入时，表达式 -1 - 1 - 1 - 1
 * 是不允许的。
 * 你不能将数字连接在一起。例如，输入为 [1, 2, 1, 2] 时，不能写成 12 + 12 。
 *
 *
 */

// @lc code=start
// backtracking
function judgePoint24(nums: number[]): boolean {
  const TARGET = 24;
  const EPSILON = 1e-6;
  const ADD = 0;
  const MULTIPLY = 1;
  const SUBTRACT = 2;
  const DIVIDE = 3;

  const arr = nums.slice();
  return solve(arr);

  function solve(arr: number[]): boolean {
    if (arr.length === 0) return false;
    if (arr.length === 1) {
      return Math.abs(arr[0] - TARGET) < EPSILON;
    }

    const size = arr.length;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          const arr2 = [];

          for (let k = 0; k < size; k++) {
            if (k !== i && k !== j) {
              arr2.push(arr[k]);
            }
          }

          for (let x = 0; x < 4; x++) {
            if (x < 2 && i > j) continue;
            if (x === ADD) {
              arr2.push(arr[i] + arr[j]);
            } else if (x === MULTIPLY) {
              arr2.push(arr[i] * arr[j]);
            } else if (x === SUBTRACT) {
              arr2.push(arr[i] - arr[j]);
            } else if (x === DIVIDE) {
              if (Math.abs(arr[j]) < EPSILON) {
                continue;
              } else {
                arr2.push(arr[i] / arr[j]);
              }
            }
            if (solve(arr2)) return true;
            arr2.pop();
          }
        }
      }
    }
    return false;
  }
}
// @lc code=end
