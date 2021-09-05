/*
 * @lc app=leetcode.cn id=470 lang=typescript
 *
 * [470] 用 Rand7() 实现 Rand10()
 *
 * https://leetcode-cn.com/problems/implement-rand10-using-rand7/description/
 *
 * algorithms
 * Medium (55.73%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    55.6K
 * Total Submissions: 101.8K
 * Testcase Example:  '1'
 *
 * 已有方法 rand7 可生成 1 到 7 范围内的均匀随机整数，试写一个方法 rand10 生成 1 到 10 范围内的均匀随机整数。
 *
 * 不要使用系统的 Math.random() 方法。
 *
 *
 *
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: 1
 * 输出: [7]
 *
 *
 * 示例 2:
 *
 *
 * 输入: 2
 * 输出: [8,4]
 *
 *
 * 示例 3:
 *
 *
 * 输入: 3
 * 输出: [8,1,10]
 *
 *
 *
 *
 * 提示:
 *
 *
 * rand7 已定义。
 * 传入参数: n 表示 rand10 的调用次数。
 *
 *
 *
 *
 * 进阶:
 *
 *
 * rand7()调用次数的 期望值 是多少 ?
 * 你能否尽量少调用 rand7() ?
 *
 *
 */

function rand7(): number {
  return 1;
}

// @lc code=start`
/**
 * The rand7() API is already defined for you.
 * function rand7(): number {}
 * @return a random integer in the range 1 to 7
 */

function rand10(): number {
  while (true) {
    let row = rand7();
    let col = rand7();
    let idx = col + (row - 1) * 7;

    if (idx <= 40) {
      return 1 + ((idx - 1) % 10);
    }
  }
}
// @lc code=end
