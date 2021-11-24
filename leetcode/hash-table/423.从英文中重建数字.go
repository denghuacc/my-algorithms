/*
 * @lc app=leetcode.cn id=423 lang=golang
 *
 * [423] 从英文中重建数字
 *
 * https://leetcode-cn.com/problems/reconstruct-original-digits-from-english/description/
 *
 * algorithms
 * Medium (56.85%)
 * Likes:    96
 * Dislikes: 0
 * Total Accepted:    13.9K
 * Total Submissions: 23.4K
 * Testcase Example:  '"owoztneoer"'
 *
 * 给你一个字符串 s ，其中包含字母顺序打乱的用英文单词表示的若干数字（0-9）。按 升序 返回原始的数字。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "owoztneoer"
 * 输出："012"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "fviefuro"
 * 输出："45"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s[i] 为 ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"]
 * 这些字符之一
 * s 保证是一个符合题目要求的字符串
 *
 *
 */

package leetcode

// @lc code=start
// hash table
func originalDigits(s string) string {
	mp := map[byte]int{}
	for i := 0; i < len(s); i++ {
		mp[s[i]]++
	}

	cnt := make([]int, 10)
	cnt[0] = mp['z']
	cnt[2] = mp['w']
	cnt[4] = mp['u']
	cnt[6] = mp['x']
	cnt[8] = mp['g']

	cnt[3] = mp['h'] - cnt[8]
	cnt[5] = mp['f'] - cnt[4]
	cnt[7] = mp['s'] - cnt[6]

	cnt[1] = mp['o'] - cnt[0] - cnt[2] - cnt[4]
	cnt[9] = mp['i'] - cnt[5] - cnt[6] - cnt[8]

	res := make([]byte, 0)
	for i := 0; i < 10; i++ {
		for j := 0; j < cnt[i]; j++ {
			res = append(res, byte(i+'0'))
		}
	}
	return string(res)
}

// @lc code=end
