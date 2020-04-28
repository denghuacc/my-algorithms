/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 *
 * https://leetcode-cn.com/problems/single-number/description/
 *
 * algorithms
 * Easy (57.17%)
 * Likes:    1182
 * Dislikes: 0
 * Total Accepted:    181.6K
 * Total Submissions: 272.5K
 * Testcase Example:  '[2,2,1]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 *
 * 说明：
 *
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 *
 * 示例 1:
 *
 * 输入: [2,2,1]
 * 输出: 1
 *
 *
 * 示例 2:
 *
 * 输入: [4,1,2,1,2]
 * 输出: 4
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * set
 */
var singleNumber = function (nums) {
  const set = new Set()

  for (const num of nums) {
    if (!set.has(num)) {
      set.add(num)
    } else {
      set.delete(num)
    }
  }
  return [...set][0]
}

// map
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

// 2∗(a+b+c)−(a+a+b+b+c)=c
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

  return 2 * sumOfSet - sumOfNums
}

var singleNumber = function (nums) {
  let ret = 0
  for (const num of nums) {
    ret ^= num
  }
  return ret
}
// @lc code=end
