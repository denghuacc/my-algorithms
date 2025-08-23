/*
 * @lc app=leetcode.cn id=242 lang=typescript
 *
 * [242] 有效的字母异位词
 *
 * https://leetcode-cn.com/problems/valid-anagram/description/
 *
 * algorithms
 * Easy (61.96%)
 * Likes:    285
 * Dislikes: 0
 * Total Accepted:    162.2K
 * Total Submissions: 259.8K
 * Testcase Example:  '"anagram"\n"nagaram"'
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 *
 * 示例 1:
 *
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: s = "rat", t = "car"
 * 输出: false
 *
 * 说明:
 * 你可以假设字符串只包含小写字母。
 *
 * 进阶:
 * 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 *
 */

// 字母异位词：两个字符串包含相同的字符，但排列顺序不同

// @lc code=start
/**
 * 解法一：排序比较
 * 核心思路：字母异位词排序后必定相同
 *
 * 算法步骤：
 * 1. 首先判断长度是否相等
 * 2. 将两个字符串分别转为字符数组并排序
 * 3. 比较排序后的字符串是否相等
 *
 * 时间复杂度：O(n log n)，主要来自排序操作
 * 空间复杂度：O(n)，需要额外数组存储字符
 */
var isAnagram = function (s: string, t: string): boolean {
  // 长度不同直接返回false
  if (s.length !== t.length) return false;

  // 排序后比较
  return [...s].sort().join("") === [...t].sort().join("");
};

/**
 * 解法二：哈希表计数（推荐）
 * 核心思路：统计字符频次，异位词的字符频次必定相同
 *
 * 算法步骤：
 * 1. 首先判断长度是否相等
 * 2. 用哈希表统计第一个字符串中每个字符的出现次数
 * 3. 遍历第二个字符串，对应字符计数减1
 * 4. 如果某个字符计数不足，说明不是异位词
 *
 * 时间复杂度：O(n)，只需遍历字符串一次
 * 空间复杂度：O(k)，k为字符集大小，最多26个小写字母
 */
var isAnagram = function (s: string, t: string): boolean {
  // 长度不同不可能是异位词
  if (s.length !== t.length) return false;

  // 使用哈希表统计字符频次
  const charCount: Map<string, number> = new Map();

  // 统计字符串s中每个字符的出现次数
  for (const char of s) {
    charCount.set(char, (charCount.get(char) ?? 0) + 1);
  }

  // 遍历字符串t，减少对应字符的计数
  for (const char of t) {
    const count = charCount.get(char);

    // 如果字符不存在或计数已为0，说明不是异位词
    if (!count || count < 1) {
      return false;
    }

    // 减少字符计数
    charCount.set(char, count - 1);
  }

  return true;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断两个字符串是否为字母异位词
   - 异位词特征：包含相同字符，字符频次相同，但排列不同

2. 算法分析：
   - 解法一时间复杂度：O(n log n)，主要来自排序
   - 解法二时间复杂度：O(n)，只需线性遍历
   - 空间复杂度：O(k)，k为字符集大小
   - 算法类型：哈希表 + 字符串处理

3. 实现要点：
   - 长度判断：异位词长度必须相等，这是必要条件
   - 解法一：利用排序的确定性，相同字符排序后结果相同
   - 解法二：统计字符频次，通过增减计数验证字符分布
   - 哈希表优势：提供O(1)的查找和更新操作

4. 优化思路：
   - 提前终止：长度不等时直接返回false
   - 字符数组优化：对于只包含小写字母的情况，可用数组代替Map
   - 单次遍历：可以同时遍历两个字符串，一个加计数一个减计数
   - 空间优化：如果允许修改输入，可以原地排序

5. 边界情况：
   - 空字符串：两个空字符串是异位词
   - 单字符：相同单字符是异位词
   - 长度不等：直接返回false
   - 完全不同的字符：快速识别并返回false

6. 扩展应用：
   - Unicode字符：哈希表方法天然支持Unicode
   - 批量处理：可扩展为分组多个异位词
   - 忽略大小写：预处理时转换为统一大小写
   - 忽略空格：预处理时过滤空格字符

7. 常见错误：
   - 忘记判断长度相等
   - 哈希表计数逻辑错误
   - 边界条件处理不当
   - 字符编码问题（Unicode支持）
*/
