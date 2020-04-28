/*
 * @lc app=leetcode.cn id=137 lang=javascript
 *
 * [137] 只出现一次的数字 II
 *
 * https://leetcode-cn.com/problems/single-number-ii/description/
 *
 * algorithms
 * Medium (62.16%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    27.1K
 * Total Submissions: 40.8K
 * Testcase Example:  '[2,2,3,2]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
 *
 * 说明：
 *
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 *
 * 示例 1:
 *
 * 输入: [2,2,3,2]
 * 输出: 3
 *
 *
 * 示例 2:
 *
 * 输入: [0,1,0,1,0,1,99]
 * 输出: 99
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * map
 */
var singleNumber = function (nums) {
  const map = new Map()

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }

  for (const num of nums) {
    if (map.get(num) === 1) {
      return num
    }
  }
}

// 3∗(a+b+c)−(a+a+b+b+c)=c
var singleNumber = function (nums) {
  let [sumOfSet, sumOfNums] = [0, 0]
  const set = new Set()

  for (const num of nums) {
    if (!set.has(num)) {
      set.add(num)
      sumOfSet += num
    }
    sumOfNums += num
  }

  return (3 * sumOfSet - sumOfNums) / 2
}

var singleNumber = function (nums) {
  let [seenOnce, seenTwice] = [0, 0]
  for (const num of nums) {
    seenOnce = ~seenTwice & (seenOnce ^ num)
    seenTwice = ~seenOnce & (seenTwice ^ num)
  }
  return seenOnce
}
// @lc code=end
