/*
 * @lc app=leetcode.cn id=497 lang=typescript
 *
 * [497] 非重叠矩形中的随机点
 *
 * https://leetcode.cn/problems/random-point-in-non-overlapping-rectangles/description/
 *
 * algorithms
 * Medium (40.84%)
 * Likes:    76
 * Dislikes: 0
 * Total Accepted:    7.7K
 * Total Submissions: 18.3K
 * Testcase Example:  '["Solution","pick","pick","pick","pick","pick"]\n' +
  '[[[[-2,-2,1,1],[2,2,4,6]]],[],[],[],[],[]]'
 *
 * 给定一个由非重叠的轴对齐矩形的数组 rects ，其中 rects[i] = [ai, bi, xi, yi] 表示 (ai, bi) 是第 i
 * 个矩形的左下角点，(xi, yi) 是第 i
 * 个矩形的右上角点。设计一个算法来随机挑选一个被某一矩形覆盖的整数点。矩形周长上的点也算做是被矩形覆盖。所有满足要求的点必须等概率被返回。
 * 
 * 在给定的矩形覆盖的空间内的任何整数点都有可能被返回。
 * 
 * 请注意 ，整数点是具有整数坐标的点。
 * 
 * 实现 Solution 类:
 * 
 * 
 * Solution(int[][] rects) 用给定的矩形数组 rects 初始化对象。
 * int[] pick() 返回一个随机的整数点 [u, v] 在给定的矩形所覆盖的空间内。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入: 
 * ["Solution", "pick", "pick", "pick", "pick", "pick"]
 * [[[[-2, -2, 1, 1], [2, 2, 4, 6]]], [], [], [], [], []]
 * 输出: 
 * [null, [1, -2], [1, -1], [-1, -2], [-2, -2], [0, 0]]
 * 
 * 解释：
 * Solution solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
 * solution.pick(); // 返回 [1, -2]
 * solution.pick(); // 返回 [1, -1]
 * solution.pick(); // 返回 [-1, -2]
 * solution.pick(); // 返回 [-2, -2]
 * solution.pick(); // 返回 [0, 0]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= rects.length <= 100
 * rects[i].length == 4
 * -10^9 <= ai < xi <= 10^9
 * -10^9 <= bi < yi <= 10^9
 * xi - ai <= 2000
 * yi - bi <= 2000
 * 所有的矩形不重叠。
 * pick 最多被调用 10^4 次。
 * 
 * 
 */

export {};

// @lc code=start
class Solution {
  rects: number[][];
  // 矩形点数前缀和
  coordinates: number[];

  constructor(rects: number[][]) {
    this.rects = rects;
    this.coordinates = [0];
    for (const [a, b, x, y] of rects) {
      const count = (x - a + 1) * (y - b + 1);
      this.coordinates.push(count + this.coordinates.at(-1)!);
    }
  }

  pick(): number[] {
    // 点数随机值
    let k = Math.floor(Math.random() * this.coordinates.at(-1)!);
    // 根据点数权重获取到矩形索引
    const rectIndex = this.binarySearch(this.coordinates, k + 1) - 1;
    k -= this.coordinates[rectIndex];
    const [a, b, , y] = this.rects[rectIndex]!;
    const col = y - b + 1;
    const da = Math.floor(k / col);
    const db = k - col * da;
    return [a + da, b + db];
  }

  private binarySearch(coordinates: number[], target: number): number {
    let low = 0;
    let high = coordinates.length - 1;
    while (low <= high) {
      const mid = Math.floor((high - low) / 2) + low;
      const num = coordinates[mid];
      if (num === target) {
        return mid;
      } else if (num > target) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(rects)
 * var param_1 = obj.pick()
 */
// @lc code=end
