/*
 * @lc app=leetcode.cn id=295 lang=typescript
 *
 * [295] 数据流的中位数
 *
 * https://leetcode-cn.com/problems/find-median-from-data-stream/description/
 *
 * algorithms
 * Hard (52.06%)
 * Likes:    479
 * Dislikes: 0
 * Total Accepted:    47.8K
 * Total Submissions: 91.6K
 * Testcase Example:  '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n' +
  '[[],[1],[2],[],[3],[]]'
 *
 * 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
 * 
 * 例如，
 * 
 * [2,3,4] 的中位数是 3
 * 
 * [2,3] 的中位数是 (2 + 3) / 2 = 2.5
 * 
 * 设计一个支持以下两种操作的数据结构：
 * 
 * 
 * void addNum(int num) - 从数据流中添加一个整数到数据结构中。
 * double findMedian() - 返回目前所有元素的中位数。
 * 
 * 
 * 示例：
 * 
 * addNum(1)
 * addNum(2)
 * findMedian() -> 1.5
 * addNum(3) 
 * findMedian() -> 2
 * 
 * 进阶:
 * 
 * 
 * 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 
 * 
 */

// @lc code=start
class MedianFinder {
  list: number[];

  constructor() {
    this.list = [];
  }

  addNum(num: number): void {
    const n = this.list.length;
    if (n === 0) {
      this.list.push(num);
    } else {
      let left = 0;
      let right = n - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (this.list[mid] < num) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      this.list.splice(right + 1, 0, num);
    }
  }

  findMedian(): number {
    const n = this.list.length;
    return (
      (this.list[Math.floor(n / 2)] + this.list[Math.floor((n - 1) / 2)]) / 2
    );
  }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end
