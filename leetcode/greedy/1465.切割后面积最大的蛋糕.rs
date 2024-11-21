/*
 * @lc app=leetcode.cn id=1465 lang=rust
 *
 * [1465] 切割后面积最大的蛋糕
 *
 * https://leetcode.cn/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/description/
 *
 * algorithms
 * Medium (33.34%)
 * Likes:    63
 * Dislikes: 0
 * Total Accepted:    14.8K
 * Total Submissions: 38.3K
 * Testcase Example:  '5\n4\n[1,2,4]\n[1,3]'
 *
 * 矩形蛋糕的高度为 h 且宽度为 w，给你两个整数数组 horizontalCuts 和 verticalCuts，其中：
 *
 *
 * horizontalCuts[i] 是从矩形蛋糕顶部到第  i 个水平切口的距离
 * verticalCuts[j] 是从矩形蛋糕的左侧到第 j 个竖直切口的距离
 *
 *
 * 请你按数组 horizontalCuts 和 verticalCuts 中提供的水平和竖直位置切割后，请你找出 面积最大 的那份蛋糕，并返回其 面积
 * 。由于答案可能是一个很大的数字，因此需要将结果 对 10^9 + 7 取余 后返回。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
 * 输出：4
 * 解释：上图所示的矩阵蛋糕中，红色线表示水平和竖直方向上的切口。切割蛋糕后，绿色的那份蛋糕面积最大。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
 * 输出：6
 * 解释：上图所示的矩阵蛋糕中，红色线表示水平和竖直方向上的切口。切割蛋糕后，绿色和黄色的两份蛋糕面积最大。
 *
 * 示例 3：
 *
 *
 * 输入：h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= h, w <= 10^9
 * 1 <= horizontalCuts.length <= min(h - 1, 10^5)
 * 1 <= verticalCuts.length <= min(w - 1, 10^5)
 * 1 <= horizontalCuts[i] < h
 * 1 <= verticalCuts[i] < w
 * 题目数据保证 horizontalCuts 中的所有元素各不相同
 * 题目数据保证 verticalCuts 中的所有元素各不相同
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn max_area(
        h: i32,
        w: i32,
        mut horizontal_cuts: Vec<i32>,
        mut vertical_cuts: Vec<i32>,
    ) -> i32 {
        horizontal_cuts.push(h);
        horizontal_cuts.sort();
        vertical_cuts.push(w);
        vertical_cuts.sort();
        let max_h = calc_max_gap(horizontal_cuts);
        let max_w = calc_max_gap(vertical_cuts);
        return ((max_h * max_w) % 1000000007) as i32;
    }
}

fn calc_max_gap(cuts: Vec<i32>) -> i64 {
    let mut max_gap = 0;
    let mut pre = 0;
    for cut in cuts {
        max_gap = max_gap.max(cut - pre);
        pre = cut;
    }
    max_gap as i64
}
// @lc code=end
