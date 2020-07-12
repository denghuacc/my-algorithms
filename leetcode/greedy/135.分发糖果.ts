/*
 * @lc app=leetcode.cn id=135 lang=typescript
 *
 * [135] 分发糖果
 *
 * https://leetcode-cn.com/problems/candy/description/
 *
 * algorithms
 * Hard (36.10%)
 * Likes:    231
 * Dislikes: 0
 * Total Accepted:    24.1K
 * Total Submissions: 54.9K
 * Testcase Example:  '[1,0,2]'
 *
 * 老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。
 *
 * 你需要按照以下要求，帮助老师给这些孩子分发糖果：
 *
 *
 * 每个孩子至少分配到 1 个糖果。
 * 相邻的孩子中，评分高的孩子必须获得更多的糖果。
 *
 *
 * 那么这样下来，老师至少需要准备多少颗糖果呢？
 *
 * 示例 1:
 *
 * 输入: [1,0,2]
 * 输出: 5
 * 解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
 *
 *
 * 示例 2:
 *
 * 输入: [1,2,2]
 * 输出: 4
 * 解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
 * ⁠    第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
 *
 */

// @lc code=start
// greedy two array
var candy = function (ratings: number[]): number {
  const n = ratings.length;
  let sum = 0;
  const left2right: number[] = new Array(n).fill(1);
  const right2left: number[] = new Array(n).fill(1);

  // left -> right
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      left2right[i] = left2right[i - 1] + 1;
    }
  }

  // right -> left
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      right2left[i] = right2left[i + 1] + 1;
    }
  }

  for (let i = 0; i < n; i++) {
    sum += Math.max(left2right[i], right2left[i]);
  }

  return sum;
};

// greedy one array
var candy = function (ratings: number[]): number {
  const n = ratings.length;
  const candies: number[] = new Array(n).fill(1);

  // left -> right
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  let sum = candies[n - 1];

  // right -> left
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
    sum += candies[i];
  }
  return sum;
};

// greedy one traverse 空间复杂度 O(1)
var candy = function (ratings: number[]): number {
  const n = ratings.length;
  if (n <= 1) return n;
  let candies = 0;
  let up = 0;
  let down = 0;
  let oldScope = 0;

  for (let i = 1; i < n; i++) {
    let newScope =
      ratings[i] > ratings[i - 1] ? 1 : ratings[i] < ratings[i - 1] ? -1 : 0;
    if ((oldScope > 0 && newScope === 0) || (oldScope < 0 && newScope >= 0)) {
      candies += count(up) + count(down) + Math.max(up, down);
      up = 0;
      down = 0;
    }
    if (newScope > 0) up++;
    if (newScope < 0) down++;
    if (newScope === 0) candies++;
    oldScope = newScope;
  }

  candies += count(up) + count(down) + Math.max(up, down) + 1;
  return candies;

  function count(n: number): number {
    return Math.floor((n * (n + 1)) / 2);
  }
};
// @lc code=end
