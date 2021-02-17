/*
 * @lc app=leetcode.cn id=307 lang=typescript
 *
 * [307] 区域和检索 - 数组可修改
 *
 * https://leetcode-cn.com/problems/range-sum-query-mutable/description/
 *
 * algorithms
 * Medium (47.22%)
 * Total Accepted:    2.1K
 * Total Submissions: 4.2K
 * Testcase Example:  '["NumArray","sumRange","update","sumRange"]\n[[[1,3,5]],[0,2],[1,2],[0,2]]'
 *
 * 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。
 *
 * update(i, val) 函数可以通过将下标为 i 的数值更新为 val，从而对数列进行修改。
 *
 * 示例:
 *
 * Given nums = [1, 3, 5]
 *
 * sumRange(0, 2) -> 9
 * update(1, 2)
 * sumRange(0, 2) -> 8
 *
 *
 * 说明:
 *
 *
 * 数组仅可以在 update 函数下进行修改。
 * 你可以假设 update 函数与 sumRange 函数的调用次数是均匀分布的。
 *
 *
 */

export {};

// @lc code=start
class SegmentTree<T> {
  array: T[];
  tree: T[];
  merge: (a: T, b: T) => T;

  constructor(arr: T[] = [], merge: (a: T, b: T) => T) {
    this.array = [...arr]; // 数组数据
    this.tree = []; // 线段树数据
    this.merge = merge; // 融合函数 -> 可以是求区间值的和、求最大值、求最小值
    this._buildSegmentTree(0, 0, this.size - 1);
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

  get size() {
    return this.array.length;
  }

  get(index: number) {
    if (index >= 0 && index < this.size) {
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
      queryL >= this.size ||
      queryR < 0 ||
      queryR >= this.size ||
      queryL > queryR
    ) {
      throw new Error("Index is Illegal.");
    }
    return this._query(0, 0, this.size - 1, queryL, queryR);
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
    if (index >= 0 && index < this.size) {
      this.array[index] = val;
      this._set(0, 0, this.size - 1, index, val);
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

  update(i: number, val: number): void {
    this.segmentTree.set(i, val);
  }

  sumRange(i: number, j: number): number {
    return this.segmentTree.query(i, j);
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(i,val)
 * var param_2 = obj.sumRange(i,j)
 */
// @lc code=end
