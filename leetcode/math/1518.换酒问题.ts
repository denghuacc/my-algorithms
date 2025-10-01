/*
 * @lc app=leetcode.cn id=1518 lang=typescript
 *
 * [1518] 换酒问题
 *
 * https://leetcode-cn.com/problems/water-bottles/description/
 *
 * algorithms
 * Easy (69.36%)
 * Likes:    87
 * Dislikes: 0
 * Total Accepted:    33.7K
 * Total Submissions: 48.7K
 * Testcase Example:  '9\n3'
 *
 * 小区便利店正在促销，用 numExchange 个空酒瓶可以兑换一瓶新酒。你购入了 numBottles 瓶酒。
 *
 * 如果喝掉了酒瓶中的酒，那么酒瓶就会变成空的。
 *
 * 请你计算 最多 能喝到多少瓶酒。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：numBottles = 9, numExchange = 3
 * 输出：13
 * 解释：你可以用 3 个空酒瓶兑换 1 瓶酒。
 * 所以最多能喝到 9 + 3 + 1 = 13 瓶酒。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：numBottles = 15, numExchange = 4
 * 输出：19
 * 解释：你可以用 4 个空酒瓶兑换 1 瓶酒。
 * 所以最多能喝到 15 + 3 + 1 = 19 瓶酒。
 *
 *
 * 示例 3：
 *
 * 输入：numBottles = 5, numExchange = 5
 * 输出：6
 *
 *
 * 示例 4：
 *
 * 输入：numBottles = 2, numExchange = 3
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= numBottles <= 100
 * 2 <= numExchange <= 100
 *
 *
 */

// @lc code=start
/**
 * 解法一：模拟法 - 直接模拟换酒过程
 * 时间复杂度：O(log n) - 每次循环酒瓶数量至少减少一个数量级
 * 空间复杂度：O(1) - 只使用常数个变量
 */
var numWaterBottles = function (
  numBottles: number,
  numExchange: number
): number {
  // 初始化总共能喝到的酒瓶数，先把购买的酒全部喝掉
  let totalDrunk = numBottles;

  // 当前拥有的空酒瓶数量（喝完后产生的空瓶）
  let emptyBottles = numBottles;

  // 当空酒瓶数量足够兑换新酒时，继续兑换
  while (emptyBottles >= numExchange) {
    // 计算这一轮能兑换多少瓶新酒
    const newBottles = Math.floor(emptyBottles / numExchange);

    // 将新酒加入总数（新酒可以立即喝掉）
    totalDrunk += newBottles;

    // 计算剩余的空酒瓶：没用完的 + 新酒喝完后产生的
    const remainingEmpty = emptyBottles % numExchange;
    emptyBottles = newBottles + remainingEmpty;
  }

  return totalDrunk;
};

/**
 * 解法二：数学公式法 - 通过数学推导直接计算结果
 * 时间复杂度：O(1) - 直接通过公式计算
 * 空间复杂度：O(1) - 只使用常数个变量
 */
var numWaterBottlesMath = function (
  numBottles: number,
  numExchange: number
): number {
  // 数学分析：每次兑换实际上是用 numExchange 个空瓶换 1 瓶新酒
  // 新酒喝完后又产生 1 个空瓶，所以净消耗是 numExchange - 1 个空瓶
  // 因此最多能额外获得 Math.floor(numBottles / (numExchange - 1)) 瓶酒
  const extraBottles = Math.floor((numBottles - 1) / (numExchange - 1));

  return numBottles + extraBottles;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个典型的模拟兑换问题
   - 关键在于理解兑换规则：numExchange 个空瓶 → 1 瓶新酒
   - 新酒喝完后又会产生 1 个空瓶，可以继续参与兑换

2. 算法分析：
   - 时间复杂度：
     * 模拟法：O(log n) - 每轮兑换后酒瓶数量呈几何级数递减
     * 数学法：O(1) - 直接通过公式计算
   - 空间复杂度：O(1) - 两种方法都只使用常数个变量
   - 算法类型：模拟 + 数学推导

3. 解题思路：

   **解法一：模拟法**
   - 核心思想：直接模拟整个兑换过程
   - 关键观察：每轮兑换都要更新空瓶数量和总酒数
   - 算法步骤：
     1. 初始化总酒数为购买的酒数
     2. 将购买的酒全部喝掉，产生相应数量的空瓶
     3. 当空瓶数 ≥ 兑换比例时，进行兑换
     4. 计算本轮能兑换的新酒数量
     5. 更新总酒数，计算新的空瓶数量
     6. 重复步骤3-5直到无法继续兑换

   **解法二：数学公式法**
   - 核心思想：通过数学推导找到直接计算公式
   - 关键观察：每次兑换的净消耗是 (numExchange - 1) 个空瓶
   - 数学推导：
     * 假设总共能喝 x 瓶酒，那么会产生 x 个空瓶
     * 这 x 个空瓶中，有 (x - numBottles) 瓶是通过兑换得到的
     * 兑换这些酒需要消耗 (x - numBottles) × numExchange 个空瓶
     * 但兑换后又产生了 (x - numBottles) 个空瓶
     * 净消耗：(x - numBottles) × (numExchange - 1) 个空瓶
     * 这个净消耗不能超过初始的空瓶数：numBottles
     * 因此：(x - numBottles) × (numExchange - 1) ≤ numBottles
     * 解得：x ≤ numBottles + numBottles / (numExchange - 1)

4. 实现要点：
   - **模拟法的关键**：正确维护空瓶数量的状态
     * 每轮兑换后的空瓶 = 剩余空瓶 + 新酒产生的空瓶
   - **数学法的关键**：理解净消耗概念
     * 每次兑换用掉 numExchange 个空瓶，得到 1 个新空瓶
     * 净消耗 = numExchange - 1 个空瓶
   - **边界条件**：当空瓶数小于兑换比例时停止

5. 示例分析：

   **示例1：numBottles = 9, numExchange = 3**
   ```
   模拟过程：
   初始：喝掉9瓶酒，产生9个空瓶，总计喝了9瓶
   第1轮：9÷3=3瓶新酒，剩余0个空瓶，新酒产生3个空瓶，总计喝了12瓶
   第2轮：3÷3=1瓶新酒，剩余0个空瓶，新酒产生1个空瓶，总计喝了13瓶
   第3轮：1<3，无法兑换，结束
   结果：13瓶
   
   数学公式：
   额外酒数 = Math.floor((9-1)/(3-1)) = Math.floor(8/2) = 4瓶
   总计：9 + 4 = 13瓶
   ```

   **示例2：numBottles = 15, numExchange = 4**
   ```
   数学公式验证：
   额外酒数 = Math.floor((15-1)/(4-1)) = Math.floor(14/3) = 4瓶
   总计：15 + 4 = 19瓶
   ```

6. 常见陷阱：
   - **模拟法**：忘记将新酒产生的空瓶加入下轮计算
   - **数学法**：边界条件处理错误，特别是刚好整除的情况
   - **理解错误**：误以为空瓶可以重复使用多次

7. 算法优势：
   - **模拟法**：思路清晰，易于理解和调试
   - **数学法**：效率更高，适合大数据量的情况

8. 扩展思考：
   - 如果兑换比例动态变化怎么办？
   - 如果有多种不同的兑换规则怎么处理？
   - 能否用递归的方式解决此问题？

9. 类似问题：
   - 股票买卖问题（状态转换）
   - 硬币兑换问题（动态规划）
   - 各种模拟类题目

10. 复杂度对比：
    - 模拟法适合理解问题本质，代码直观
    - 数学法适合追求极致性能，但需要较强的数学推导能力
*/
