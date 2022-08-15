/**
 * @name MinHeap 最小堆
 * @description 堆是一个完全二叉树（把元素顺序排列成树的形状）
 * 特性：在最小堆中，其父节点的值总是不大于其子节点的值，根节点值（对应数组的第一个元素）为最小（最大堆相反）
 * 可以使用数组来模拟堆的结构（树）
 * 元素的上浮，以一个节点为起始点，当节点比它父节点值小时，互相交换位置
 * 元素的下沉，以一个节点为起始点，当节点比它的最小子节点还大时，互相交换位置
 * 应用：直接传入一个数组再转换成堆，比在空数组中一个一个添加元素生成堆效率更高
 * 堆结构可以用来排序和实现优先队列
 */
export default class MinHeap<T> {
  data: T[] = [];

  constructor(arr?: T[]) {
    if (!arr) {
      this.data = [];
    } else {
      // 将一个数组转换成堆
      if (Array.isArray(arr) && arr.length !== 0) {
        this.data = arr;

        // 从最后一个非叶子节点开始下沉，直到第一个元素
        // 因为减少了叶子节点的下沉，比起在空堆中一个一个添加元素效率更高
        for (let i = this.parent(this.size - 1); i >= 0; i--) {
          this.siftDown(i);
        }
      }
    }
  }

  // 获取堆中的元素数量
  get size(): number {
    return this.data.length;
  }

  // 判断堆是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 获取元素的父亲节点的索引
  private parent(index: number): number {
    if (index !== 0) {
      return Math.floor((index - 1) / 2);
    } else {
      return 0;
    }
  }

  // 获取左孩子节点的索引
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 获取右孩子节点的索引
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // 添加元素
  add(val: T): void {
    this.data.push(val);
    this.siftUp(this.size - 1);
  }

  // 查找最大元素
  findMin(): T | undefined {
    if (!this.isEmpty()) {
      return this.data[0];
    }
  }

  // 取出最小元素
  extractMin(): T | undefined {
    const ret = this.findMin(); // 先存储返回值（第一个元素）
    swap(this.data, 0, this.size - 1); // 第一个元素和最后一个元素交换位置
    this.data.pop(); // 删除最后一个元素（即原来的第一个元素）
    this.siftDown(0); // 现在的第一个元素下浮
    return ret;
  }

  // 取出堆中的最小值，并且替换成 val
  replace(val: T): T | undefined {
    const ret = this.findMin();
    this.data[0] = val;
    this.siftDown(0);
    return ret;
  }

  // 元素上浮
  private siftUp(index: number): void {
    // 父节点比子节点大时，交换节点位置
    while (index > 0 && this.data[this.parent(index)] > this.data[index]) {
      swap(this.data, index, this.parent(index));
      index = this.parent(index);
    }
  }

  // 元素下沉
  private siftDown(index: number): void {
    // 当存在左子节点时
    while (this.leftChild(index) < this.size) {
      let minIndex = this.leftChild(index);

      // 如果存在右子节点且比左子节点的值更小时，最小的子节点索引赋值为右子节点
      if (minIndex + 1 && this.data[minIndex + 1] < this.data[minIndex]) {
        minIndex = this.rightChild(index);
      }

      // 父节点小于子节点时，下沉终止
      if (this.data[index] <= this.data[minIndex]) break;

      swap(this.data, index, minIndex);
      index = minIndex; // 继续下沉
    }
  }
}

function swap<T>(array: T[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];
}
