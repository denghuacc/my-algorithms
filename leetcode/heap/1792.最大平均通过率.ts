/*
 * @lc app=leetcode.cn id=1792 lang=typescript
 *
 * [1792] 最大平均通过率
 *
 * https://leetcode.cn/problems/maximum-average-pass-ratio/description/
 *
 * algorithms
 * Medium (51.58%)
 * Likes:    99
 * Dislikes: 0
 * Total Accepted:    13.8K
 * Total Submissions: 24.4K
 * Testcase Example:  '[[1,2],[3,5],[2,2]]\n2'
 *
 * 一所学校里有一些班级，每个班级里有一些学生，现在每个班都会进行一场期末考试。给你一个二维数组 classes ，其中 classes[i] =
 * [passi, totali] ，表示你提前知道了第 i 个班级总共有 totali 个学生，其中只有 passi 个学生可以通过考试。
 *
 * 给你一个整数 extraStudents ，表示额外有 extraStudents 个聪明的学生，他们 一定 能通过任何班级的期末考。你需要给这
 * extraStudents 个学生每人都安排一个班级，使得 所有 班级的 平均 通过率 最大 。
 *
 * 一个班级的 通过率 等于这个班级通过考试的学生人数除以这个班级的总人数。平均通过率 是所有班级的通过率之和除以班级数目。
 *
 * 请你返回在安排这 extraStudents 个学生去对应班级后的 最大 平均通过率。与标准答案误差范围在 10^-5
 * 以内的结果都会视为正确结果。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：classes = [[1,2],[3,5],[2,2]], extraStudents = 2
 * 输出：0.78333
 * 解释：你可以将额外的两个学生都安排到第一个班级，平均通过率为 (3/4 + 3/5 + 2/2) / 3 = 0.78333 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
 * 输出：0.53485
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * classes[i].length == 2
 * 1 i i
 * 1
 *
 *
 */

export {};

// @lc code=start
function maxAverageRatio(classes: number[][], extraStudents: number): number {
  // 贪心：每次把一个额外学生分配给“增益”最大的班级
  // 增益定义：Δ(p,t) = (p+1)/(t+1) - p/t = (t - p) / (t * (t + 1))
  // 使用大根堆按增益排序；比较时用交叉相乘避免浮点误差
  const pq = new Heap<number[]>((a, b) => {
    const v1 = (b[1] + 1) * b[1] * (a[1] - a[0]);
    const v2 = (a[1] + 1) * a[1] * (b[1] - b[0]);
    return v1 > v2;
  });
  // 初始化：将所有班级入堆
  for (const cls of classes) {
    pq.push(cls);
  }
  // 逐个分配额外学生：每次取出当前增益最大的班级并更新
  for (let i = 0; i < extraStudents; i++) {
    const [pass, total] = pq.pop()!;
    pq.push([pass + 1, total + 1]);
  }
  // 计算最终平均通过率
  let sum = 0;
  while (!pq.isEmpty()) {
    const [pass, total] = pq.pop()!;
    sum += pass / total;
  }
  return sum / classes.length;
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

/*
解题思路详解：

1. 问题本质：
   - 将 k 个“必过”的额外学生分配到若干班级，使平均通过率最大化。
   - 每次给某个班级再加 1 名通过的学生，会带来一个“边际增益”。

2. 算法分析：
   - 时间复杂度：O((n + k) log n)。n 为班级数，建堆 O(n)，每次分配并调整堆 O(log n)，共 k 次。
   - 空间复杂度：O(n)，用于堆存储 n 个班级。
   - 算法类型：贪心 + 优先队列（大根堆）。

3. 实现要点：
   - 增益公式：Δ(p,t) = (p+1)/(t+1) - p/t = (t - p) / (t·(t+1))。
   - 使用大根堆，按增益从大到小取出；比较时用交叉相乘避免浮点误差。
   - 每次从堆顶取出增益最大班级 (p,t)，更新为 (p+1,t+1) 后重新入堆。
   - 所有额外学生分配完后，计算各班通过率之和再除以班级数。

4. 优化思路：
   - 比较增益时避免直接除法，使用整型交叉相乘提高精度与性能。
   - 若语言/库支持，可直接使用带自定义比较器的优先队列减少样板代码。
*/
