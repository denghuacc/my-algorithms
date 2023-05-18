/*
 * @lc app=leetcode.cn id=1073 lang=typescript
 *
 * [1073] 负二进制数相加
 *
 * https://leetcode.cn/problems/adding-two-negabinary-numbers/description/
 *
 * algorithms
 * Medium (35.44%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    6.6K
 * Total Submissions: 16.5K
 * Testcase Example:  '[1,1,1,1,1]\n[1,0,1]'
 *
 * 给出基数为 -2 的两个数 arr1 和 arr2，返回两数相加的结果。
 *
 * 数字以 数组形式 给出：数组由若干 0 和 1 组成，按最高有效位到最低有效位的顺序排列。例如，arr = [1,1,0,1] 表示数字 (-2)^3
 * + (-2)^2 + (-2)^0 = -3。数组形式 中的数字 arr 也同样不含前导零：即 arr == [0] 或 arr[0] == 1。
 *
 * 返回相同表示形式的 arr1 和 arr2 相加的结果。两数的表示形式为：不含前导零、由若干 0 和 1 组成的数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr1 = [1,1,1,1,1], arr2 = [1,0,1]
 * 输出：[1,0,0,0,0]
 * 解释：arr1 表示 11，arr2 表示 5，输出表示 16 。
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：arr1 = [0], arr2 = [0]
 * 输出：[0]
 *
 *
 * 示例 3：
 *
 *
 * 输入：arr1 = [0], arr2 = [1]
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 * 1 <= arr1.length, arr2.length <= 1000
 * arr1[i] 和 arr2[i] 都是 0 或 1
 * arr1 和 arr2 都没有前导0
 *
 *
 */

// @lc code=start
// math
function addNegabinary(arr1: number[], arr2: number[]): number[] {
  let i = arr1.length - 1;
  let j = arr2.length - 1;
  let carry = 0;
  const res: number[] = [];
  while (i >= 0 || j >= 0 || carry !== 0) {
    let x = carry;
    if (i >= 0) {
      x += arr1[i];
    }
    if (j >= 0) {
      x += arr2[j];
    }
    if (x >= 2) {
      res.push(x - 2);
      carry = -1;
    } else if (x >= 0) {
      res.push(x);
      carry = 0;
    } else {
      res.push(1);
      carry = 1;
    }
    i--;
    j--;
  }
  while (res.length > 1 && res[res.length - 1] === 0) {
    res.pop();
  }
  return res.reverse();
}

// @lc code=end
