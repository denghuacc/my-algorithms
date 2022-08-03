/*
 * @lc app=leetcode.cn id=952 lang=typescript
 *
 * [952] 按公因数计算最大组件大小
 *
 * https://leetcode.cn/problems/largest-component-size-by-common-factor/description/
 *
 * algorithms
 * Hard (38.07%)
 * Likes:    131
 * Dislikes: 0
 * Total Accepted:    11.8K
 * Total Submissions: 24.8K
 * Testcase Example:  '[4,6,15,35]'
 *
 * 给定一个由不同正整数的组成的非空数组 nums ，考虑下面的图：
 *
 *
 * 有 nums.length 个节点，按从 nums[0] 到 nums[nums.length - 1] 标记；
 * 只有当 nums[i] 和 nums[j] 共用一个大于 1 的公因数时，nums[i] 和 nums[j]之间才有一条边。
 *
 *
 * 返回 图中最大连通组件的大小 。
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
 * 输入：nums = [4,6,15,35]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：nums = [20,50,9,63]
 * 输出：2
 *
 *
 * 示例 3：
 *
 *
 *
 *
 * 输入：nums = [2,3,6,7,4,12,21,39]
 * 输出：8
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * 1 <= nums[i] <= 10^5
 * nums 中所有值都 不同
 *
 *
 */

import * as _ from "lodash";

export {};

// @lc code=start
class UnionFind {
  parent: number[];
  rank: number[];

  constructor(n: number) {
    this.parent = new Array(n).fill(0).map((_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  union(x: number, y: number) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }

  find(x: number) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }
}

function largestComponentSize(nums: number[]): number {
  const m = _.max(nums)!;
  const uf = new UnionFind(m + 1);
  for (const num of nums) {
    for (let i = 2; i * i <= num; i++) {
      if (num % i === 0) {
        uf.union(num, i);
        uf.union(num, Math.floor(num / i));
      }
    }
  }
  const counts = new Array(m + 1).fill(0);
  let res = 0;
  for (const num of nums) {
    const root = uf.find(num);
    counts[root]++;
    res = Math.max(res, counts[root]);
  }
  return res;
}
// @lc code=end
