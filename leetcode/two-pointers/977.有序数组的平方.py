#
# @lc app=leetcode.cn id=977 lang=python3
#
# [977] 有序数组的平方
#
# https://leetcode.cn/problems/squares-of-a-sorted-array/description/
#
# algorithms
# Easy (68.51%)
# Likes:    1030
# Dislikes: 0
# Total Accepted:    735.5K
# Total Submissions: 1.1M
# Testcase Example:  '[-4,-1,0,3,10]'
#
# 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
#
#
#
#
#
#
# 示例 1：
#
#
# 输入：nums = [-4,-1,0,3,10]
# 输出：[0,1,9,16,100]
# 解释：平方后，数组变为 [16,1,0,9,100]
# 排序后，数组变为 [0,1,9,16,100]
#
# 示例 2：
#
#
# 输入：nums = [-7,-3,2,3,11]
# 输出：[4,9,9,49,121]
#
#
#
#
# 提示：
#
#
# 1 10^4
# -10^4
# nums 已按 非递减顺序 排序
#
#
#
#
# 进阶：
#
#
# 请你设计时间复杂度为 O(n) 的算法解决本问题
#
#
#

from typing import List


# @lc code=start
class Solution:

    def sortedSquares(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        i, j = 0, n - 1
        pos = n - 1
        while i <= j:
            if nums[i] * nums[i] > nums[j] * nums[j]:
                res[pos] = nums[i] * nums[i]
                i += 1
            else:
                res[pos] = nums[j] * nums[j]
                j -= 1
            pos -= 1
        return res


# @lc code=end
