/*
 * @lc app=leetcode.cn id=1669 lang=rust
 *
 * [1669] 合并两个链表
 *
 * https://leetcode.cn/problems/merge-in-between-linked-lists/description/
 *
 * algorithms
 * Medium (74.87%)
 * Likes:    87
 * Dislikes: 0
 * Total Accepted:    39.8K
 * Total Submissions: 51.6K
 * Testcase Example:  '[0,1,2,3,4,5]\n3\n4\n[1000000,1000001,1000002]'
 *
 * 给你两个链表 list1 和 list2 ，它们包含的元素分别为 n 个和 m 个。
 *
 * 请你将 list1 中下标从 a 到 b 的全部节点都删除，并将list2 接在被删除节点的位置。
 *
 * 下图中蓝色边和节点展示了操作后的结果：
 *
 * 请你返回结果链表的头指针。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：list1 = [0,1,2,3,4,5], a = 3, b = 4, list2 = [1000000,1000001,1000002]
 * 输出：[0,1,2,1000000,1000001,1000002,5]
 * 解释：我们删除 list1 中下标为 3 和 4 的两个节点，并将 list2 接在该位置。上图中蓝色的边和节点为答案链表。
 *
 *
 * 示例 2：
 *
 *
 * 输入：list1 = [0,1,2,3,4,5,6], a = 2, b = 5, list2 =
 * [1000000,1000001,1000002,1000003,1000004]
 * 输出：[0,1,1000000,1000001,1000002,1000003,1000004,6]
 * 解释：上图中蓝色的边和节点为答案链表。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= list1.length <= 10^4
 * 1 <= a <= b < list1.length - 1
 * 1 <= list2.length <= 10^4
 *
 *
 */

// @lc code=start
// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
//
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
impl Solution {
    pub fn merge_in_between(
        list1: Option<Box<ListNode>>,
        a: i32,
        b: i32,
        list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut list1 = list1;
        let mut list2 = list2;
        let mut start = &mut list1;
        for _ in 1..a {
            start = &mut start.as_deref_mut().unwrap().next;
        }

        let mut end = &mut start.clone();
        for _ in a - 2..b {
            end = &mut end.as_deref_mut().unwrap().next;
        }
        core::mem::swap(&mut start.as_deref_mut().unwrap().next, &mut list2);

        while start.as_ref().unwrap().next.is_some() {
            start = &mut start.as_deref_mut().unwrap().next;
        }
        core::mem::swap(&mut start.as_deref_mut().unwrap().next, &mut end);
        list1
    }
}
// @lc code=end
