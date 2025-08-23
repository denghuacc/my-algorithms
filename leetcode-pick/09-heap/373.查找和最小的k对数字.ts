/*
 * @lc app=leetcode.cn id=373 lang=typescript
 *
 * [373] 查找和最小的K对数字
 *
 * https://leetcode-cn.com/problems/find-k-pairs-with-smallest-sums/description/
 *
 * algorithms
 * Medium (40.66%)
 * Likes:    270
 * Dislikes: 0
 * Total Accepted:    26.4K
 * Total Submissions: 64.1K
 * Testcase Example:  '[1,7,11]\n[2,4,6]\n3'
 *
 * 给定两个以升序排列的整数数组 nums1 和 nums2 , 以及一个整数 k 。
 *
 * 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。
 *
 * 请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * 输出: [1,2],[1,4],[1,6]
 * 解释: 返回序列中的前 3 对数：
 * ⁠    [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
 * 输出: [1,1],[1,1]
 * 解释: 返回序列中的前 2 对数：
 * [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
 *
 *
 * 示例 3:
 *
 *
 * 输入: nums1 = [1,2], nums2 = [3], k = 3
 * 输出: [1,3],[2,3]
 * 解释: 也可能序列中所有的数对都被返回:[1,3],[2,3]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1
 * -10^9
 * nums1, nums2 均为升序排列
 * 1
 *
 *
 */

export {};

/**
 * 通用堆数据结构实现
 * 支持泛型类型，可以根据比较函数构建最大堆或最小堆
 */
// @lc code=start
class Heap<T> {
  items: T[] = [];
  compare: (a: T, b: T) => boolean;

  /**
   * 构造函数
   * @param compare 比较函数，返回true表示a的优先级高于b
   * 默认为最大堆：(a, b) => a > b
   */
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

  /**
   * 获取父节点索引
   */
  private parent(index: number): number {
    if (index !== 0) {
      return Math.floor((index - 1) / 2);
    } else {
      return 0;
    }
  }

  /**
   * 获取左子节点索引
   */
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  /**
   * 获取右子节点索引
   */
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  /**
   * 向堆中添加元素
   */
  push(val: T) {
    this.items.push(val);
    this.siftUp(this.size - 1);
  }

  /**
   * 弹出堆顶元素
   */
  pop(): T | undefined {
    const res = this.peek();
    this.swap(this.items, 0, this.size - 1);
    this.items.pop();
    this.siftDown(0);
    return res;
  }

  /**
   * 查看堆顶元素但不移除
   */
  peek(): T | undefined {
    if (!this.isEmpty()) {
      return this.items[0];
    }
  }

  /**
   * 向上调整堆（用于插入新元素后维护堆性质）
   */
  private siftUp(index: number): void {
    while (
      index > 0 &&
      this.compare(this.items[index], this.items[this.parent(index)])
    ) {
      this.swap(this.items, index, this.parent(index));
      index = this.parent(index);
    }
  }

  /**
   * 向下调整堆（用于删除堆顶元素后维护堆性质）
   */
  private siftDown(index: number): void {
    while (this.leftChild(index) < this.size) {
      let idx = this.leftChild(index);

      // 找到优先级更高的子节点
      if (idx + 1 && this.compare(this.items[idx + 1], this.items[idx])) {
        idx = this.rightChild(index);
      }
      // 如果当前节点优先级已经够高，停止调整
      if (this.compare(this.items[index], this.items[idx])) {
        break;
      }
      this.swap(this.items, index, idx);
      index = idx;
    }
  }

  /**
   * 交换数组中两个元素的位置
   */
  private swap(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * 查找和最小的k对数字
 * @param nums1 第一个有序数组
 * @param nums2 第二个有序数组
 * @param k 需要找到的数对个数
 * @returns 和最小的k个数对
 */
function kSmallestPairs(
  nums1: number[],
  nums2: number[],
  k: number
): number[][] {
  // 使用最大堆来维护k个最小的数对
  // 比较函数：如果a的和大于b的和，则a的优先级高（用于最大堆）
  const pq = new Heap<number[]>((a, b) => a?.[0] + a?.[1] > b?.[0] + b?.[1]);

  // 遍历所有可能的数对组合
  for (const num1 of nums1) {
    for (const num2 of nums2) {
      const item = [num1, num2];
      pq.push(item);

      // 如果堆大小超过k，移除和最大的数对
      if (pq.size > k) {
        const [n1, n2] = pq.pop()!;
        // 优化：如果当前数对就是被移除的数对，说明后续数对的和会更大
        // 可以提前跳出内层循环
        if (num1 === n1 && num2 === n2) {
          break;
        }
      }
    }
  }

  return pq.items;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在两个有序数组中找到和最小的k个数对
   - 数对的第一个元素来自nums1，第二个元素来自nums2
   - 需要返回这k个数对，不需要按顺序排列

2. 算法分析：
   - 时间复杂度：O(m*n*log(k))，其中m和n分别是两个数组的长度
   - 空间复杂度：O(k)，用于存储堆中的k个元素
   - 算法类型：堆 + 暴力枚举

3. 实现要点：
   - 使用最大堆来维护当前最小的k个数对
   - 遍历所有可能的数对组合(m*n个)
   - 对于每个数对，将其加入堆中
   - 如果堆大小超过k，移除堆顶（当前最大的数对）
   - 最终堆中剩余的就是k个最小的数对

4. 优化思路：
   - 当前实现使用了暴力枚举，时间复杂度较高
   - 更优解法：使用最小堆 + 优先级队列，利用数组有序性质
   - 优化版本：先将nums1[0]与nums2所有元素组成的数对加入最小堆
   - 每次取出堆顶最小数对，同时将下一个可能的数对加入堆
   - 这样可以将时间复杂度降低到O(k*log(min(k,n)))

5. 关键观察：
   - 由于两个数组都是有序的，可以利用这个性质进行剪枝
   - 当前实现中的优化：如果刚加入的数对立即被移除，说明后续数对和更大，可提前跳出
   - 最大堆的使用：维护k个最小值时，使用最大堆更方便移除较大值
*/
