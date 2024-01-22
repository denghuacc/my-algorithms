/*
 * @lc app=leetcode.cn id=670 lang=typescript
 *
 * [670] 最大交换
 *
 * https://leetcode.cn/problems/maximum-swap/description/
 *
 * algorithms
 * Medium (47.17%)
 * Likes:    296
 * Dislikes: 0
 * Total Accepted:    37.6K
 * Total Submissions: 79.8K
 * Testcase Example:  '2736'
 *
 * 给定一个非负整数，你至多可以交换一次数字中的任意两位。返回你能得到的最大值。
 *
 * 示例 1 :
 *
 *
 * 输入: 2736
 * 输出: 7236
 * 解释: 交换数字2和数字7。
 *
 *
 * 示例 2 :
 *
 *
 * 输入: 9973
 * 输出: 9973
 * 解释: 不需要交换。
 *
 *
 * 注意:
 *
 *
 * 给定数字的范围是 [0, 10^8]
 *
 *
 */

// @lc code=start
// sorting
var maximumSwap = function (num: number): number {
  const numStrArr = num.toString().split("");
  const maxNumStrArr = numStrArr.slice();
  maxNumStrArr.sort((a, b) => Number(b) - Number(a));
  let diffStr = "";
  let diffIndex = -1;
  for (let i = 0; i < numStrArr.length; i++) {
    if (numStrArr[i] !== maxNumStrArr[i]) {
      diffStr = maxNumStrArr[i];
      diffIndex = i;
      break;
    }
  }
  if (diffIndex === -1) {
    return num;
  }
  const convertIndex = numStrArr.lastIndexOf(diffStr);
  [numStrArr[diffIndex], numStrArr[convertIndex]] = [
    numStrArr[convertIndex],
    numStrArr[diffIndex],
  ];
  return Number(numStrArr.join(""));
};

// greedy
var maximumSwap = function (num: number): number {
  const numStrArr = num.toString().split("");
  const n = numStrArr.length;
  let maxIdx = n - 1;
  let idx1 = -1;
  let idx2 = -1;
  for (let i = n - 1; i >= 0; i--) {
    if (numStrArr[i] > numStrArr[maxIdx]) {
      maxIdx = i;
    } else if (numStrArr[i] < numStrArr[maxIdx]) {
      idx1 = i;
      idx2 = maxIdx;
    }
  }
  if (idx1 < 0) {
    return num;
  }
  [numStrArr[idx1], numStrArr[idx2]] = [numStrArr[idx2], numStrArr[idx1]];
  return Number(numStrArr.join(""));
};

var maximumSwap = function (num: number): number {
  const strArr = String(num).split("");
  const sortStrArr = strArr.slice();
  sortStrArr.sort((a, b) => Number(b) - Number(a));
  const n = strArr.length;
  for (let i = 0; i < n; i++) {
    if (strArr[i] !== sortStrArr[i]) {
      const j = strArr.lastIndexOf(sortStrArr[i]);
      strArr[j] = strArr[i];
      strArr[i] = sortStrArr[i];
      return Number(strArr.join(""));
    }
  }
  return Number(strArr.join(""));
};
// @lc code=end
