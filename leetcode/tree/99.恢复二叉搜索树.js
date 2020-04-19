/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
 *
 * https://leetcode-cn.com/problems/recover-binary-search-tree/description/
 *
 * algorithms
 * Hard (49.27%)
 * Likes:    183
 * Dislikes: 0
 * Total Accepted:    15K
 * Total Submissions: 26.7K
 * Testcase Example:  '[1,3,null,null,2]'
 *
 * 二叉搜索树中的两个节点被错误地交换。
 *
 * 请在不改变其结构的情况下，恢复这棵树。
 *
 * 示例 1:
 *
 * 输入: [1,3,null,null,2]
 *
 * 1
 * /
 * 3
 * \
 * 2
 *
 * 输出: [3,1,null,null,2]
 *
 * 3
 * /
 * 1
 * \
 * 2
 *
 *
 * 示例 2:
 *
 * 输入: [3,1,4,null,null,2]
 *
 * ⁠ 3
 * ⁠/ \
 * 1   4
 * /
 * 2
 *
 * 输出: [2,1,4,null,null,3]
 *
 * ⁠ 2
 * ⁠/ \
 * 1   4
 * /
 * ⁠ 3
 *
 * 进阶:
 *
 *
 * 使用 O(n) 空间复杂度的解法很容易实现。
 * 你能想出一个只使用常数空间的解决方案吗？
 *
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  const nums = []
  inOrder(root, nums)
  swapped = findTwoSwapped(nums)
  recover(root, 2, swapped[0], swapped[1])

  function inOrder(root, nums) {
    if (!root) return
    inOrder(root.left, nums)
    nums.push(root.val)
    inOrder(root.right, nums)
  }

  function findTwoSwapped(nums) {
    const len = nums.length
    let x = -1
    let y = -1

    for (let i = 0; i < len - 1; ++i) {
      if (nums[i + 1] < nums[i]) {
        y = nums[i + 1]
        if (x == -1) x = nums[i]
        else break
      }
    }

    return [x, y]
  }

  function recover(root, count, x, y) {
    if (root) {
      if (root.val == x || root.val == y) {
        root.val = root.val === x ? y : x
        if (--count === 0) return
      }
      recover(root.left, count, x, y)
      recover(root.right, count, x, y)
    }
  }
}

// recursion
var recoverTree = function (root) {
  let x = null
  let y = null
  let pred = null

  findTwoSwapped(root)
  swap(x, y)

  function findTwoSwapped(root) {
    if (!root) return
    findTwoSwapped(root.left)
    if (pred && root.val < pred.val) {
      y = root
      if (!x) x = pred
      else return
    }
    pred = root
    findTwoSwapped(root.right)
  }

  function swap(x, y) {
    ;[x.val, y.val] = [y.val, x.val]
  }
}

// iteration
var recoverTree = function (root) {
  const stack = []
  let x = null
  let y = null
  let pred = null

  while (stack.length || root) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (pred && root.val < pred.val) {
      y = root
      if (x == null) x = pred
      else break
    }
    pred = root
    root = root.right
  }

  swap(x, y)

  function swap(x, y) {
    ;[x.val, y.val] = [y.val, x.val]
  }
}
// @lc code=end
