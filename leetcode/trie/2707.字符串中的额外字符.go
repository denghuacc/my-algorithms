/*
 * @lc app=leetcode.cn id=2707 lang=golang
 *
 * [2707] 字符串中的额外字符
 *
 * https://leetcode.cn/problems/extra-characters-in-a-string/description/
 *
 * algorithms
 * Medium (45.99%)
 * Likes:    59
 * Dislikes: 0
 * Total Accepted:    8.6K
 * Total Submissions: 15K
 * Testcase Example:  '"leetscode"\n["leet","code","leetcode"]'
 *
 * 给你一个下标从 0 开始的字符串 s 和一个单词字典 dictionary 。你需要将 s 分割成若干个 互不重叠 的子字符串，每个子字符串都在
 * dictionary 中出现过。s 中可能会有一些 额外的字符 不在任何子字符串中。
 *
 * 请你采取最优策略分割 s ，使剩下的字符 最少 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "leetscode", dictionary = ["leet","code","leetcode"]
 * 输出：1
 * 解释：将 s 分成两个子字符串：下标从 0 到 3 的 "leet" 和下标从 5 到 8 的 "code" 。只有 1 个字符没有使用（下标为
 * 4），所以我们返回 1 。
 *
 *
 * 示例 2：
 *
 * 输入：s = "sayhelloworld", dictionary = ["hello","world"]
 * 输出：3
 * 解释：将 s 分成两个子字符串：下标从 3 到 7 的 "hello" 和下标从 8 到 12 的 "world" 。下标为 0 ，1 和 2
 * 的字符没有使用，所以我们返回 3 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 50
 * 1 <= dictionary.length <= 50
 * 1 <= dictionary[i].length <= 50
 * dictionary[i] 和 s 只包含小写英文字母。
 * dictionary 中的单词互不相同。
 *
 *
 */

package leetcode

import "math"

// @lc code=start
func minExtraChar(s string, dictionary []string) int {
	n := len(s)
	d := make([]int, n+1)
	for i := 1; i <= n; i++ {
		d[i] = math.MaxInt
	}
	trie := NewTrie()
	for _, e := range dictionary {
		insert(trie, e)
	}
	for i := 1; i <= n; i++ {
		d[i] = d[i-1] + 1
		node := trie
		for j := i - 1; j >= 0; j-- {
			var ok bool
			if node, ok = track(node, s[j]); ok {
				d[i] = min(d[i], d[j])
			}
		}
	}
	return d[n]
}

type Trie struct {
	children []*Trie
	isEnd    bool
}

func NewTrie() *Trie {
	return &Trie{
		children: make([]*Trie, 26),
		isEnd:    false,
	}
}

func insert(node *Trie, word string) {
	for i := len(word) - 1; i >= 0; i-- {
		ch := word[i] - 'a'
		if node.children[ch] == nil {
			node.children[ch] = NewTrie()
		}
		node = node.children[ch]
	}
	node.isEnd = true
}

func track(node *Trie, ch byte) (*Trie, bool) {
	if node == nil || node.children[ch-'a'] == nil {
		return nil, false
	}
	node = node.children[ch-'a']
	return node, node.isEnd
}

// @lc code=end
