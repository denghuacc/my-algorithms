/*
 * @lc app=leetcode.cn id=700 lang=rust
 *
 * [700] 二叉搜索树中的搜索
 *
 * https://leetcode-cn.com/problems/search-in-a-binary-search-tree/description/
 *
 * algorithms
 * Easy (76.83%)
 * Likes:    190
 * Dislikes: 0
 * Total Accepted:    98.3K
 * Total Submissions: 128K
 * Testcase Example:  '[4,2,7,1,3]\n2'
 *
 * 给定二叉搜索树（BST）的根节点和一个值。 你需要在BST中找到节点值等于给定值的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 NULL。
 *
 * 例如，
 *
 *
 * 给定二叉搜索树:
 *
 * ⁠       4
 * ⁠      / \
 * ⁠     2   7
 * ⁠    / \
 * ⁠   1   3
 *
 * 和值: 2
 *
 *
 * 你应该返回如下子树:
 *
 *
 * ⁠     2
 * ⁠    / \
 * ⁠   1   3
 *
 *
 * 在上述示例中，如果要找的值是 5，但因为没有节点值为 5，我们应该返回 NULL。
 *
 */

// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//   pub val: i32,
//   pub left: Option<Rc<RefCell<TreeNode>>>,
//   pub right: Option<Rc<RefCell<TreeNode>>>,
// }
//
// impl TreeNode {
//   #[inline]
//   pub fn new(val: i32) -> Self {
//     TreeNode {
//       val,
//       left: None,
//       right: None
//     }
//   }
// }

// @lc code=start
use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    // recursive
    // pub fn search_bst(
    //     root: Option<Rc<RefCell<TreeNode>>>,
    //     val: i32,
    // ) -> Option<Rc<RefCell<TreeNode>>> {
    //     if let Some(node) = root {
    //         if node.borrow().val == val {
    //             return Some(node);
    //         } else if node.borrow().val > val {
    //             return Solution::search_bst(node.borrow().left.clone(), val);
    //         } else {
    //             return Solution::search_bst(node.borrow().right.clone(), val);
    //         }
    //     }
    //     return None;
    // }

    // iterative
    pub fn search_bst(
        root: Option<Rc<RefCell<TreeNode>>>,
        val: i32,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        let mut node = root;
        while let Some(n) = node {
            if n.borrow().val == val {
                return Some(n);
            } else if n.borrow().val > val {
                node = n.borrow().left.clone();
            } else {
                node = n.borrow().right.clone();
            }
        }
        return None;
    }
}
// @lc code=end
