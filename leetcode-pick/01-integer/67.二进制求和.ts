/*
 * @lc app=leetcode.cn id=67 lang=typescript
 *
 * [67] 二进制求和
 *
 * https://leetcode-cn.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (46.00%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    74K
 * Total Submissions: 141.4K
 * Testcase Example:  '"11"\n"1"'
 *
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 *
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入: a = "11", b = "1"
 * 输出: "100"
 *
 * 示例 2:
 *
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *
 *
 *
 * 提示：
 *
 *
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 *
 *
 */

// @lc code=start
/**
 * 解法一：API方法 - 使用BigInt
 *
 * 核心思想：
 * 利用JavaScript的BigInt类型直接进行二进制运算
 * 将二进制字符串转换为BigInt，相加后再转换回二进制字符串
 *
 * 算法步骤：
 * 1. 将两个二进制字符串转换为BigInt
 * 2. 进行加法运算
 * 3. 将结果转换为二进制字符串
 *
 * 时间复杂度：O(max(len(a), len(b)))
 * 空间复杂度：O(max(len(a), len(b)))
 *
 * 优点：代码简洁，利用语言特性
 * 缺点：依赖BigInt，可能不是所有环境都支持
 */
var addBinary = function (a: string, b: string): string {
  return (BigInt("0b" + a) + BigInt("0b" + b)).toString(2);
};

/**
 * 解法二：模拟加法 - 逐位相加
 *
 * 核心思想：
 * 模拟人工计算二进制加法的过程
 * 从右到左逐位相加，处理进位
 *
 * 算法步骤：
 * 1. 从两个字符串的末尾开始，逐位相加
 * 2. 计算当前位的和：sum = a[i] + b[j] + carry
 * 3. 当前位结果：sum % 2，进位：Math.floor(sum / 2)
 * 4. 最后处理剩余的进位
 * 5. 反转结果字符串
 *
 * 时间复杂度：O(max(len(a), len(b)))
 * 空间复杂度：O(max(len(a), len(b)))
 *
 * 优点：不依赖特殊API，通用性强
 * 缺点：需要手动处理进位逻辑
 */
var addBinary = function (a: string, b: string): string {
  let res = "";
  let carry = 0;

  // 从右到左逐位相加
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = carry;
    // 加上a的当前位（如果存在）
    sum += i >= 0 ? parseInt(a[i]) : 0;
    // 加上b的当前位（如果存在）
    sum += j >= 0 ? parseInt(b[j]) : 0;
    // 当前位结果
    res += sum % 2;
    // 计算进位
    carry = Math.floor(sum / 2);
  }

  // 处理最后的进位
  res += carry === 1 ? carry : "";

  // 反转字符串得到正确结果
  return res.split("").reverse().join("");
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 模拟二进制加法运算
   - 处理字符串形式的二进制数相加
   - 需要考虑进位和字符串长度不一致的情况

2. 算法分析：
   - 解法一（BigInt）：O(max(len(a), len(b))) 时间，O(max(len(a), len(b))) 空间
   - 解法二（模拟加法）：O(max(len(a), len(b))) 时间，O(max(len(a), len(b))) 空间
   - 两种方法时间复杂度相同，但实现方式不同

3. 实现要点：
   - 从右到左逐位处理，模拟人工计算过程
   - 正确处理进位：当前位 = (a[i] + b[j] + carry) % 2
   - 进位 = Math.floor((a[i] + b[j] + carry) / 2)
   - 最后需要反转结果字符串

4. 优化思路：
   - 使用字符数组代替字符串拼接，提高性能
   - 可以预先计算结果长度，避免动态扩容
   - 对于大数运算，可以考虑分块处理

5. 示例分析：
   - "11" + "1" = "100"
   - 计算过程：
     * 1 + 1 = 2，当前位0，进位1
     * 1 + 0 + 1 = 2，当前位0，进位1
     * 0 + 0 + 1 = 1，当前位1，进位0
     * 结果：100

6. 边界情况：
   - 两个字符串长度不同
   - 有进位但字符串已遍历完
   - 输入字符串为空（题目保证非空）
   - 结果需要前导零处理

7. 类似问题：
   - 可以扩展到其他进制的加法
   - 大数加法问题
   - 字符串形式的数学运算

8. 性能优化版本：
   ```typescript
   function addBinary(a: string, b: string): string {
     const result: string[] = [];
     let carry = 0;
     
     for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0 || carry; i--, j--) {
       const sum = (i >= 0 ? parseInt(a[i]) : 0) + 
                   (j >= 0 ? parseInt(b[j]) : 0) + carry;
       result.unshift((sum % 2).toString());
       carry = Math.floor(sum / 2);
     }
     
     return result.join("");
   }
   ```
*/
