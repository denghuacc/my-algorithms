#
# @lc app=leetcode.cn id=1457 lang=python3
#
# [1457] 二叉树中的伪回文路径
#
# https://leetcode.cn/problems/pseudo-palindromic-paths-in-a-binary-tree/description/
#
# algorithms
# Medium (68.13%)
# Likes:    116
# Dislikes: 0
# Total Accepted:    24.3K
# Total Submissions: 35.7K
# Testcase Example:  '[2,3,1,3,1,null,1]'
#
# 给你一棵二叉树，每个节点的值为 1 到 9 。我们称二叉树中的一条路径是 「伪回文」的，当它满足：路径经过的所有节点值的排列中，存在一个回文序列。
#
# 请你返回从根到叶子节点的所有路径中 伪回文 路径的数目。
#
#
#
# 示例 1：
#
#
#
#
# 输入：root = [2,3,1,3,1,null,1]
# 输出：2
# 解释：上图为给定的二叉树。总共有 3 条从根到叶子的路径：红色路径 [2,3,3] ，绿色路径 [2,1,1] 和路径 [2,3,1] 。
# ⁠    在这些路径中，只有红色和绿色的路径是伪回文路径，因为红色路径 [2,3,3] 存在回文排列 [3,2,3] ，绿色路径 [2,1,1]
# 存在回文排列 [1,2,1] 。
#
#
# 示例 2：
#
#
#
#
# 输入：root = [2,1,1,1,3,null,null,null,null,null,1]
# 输出：1
# 解释：上图为给定二叉树。总共有 3 条从根到叶子的路径：绿色路径 [2,1,1] ，路径 [2,1,3,1] 和路径 [2,1] 。
# ⁠    这些路径中只有绿色路径是伪回文路径，因为 [2,1,1] 存在回文排列 [1,2,1] 。
#
#
# 示例 3：
#
#
# 输入：root = [9]
# 输出：1
#
#
#
#
# 提示：
#
#
# 给定二叉树的节点数目在范围 [1, 10^5] 内
# 1 <= Node.val <= 9
#
#
#

from typing import Optional


# Definition for a binary tree node.
class TreeNode:

    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# @lc code=start
class Solution:

    def pseudoPalindromicPaths(self, root: Optional[TreeNode]) -> int:
        counter = [0] * 10
        return self.dfs(root, counter)

    def dfs(self, root: Optional[TreeNode], counter: list[int]) -> int:
        if not root:
            return 0
        counter[root.val] += 1
        res = 0
        if not root.left and not root.right:
            if self.isPalindrome(counter):
                res += 1
        else:
            res += self.dfs(root.left, counter) + self.dfs(root.right, counter)
        counter[root.val] -= 1
        return res

    def isPalindrome(self, counter: list[int]) -> bool:
        odd = 0
        for c in counter:
            if c % 2 == 1:
                odd += 1
        return odd <= 1


# @lc code=end
