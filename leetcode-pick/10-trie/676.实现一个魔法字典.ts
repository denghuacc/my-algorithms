/*
 * @lc app=leetcode.cn id=676 lang=typescript
 *
 * [676] 实现一个魔法字典
 *
 * https://leetcode.cn/problems/implement-magic-dictionary/description/
 *
 * algorithms
 * Medium (63.59%)
 * Likes:    145
 * Dislikes: 0
 * Total Accepted:    16.7K
 * Total Submissions: 26.4K
 * Testcase Example:  '["MagicDictionary", "buildDict", "search", "search", "search", "search"]\n' +
  '[[], [["hello","leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]'
 *
 * 设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。
 * 如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。
 * 
 * 实现 MagicDictionary 类：
 * 
 * 
 * MagicDictionary() 初始化对象
 * void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary
 * 中的字符串互不相同
 * bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个
 * 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入
 * ["MagicDictionary", "buildDict", "search", "search", "search", "search"]
 * [[], [["hello", "leetcode"]], ["hello"], ["hhllo"], ["hell"], ["leetcoded"]]
 * 输出
 * [null, null, false, true, false, false]
 * 
 * 解释
 * MagicDictionary magicDictionary = new MagicDictionary();
 * magicDictionary.buildDict(["hello", "leetcode"]);
 * magicDictionary.search("hello"); // 返回 False
 * magicDictionary.search("hhllo"); // 将第二个 'h' 替换为 'e' 可以匹配 "hello" ，所以返回 True
 * magicDictionary.search("hell"); // 返回 False
 * magicDictionary.search("leetcoded"); // 返回 False
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 1 
 * dictionary[i] 仅由小写英文字母组成
 * dictionary 中的所有字符串 互不相同
 * 1 
 * searchWord 仅由小写英文字母组成
 * buildDict 仅在 search 之前调用一次
 * 最多调用 100 次 search
 * 
 * 
 * 
 * 
 * 
 */

export {};

// @lc code=start
class MagicDictionary {
  // 存储字典中的所有单词
  words: string[];

  constructor() {
    this.words = [];
  }

  /**
   * 构建字典
   * @param dictionary 字符串数组，包含所有字典单词
   */
  buildDict(dictionary: string[]): void {
    this.words = dictionary;
  }

  /**
   * 搜索单词，判断是否可以通过修改一个字符匹配字典中的单词
   * @param searchWord 要搜索的单词
   * @returns 如果可以修改一个字符匹配字典中的单词返回true，否则返回false
   */
  search(searchWord: string): boolean {
    // 遍历字典中的每个单词
    for (const word of this.words) {
      // 首先检查长度是否相同，不同长度无法通过修改一个字符匹配
      if (word.length !== searchWord.length) {
        continue;
      }

      // 统计不同字符的数量
      let diff = 0;
      for (let i = 0; i < searchWord.length; i++) {
        if (word[i] !== searchWord[i]) {
          diff++;
          // 如果不同字符超过1个，提前退出
          if (diff > 1) {
            break;
          }
        }
      }

      // 如果恰好只有一个字符不同，返回true
      if (diff === 1) {
        return true;
      }
    }

    // 没有找到符合条件的单词
    return false;
  }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * var obj = new MagicDictionary()
 * obj.buildDict(dictionary)
 * var param_2 = obj.search(searchWord)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个数据结构，支持构建字典和模糊搜索
   - 模糊搜索：判断是否可以通过修改一个字符匹配字典中的单词
   - 核心是字符串匹配问题，需要处理字符差异计数

2. 算法分析：
   - 时间复杂度：O(n * m * k)
     * n: 字典中单词数量
     * m: 搜索单词长度
     * k: 字典中单词的平均长度
   - 空间复杂度：O(n * k)
     * 存储字典中所有单词
   - 算法类型：字符串匹配、暴力搜索

3. 实现要点：
   - 数据结构选择：使用数组存储字典单词，简单高效
   - 核心算法步骤：
     * 遍历字典中的每个单词
     * 检查长度是否匹配（剪枝优化）
     * 逐字符比较，统计差异数量
     * 如果恰好一个字符不同，返回true
   - 边界情况处理：
     * 长度不匹配的情况直接跳过
     * 差异超过1个字符时提前退出

4. 优化思路：
   - 当前实现已经包含了基本的剪枝优化
   - 可以进一步优化：
     * 按长度分组存储单词，减少不必要的长度检查
     * 使用Trie树结构，支持更高效的模糊搜索
     * 预处理时计算字符差异模式，加速搜索

5. 算法要点总结：
   - 核心技巧：字符差异计数，精确控制只能有一个字符不同
   - 优化要点：长度预检查、差异数量提前退出
   - 类似问题：编辑距离、字符串相似度计算、模糊匹配

6. 常见错误：
   - 忘记检查字符串长度是否相同
   - 没有正确处理恰好一个字符不同的条件
   - 在差异超过1时没有提前退出，影响性能
*/
