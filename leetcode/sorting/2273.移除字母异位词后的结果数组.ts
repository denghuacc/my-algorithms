/*
 * @lc app=leetcode.cn id=2273 lang=typescript
 *
 * [2273] 移除字母异位词后的结果数组
 *
 * https://leetcode.cn/problems/find-resultant-array-after-removing-anagrams/description/
 *
 * algorithms
 * Easy (61.02%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    27.5K
 * Total Submissions: 41K
 * Testcase Example:  '["abba","baba","bbaa","cd","cd"]'
 *
 * 给你一个下标从 0 开始的字符串 words ，其中 words[i] 由小写英文字符组成。
 *
 * 在一步操作中，需要选出任一下标 i ，从 words 中 删除 words[i] 。其中下标 i 需要同时满足下述两个条件：
 *
 *
 * 0 < i < words.length
 * words[i - 1] 和 words[i] 是 字母异位词 。
 *
 *
 * 只要可以选出满足条件的下标，就一直执行这个操作。
 *
 * 在执行所有操作后，返回 words 。可以证明，按任意顺序为每步操作选择下标都会得到相同的结果。
 *
 * 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。例如，"dacb" 是 "abdc"
 * 的一个字母异位词。
 *
 *
 *
 * 示例 1：
 *
 * 输入：words = ["abba","baba","bbaa","cd","cd"]
 * 输出：["abba","cd"]
 * 解释：
 * 获取结果数组的方法之一是执行下述步骤：
 * - 由于 words[2] = "bbaa" 和 words[1] = "baba" 是字母异位词，选择下标 2 并删除 words[2] 。
 * ⁠ 现在 words = ["abba","baba","cd","cd"] 。
 * - 由于 words[1] = "baba" 和 words[0] = "abba" 是字母异位词，选择下标 1 并删除 words[1] 。
 * ⁠ 现在 words = ["abba","cd","cd"] 。
 * - 由于 words[2] = "cd" 和 words[1] = "cd" 是字母异位词，选择下标 2 并删除 words[2] 。
 * ⁠ 现在 words = ["abba","cd"] 。
 * 无法再执行任何操作，所以 ["abba","cd"] 是最终答案。
 *
 * 示例 2：
 *
 * 输入：words = ["a","b","c","d","e"]
 * 输出：["a","b","c","d","e"]
 * 解释：
 * words 中不存在互为字母异位词的两个相邻字符串，所以无需执行任何操作。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= words.length <= 100
 * 1 <= words[i].length <= 10
 * words[i] 由小写英文字母组成
 *
 *
 */

// @lc code=start
function removeAnagrams(words: string[]): string[] {
  // 存储结果数组
  const res: string[] = [];

  // prev 存储上一个字符串的标准化形式（排序后的字符串）
  // 用于判断当前字符串是否与上一个字符串是字母异位词
  let prev = "";

  // 遍历所有字符串
  for (const w of words) {
    // 将当前字符串转为标准化形式：字符排序后的字符串
    // 字母异位词的特点：排序后的字符串相同
    // 例如："abba".sort() = "aabb", "baba".sort() = "aabb"
    const tmp = w.split("").sort().join("");

    // 如果当前字符串的标准化形式与上一个不同
    // 说明不是字母异位词，需要保留
    if (tmp !== prev) {
      res.push(w); // 保留原始字符串
      prev = tmp; // 更新标准化形式，用于下次比较
    }
    // 如果 tmp === prev，说明是字母异位词，直接跳过（删除）
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 移除数组中与前一个元素是字母异位词的所有元素
   - 字母异位词：字母组成相同但顺序不同的字符串（如 "abba" 和 "baba"）
   - 只需要与前一个元素比较，不需要考虑更早的元素
   - 目标：返回移除后的结果数组

2. 算法分析：
   - 时间复杂度：O(n × m log m)，其中 n 是数组长度，m 是字符串平均长度
     - 遍历数组：O(n)
     - 每个字符串排序：O(m log m)
   - 空间复杂度：O(n × m)
     - 结果数组最多包含所有字符串：O(n × m)
     - 排序过程的临时数组：O(m)
   - 算法类型：排序 + 贪心

3. 解题思路：

   核心思想：
   - 字母异位词的特征：排序后的字符串完全相同
   - 例如："abba" → "aabb"，"baba" → "aabb"
   - 通过比较相邻字符串的排序结果来判断是否为字母异位词

   关键观察：
   - 只需要比较当前字符串与前一个字符串
   - 不需要回溯检查已删除的元素
   - 第一个字符串总是保留（没有前一个元素）

   算法步骤：
   1. 初始化结果数组和前一个字符串的标准化形式
   2. 遍历输入数组中的每个字符串：
      a. 将当前字符串转换为标准化形式（排序后的字符串）
      b. 如果标准化形式与前一个不同：
         - 保留当前字符串（加入结果数组）
         - 更新前一个字符串的标准化形式
      c. 如果标准化形式相同：
         - 跳过当前字符串（相当于删除）
   3. 返回结果数组

4. 实现要点：

   数据结构选择：
   - 使用数组存储结果
   - 使用字符串变量 prev 记录前一个元素的标准化形式

   关键技巧：
   - 字符串标准化：split("").sort().join("")
     - split("")：将字符串转为字符数组
     - sort()：字典序排序字符
     - join("")：将数组转回字符串
   - 一次遍历：只需要遍历一次数组，逐个判断

   边界条件处理：
   - 空数组：返回空数组
   - 单个字符串：直接返回（没有前一个元素比较）
   - prev 初始化为空字符串：确保第一个字符串总是被保留

5. 示例分析：

   示例 1：words = ["abba","baba","bbaa","cd","cd"]
   
   初始状态：
   - res = []
   - prev = ""
   
   遍历过程：
   
   第 1 步：w = "abba"
   - tmp = "abba".split("").sort().join("") = "aabb"
   - tmp !== prev ("aabb" !== "")
   - res.push("abba")，res = ["abba"]
   - prev = "aabb"
   
   第 2 步：w = "baba"
   - tmp = "baba".split("").sort().join("") = "aabb"
   - tmp === prev ("aabb" === "aabb") ❌ 是字母异位词
   - 跳过，不添加到结果
   - prev 保持 "aabb"
   
   第 3 步：w = "bbaa"
   - tmp = "bbaa".split("").sort().join("") = "aabb"
   - tmp === prev ("aabb" === "aabb") ❌ 是字母异位词
   - 跳过，不添加到结果
   - prev 保持 "aabb"
   
   第 4 步：w = "cd"
   - tmp = "cd".split("").sort().join("") = "cd"
   - tmp !== prev ("cd" !== "aabb") ✅ 不是字母异位词
   - res.push("cd")，res = ["abba", "cd"]
   - prev = "cd"
   
   第 5 步：w = "cd"
   - tmp = "cd".split("").sort().join("") = "cd"
   - tmp === prev ("cd" === "cd") ❌ 是字母异位词
   - 跳过，不添加到结果
   
   最终结果：["abba", "cd"]
   
   图解过程：
   ```
   输入：["abba", "baba", "bbaa", "cd", "cd"]
          ↓       ↓       ↓      ↓     ↓
   标准： "aabb"  "aabb"  "aabb" "cd"  "cd"
          ✅      ❌      ❌     ✅    ❌
          保留    删除    删除   保留   删除
   
   输出：["abba", "cd"]
   ```

   示例 2：words = ["a","b","c","d","e"]
   - 每个字符串排序后都是自己（单字符）
   - 没有相邻的相同标准化形式
   - 所有字符串都被保留
   - 输出：["a","b","c","d","e"]

6. 算法要点总结：

   核心技巧：
   - 字母异位词判断：排序后比较字符串
   - 贪心策略：只比较相邻元素，保留第一个出现的
   - 一次遍历：顺序处理，无需回溯

   优化要点：
   - 时间优化：使用排序判断字母异位词（简单高效）
   - 空间优化：只存储一个 prev 变量
   - 代码简洁：利用 JavaScript 的数组方法链式调用

   类似问题：
   - LeetCode 242: 有效的字母异位词
   - LeetCode 49: 字母异位词分组
   - LeetCode 438: 找到字符串中所有字母异位词

7. 常见错误：

   易错点 1：比较范围错误
   - 错误：比较当前字符串与所有之前的字符串
   - 正确：只需要比较与前一个字符串（题目要求 i-1）

   易错点 2：忘记更新 prev
   - 错误：只在添加到结果时更新 prev，跳过时不更新
   - 正确：只在不是字母异位词时更新 prev（代码中的实现）

   易错点 3：直接比较原始字符串
   - 错误：if (w !== words[i-1])
   - 正确：比较排序后的字符串（标准化形式）

   易错点 4：保存排序后的字符串
   - 错误：res.push(tmp) - 保存排序后的
   - 正确：res.push(w) - 保存原始字符串

8. 扩展思考：

   其他解法：
   
   方法 1：使用字符计数（更高效）
   ```typescript
   function isAnagram(s1: string, s2: string): boolean {
     if (s1.length !== s2.length) return false;
     const count = new Array(26).fill(0);
     for (let i = 0; i < s1.length; i++) {
       count[s1.charCodeAt(i) - 97]++;
       count[s2.charCodeAt(i) - 97]--;
     }
     return count.every(c => c === 0);
   }
   // 时间复杂度：O(n × m)，比排序更快
   ```
   
   方法 2：使用哈希表
   ```typescript
   function getSignature(s: string): string {
     const count = new Array(26).fill(0);
     for (const c of s) {
       count[c.charCodeAt(0) - 97]++;
     }
     return count.join(',');
   }
   // 生成唯一签名，避免每次排序
   ```

   变种问题：
   - 如果要删除所有字母异位词，只保留第一次出现的？
   - 如果要保留最长的字母异位词组？
   - 如果字符串包含大小写或特殊字符？

   实际应用：
   - 文本去重（忽略字符顺序）
   - 数据清洗（合并同义词）
   - 日志分析（归类相似日志）
*/
