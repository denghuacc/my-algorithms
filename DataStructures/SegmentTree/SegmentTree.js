/**
 * @name SegmentTree 线段树
 * @description 线段树主要解决涉及区间(线段)的问题，比如某个区间的查询、更新
 * 线段树不是完全二叉树，但是平衡二叉树
 * 线段树实现，有 2 个数据库，一个是普通的数组结构，
 * 一个是转换成树结构，容量大概为数组结构的 4 倍，倒数第二层的叶子节点的左右孩子使用 null 或者 empty 填充
 * 线段树结构是高级数据结构，面试一般比较少考
 */
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

    // this.data = new Array(...arr) //  不建议
    this.tree = [] // 线段树数据
    this.merge = merge // 处理融合的函数；可以是求区间值的和、求最大值、求最小值
    this._buildSegmentTree(0, 0, this.getSize() - 1)
  }

  // 在 treeIndex 的位置创建表示区间 [start...end] 的线段树
  _buildSegmentTree(treeIndex, start, end) {
    if (start === end) {
      this.tree[treeIndex] = this.data[start]
      return
    }

    let leftTreeIndex = this.leftChild(treeIndex)
    let rightTreeIndex = this.rightChild(treeIndex)

    let mid = Math.floor(start + (end - start) / 2)

    this._buildSegmentTree(leftTreeIndex, start, mid) // 递归创建左边的子节点线段树
    this._buildSegmentTree(rightTreeIndex, mid + 1, end) // 递归创建右边的子节点线段树

    // 融合左右两边的线段树
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

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
  leftChild(index) {
    return index * 2 + 1
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
  rightChild(index) {
    return index * 2 + 2
  }

  // 返回区间 [queryL, queryR] 的值
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

  // 在以 treeIndex 为根的线段树中 [start...end] 的范围里，搜索区间 [queryL...queryR] 的值
  _query(treeIndex, start, end, queryL, queryR) {
    if (queryL === start && queryR === end) {
      return this.tree[treeIndex]
    }

    let mid = Math.floor(start + (end - start) / 2)

    // treeIndex 的节点分为 [start...mid] 和 [mid+1...end] 两部分
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

  // 将 index 位置的值，更新为 element
  set(index, element) {
    if (index < 0 || index >= this.getSize()) {
      throw new Error('Index is Illegal.')
    }

    this.data[index] = element
    this._set(0, 0, this.getSize() - 1, index, element)
  }

  // 在以 treeIndex 为根的线段树中更新 index 的值为 element
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

module.exports = SegmentTree
