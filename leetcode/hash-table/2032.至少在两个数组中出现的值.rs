/*
 * @lc app=leetcode.cn id=2032 lang=rust
 *
 * [2032] 至少在两个数组中出现的值
 *
 * https://leetcode.cn/problems/two-out-of-three/description/
 *
 * algorithms
 * Easy (66.50%)
 * Likes:    33
 * Dislikes: 0
 * Total Accepted:    16K
 * Total Submissions: 22.7K
 * Testcase Example:  '[1,1,3,2]\n[2,3]\n[3]'
 *
 * 给你三个整数数组 nums1、nums2 和 nums3 ，请你构造并返回一个 元素各不相同的 数组，且由 至少 在 两个
 * 数组中出现的所有值组成。数组中的元素可以按 任意 顺序排列。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
 * 输出：[3,2]
 * 解释：至少在两个数组中出现的所有值为：
 * - 3 ，在全部三个数组中都出现过。
 * - 2 ，在数组 nums1 和 nums2 中出现过。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
 * 输出：[2,3,1]
 * 解释：至少在两个数组中出现的所有值为：
 * - 2 ，在数组 nums2 和 nums3 中出现过。
 * - 3 ，在数组 nums1 和 nums2 中出现过。
 * - 1 ，在数组 nums1 和 nums3 中出现过。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
 * 输出：[]
 * 解释：不存在至少在两个数组中出现的值。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length, nums3.length <= 100
 * 1 <= nums1[i], nums2[j], nums3[k] <= 100
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn two_out_of_three(nums1: Vec<i32>, nums2: Vec<i32>, nums3: Vec<i32>) -> Vec<i32> {
        use std::collections::HashMap;
        let mut map = HashMap::new();
        for num in nums1 {
            map.insert(num, 1);
        }
        for num in nums2 {
            let count = map.entry(num).or_insert(2);
            *count |= 2;
        }
        for num in nums3 {
            let count = map.entry(num).or_insert(4);
            *count |= 4;
        }
        let mut res = vec![];
        for (key, val) in map {
            if val & (val - 1) != 0 {
                res.push(key)
            }
        }
        return res;
    }
}
// @lc code=end
