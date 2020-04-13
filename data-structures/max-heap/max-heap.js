/**
 * @name MaxHeap 最大堆
 * @description 堆是一个完全二叉树（把元素顺序排列成树的形状）
 * 特性：在最大堆中，某个节点的值总是不大于其父节点的值，根节点值（对应数组的第一个元素）为最大（最小堆相反）
 * 可以使用数组来模拟堆的结构（树）
 * 最大堆元素的上浮，以一个节点为起始点，当节点比它父节点值大时，互相交换位置
 * 最大堆元素的下沉，以一个节点为起始点，当节点比它的最大子节点还小时，互相交换位置
 * 应用：直接传入一个数组再转换成堆，比在空数组中一个一个添加元素生成堆效率更高
 * 堆结构可以用来排序和实现优先队列
 */
class MaxHeap {
  constructor(arr) {
    if (!arr) {
      this.data = new Array()
    } else {
      // 将一个数组转换成堆
      if (Array.isArray(arr)) {
        this.data = arr

        // 从最后一个非叶子节点开始下沉，直到第一个元素
        // 因为减少了叶子节点的下沉，比起在空堆中一个一个添加元素效率更高
        for (let i = this.parent(this.size() - 1); i >= 0; i--) {
          this._siftDown(i)
        }
      }
    }
  }

  // 获取堆中的元素数量
  size() {
    return this.data.length
  }

  // 判断堆是否为空
  isEmpty() {
    return this.data.length === 0
  }

  // 获取元素的父亲节点的索引
  parent(index) {
    if (index === 0) {
      throw new Error("Index 0 doesn't have parent.")
    }

    return Math.floor((index - 1) / 2)
  }

  // 获取左孩子节点的索引
  leftChild(index) {
    return index * 2 + 1
  }

  // 获取右孩子节点的索引
  rightChild(index) {
    return index * 2 + 2
  }

  // 添加元素
  add(val) {
    this.data.push(val)
    this._siftUp(this.size() - 1)
  }

  // 元素上浮
  _siftUp(index) {
    // 父节点比子节点小时，交换节点位置
    while (index > 0 && this.data[this.parent(index)] < this.data[index]) {
      this._swap(index, this.parent(index))
      index = this.parent(index)
    }
  }

  // 交换堆中两个元素的位置
  _swap(i, j) {
    ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }

  // 查找最大元素
  findMax() {
    if (this.isEmpty()) {
      throw new Error('Can not findMax when heap is empty.')
    }
    return this.data[0]
  }

  // 取出最大元素
  extractMax() {
    const ret = this.findMax() // 先存储返回值（第一个元素）
    this._swap(0, this.size() - 1) // 第一个元素和最后一个元素交换位置
    this.data.pop() // 删除最后一个元素（即原来的第一个元素）
    this._siftDown(0) // 现在的第一个元素下浮

    return ret
  }

  // 元素下沉
  _siftDown(index) {
    // 当存在左子节点时
    while (this.leftChild(index) < this.size()) {
      let maxIndex = this.leftChild(index)

      // 如果存在右子节点且比左子节点的值更大时，最大的子节点索引赋值为右子节点
      if (maxIndex + 1 && this.data[maxIndex + 1] > this.data[maxIndex]) {
        maxIndex = this.rightChild(index)
      }

      // 父节点大于子节点时，下沉终止
      if (this.data[index] >= this.data[maxIndex]) {
        break
      }

      this._swap(index, maxIndex)
      index = maxIndex // 继续下沉
    }
  }

  // 取出堆中的最大值，并且替换成 val
  replace(val) {
    const ret = this.findMax()
    this.data[0] = val
    this._siftDown(0)
    return ret
  }
}

module.exports = MaxHeap
