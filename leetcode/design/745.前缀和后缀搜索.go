/*
 * @lc app=leetcode.cn id=745 lang=golang
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

package leetcode

// @lc code=start
type WordFilter map[string]int

func Constructor(words []string) WordFilter {
	wf := WordFilter{}
	for i, word := range words {
		m := len(word)
		for x := 1; x <= m; x++ {
			for y := 1; y <= m; y++ {
				key := word[:x] + "-" + word[m-y:]
				wf[key] = i
			}
		}
	}
	return wf
}

func (wf WordFilter) F(pref string, suff string) int {
	key := pref + "-" + suff
	if i, ok := wf[key]; ok {
		return i
	}
	return -1
}

/**
 * Your WordFilter object will be instantiated and called as such:
 * obj := Constructor(words);
 * param_1 := obj.F(pref,suff);
 */
// @lc code=end
