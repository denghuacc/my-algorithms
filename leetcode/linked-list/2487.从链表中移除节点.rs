/*
 * @lc app=leetcode.cn id=2487 lang=rust
 *
 * [2487] 从链表中移除节点
 *
 * https://leetcode.cn/problems/remove-nodes-from-linked-list/description/
 *
 * algorithms
 * Medium (68.63%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 20.5K
 * Testcase Example:  '[5,2,13,3,8]'
 *
 * 给你一个链表的头节点 head 。
 *
 * 移除每个右侧有一个更大数值的节点。
 *
 * 返回修改后链表的头节点 head 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：head = [5,2,13,3,8]
 * 输出：[13,8]
 * 解释：需要移除的节点是 5 ，2 和 3 。
 * - 节点 13 在节点 5 右侧。
 * - 节点 13 在节点 2 右侧。
 * - 节点 8 在节点 3 右侧。
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1,1,1,1]
 * 输出：[1,1,1,1]
 * 解释：每个节点的值都是 1 ，所以没有需要移除的节点。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定列表中的节点数目在范围 [1, 10^5] 内
 * 1 <= Node.val <= 10^5
 *
 *
 */

// Definition for singly-linked list.
#[derive(PartialEq, Eq, Clone, Debug)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }
}

// @lc code=start
impl Solution {
    pub fn remove_nodes(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut stk: Vec<Option<Box<ListNode>>> = vec![];
        let mut node = head;
        while node.is_some() {
            while matches!(stk.last(), Some(pre) if pre.as_ref()?.val < node.as_ref()?.val) {
                stk.pop();
            }
            let next = node.as_mut()?.next.take();
            stk.push(node);
            node = next;
        }
        let mut head = stk[0].take();
        let mut node = &mut head.as_mut()?.next;
        for i in 1..stk.len() {
            *node = stk[i].take();
            node = &mut node.as_mut()?.next;
        }
        head
    }
}
// @lc code=end
