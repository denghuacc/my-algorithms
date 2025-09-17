/*
 * @lc app=leetcode.cn id=2349 lang=typescript
 *
 * [2349] 设计数字容器系统
 *
 * https://leetcode.cn/problems/design-a-number-container-system/description/
 *
 * algorithms
 * Medium (39.61%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    13.7K
 * Total Submissions: 30.3K
 * Testcase Example:  '["NumberContainers","find","change","change","change","change","find","change","find"]\n' +
  '[[],[10],[2,10],[1,10],[3,10],[5,10],[10],[1,20],[10]]'
 *
 * 设计一个数字容器系统，可以实现以下功能：
 * 
 * 
 * 在系统中给定下标处 插入 或者 替换 一个数字。
 * 返回 系统中给定数字的最小下标。
 * 
 * 
 * 请你实现一个 NumberContainers 类：
 * 
 * 
 * NumberContainers() 初始化数字容器系统。
 * void change(int index, int number) 在下标 index 处填入 number 。如果该下标 index
 * 处已经有数字了，那么用 number 替换该数字。
 * int find(int number) 返回给定数字 number 在系统中的最小下标。如果系统中没有 number ，那么返回 -1 。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["NumberContainers", "find", "change", "change", "change", "change", "find",
 * "change", "find"]
 * [[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
 * 输出：
 * [null, -1, null, null, null, null, 1, null, 2]
 * 
 * 解释：
 * NumberContainers nc = new NumberContainers();
 * nc.find(10); // 没有数字 10 ，所以返回 -1 。
 * nc.change(2, 10); // 容器中下标为 2 处填入数字 10 。
 * nc.change(1, 10); // 容器中下标为 1 处填入数字 10 。
 * nc.change(3, 10); // 容器中下标为 3 处填入数字 10 。
 * nc.change(5, 10); // 容器中下标为 5 处填入数字 10 。
 * nc.find(10); // 数字 10 所在的下标为 1 ，2 ，3 和 5 。因为最小下标为 1 ，所以返回 1 。
 * nc.change(1, 20); // 容器中下标为 1 处填入数字 20 。注意，下标 1 处之前为 10 ，现在被替换为 20 。
 * nc.find(10); // 数字 10 所在下标为 2 ，3 和 5 。最小下标为 2 ，所以返回 2 。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= index, number <= 10^9
 * 调用 change 和 find 的 总次数 不超过 10^5 次。
 * 
 * 
 */

// @lc code=start
/**
 * 数字容器系统
 *
 * 支持在指定下标插入/替换数字，并能高效查询某数字的最小下标。
 *
 * @example
 * const nc = new NumberContainers();
 * nc.change(2, 10);
 * nc.change(1, 10);
 * nc.find(10); // 1
 * nc.change(1, 20);
 * nc.find(10); // 2
 */
class NumberContainers {
  /**
   * idx2num: 记录每个下标当前存储的数字
   * num2indexes: 记录每个数字对应的所有下标集合
   * num2minIndex: 记录每个数字的最小下标，便于O(1)查询
   */
  idx2num: Map<number, number>;
  num2indexes: Map<number, Set<number>>;
  num2minIndex: Map<number, number>;

  constructor() {
    this.idx2num = new Map();
    this.num2indexes = new Map();
    this.num2minIndex = new Map();
  }

  /**
   * 在指定下标插入或替换数字
   *
   * @param index - 下标
   * @param number - 要插入的数字
   */
  change(index: number, number: number): void {
    const oldNum = this.idx2num.get(index);
    if (oldNum === number) return; // 无需变更
    this.idx2num.set(index, number);

    if (oldNum === undefined) {
      // 新增下标
      const indexes = this.num2indexes.get(number) ?? new Set();
      indexes.add(index);
      this.num2indexes.set(number, indexes);
    } else {
      // 替换原有数字
      const oldIndexes = this.num2indexes.get(oldNum)!;
      oldIndexes.delete(index);
      if (oldIndexes.size === 0) {
        this.num2indexes.delete(oldNum);
      }
      if (!this.num2indexes.has(number)) {
        this.num2indexes.set(number, new Set());
      }
      this.num2indexes.get(number)!.add(index);

      // 维护旧数字的最小下标
      const oldMinIndex = this.num2minIndex.get(oldNum)!;
      if (index === oldMinIndex) {
        if (oldIndexes.size === 0) {
          this.num2minIndex.delete(oldNum);
        } else {
          this.num2minIndex.set(oldNum, Math.min(...oldIndexes));
        }
      }
    }
    // 维护新数字的最小下标
    const minIndex = this.num2minIndex.get(number);
    if (minIndex === undefined || index < minIndex) {
      this.num2minIndex.set(number, index);
    }
  }

  /**
   * 查询指定数字的最小下标
   *
   * @param number - 要查询的数字
   * @returns 最小下标，若不存在返回-1
   */
  find(number: number): number {
    return this.num2minIndex.get(number) ?? -1;
  }
}

/**
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */

/*
解题思路详解：

1. 问题本质：
  - 动态维护下标与数字的映射，支持高效插入/替换和查询某数字的最小下标
  - 需要频繁变更和查询，要求操作高效

2. 算法分析：
  - change: O(log k)（Set插入/删除/取min，k为该数字下标数）
  - find: O(1)
  - 空间复杂度：O(n)，n为操作涉及的不同下标数
  - 算法类型：哈希表+集合

3. 核心数据结构：
  - idx2num: Map<index, number>，记录每个下标的数字
  - num2indexes: Map<number, Set<index>>，记录每个数字的所有下标
  - num2minIndex: Map<number, number>，记录每个数字的最小下标

4. 算法步骤：
  - change:
    1. 如果index原本没有数字，直接插入
    2. 如果index原本有数字，先从旧数字的下标集合中移除，再加入新数字集合
    3. 维护num2minIndex，保证每次都能O(1)查到最小下标
  - find:
    1. 直接查num2minIndex，若不存在返回-1

5. 示例分析：
  - 见题目示例，动态插入/替换后，find总能返回最小下标

6. 边界情况：
  - 多次对同一index重复赋值
  - 删除后数字下标集合为空
  - 查询不存在的数字

7. 常见错误：
  - 忽略了替换时要从旧数字集合中移除index
  - 没有及时维护最小下标
  - 误用数组导致find效率低

8. 优化要点：
  - 用Set存储下标，便于高效增删
  - 维护最小下标，避免每次find都遍历集合

9. 扩展思考：
  - 如果需要支持删除操作，如何高效维护？
  - 如果下标和数字范围更大，如何进一步优化？
  - 如果需要支持区间查询最小下标？

10. 类似问题：
   - 动态区间最值维护
   - 哈希表与有序集合结合的设计题
*/
// @lc code=end
