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
 * 你有 4 张写有 1 到 9 数字的牌。你需要判断是否能通过 *，/，+，-，(，) 的运算得到 24。
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
 * 除法运算符 / 表示实数除法，而不是整数除法。例如 4 / (1 - 2/3) = 12 。
 * 每个运算符对两个数进行运算。特别是我们不能用 - 作为一元运算符。例如，[1, 1, 1, 1] 作为输入时，表达式 -1 - 1 - 1 - 1
 * 是不允许的。
 * 你不能将数字连接在一起。例如，输入为 [1, 2, 1, 2] 时，不能写成 12 + 12 。
 *
 *
 */

export {};

// @lc code=start
/**
 * 24点游戏 - 回溯算法解法
 *
 * 核心思想：通过回溯尝试所有可能的运算组合
 * 每次选择两个数字进行四则运算，将结果放回数组，直到只剩一个数字
 */
function judgePoint24(nums: number[]): boolean {
  const TARGET = 24; // 目标值
  const EPSILON = 1e-6; // 浮点数精度误差容忍度

  // 定义四则运算的常量
  const ADD = 0; // 加法
  const MULTIPLY = 1; // 乘法
  const SUBTRACT = 2; // 减法
  const DIVIDE = 3; // 除法

  // 复制输入数组，避免修改原数组
  const arr = nums.slice();
  return solve(arr);

  /**
   * 递归解决24点问题
   * @param arr 当前可用的数字数组
   * @returns 是否能得到24
   */
  function solve(arr: number[]): boolean {
    // 边界情况：没有数字时返回false
    if (arr.length === 0) return false;

    // 只有一个数字时，检查是否等于24（考虑浮点数精度）
    if (arr.length === 1) {
      return Math.abs(arr[0] - TARGET) < EPSILON;
    }

    const size = arr.length;

    // 尝试所有可能的两个数字组合
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== j) {
          // 确保选择的是两个不同的数字
          const arr2 = [];

          // 将除了i和j之外的所有数字添加到新数组
          for (let k = 0; k < size; k++) {
            if (k !== i && k !== j) {
              arr2.push(arr[k]);
            }
          }

          // 尝试四种运算
          for (let x = 0; x < 4; x++) {
            // 对于加法和乘法，由于交换律，避免重复计算
            // 例如：a+b 和 b+a 是等价的，只需要计算一次
            if (x < 2 && i > j) continue;

            if (x === ADD) {
              // 加法运算
              arr2.push(arr[i] + arr[j]);
            } else if (x === MULTIPLY) {
              // 乘法运算
              arr2.push(arr[i] * arr[j]);
            } else if (x === SUBTRACT) {
              // 减法运算
              arr2.push(arr[i] - arr[j]);
            } else if (x === DIVIDE) {
              // 除法运算，需要检查除数不为0
              if (Math.abs(arr[j]) < EPSILON) {
                continue; // 除数为0，跳过
              } else {
                arr2.push(arr[i] / arr[j]);
              }
            }

            // 递归尝试剩余的数字
            if (solve(arr2)) return true;

            // 回溯：移除刚才添加的结果
            arr2.pop();
          }
        }
      }
    }
    return false;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定4个数字，通过四则运算和括号组合，判断是否能得到24
   - 这是一个典型的回溯搜索问题，需要尝试所有可能的运算组合

2. 算法分析：
   - 时间复杂度：O(4^3 * 3! * 2! * 1!) = O(4^3 * 6 * 2 * 1) = O(192)
     * 4种运算 × 3轮递归 × 每轮选择两个数字的排列数
   - 空间复杂度：O(1)，递归深度最多4层
   - 算法类型：回溯算法 + 深度优先搜索

3. 实现要点：
   - 使用递归回溯，每次选择两个数字进行运算
   - 对于加法和乘法，利用交换律避免重复计算
   - 除法需要检查除数不为0
   - 使用EPSILON处理浮点数精度问题
   - 通过数组操作模拟括号的优先级

4. 优化思路：
   - 剪枝优化：对于加法和乘法，只计算i<=j的情况
   - 提前返回：一旦找到解就立即返回true
   - 浮点数比较：使用EPSILON避免精度误差

5. 关键技巧：
   - 数组操作模拟括号：通过选择两个数字运算，将结果放回数组
   - 回溯恢复：每次递归后要恢复数组状态
   - 交换律优化：避免重复计算等价的运算

6. 边界情况：
   - 除数为0的情况
   - 浮点数精度问题
   - 数组为空或只有一个元素的情况

7. 类似问题：
   - 表达式求值
   - 数字组合问题
   - 括号匹配问题
*/
