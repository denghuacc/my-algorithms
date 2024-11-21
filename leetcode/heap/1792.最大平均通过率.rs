/*
 * @lc app=leetcode.cn id=1792 lang=rust
 *
 * [1792] 最大平均通过率
 *
 * https://leetcode.cn/problems/maximum-average-pass-ratio/description/
 *
 * algorithms
 * Medium (51.58%)
 * Likes:    99
 * Dislikes: 0
 * Total Accepted:    13.8K
 * Total Submissions: 24.4K
 * Testcase Example:  '[[1,2],[3,5],[2,2]]\n2'
 *
 * 一所学校里有一些班级，每个班级里有一些学生，现在每个班都会进行一场期末考试。给你一个二维数组 classes ，其中 classes[i] =
 * [passi, totali] ，表示你提前知道了第 i 个班级总共有 totali 个学生，其中只有 passi 个学生可以通过考试。
 *
 * 给你一个整数 extraStudents ，表示额外有 extraStudents 个聪明的学生，他们 一定 能通过任何班级的期末考。你需要给这
 * extraStudents 个学生每人都安排一个班级，使得 所有 班级的 平均 通过率 最大 。
 *
 * 一个班级的 通过率 等于这个班级通过考试的学生人数除以这个班级的总人数。平均通过率 是所有班级的通过率之和除以班级数目。
 *
 * 请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。与标准答案误差范围在 10^-5
 * 以内的结果都会视为正确结果。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：classes = [[1,2],[3,5],[2,2]], extraStudents = 2
 * 输出：0.78333
 * 解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为 (3/4 + 3/5 + 2/2) / 3 = 0.78333 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
 * 输出：0.53485
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * classes[i].length == 2
 * 1 i i
 * 1
 *
 *
 */

// @lc code=start
#[derive(Clone, Copy, PartialEq, PartialOrd)]
struct F64(f64);

impl Eq for F64 {}

impl Ord for F64 {
    fn cmp(&self, other: &Self) -> std::cmp::Ordering {
        self.partial_cmp(other).unwrap()
    }
}

impl Solution {
    pub fn max_average_ratio(classes: Vec<Vec<i32>>, extra_students: i32) -> f64 {
        use std::collections::BinaryHeap;
        #[inline]
        fn score(pass: i32, total: i32) -> F64 {
            let (p, t) = (pass as f64, total as f64);
            F64((p + 1.0) / (t + 1.0) - p / t)
        }
        let n = classes.len();
        let mut pq: BinaryHeap<_> = classes
            .into_iter()
            .map(|c| (score(c[0], c[1]), c[0], c[1]))
            .collect();
        for _ in 0..extra_students {
            if let Some((_, p, t)) = pq.pop() {
                let (p, t) = (p + 1, t + 1);
                pq.push((score(p, t), p, t));
            }
        }
        let mut sum = 0.0;
        while let Some((_, p, t)) = pq.pop() {
            sum += p as f64 / t as f64;
        }
        sum / n as f64
    }
}
// @lc code=end
