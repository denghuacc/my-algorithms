/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 *
 * https://leetcode-cn.com/problems/ugly-number-ii/description/
 *
 * algorithms
 * Medium (38.00%)
 * Likes:    264
 * Dislikes: 0
 * Total Accepted:    23.4K
 * Total Submissions: 45.7K
 * Testcase Example:  '10'
 *
 * 编写一个程序，找出第 n 个丑数。
 *
 * 丑数就是只包含质因数 2, 3, 5 的正整数。
 *
 * 示例:
 *
 * 输入: n = 10
 * 输出: 12
 * 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
 *
 * 说明:
 *
 *
 * 1 是丑数。
 * n 不超过1690。
 *
 *
 */

// @lc code=start
// sort 超时
var nthUglyNumber = function (n: number): number {
  const catchArray = genArray();

  function genArray(): number[] {
    const maxNth = 1690;
    const set = new Set<number>();
    const sortList = [1];

    while (set.size < maxNth) {
      const item = sortList.shift()!;
      if (set.has(item)) continue;
      set.add(item);
      sortList.push(item * 2);
      sortList.push(item * 3);
      sortList.push(item * 5);
      sortList.sort((a, b) => a - b);
    }

    return [...set];
  }

  return catchArray[n - 1];
};

// dp
var nthUglyNumber = function (n: number): number {
  const catchArray = genArray();
  return catchArray[n - 1];

  function genArray(): number[] {
    const maxNth = 1690;
    let p2 = 0;
    let p3 = 0;
    let p5 = 0;
    const arr = [1];

    for (let i = 1; i < maxNth; i++) {
      const nextP2 = arr[p2] * 2;
      const nextP3 = arr[p3] * 3;
      const nextP5 = arr[p5] * 5;
      const realNum = Math.min(nextP2, nextP3, nextP5);

      if (realNum === nextP2) p2++;
      if (realNum === nextP3) p3++;
      if (realNum === nextP5) p5++;

      arr[i] = realNum;
    }

    return arr;
  }
};
// @lc code=end
