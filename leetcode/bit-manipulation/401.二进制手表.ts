/*
 * @lc app=leetcode.cn id=401 lang=typescript
 *
 * [401] 二进制手表
 *
 * https://leetcode-cn.com/problems/binary-watch/description/
 *
 * algorithms
 * Easy (56.28%)
 * Likes:    274
 * Dislikes: 0
 * Total Accepted:    33.1K
 * Total Submissions: 58.7K
 * Testcase Example:  '1'
 *
 * 二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。每个 LED 代表一个 0 或
 * 1，最低位在右侧。
 *
 *
 * 例如，下面的二进制手表读取 "3:25" 。
 *
 *
 *
 *
 * （图源：WikiMedia - Binary clock samui moon.jpg ，许可协议：Attribution-ShareAlike 3.0
 * Unported (CC BY-SA 3.0) ）
 *
 * 给你一个整数 turnedOn ，表示当前亮着的 LED 的数量，返回二进制手表可以表示的所有可能时间。你可以 按任意顺序 返回答案。
 *
 * 小时不会以零开头：
 *
 *
 * 例如，"01:00" 是无效的时间，正确的写法应该是 "1:00" 。
 *
 *
 * 分钟必须由两位数组成，可能会以零开头：
 *
 *
 * 例如，"10:2" 是无效的时间，正确的写法应该是 "10:02" 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：turnedOn = 1
 * 输出：["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：turnedOn = 9
 * 输出：[]
 *
 *
 *
 *
 * 解释：
 *
 *
 * 0
 *
 *
 */

// @lc code=start
// iterator
/**
 * 解法一：双重枚举小时和分钟，统计二进制 1 的个数。
 *
 * @param turnedOn - 亮灯数量
 * @returns 所有可表示的时间
 */
var readBinaryWatch = function (turnedOn: number): string[] {
  const result: string[] = [];

  /**
   * 统计整数二进制中 1 的数量（Brian Kernighan 算法）。
   */
  function popcount(x: number): number {
    let count = 0;
    while (x > 0) {
      x &= x - 1;
      count++;
    }
    return count;
  }

  for (let h = 0; h < 12; h++) {
    for (let m = 0; m < 60; m++) {
      // 小时和分钟亮灯数之和必须等于 turnedOn
      if (popcount(h) + popcount(m) === turnedOn) {
        // 分钟必须补齐两位
        result.push(`${h}:${m.toString().padStart(2, "0")}`);
      }
    }
  }

  return result;
};

// bit + iterator
/**
 * 解法二：把 10 位灯状态合并到一个整数中一次枚举。
 *
 * @param turnedOn - 亮灯数量
 * @returns 所有可表示的时间
 */
var readBinaryWatch = function (turnedOn: number): string[] {
  const result: string[] = [];

  /**
   * 统计整数二进制中 1 的数量（Brian Kernighan 算法）。
   */
  function popcount(x: number): number {
    let count = 0;
    while (x > 0) {
      x &= x - 1;
      count++;
    }
    return count;
  }

  for (let i = 0; i < 1024; i++) {
    // 高 4 位表示小时，低 6 位表示分钟
    const h = i >> 6;
    const m = i & 63;
    // 过滤非法时间并匹配亮灯数量
    if (h < 12 && m < 60 && popcount(i) === turnedOn) {
      result.push(`${h}:${m.toString().padStart(2, "0")}`);
    }
  }

  return result;
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：在合法时间范围内找出所有“亮灯总数 = turnedOn”的时间。
   - 关键特点：小时范围 [0,11]，分钟范围 [0,59]，分钟必须两位格式。
   - 目标：返回所有满足条件的时间字符串。

2. 解题思路
   核心思想
   - 解法一：直接枚举所有小时与分钟组合（12 * 60）。
   - 解法二：枚举 10 位灯状态（0~1023），拆分成小时和分钟后筛选。

   算法步骤（解法一）
   1) 枚举 h 从 0 到 11，m 从 0 到 59。
   2) 统计 popcount(h) + popcount(m)。
   3) 若等于 turnedOn，加入答案。

   算法步骤（解法二）
   1) 枚举 i 从 0 到 1023（10 个 LED 的所有状态）。
   2) 拆分 h = i >> 6，m = i & 63。
   3) 若 h < 12、m < 60 且 popcount(i) = turnedOn，则加入答案。

3. 代码实现
   实现步骤
   - 两种方法均使用位运算版 popcount，避免字符串转换开销。
   - 输出时用 `padStart(2, "0")` 保证分钟两位格式。

   关键函数说明
   - readBinaryWatch（解法一）：按“合法时间”枚举并计数。
   - readBinaryWatch（解法二）：按“灯状态”枚举并映射到时间。
   - popcount：统计二进制 1 的数量。

4. 复杂度分析
   - 解法一时间复杂度：O(12 * 60 * b)，b 为位数常数；空间 O(1)（不含输出）。
   - 解法二时间复杂度：O(1024 * b)，空间 O(1)（不含输出）。
   - 关键观察：状态总量很小，两种方法都可高效通过。

5. 示例分析
   示例一：turnedOn = 1
   - 只能有一个灯亮，可构成如 "1:00"、"0:01" 等 10 个结果。

   示例二：turnedOn = 9
   - 小时最多 4 位、分钟最多 6 位，总亮灯为 9 时无法组成合法时间，结果为空。

   边界情况
   - turnedOn = 0：只有 "0:00"。
   - turnedOn > 8：通常结果很少或为空（受合法时间范围限制）。

6. 算法要点总结
   核心技巧
   - 使用 popcount 判断亮灯数。
   - 输出格式中分钟必须补零到两位。

   优化要点
   - 位运算统计 1 的数量比字符串转换更轻量。
   - 两种枚举方式都保留，便于对比“时间空间与可读性”。

   类似问题
   - 位掩码枚举状态问题。
   - 固定范围组合枚举问题。

7. 常见错误
   - 分钟未补零，输出格式错误（如 "1:5"）。
   - 忘记过滤非法时间（h >= 12 或 m >= 60）。
   - 用字符串法统计位数导致可读性或性能变差。
*/
