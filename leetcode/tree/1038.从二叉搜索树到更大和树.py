#
# @lc app=leetcode.cn id=1038 lang=python3
#
# [1038] 从二叉搜索树到更大和树
#
# https://leetcode.cn/problems/binary-search-tree-to-greater-sum-tree/description/
#
# algorithms
# Medium (81.46%)
# Likes:    251
# Dislikes: 0
# Total Accepted:    53.1K
# Total Submissions: 64.4K
# Testcase Example:  '[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]'
#
# 给定一个二叉搜索树 root (BST)，请将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和。
#
# 提醒一下， 二叉搜索树 满足下列约束条件：
#
#
# 节点的左子树仅包含键 小于 节点键的节点。
# 节点的右子树仅包含键 大于 节点键的节点。
# 左右子树也必须是二叉搜索树。
#
#
#
#
# 示例 1：
#
#
#
#
# 输入：[4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
# 输出：[30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
#
#
# 示例 2：
#
#
# 输入：root = [0,null,1]
# 输出：[1,null,1]
#
#
#
#
# 提示：
#
#
# 树中的节点数在 [1, 100] 范围内。
# 0 <= Node.val <= 100
# 树中的所有值均 不重复 。
#
#
#
#
# 注意：该题目与 538: https://leetcode-cn.com/problems/convert-bst-to-greater-tree/
# 相同
#
#


# Definition for a binary tree node.
class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# @lc code=start
class Solution:

    def bstToGst(self, root: TreeNode) -> TreeNode:

        def dfs(node: TreeNode | None):
            nonlocal sum
            if node:
                dfs(node.right)
                sum += node.val
                node.val = sum
                dfs(node.left)

        sum = 0
        dfs(root)
        return root


# @lc code=end
