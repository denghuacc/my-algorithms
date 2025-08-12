/*
 * @lc app=leetcode.cn id=3479 lang=typescript
 *
 * [3479] 将水果装入篮子 III
 *
 * https://leetcode.cn/problems/fruits-into-baskets-iii/description/
 *
 * algorithms
 * Medium (39.68%)
 * Likes:    30
 * Dislikes: 0
 * Total Accepted:    6.8K
 * Total Submissions: 14.3K
 * Testcase Example:  '[4,2,5]\n[3,5,4]'
 *
 * 给你两个长度为 n 的整数数组，fruits 和 baskets，其中 fruits[i] 表示第 i 种水果的 数量，baskets[j] 表示第 j
 * 个篮子的 容量。
 *
 * 你需要对 fruits 数组从左到右按照以下规则放置水果：
 *
 *
 * 每种水果必须放入第一个 容量大于等于 该水果数量的 最左侧可用篮子 中。
 * 每个篮子只能装 一种 水果。
 * 如果一种水果 无法放入 任何篮子，它将保持 未放置。
 *
 *
 * 返回所有可能分配完成后，剩余未放置的水果种类的数量。
 *
 *
 *
 * 示例 1
 *
 *
 * 输入： fruits = [4,2,5], baskets = [3,5,4]
 *
 * 输出： 1
 *
 * 解释：
 *
 *
 * fruits[0] = 4 放入 baskets[1] = 5。
 * fruits[1] = 2 放入 baskets[0] = 3。
 * fruits[2] = 5 无法放入 baskets[2] = 4。
 *
 *
 * 由于有一种水果未放置，我们返回 1。
 *
 *
 * 示例 2
 *
 *
 * 输入： fruits = [3,6,1], baskets = [6,4,7]
 *
 * 输出： 0
 *
 * 解释：
 *
 *
 * fruits[0] = 3 放入 baskets[0] = 6。
 * fruits[1] = 6 无法放入 baskets[1] = 4（容量不足），但可以放入下一个可用的篮子 baskets[2] = 7。
 * fruits[2] = 1 放入 baskets[1] = 4。
 *
 *
 * 由于所有水果都已成功放置，我们返回 0。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == fruits.length == baskets.length
 * 1 <= n <= 10^5
 * 1 <= fruits[i], baskets[i] <= 10^9
 *
 *
 */

// @lc code=start
// cv
function numOfUnplacedFruits(fruits: number[], baskets: number[]): number {
  const m = baskets.length;
  // 如果没有篮子，所有水果都无法放置
  if (m === 0) {
    return fruits.length;
  }

  // 构建线段树来维护篮子的容量信息
  const segTree = new SegTree(baskets);
  let cnt = 0; // 统计无法放置的水果数量

  // 遍历每种水果，尝试放置
  for (const fruit of fruits) {
    let l = 0;
    let r = m - 1;
    let res = -1; // 找到的最左侧可用篮子索引

    // 二分查找第一个容量大于等于当前水果数量的篮子
    while (l <= r) {
      const mid = Math.floor((l + r) / 2);
      // 查询区间 [0, mid] 内的最大容量
      if (segTree.query(1, 0, m - 1, 0, mid) >= fruit) {
        res = mid;
        r = mid - 1; // 继续向左查找更早的篮子
      } else {
        l = mid + 1; // 向右查找
      }
    }

    // 如果找不到合适的篮子，水果无法放置
    if (res === -1) {
      cnt++;
    } else {
      // 将找到的篮子容量设为0，表示已被使用
      segTree.update(1, 0, m - 1, res, 0);
    }
  }

  return cnt;
}

/**
 * 线段树类，用于维护篮子容量的区间最大值
 * 支持区间查询最大值和单点更新
 */
class SegTree {
  private segNode: number[]; // 线段树节点数组
  private baskets: number[]; // 原始篮子容量数组
  private n: number; // 篮子数量

  constructor(baskets: number[]) {
    this.baskets = baskets;
    this.n = baskets.length;
    // 线段树需要4倍空间
    this.segNode = new Array(this.n * 4 + 7).fill(0);
    this.build(1, 0, this.n - 1);
  }

  /**
   * 构建线段树
   * @param p 当前节点索引
   * @param l 当前节点表示的区间左端点
   * @param r 当前节点表示的区间右端点
   */
  private build(p: number, l: number, r: number) {
    if (l === r) {
      // 叶子节点，存储原始篮子容量
      this.segNode[p] = this.baskets[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    // 递归构建左右子树
    this.build(p * 2, l, mid);
    this.build(p * 2 + 1, mid + 1, r);
    // 父节点存储左右子树的最大值
    this.segNode[p] = Math.max(this.segNode[p * 2], this.segNode[p * 2 + 1]);
  }

  /**
   * 查询区间 [ql, qr] 内的最大值
   * @param p 当前节点索引
   * @param l 当前节点表示的区间左端点
   * @param r 当前节点表示的区间右端点
   * @param ql 查询区间左端点
   * @param qr 查询区间右端点
   * @returns 区间最大值
   */
  query(p: number, l: number, r: number, ql: number, qr: number): number {
    // 区间不重叠，返回0
    if (ql > r || qr < l) return 0;
    // 当前区间完全包含在查询区间内，直接返回节点值
    if (ql <= l && qr >= r) return this.segNode[p];

    const mid = Math.floor((l + r) / 2);
    // 递归查询左右子树，取最大值
    return Math.max(
      this.query(p * 2, l, mid, ql, qr),
      this.query(p * 2 + 1, mid + 1, r, ql, qr)
    );
  }

  /**
   * 更新单个篮子的容量
   * @param p 当前节点索引
   * @param l 当前节点表示的区间左端点
   * @param r 当前节点表示的区间右端点
   * @param idx 要更新的篮子索引
   * @param val 新的容量值
   */
  update(p: number, l: number, r: number, idx: number, val: number) {
    if (l === r) {
      // 到达叶子节点，更新容量
      this.segNode[p] = val;
      return;
    }

    const mid = Math.floor((l + r) / 2);
    // 根据索引决定更新左子树还是右子树
    if (idx <= mid) {
      this.update(p * 2, l, mid, idx, val);
    } else {
      this.update(p * 2 + 1, mid + 1, r, idx, val);
    }
    // 更新父节点的最大值
    this.segNode[p] = Math.max(this.segNode[p * 2], this.segNode[p * 2 + 1]);
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 贪心分配问题：每种水果必须放入第一个容量足够的最左侧篮子
   - 动态维护篮子状态：篮子被使用后容量变为0
   - 统计无法放置的水果种类数量

2. 算法分析：
   - 时间复杂度：O(n log n)
     * 遍历每种水果：O(n)
     * 每次二分查找：O(log n)
     * 线段树查询和更新：O(log n)
   - 空间复杂度：O(n)
     * 线段树需要4倍空间：O(4n)
   - 算法类型：贪心 + 线段树

3. 实现要点：
   - 使用线段树维护篮子容量的区间最大值
   - 二分查找确保找到最左侧的可用篮子
   - 篮子被使用后立即更新为0容量
   - 统计无法找到合适篮子的水果数量

4. 优化思路：
   - 线段树用于区间最值查询和单点更新
   - 二分查找确保贪心策略的正确性
   - 动态维护篮子状态，避免重复使用

5. 关键技巧：
   - 线段树用于区间最值查询和单点更新
   - 二分查找确保贪心策略的正确性
   - 动态维护篮子状态，避免重复使用

6. 边界情况：
   - 没有篮子时，所有水果都无法放置
   - 所有篮子容量都小于水果数量时，所有水果都无法放置
   - 所有水果都能放置时，返回0

7. 类似问题：
   - 区间调度问题
   - 资源分配问题
   - 贪心算法中的区间最值维护
*/
