/*
 * @lc app=leetcode.cn id=692 lang=golang
 *
 * [692] 前K个高频单词
 *
 * https://leetcode-cn.com/problems/top-k-frequent-words/description/
 *
 * algorithms
 * Medium (52.29%)
 * Likes:    262
 * Dislikes: 0
 * Total Accepted:    34.1K
 * Total Submissions: 63K
 * Testcase Example:  '["i", "love", "leetcode", "i", "love", "coding"]\n2'
 *
 * 给一非空的单词列表，返回前 k 个出现次数最多的单词。
 *
 * 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。
 *
 * 示例 1：
 *
 *
 * 输入: ["i", "love", "leetcode", "i", "love", "coding"], k = 2
 * 输出: ["i", "love"]
 * 解析: "i" 和 "love" 为出现次数最多的两个单词，均为2次。
 * ⁠   注意，按字母顺序 "i" 在 "love" 之前。
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入: ["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],
 * k = 4
 * 输出: ["the", "is", "sunny", "day"]
 * 解析: "the", "is", "sunny" 和 "day" 是出现次数最多的四个单词，
 * ⁠   出现次数依次为 4, 3, 2 和 1 次。
 *
 *
 *
 *
 * 注意：
 *
 *
 * 假定 k 总为有效值， 1 ≤ k ≤ 集合元素数。
 * 输入的单词均由小写字母组成。
 *
 *
 *
 *
 * 扩展练习：
 *
 *
 * 尝试以 O(n log k) 时间复杂度和 O(n) 空间复杂度解决。
 *
 *
 */

package leetcode

import "container/heap"

// @lc code=start
type pair struct {
	word  string
	count int
}

type hp []pair

func (h hp) Len() int {
	return len(h)
}

func (h hp) Less(i, j int) bool {
	a, b := h[i], h[j]
	return a.count < b.count || a.count == b.count && a.word > b.word
}

func (h hp) Swap(i, j int) {
	h[i], h[j] = h[j], h[i]
}

func (h *hp) Push(v interface{}) {
	*h = append(*h, v.(pair))
}

func (h *hp) Pop() interface{} {
	a := *h
	v := a[len(a)-1]
	*h = a[:len(a)-1]
	return v
}

func topKFrequent(words []string, k int) []string {
	cnt := map[string]int{}
	for _, word := range words {
		cnt[word]++
	}
	h := &hp{}

	for word, count := range cnt {
		heap.Push(h, pair{word, count})
		if h.Len() > k {
			heap.Pop(h)
		}
	}

	ret := make([]string, k)

	for i := k - 1; i >= 0; i-- {
		ret[i] = heap.Pop(h).(pair).word
	}

	return ret
}

// @lc code=end
