/*
 * @lc app=leetcode.cn id=480 lang=typescript
 *
 * [480] 滑动窗口中位数
 *
 * https://leetcode-cn.com/problems/sliding-window-median/description/
 *
 * algorithms
 * Hard (43.09%)
 * Likes:    219
 * Dislikes: 0
 * Total Accepted:    18.7K
 * Total Submissions: 43.4K
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 中位数是有序序列最中间的那个数。如果序列的长度是偶数，则没有最中间的数；此时中位数是最中间的两个数的平均数。
 *
 * 例如：
 *
 *
 * [2,3,4]，中位数是 3
 * [2,3]，中位数是 (2 + 3) / 2 = 2.5
 *
 *
 * 给你一个数组 nums，有一个长度为 k 的窗口从最左端滑动到最右端。窗口中有 k 个数，每次窗口向右移动 1
 * 位。你的任务是找出每次窗口移动后得到的新窗口中元素的中位数，并输出由它们组成的数组。
 *
 *
 *
 * 示例：
 *
 * 给出 nums = [1,3,-1,-3,5,3,6,7]，以及 k = 3。
 *
 *
 * 窗口位置                      中位数
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       1
 * ⁠1 [3  -1  -3] 5  3  6  7      -1
 * ⁠1  3 [-1  -3  5] 3  6  7      -1
 * ⁠1  3  -1 [-3  5  3] 6  7       3
 * ⁠1  3  -1  -3 [5  3  6] 7       5
 * ⁠1  3  -1  -3  5 [3  6  7]      6
 *
 *
 * 因此，返回该滑动窗口的中位数数组 [1,-1,-1,3,5,6]。
 *
 *
 *
 * 提示：
 *
 *
 * 你可以假设 k 始终有效，即：k 始终小于输入的非空数组的元素个数。
 * 与真实值误差在 10 ^ -5 以内的答案将被视作正确答案。
 *
 *
 */

// @lc code=start
// sliding window
function medianSlidingWindow(nums: number[], k: number): number[] {
  if (!k || !nums.length) return [];
  let pq = new PQ();
  let ret: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    pq.add(nums[i]);
    if (i >= k) pq.del(nums[i - k]); // 窗口左边移动
    if (i >= k - 1) {
      // 当窗口大小为 k 时 就可以把中位数加入结果数组了
      let val = pq.getMid(k % 2);
      ret.push(val);
    }
  }
  return ret;
}

class PQ {
  queue: number[];

  constructor() {
    this.queue = [];
  }

  // 添加 用二分查找 找到要插入的位置
  add(val: number) {
    let left = 0;
    let right = this.queue.length - 1;
    while (left <= right) {
      let mid = left + Math.floor((right - left) / 2);
      if (this.queue[mid] > val) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    this.queue.splice(left, 0, val);
  }

  del(val: number) {
    const index = this.queue.indexOf(val);
    this.queue.splice(index, 1);
  }

  getMid(isOdd: number): number {
    const mid = Math.floor(this.queue.length / 2);
    return isOdd
      ? this.queue[mid]
      : (this.queue[mid - 1] + this.queue[mid]) / 2;
  }
}

// @lc code=end
