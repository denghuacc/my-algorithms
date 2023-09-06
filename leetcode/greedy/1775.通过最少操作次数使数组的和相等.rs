/*
 * @lc app=leetcode.cn id=1775 lang=rust
 *
 * [1775] 通过最少操作次数使数组的和相等
 *
 * https://leetcode.cn/problems/equal-sum-arrays-with-minimum-number-of-operations/description/
 *
 * algorithms
 * Medium (49.13%)
 * Likes:    85
 * Dislikes: 0
 * Total Accepted:    10.1K
 * Total Submissions: 18.7K
 * Testcase Example:  '[1,2,3,4,5,6]\n[1,1,2,2,2,2]'
 *
 * 给你两个长度可能不等的整数数组 nums1 和 nums2 。两个数组中的所有值都在 1 到 6 之间（包含 1 和 6）。
 *
 * 每次操作中，你可以选择 任意 数组中的任意一个整数，将它变成 1 到 6 之间 任意 的值（包含 1 和 6）。
 *
 * 请你返回使 nums1 中所有数的和与 nums2 中所有数的和相等的最少操作次数。如果无法使两个数组的和相等，请返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums1 = [1,2,3,4,5,6], nums2 = [1,1,2,2,2,2]
 * 输出：3
 * 解释：你可以通过 3 次操作使 nums1 中所有数的和与 nums2 中所有数的和相等。以下数组下标都从 0 开始。
 * - 将 nums2[0] 变为 6 。 nums1 = [1,2,3,4,5,6], nums2 = [6,1,2,2,2,2] 。
 * - 将 nums1[5] 变为 1 。 nums1 = [1,2,3,4,5,1], nums2 = [6,1,2,2,2,2] 。
 * - 将 nums1[2] 变为 2 。 nums1 = [1,2,2,4,5,1], nums2 = [6,1,2,2,2,2] 。
 *
 *
 * 示例 2：
 *
 * 输入：nums1 = [1,1,1,1,1,1,1], nums2 = [6]
 * 输出：-1
 * 解释：没有办法减少 nums1 的和或者增加 nums2 的和使二者相等。
 *
 *
 * 示例 3：
 *
 * 输入：nums1 = [6,6], nums2 = [1]
 * 输出：3
 * 解释：你可以通过 3 次操作使 nums1 中所有数的和与 nums2 中所有数的和相等。以下数组下标都从 0 开始。
 * - 将 nums1[0] 变为 2 。 nums1 = [2,6], nums2 = [1] 。
 * - 将 nums1[1] 变为 2 。 nums1 = [2,2], nums2 = [1] 。
 * - 将 nums2[0] 变为 4 。 nums1 = [2,2], nums2 = [4] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length <= 10^5
 * 1 <= nums1[i], nums2[i] <= 6
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn min_operations(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        let n1 = nums1.len();
        let n2 = nums2.len();
        if n1 * 6 < n2 || n2 * 6 < n1 {
            return -1;
        }
        let mut cnt1 = vec![0; 7];
        let mut cnt2 = vec![0; 7];
        let mut diff = 0;
        for num in nums1 {
            cnt1[num as usize] += 1;
            diff += num;
        }
        for num in nums2 {
            cnt2[num as usize] += 1;
            diff -= num;
        }
        if diff == 0 {
            return 0;
        }
        if diff > 0 {
            return help(&cnt2, &cnt1, diff);
        }
        help(&cnt1, &cnt2, diff.abs())
    }
}

fn help(cnt1: &Vec<i32>, cnt2: &Vec<i32>, mut diff: i32) -> i32 {
    let mut cnt = vec![0; 7];
    for i in 1..=6 {
        cnt[6 - i] += cnt1[i];
        cnt[i - 1] += cnt2[i];
    }
    let mut res = 0;
    for i in (1..=5).rev() {
        if diff > 0 {
            let t = i32::min((diff + i - 1) / i, cnt[i as usize]);
            res += t;
            diff -= t * i;
        }
    }
    res
}
// @lc code=end
