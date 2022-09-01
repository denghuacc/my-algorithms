/*
 * @lc app=leetcode.cn id=149 lang=rust
 *
 * [149] 直线上最多的点数
 *
 * https://leetcode-cn.com/problems/max-points-on-a-line/description/
 *
 * algorithms
 * Hard (31.39%)
 * Likes:    310
 * Dislikes: 0
 * Total Accepted:    37.2K
 * Total Submissions: 118.8K
 * Testcase Example:  '[[1,1],[2,2],[3,3]]'
 *
 * 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[1,1],[2,2],[3,3]]
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * points[i].length == 2
 * -10^4 i, yi
 * points 中的所有点 互不相同
 *
 *
 */

// @lc code=start
// hash table
impl Solution {
    pub fn max_points(points: Vec<Vec<i32>>) -> i32 {
        fn gcd(mut a: i32, mut b: i32) -> i32 {
            while b != 0 {
                let c = a % b;
                a = b;
                b = c;
            }
            a
        }

        use std::collections::HashMap;
        let mut ret = 0;
        for (i, p1) in points.iter().enumerate() {
            let (x1, y1) = (p1[0], p1[1]);

            let mut cnts = HashMap::new();
            for p2 in points.iter().skip(i + 1) {
                let (x2, y2) = (p2[0], p2[1]);
                let v3 = [y2 - y1, x1 - x2, x2 * y1 - x1 * y2];
                let mut nzi = -1;
                for k in 0..3 {
                    if v3[k] != 0 {
                        nzi = k as i32;
                        break;
                    }
                }
                let mut g = 1;
                if nzi != -1 {
                    g = v3
                        .iter()
                        .fold(v3[nzi as usize], |g, &x| if x == 0 { g } else { gcd(g, x) });
                    g = g.abs();
                    if v3[nzi as usize] < 0 {
                        g = -g;
                    }
                }

                let v3 = (v3[0] / g, v3[1] / g, v3[2] / g);
                *cnts.entry(v3).or_insert(0) += 1;
                ret = ret.max(cnts[&v3]);
            }
        }

        ret + 1
    }
}
// @lc code=end
