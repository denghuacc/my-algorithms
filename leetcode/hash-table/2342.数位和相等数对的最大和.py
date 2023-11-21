# @lc app=leetcode.cn id=2342 lang=python3
#
# [2342] 数位和相等数对的最大和
#
# https://leetcode.cn/problems/max-sum-of-a-pair-with-equal-sum-of-digits/description/
#
# algorithms
# Medium (53.82%)
# Likes:    73
# Dislikes: 0
# Total Accepted:    28.1K
# Total Submissions: 45.6K
# Testcase Example:  '[18,43,36,13,7]'
#
# 给你一个下标从 0 开始的数组 nums ，数组中的元素都是 正 整数。请你选出两个下标 i 和 j（i != j），且 nums[i] 的数位和 与
# nums[j] 的数位和相等。
#
# 请你找出所有满足条件的下标 i 和 j ，找出并返回 nums[i] + nums[j] 可以得到的 最大值 。
#
#
#
# 示例 1：
#
#
# 输入：nums = [18,43,36,13,7]
# 输出：54
# 解释：满足条件的数对 (i, j) 为：
# - (0, 2) ，两个数字的数位和都是 9 ，相加得到 18 + 36 = 54 。
# - (1, 4) ，两个数字的数位和都是 7 ，相加得到 43 + 7 = 50 。
# 所以可以获得的最大和是 54 。
#
# 示例 2：
#
#
# 输入：nums = [10,12,19,14]
# 输出：-1
# 解释：不存在满足条件的数对，返回 -1 。
#
#
#
#
# 提示：
#
#
# 1 <= nums.length <= 10^5
# 1 <= nums[i] <= 10^9
#
#
#

from operator import contains
from typing import List


# @lc code=start
class Solution:

    def maximumSum(self, nums: List[int]) -> int:
        map = {}
        for i in range(len(nums)):
            num = nums[i]
            sum = self.getSum(num)
            if contains(map, sum):
                val = map[sum]
                cnt, arr = val[0], val[1]
                if len(arr) < 2:
                    if num >= arr[0]:
                        arr = [num, arr[0]]
                    else:
                        arr = [arr[0], num]
                else:
                    if num >= arr[0]:
                        arr = [num, arr[0]]
                    elif num < arr[0] and num > arr[1]:
                        arr = [arr[0], num]
                map[sum] = (cnt + 1, arr)
            else:
                map[sum] = (1, [num])
        maxSum = 0
        for _, val in map.items():
            if val[0] >= 2:
                maxSum = max(maxSum, val[1][0] + val[1][1])
        if maxSum == 0:
            return -1
        else:
            return maxSum

    def getSum(self, num: int) -> int:
        sum = 0
        while num > 0:
            sum += num % 10
            num = num // 10
        return sum


# @lc code=end
