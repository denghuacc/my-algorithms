/*
 * @lc app=leetcode.cn id=303 lang=typescript
 *
 * [303] 区域和检索 - 数组不可变
 *
 * https://leetcode-cn.com/problems/range-sum-query-immutable/description/
 *
 * algorithms
 * Easy (50.79%)
 * Total Accepted:    9.4K
 * Total Submissions: 18K
 * Testcase Example:  '["NumArray","sumRange","sumRange","sumRange"]\n[[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]'
 *
 * 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
 *
 * 示例：
 *
 * 给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()
 *
 * sumRange(0, 2) -> 1
 * sumRange(2, 5) -> -1
 * sumRange(0, 5) -> -3
 *
 * 说明:
 *
 *
 * 你可以假设数组不可变。
 * 会多次调用 sumRange 方法。
 *
 *
 */

export {};

// @lc code=start
class SegmentTree<T> {
  array: Array<T>;
  tree: Array<T>;
  merge: (a: T, b: T) => T;

  constructor(arr: Array<T> = [], merge: (a: T, b: T) => T) {
    this.array = [...arr]; // 数组数据
    this.tree = []; // 线段树数据
    this.merge = merge; // 融合函数 -> 可以是求区间值的和、求最大值、求最小值
    this._buildSegmentTree(0, 0, this.size() - 1);
  }

  // 在 treeIndex 的位置创建表示区间 [start...end] 的线段树
  _buildSegmentTree(treeIndex: number, start: number, end: number) {
    if (start === end) {
      this.tree[treeIndex] = this.array[start];
      return;
    }

    let leftTreeIndex = this._leftChild(treeIndex);
    let rightTreeIndex = this._rightChild(treeIndex);

    let mid = Math.floor(start + (end - start) / 2);

    this._buildSegmentTree(leftTreeIndex, start, mid); // 递归创建左边的子节点线段树
    this._buildSegmentTree(rightTreeIndex, mid + 1, end); // 递归创建右边的子节点线段树

    // 融合左右两边的线段树
    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    );
  }

  size() {
    return this.array.length;
  }

  get(index: number) {
    if (index >= 0 && index < this.size()) {
      return this.array[index];
    }
  }

  // 获取左孩子节点索引
  _leftChild(index: number) {
    return index * 2 + 1;
  }

  // 获取右孩子节点索引
  _rightChild(index: number) {
    return index * 2 + 2;
  }

  // 搜索区间 [queryL, queryR] 的值
  query(queryL: number, queryR: number) {
    if (
      queryL < 0 ||
      queryL >= this.size() ||
      queryR < 0 ||
      queryR >= this.size() ||
      queryL > queryR
    ) {
      throw new Error("Index is Illegal.");
    }
    return this._query(0, 0, this.size() - 1, queryL, queryR);
  }

  // 在以 treeIndex 为根的线段树中 [start...end] 的范围里，搜索区间 [queryL...queryR] 的值
  _query(
    treeIndex: number,
    start: number,
    end: number,
    queryL: number,
    queryR: number
  ): T {
    if (queryL === start && queryR === end) {
      return this.tree[treeIndex];
    }

    let mid = Math.floor(start + (end - start) / 2);
    let leftTreeIndex = this._leftChild(treeIndex);
    let rightTreeIndex = this._rightChild(treeIndex);

    if (queryL >= mid + 1) {
      return this._query(rightTreeIndex, mid + 1, end, queryL, queryR);
    } else if (queryR <= mid) {
      return this._query(leftTreeIndex, start, mid, queryL, queryR);
    }

    let leftResult: T = this._query(leftTreeIndex, start, mid, queryL, mid);
    let rightResult: T = this._query(
      rightTreeIndex,
      mid + 1,
      end,
      mid + 1,
      queryR
    );

    return this.merge(leftResult, rightResult);
  }

  // 将 index 位置的值，设置为 val
  set(index: number, val: T) {
    if (index >= 0 && index < this.size()) {
      this.array[index] = val;
      this._set(0, 0, this.size() - 1, index, val);
    }
  }

  // 在以 treeIndex 为根的线段树中设置 index 的值为 val
  _set(treeIndex: number, start: number, end: number, index: number, val: T) {
    if (start === end) {
      this.tree[treeIndex] = val;
      return;
    }

    let mid = Math.floor(start + (end - start) / 2);
    let leftTreeIndex = this._leftChild(treeIndex);
    let rightTreeIndex = this._rightChild(treeIndex);

    if (index >= mid + 1) {
      this._set(rightTreeIndex, mid + 1, end, index, val);
    } else {
      this._set(leftTreeIndex, start, mid, index, val);
    }

    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    );
  }
}

// 使用线段树结构解题
class NumArray {
  segmentTree!: SegmentTree<number>;
  constructor(nums: number[]) {
    if (nums.length > 0) {
      this.segmentTree = new SegmentTree(nums, (a, b) => a + b);
    }
  }

  sumRange(i: number, j: number): number {
    return this.segmentTree.query(i, j);
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
// @lc code=end
