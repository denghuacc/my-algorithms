/**
 * 
设计一个算法，找出数组中最小的k个数。以任意顺序返回这k个数均可。

示例：
输入： arr = [1,3,5,7,2,4,6,8], k = 4
输出： [1,2,3,4]

提示：
- 0 <= len(arr) <= 100000
- 0 <= k <= min(100000, len(arr))

难度：中等

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/smallest-k-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

class Heap<T> {
  items: T[] = [];
  compare: (a: T, b: T) => boolean;

  constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b) {
    this.items = [];
    this.compare = compare;
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  private parent(index: number): number {
    if (index !== 0) {
      return Math.floor((index - 1) / 2);
    } else {
      return 0;
    }
  }

  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  push(val: T) {
    this.items.push(val);
    this.siftUp(this.size - 1);
  }

  pop(): T | undefined {
    const res = this.peek();
    this.swap(this.items, 0, this.size - 1);
    this.items.pop();
    this.siftDown(0);
    return res;
  }

  peek(): T | undefined {
    if (!this.isEmpty()) {
      return this.items[0];
    }
  }

  private siftUp(index: number): void {
    while (
      index > 0 &&
      this.compare(this.items[index], this.items[this.parent(index)])
    ) {
      this.swap(this.items, index, this.parent(index));
      index = this.parent(index);
    }
  }

  private siftDown(index: number): void {
    while (this.leftChild(index) < this.size) {
      let idx = this.leftChild(index);

      if (idx + 1 && this.compare(this.items[idx + 1], this.items[idx])) {
        idx = this.rightChild(index);
      }
      if (this.compare(this.items[index], this.items[idx])) {
        break;
      }
      this.swap(this.items, index, idx);
      index = idx;
    }
  }

  private swap(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// heap
function smallestK(arr: number[], k: number): number[] {
  const minHeap = new Heap<number>();
  for (const num of arr) {
    minHeap.push(num);
  }
  const res: number[] = [];
  while (k > 0) {
    res.push(minHeap.pop()!);
    k--;
  }
  return res;
}

export {};
