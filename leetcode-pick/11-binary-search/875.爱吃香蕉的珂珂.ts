/*
 * @lc app=leetcode.cn id=875 lang=typescript
 *
 * [875] 爱吃香蕉的珂珂
 *
 * https://leetcode-cn.com/problems/koko-eating-bananas/description/
 *
 * algorithms
 * Medium (32.95%)
 * Likes:    78
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 34.8K
 * Testcase Example:  '[3,6,7,11]\right\n8\right'
 *
 * 珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。
 *
 * 珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K
 * 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。
 *
 * 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。
 *
 * 返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入: piles = [3,6,7,11], H = 8
 * 输出: 4
 *
 *
 * 示例 2：
 *
 * 输入: piles = [30,11,23,4,20], H = 5
 * 输出: 30
 *
 *
 * 示例 3：
 *
 * 输入: piles = [30,11,23,4,20], H = 6
 * 输出: 23
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= piles.length <= 10^4
 * piles.length <= H <= 10^9
 * 1 <= piles[i] <= 10^9
 *
 *
 */

// @lc code=start
/**
 * 爱吃香蕉的珂珂
 *
 * 核心思想：
 * 1. 这是一个典型的"二分答案"问题
 * 2. 在可能的速度范围内二分查找最小满足条件的速度
 * 3. 判断条件：在给定速度下能否在h小时内吃完所有香蕉
 */

/**
 * 计算在给定速度下吃完所有香蕉需要的时间
 * @param piles 香蕉堆数组
 * @param speed 吃香蕉的速度（根/小时）
 * @returns 需要的总时间（小时）
 */
function calculateEatingTime(piles: number[], speed: number): number {
  let totalTime = 0;

  for (const pile of piles) {
    // 每堆香蕉需要的时间：向上取整(pile / speed)
    // 使用公式 Math.ceil(pile / speed) = Math.floor((pile + speed - 1) / speed)
    // 避免浮点数运算，提高精度和性能
    const timeForThisPile = Math.floor((pile + speed - 1) / speed);
    totalTime += timeForThisPile;
  }

  return totalTime;
}

/**
 * 检查给定速度是否能在h小时内吃完所有香蕉
 * @param piles 香蕉堆数组
 * @param speed 吃香蕉的速度
 * @param h 限制时间
 * @returns 是否能在时间内完成
 */
function canFinishInTime(piles: number[], speed: number, h: number): boolean {
  return calculateEatingTime(piles, speed) <= h;
}

/**
 * 主函数：找到最小的吃香蕉速度
 *
 * 解题步骤：
 * 1. 确定搜索范围：[1, max(piles)]
 * 2. 二分查找最小满足条件的速度
 * 3. 对每个候选速度，计算总用时并判断是否满足条件
 */
function minEatingSpeed(piles: number[], h: number): number {
  // 确定搜索范围
  let left = 1; // 最小可能速度：每小时至少吃1根
  let right = Math.max(...piles); // 最大可能速度：每小时吃最大堆的香蕉数

  // 二分查找最小满足条件的速度
  while (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (canFinishInTime(piles, mid, h)) {
      // 当前速度可以在时间内完成，尝试更小的速度
      right = mid;
    } else {
      // 当前速度太慢，需要更快的速度
      left = mid + 1;
    }
  }

  // 循环结束时，left === right，就是答案
  return left;
}

/**
 * 优化版本：内联计算时间，减少函数调用开销
 */
function minEatingSpeedOptimized(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const speed = Math.floor(left + (right - left) / 2);

    // 直接在这里计算总时间
    let totalTime = 0;
    for (const pile of piles) {
      totalTime += Math.ceil(pile / speed);
    }

    if (totalTime <= h) {
      right = speed;
    } else {
      left = speed + 1;
    }
  }

  return left;
}

/**
 * 数学优化版本：使用整数运算避免浮点数
 */
function minEatingSpeedMathOptimized(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const speed = Math.floor(left + (right - left) / 2);

    let totalTime = 0;
    for (const pile of piles) {
      // 使用 (pile + speed - 1) / speed 来计算向上取整
      // 这避免了浮点数运算，提高了精度和性能
      totalTime += Math.floor((pile + speed - 1) / speed);
    }

    if (totalTime <= h) {
      right = speed;
    } else {
      left = speed + 1;
    }
  }

  return left;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个典型的"二分答案"问题（Binary Search on Answer）
   - 在一个连续的解空间中寻找满足条件的最小值
   - 需要判断给定的速度是否能在限定时间内完成任务

2. 算法分析：
   - 时间复杂度：O(n × log(max(piles))) 
     - n是香蕉堆数，log(max(piles))是二分查找的轮数
     - 每轮需要遍历所有香蕉堆计算总时间
   - 空间复杂度：O(1) - 只使用常数额外空间
   - 算法类型：二分查找、贪心思想

3. "二分答案"模式详解：
   
   什么是二分答案？
   - 当问题求解的是一个范围内的最值，且该范围具有单调性时
   - 可以对答案进行二分查找，而不是对数据进行二分
   - 核心是找到一个判定函数：check(x) 判断答案x是否可行
   
   本题的单调性：
   - 速度越快，用时越少
   - 如果速度k可以在h小时内完成，那么速度>k也一定可以
   - 如果速度k不能在h小时内完成，那么速度<k也一定不行
   
   搜索空间：
   - 最小速度：1（每小时至少吃1根）
   - 最大速度：max(piles)（最快每小时吃完最大的一堆）

4. 核心算法步骤：
   
   步骤1：确定二分范围
   - left = 1：理论最小速度
   - right = Math.max(...piles)：理论最大有意义速度
   
   步骤2：二分查找
   - 计算中点速度mid
   - 判断该速度能否在h小时内完成
   - 根据判断结果调整搜索范围
   
   步骤3：时间计算
   - 对每堆香蕉：时间 = ⌈pile / speed⌉
   - 总时间 = 所有堆的时间之和
   - 判断总时间是否 ≤ h

5. 关键技术细节：
   
   向上取整的高效计算：
   - 方法1：Math.ceil(pile / speed)
   - 方法2：Math.floor((pile + speed - 1) / speed)
   - 方法2避免了浮点数运算，更精确和高效
   
   数学原理：
   - ⌈a/b⌉ = ⌊(a+b-1)/b⌋ （对于正整数a,b）
   - 这是向上取整的标准整数计算技巧

6. 示例分析：
   piles = [3,6,7,11], h = 8
   
   二分过程：
   - 初始：left=1, right=11
   - 第1轮：mid=6, 时间=⌈3/6⌉+⌈6/6⌉+⌈7/6⌉+⌈11/6⌉=1+1+2+2=6≤8 ✓，right=6
   - 第2轮：left=1, right=6, mid=3, 时间=⌈3/3⌉+⌈6/3⌉+⌈7/3⌉+⌈11/3⌉=1+2+3+4=10>8 ✗，left=4
   - 第3轮：left=4, right=6, mid=5, 时间=⌈3/5⌉+⌈6/5⌉+⌈7/5⌉+⌈11/5⌉=1+2+2+3=8≤8 ✓，right=5
   - 第4轮：left=4, right=5, mid=4, 时间=⌈3/4⌉+⌈6/4⌉+⌈7/4⌉+⌈11/4⌉=1+2+2+3=8≤8 ✓，right=4
   - 第5轮：left=4, right=4，结束，返回4

7. 边界情况分析：
   - h = piles.length：最紧张情况，需要最大速度
   - h = sum(piles)：最宽松情况，速度1就够
   - 单个香蕉堆：直接返回⌈pile/h⌉
   - 所有堆大小相同：可以优化计算

8. 常见错误和陷阱：
   
   错误1：搜索范围设置不当
   - 错误：right设为sum(piles)过大
   - 正确：right设为max(piles)即可
   
   错误2：向上取整计算错误
   - 错误：使用Math.round可能向下取整
   - 正确：必须使用Math.ceil或整数技巧
   
   错误3：循环条件错误
   - 错误：使用left <= right可能无限循环
   - 正确：使用left < right寻找下界

9. 算法优化要点：
   - 搜索范围优化：可以通过估算进一步缩小范围
   - 计算优化：使用整数运算替代浮点数运算
   - 早停优化：如果时间已经超过h，可以立即返回false
   - 数学优化：利用均值预估初始搜索位置

10. 扩展应用：
    - 运输问题：最小载重量、最少车辆数
    - 生产调度：最小生产速度、资源分配
    - 网络流量：最小带宽、负载均衡
    - 搜索优化：参数调优、超参数搜索

11. 类似问题模式：
    - 分割数组的最大值
    - 制作m束花所需的最少天数
    - 在D天内送达包裹的能力
    - 咒语和药水的成功对数

12. 问题变形：
    - 如果要求最大速度怎么办？
    - 如果香蕉堆会动态变化怎么办？
    - 如果有多个珂珂同时吃怎么办？
    
    这些变形都可以用类似的二分答案思路解决，关键是重新定义判定函数。

这个问题完美展示了"二分答案"这一重要算法设计模式，
是从具体问题中抽象出通用解法的典型例子。
*/
