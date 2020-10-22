/*
 * @lc app=leetcode.cn id=763 lang=typescript
 *
 * [763] 划分字母区间
 *
 * https://leetcode-cn.com/problems/partition-labels/description/
 *
 * algorithms
 * Medium (72.55%)
 * Likes:    276
 * Dislikes: 0
 * Total Accepted:    24.7K
 * Total Submissions: 33.5K
 * Testcase Example:  '"ababcbacadefegdehijhklij"'
 *
 * 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。
 *
 *
 *
 * 示例 1：
 *
 * 输入：S = "ababcbacadefegdehijhklij"
 * 输出：[9,7,8]
 * 解释：
 * 划分结果为 "ababcbaca", "defegde", "hijhklij"。
 * 每个字母最多出现在一个片段中。
 * 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
 *
 *
 *
 *
 * 提示：
 *
 *
 * S的长度在[1, 500]之间。
 * S只包含小写字母 'a' 到 'z' 。
 *
 *
 */

// @lc code=start
// greedy + two pointers
function partitionLabels(S: string): number[] {
  const last: number[] = new Array(26);
  const n = S.length;
  const charCodeA = "a".charCodeAt(0);
  for (let i = 0; i < n; i++) {
    last[S.charCodeAt(i) - charCodeA] = i;
  }
  const partition: number[] = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < n; i++) {
    end = Math.max(end, last[S.charCodeAt(i) - charCodeA]);
    if (i === end) {
      partition.push(end - start + 1);
      start = end + 1;
    }
  }
  return partition;
}
// @lc code=end
