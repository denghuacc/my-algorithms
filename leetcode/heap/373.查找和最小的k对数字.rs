/*
 * @lc app=leetcode.cn id=373 lang=rust
 *
 * [373] 查找和最小的K对数字
 *
 * https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/description/
 *
 * algorithms
 * Medium (40.66%)
 * Likes:    270
 * Dislikes: 0
 * Total Accepted:    26.4K
 * Total Submissions: 64.1K
 * Testcase Example:  '[1,7,11]\n[2,4,6]\n3'
 *
 * 给定两个以升序排列的整数数组 nums1 和 nums2 , 以及一个整数 k 。
 *
 * 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。
 *
 * 请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * 输出: [1,2],[1,4],[1,6]
 * 解释: 返回序列中的前 3 对数：
 * ⁠    [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
 * 输出: [1,1],[1,1]
 * 解释: 返回序列中的前 2 对数：
 * [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
 *
 *
 * 示例 3:
 *
 *
 * 输入: nums1 = [1,2], nums2 = [3], k = 3
 * 输出: [1,3],[2,3]
 * 解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * -10^9
 * nums1, nums2 均为升序排列
 * 1
 *
 *
 */

// @lc code=start
use std::collections::BinaryHeap;
impl Solution {
    pub fn k_smallest_pairs(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> Vec<Vec<i32>> {
        let mut k = k;
        let mut res = Vec::new();
        let mut queue: BinaryHeap<(i32, usize, usize)> = BinaryHeap::from(
            (0..(nums1.len().min(k as usize)))
                .map(|i| (-nums1[i] - nums2[0], i, 0))
                .collect::<Vec<(i32, usize, usize)>>(),
        );

        while let Some((_, i, j)) = queue.pop() {
            if k == 0 {
                break;
            }
            k -= 1;
            res.push(vec![nums1[i], nums2[j]]);

            if j == nums2.len() - 1 {
                continue;
            }
            queue.push((-nums1[i] - nums2[j + 1], i, j + 1));
        }
        res
    }
}
// @lc code=end
