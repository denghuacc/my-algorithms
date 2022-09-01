/*
 * @lc app=leetcode.cn id=1707 lang=rust
 *
 * [1707] 与数组中元素的最大异或值
 *
 * https://leetcode-cn.com/problems/maximum-xor-with-an-element-from-array/description/
 *
 * algorithms
 * Hard (50.30%)
 * Likes:    124
 * Dislikes: 0
 * Total Accepted:    14.4K
 * Total Submissions: 28.6K
 * Testcase Example:  '[0,1,2,3,4]\n[[3,1],[1,3],[5,6]]'
 *
 * 给你一个由非负整数组成的数组 nums 。另有一个查询数组 queries ，其中 queries[i] = [xi, mi] 。
 *
 * 第 i 个查询的答案是 xi 和任何 nums 数组中不超过 mi 的元素按位异或（XOR）得到的最大值。换句话说，答案是 max(nums[j]
 * XOR xi) ，其中所有 j 均满足 nums[j] <= mi 。如果 nums 中的所有元素都大于 mi，最终答案就是 -1 。
 *
 * 返回一个整数数组 answer 作为查询的答案，其中 answer.length == queries.length 且 answer[i] 是第 i
 * 个查询的答案。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
 * 输出：[3,3,7]
 * 解释：
 * 1) 0 和 1 是仅有的两个不超过 1 的整数。0 XOR 3 = 3 而 1 XOR 3 = 2 。二者中的更大值是 3 。
 * 2) 1 XOR 2 = 3.
 * 3) 5 XOR 2 = 7.
 *
 *
 * 示例 2：
 *
 * 输入：nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]
 * 输出：[15,-1,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length, queries.length <= 10^5
 * queries[i].length == 2
 * 0 <= nums[j], xi, mi <= 10^9
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn maximize_xor(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        struct TrieNode {
            next: Vec<Option<TrieNode>>,
        }

        let mut nums = nums;
        nums.sort_unstable();
        let mut queries = queries;
        queries
            .iter_mut()
            .enumerate()
            .for_each(|(i, v)| v.push(i as i32));
        queries.sort_unstable_by(|a, b| a[1].cmp(&b[1]));

        let mut trie = TrieNode {
            next: vec![None, None],
        };

        let mut nums_i = 0;
        for i in 0..queries.len() {
            if queries[i][1] < nums[0] {
                queries[i].push(-1);
                continue;
            }
            while nums_i < nums.len() && queries[i][1] >= nums[nums_i] {
                let mut trie_ptr = &mut trie;
                for nums_j in (0..32).rev() {
                    let bit = ((nums[nums_i] >> nums_j) & 1) as usize;
                    if trie_ptr.next[bit].is_none() {
                        trie_ptr.next[bit] = Some(TrieNode {
                            next: vec![None, None],
                        });
                    }
                    trie_ptr = trie_ptr.next[bit].as_mut().unwrap();
                }
                nums_i += 1;
            }

            let x = queries[i][0];
            let mut trie_ptr = &trie;
            let mut y = 0;
            for j in (0..32).rev() {
                let best = 1 - ((x >> j) & 1) as usize;
                if trie_ptr.next[best].is_none() {
                    y = y | ((1 - best) << j) as i32;
                    trie_ptr = trie_ptr.next[1 - best].as_ref().unwrap();
                } else {
                    y = y | (best << j) as i32;
                    trie_ptr = trie_ptr.next[best].as_ref().unwrap();
                }
            }
            queries[i].push(x ^ y);
        }
        queries.sort_unstable_by(|a, b| a[2].cmp(&b[2]));
        queries.into_iter().map(|x| x[3]).collect()
    }
}
// @lc code=end
