/*
 * @lc app=leetcode.cn id=1053 lang=rust
 *
 * [1053] 交换一次的先前排列
 *
 * https://leetcode.cn/problems/previous-permutation-with-one-swap/description/
 *
 * algorithms
 * Medium (45.81%)
 * Likes:    82
 * Dislikes: 0
 * Total Accepted:    13.1K
 * Total Submissions: 27.5K
 * Testcase Example:  '[3,2,1]'
 *
 * 给你一个正整数数组 arr（可能存在重复的元素），请你返回可在 一次交换（交换两数字 arr[i] 和 arr[j] 的位置）后得到的、按字典序排列小于
 * arr 的最大排列。
 *
 * 如果无法这么操作，就请返回原数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [3,2,1]
 * 输出：[3,1,2]
 * 解释：交换 2 和 1
 *
 *
 * 示例 2：
 *
 *
 * 输入：arr = [1,1,5]
 * 输出：[1,1,5]
 * 解释：已经是最小排列
 *
 *
 * 示例 3：
 *
 *
 * 输入：arr = [1,9,4,6,7]
 * 输出：[1,7,4,6,9]
 * 解释：交换 9 和 7
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 10^4
 * 1 <= arr[i] <= 10^4
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn prev_perm_opt1(mut arr: Vec<i32>) -> Vec<i32> {
        let n = arr.len();
        for i in (0..=n - 2).rev() {
            if arr[i] > arr[i + 1] {
                let mut j = n - 1;
                while arr[j] >= arr[i] || arr[j] == arr[j - 1] {
                    j -= 1;
                }
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
                break;
            }
        }
        arr
    }
}
// @lc code=end
