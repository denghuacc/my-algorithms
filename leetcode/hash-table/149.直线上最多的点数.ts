/*
 * @lc app=leetcode.cn id=149 lang=typescript
 *
 * [149] 直线上最多的点数
 *
 * https://leetcode-cn.com/problems/max-points-on-a-line/description/
 *
 * algorithms
 * Hard (25.77%)
 * Likes:    269
 * Dislikes: 0
 * Total Accepted:    27K
 * Total Submissions: 98.7K
 * Testcase Example:  '[[1,1],[2,2],[3,3]]'
 *
 * 给你一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点。求最多有多少个点在同一条直线上。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[1,1],[2,2],[3,3]]
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * points[i].length == 2
 * -10^4 i, yi
 * points 中的所有点 互不相同
 *
 *
 */

// @lc code=start
// hash table
function maxPoints(points: number[][]): number {
  const n = points.length;
  if (n <= 2) {
    return n;
  }
  let ret = 0;
  for (let i = 0; i < n; i++) {
    if (ret >= n - i || ret > n / 2) {
      break;
    }
    const map: Map<number, number> = new Map();
    for (let j = i + 1; j < n; j++) {
      let x = points[i][0] - points[j][0];
      let y = points[i][1] - points[j][1];
      if (x === 0) {
        y = 1;
      } else if (y === 0) {
        x = 1;
      } else {
        if (y < 0) {
          x = -x;
          y = -y;
        }
        const gcdXY = gcd(Math.abs(x), Math.abs(y));
        x /= gcdXY;
        y /= gcdXY;
      }
      const key = y + x * 20001;
      map.set(key, (map.get(key) || 0) + 1);
    }
    let max = 0;
    for (const num of map.values()) {
      max = Math.max(max, num + 1);
    }
    ret = Math.max(ret, max);
  }
  return ret;

  function gcd(a: number, b: number): number {
    return b != 0 ? gcd(b, a % b) : a;
  }
}
// @lc code=end
