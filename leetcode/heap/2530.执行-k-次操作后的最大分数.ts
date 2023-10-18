/*
 * @lc app=leetcode.cn id=2530 lang=typescript
 *
 * [2530] 执行 K 次操作后的最大分数
 *
 * https://leetcode.cn/problems/maximal-score-after-applying-k-operations/description/
 *
 * algorithms
 * Medium (45.54%)
 * Likes:    38
 * Dislikes: 0
 * Total Accepted:    14K
 * Total Submissions: 26.3K
 * Testcase Example:  '[10,10,10,10,10]\n5'
 *
 * 给你一个下标从 0 开始的整数数组 nums 和一个整数 k 。你的 起始分数 为 0 。
 *
 * 在一步 操作 中：
 *
 *
 * 选出一个满足 0 <= i < nums.length 的下标 i ，
 * 将你的 分数 增加 nums[i] ，并且
 * 将 nums[i] 替换为 ceil(nums[i] / 3) 。
 *
 *
 * 返回在 恰好 执行 k 次操作后，你可能获得的最大分数。
 *
 * 向上取整函数 ceil(val) 的结果是大于或等于 val 的最小整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [10,10,10,10,10], k = 5
 * 输出：50
 * 解释：对数组中每个元素执行一次操作。最后分数是 10 + 10 + 10 + 10 + 10 = 50 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,10,3,3,3], k = 3
 * 输出：17
 * 解释：可以执行下述操作：
 * 第 1 步操作：选中 i = 1 ，nums 变为 [1,4,3,3,3] 。分数增加 10 。
 * 第 2 步操作：选中 i = 1 ，nums 变为 [1,2,3,3,3] 。分数增加 4 。
 * 第 3 步操作：选中 i = 2 ，nums 变为 [1,1,1,3,3] 。分数增加 3 。
 * 最后分数是 10 + 4 + 3 = 17 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length, k <= 10^5
 * 1 <= nums[i] <= 10^9
 *
 *
 */

export {};

// @lc code=start
function maxKelements(nums: number[], k: number): number {
  const hp = new Heap<number>();
  for (const num of nums) {
    hp.push(num);
  }
  let res = 0;
  for (let i = 0; i < k; i++) {
    const maxVal = hp.pop()!;
    res += maxVal;
    hp.push(Math.ceil(maxVal / 3));
  }
  return res;
}

class Heap<T> {
  items: T[] = [];
  compare: (a: T, b: T) => boolean;

  constructor(compare: (a: T, b: T) => boolean = (a, b) => a > b) {
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
      let pos = this.leftChild(index);

      if (
        pos + 1 < this.size &&
        this.compare(this.items[pos + 1], this.items[pos])
      ) {
        pos = pos + 1; // right child
      }
      if (this.compare(this.items[index], this.items[pos])) {
        break;
      }
      this.swap(this.items, index, pos);
      index = pos;
    }
  }

  private swap(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
// @lc code=end
