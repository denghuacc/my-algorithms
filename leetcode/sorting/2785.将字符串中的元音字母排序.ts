/*
 * @lc app=leetcode.cn id=2785 lang=typescript
 *
 * [2785] 将字符串中的元音字母排序
 *
 * https://leetcode.cn/problems/sort-vowels-in-a-string/description/
 *
 * algorithms
 * Medium (77.52%)
 * Likes:    13
 * Dislikes: 0
 * Total Accepted:    8.8K
 * Total Submissions: 10.7K
 * Testcase Example:  '"lEetcOde"'
 *
 * 给你一个下标从 0 开始的字符串 s ，将 s 中的元素重新 排列 得到新的字符串 t ，它满足：
 *
 *
 * 所有辅音字母都在原来的位置上。更正式的，如果满足 0 <= i < s.length 的下标 i 处的 s[i] 是个辅音字母，那么 t[i] =
 * s[i] 。
 * 元音字母都必须以他们的 ASCII 值按 非递减 顺序排列。更正式的，对于满足 0 <= i < j < s.length 的下标 i 和 j  ，如果
 * s[i] 和 s[j] 都是元音字母，那么 t[i] 的 ASCII 值不能大于 t[j] 的 ASCII 值。
 *
 *
 * 请你返回结果字母串。
 *
 * 元音字母为 'a' ，'e' ，'i' ，'o' 和 'u' ，它们可能是小写字母也可能是大写字母，辅音字母是除了这 5 个字母以外的所有字母。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "lEetcOde"
 * 输出："lEOtcede"
 * 解释：'E' ，'O' 和 'e' 是 s 中的元音字母，'l' ，'t' ，'c' 和 'd' 是所有的辅音。将元音字母按照 ASCII
 * 值排序，辅音字母留在原地。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "lYmpH"
 * 输出："lYmpH"
 * 解释：s 中没有元音字母（s 中都为辅音字母），所以我们返回 "lYmpH" 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 只包含英语字母表中的 大写 和 小写 字母。
 *
 *
 */

// @lc code=start
function sortVowels(s: string): string {
  // 定义所有元音字母（包括大小写），按ASCII顺序排列便于判断
  const vowels = "AEIOUaeiou";

  // 第一步：提取字符串中的所有元音字母
  const vowelArray: string[] = [];
  for (const char of s) {
    // 使用includes方法判断当前字符是否为元音字母
    if (vowels.includes(char)) {
      vowelArray.push(char);
    }
  }

  // 第二步：对提取的元音字母按ASCII值进行排序
  // sort()方法默认按字典序（ASCII码）排序，正好符合题目要求
  vowelArray.sort();

  // 第三步：重构字符串，辅音字母保持原位，元音字母按排序后的顺序填入
  let result = "";
  let vowelIndex = 0; // 用于追踪当前应该使用的排序后元音字母位置

  for (const char of s) {
    if (vowels.includes(char)) {
      // 如果是元音字母，使用排序后的元音字母替换
      result += vowelArray[vowelIndex];
      vowelIndex++; // 移动到下一个排序后的元音字母
    } else {
      // 如果是辅音字母，保持原字符不变
      result += char;
    }
  }

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 对字符串中的元音字母进行排序，但保持辅音字母的原始位置不变
   - 元音字母需要按ASCII值的非递减顺序重新排列
   - 关键约束：辅音字母位置固定，只有元音字母可以移动

2. 算法分析：
   - 时间复杂度：O(n + m log m)，其中n是字符串长度，m是元音字母个数
     * 第一次遍历提取元音：O(n)
     * 排序元音字母：O(m log m)
     * 第二次遍历重构字符串：O(n)
   - 空间复杂度：O(m + n)，其中m是元音字母个数，n是结果字符串长度
   - 算法类型：排序 + 双指针/索引追踪

3. 实现要点：
   - 关键数据结构：数组存储提取的元音字母，字符串拼接结果
   - 核心算法步骤：提取 → 排序 → 重构
   - 边界情况处理：无元音字母、全是元音字母、大小写混合

4. 优化思路：
   - 字符判断优化：使用Set代替字符串includes可提升查找效率
   - 内存优化：可以使用数组而非字符串拼接来避免频繁创建字符串
   - ASCII排序：JavaScript的sort()默认按字典序排序，正好符合ASCII要求

5. 算法优势：
   - 逻辑简单清晰，容易理解和实现
   - 一次排序解决问题，效率较高
   - 处理大小写混合的元音字母时自然按ASCII顺序排列

6. 核心算法步骤：
   - 步骤1：遍历原字符串，提取所有元音字母到数组中
   - 步骤2：对提取的元音字母数组进行排序（按ASCII值）
   - 步骤3：再次遍历原字符串，遇到辅音保持不变，遇到元音用排序后的元音替换
   - 步骤4：返回重构后的字符串

7. 示例分析：
   示例1：s = "lEetcOde"
   
   第一步：提取元音字母
   - 遍历 "lEetcOde"
   - l(辅音) → E(元音,加入) → e(元音,加入) → t(辅音) → c(辅音) → O(元音,加入) → d(辅音) → e(元音,加入)
   - vowelArray = ['E', 'e', 'O', 'e']
   
   第二步：排序元音字母
   - 按ASCII值排序：'E'(69) < 'O'(79) < 'e'(101) < 'e'(101)
   - vowelArray = ['E', 'O', 'e', 'e']
   
   第三步：重构字符串
   - l(辅音,保持) → E(元音,用'E'替换) → e(元音,用'O'替换) → t(辅音,保持) → c(辅音,保持) → O(元音,用'e'替换) → d(辅音,保持) → e(元音,用'e'替换)
   - 结果："lEOtcede"
   
   ASCII值说明：
   - 大写字母：A(65), E(69), I(73), O(79), U(85)
   - 小写字母：a(97), e(101), i(105), o(111), u(117)
   - 因此大写元音字母总是排在小写元音字母前面

8. 边界情况：
   - 无元音字母：直接返回原字符串（如"bcdfg"）
   - 全是元音字母：相当于对整个字符串排序（如"aeiou"）
   - 单个字符：如果是元音保持不变，如果是辅音也保持不变
   - 大小写混合：按ASCII值自然排序，大写在前，小写在后

9. 常见错误：
   - 忘记区分大小写元音字母
   - 误认为需要按字母顺序而非ASCII顺序排序
   - 在重构过程中索引管理错误
   - 字符串拼接效率问题（在大数据量时）

10. 扩展思考：
    - 性能优化：使用Set代替字符串includes进行元音判断
    - 内存优化：使用数组操作代替字符串拼接
    - 国际化：如何处理其他语言的元音字母
    - 变种问题：如果要求辅音字母也按某种规则排序该如何处理

11. 优化版本示例：
    ```typescript
    function sortVowelsOptimized(s: string): string {
      const vowelSet = new Set(['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u']);
      const vowelArray: string[] = [];
      
      // 提取元音字母
      for (const char of s) {
        if (vowelSet.has(char)) {
          vowelArray.push(char);
        }
      }
      
      // 排序
      vowelArray.sort();
      
      // 重构（使用数组避免字符串拼接开销）
      const result: string[] = [];
      let vowelIndex = 0;
      
      for (const char of s) {
        if (vowelSet.has(char)) {
          result.push(vowelArray[vowelIndex++]);
        } else {
          result.push(char);
        }
      }
      
      return result.join('');
    }
    ```

12. 类似问题：
    - 字符串中字符的重新排列问题
    - 保持某些位置不变的排序问题
    - 按特定规则对字符串进行变换的问题
*/
