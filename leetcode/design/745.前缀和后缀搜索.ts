/*
 * @lc app=leetcode.cn id=745 lang=typescript
 *
 * [745] 前缀和后缀搜索
 *
 * https://leetcode.cn/problems/prefix-and-suffix-search/description/
 *
 * algorithms
 * Hard (41.24%)
 * Likes:    117
 * Dislikes: 0
 * Total Accepted:    8.4K
 * Total Submissions: 18.6K
 * Testcase Example:  '["WordFilter","f"]\n[[["apple"]],["a","e"]]'
 *
 * 设计一个包含一些单词的特殊词典，并能够通过前缀和后缀来检索单词。
 *
 * 实现 WordFilter 类：
 *
 *
 * WordFilter(string[] words) 使用词典中的单词 words 初始化对象。
 * f(string pref, string suff) 返回词典中具有前缀 prefix 和后缀 suff
 * 的单词的下标。如果存在不止一个满足要求的下标，返回其中 最大的下标 。如果不存在这样的单词，返回 -1 。
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入
 * ["WordFilter", "f"]
 * [[["apple"]], ["a", "e"]]
 * 输出
 * [null, 0]
 * 解释
 * WordFilter wordFilter = new WordFilter(["apple"]);
 * wordFilter.f("a", "e"); // 返回 0 ，因为下标为 0 的单词：前缀 prefix = "a" 且 后缀 suff = "e"
 * 。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= words.length <= 10^4
 * 1 <= words[i].length <= 7
 * 1 <= pref.length, suff.length <= 7
 * words[i]、pref 和 suff 仅由小写英文字母组成
 * 最多对函数 f 执行 10^4 次调用
 *
 *
 */

// @lc code=start
class WordFilter {
  map: Map<string, number>;

  constructor(words: string[]) {
    this.map = new Map();
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const m = word.length;
      for (let x = 1; x <= m; x++) {
        for (let y = 1; y <= m; y++) {
          const key = word.slice(0, x) + "-" + word.slice(m - y);
          this.map.set(key, i);
        }
      }
    }
  }

  f(pref: string, suff: string): number {
    const key = pref + "-" + suff;
    if (this.map.has(key)) {
      return this.map.get(key)!;
    }
    return -1;
  }
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */
// @lc code=end
