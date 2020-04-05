/*
 * @lc app=leetcode.cn id=303 lang=javascript
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

// @lc code=start
class SegmentTree {
  constructor(arr = [], merge = () => {}) {
    // 数组降维
    if (Array.isArray) {
      while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
      }
    }

    this.data = [] // 数组数据
    arr.forEach(item => this.data.push(item))

    this.tree = [] // 线段树数据
    this.merge = merge
    this._buildSegmentTree(0, 0, this.getSize() - 1)
  }

  _buildSegmentTree(treeIndex, start, end) {
    if (start === end) {
      this.tree[treeIndex] = this.data[start]
      return
    }

    let leftTreeIndex = this.leftChild(treeIndex)
    let rightTreeIndex = this.rightChild(treeIndex)

    let mid = Math.floor(start + (end - start) / 2)

    this._buildSegmentTree(leftTreeIndex, start, mid)
    this._buildSegmentTree(rightTreeIndex, mid + 1, end)

    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    )
  }

  getSize() {
    return this.data.length
  }

  get(index) {
    if (index < 0 || index >= this.getSize()) {
      throw new Error('Index is Illegal.')
    }

    return this.data[index]
  }

  leftChild(index) {
    return index * 2 + 1
  }

  rightChild(index) {
    return index * 2 + 2
  }

  query(queryL, queryR) {
    if (
      queryL < 0 ||
      queryL >= this.getSize() ||
      queryR < 0 ||
      queryR >= this.getSize() ||
      queryL > queryR
    ) {
      throw new Error('Index is Illegal.')
    }
    return this._query(0, 0, this.getSize() - 1, queryL, queryR)
  }

  _query(treeIndex, start, end, queryL, queryR) {
    if (queryL === start && queryR === end) {
      return this.tree[treeIndex]
    }

    let mid = Math.floor(start + (end - start) / 2)

    let leftTreeIndex = this.leftChild(treeIndex)
    let rightTreeIndex = this.rightChild(treeIndex)

    if (queryL >= mid + 1) {
      return this._query(rightTreeIndex, mid + 1, end, queryL, queryR)
    } else if (queryR <= mid) {
      return this._query(leftTreeIndex, start, mid, queryL, queryR)
    }

    let leftResult = this._query(leftTreeIndex, start, mid, queryL, mid)
    let rightResult = this._query(rightTreeIndex, mid + 1, end, mid + 1, queryR)

    return this.merge(leftResult, rightResult)
  }

  set(index, element) {
    if (index < 0 || index >= this.getSize()) {
      throw new Error('Index is Illegal.')
    }

    this.data[index] = element
    this._set(0, 0, this.getSize() - 1, index, element)
  }

  _set(treeIndex, start, end, index, element) {
    if (start === end) {
      this.tree[treeIndex] = element
      return
    }

    let mid = Math.floor(start + (end - start) / 2)

    let leftTreeIndex = this.leftChild(treeIndex)
    let rightTreeIndex = this.rightChild(treeIndex)

    if (index >= mid + 1) {
      this._set(rightTreeIndex, mid + 1, end, index, element)
    } else {
      this._set(leftTreeIndex, start, mid, index, element)
    }

    this.tree[treeIndex] = this.merge(
      this.tree[leftTreeIndex],
      this.tree[rightTreeIndex]
    )
  }
}

/**
 * @param {number[]} nums
 * 使用线段树结构解题
 */
var NumArray = function (nums) {
  if (nums.length > 0) {
    this.segmentTree = new SegmentTree(nums, (a, b) => a + b)
  }
}

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  return this.segmentTree.query(i, j)
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
// @lc code=end
