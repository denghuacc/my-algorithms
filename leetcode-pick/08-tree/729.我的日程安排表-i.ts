/*
 * @lc app=leetcode.cn id=729 lang=typescript
 *
 * [729] 我的日程安排表 I
 *
 * https://leetcode.cn/problems/my-calendar-i/description/
 *
 * algorithms
 * Medium (55.43%)
 * Likes:    163
 * Dislikes: 0
 * Total Accepted:    23.3K
 * Total Submissions: 40.8K
 * Testcase Example:  '["MyCalendar","book","book","book"]\n[[],[10,20],[15,25],[20,30]]'
 *
 * 实现一个 MyCalendar 类来存放你的日程安排。如果要添加的日程安排不会造成 重复预订 ，则可以存储这个新的日程安排。
 *
 * 当两个日程安排有一些时间上的交叉时（例如两个日程安排都在同一时间内），就会产生 重复预订 。
 *
 * 日程可以用一对整数 start 和 end 表示，这里的时间是半开区间，即 [start, end), 实数 x 的范围为，  start <= x <
 * end 。
 *
 * 实现 MyCalendar 类：
 *
 *
 * MyCalendar() 初始化日历对象。
 * boolean book(int start, int end) 如果可以将日程安排成功添加到日历中而不会导致重复预订，返回 true 。否则，返回
 * false 并且不要将该日程安排添加到日历中。
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入：
 * ["MyCalendar", "book", "book", "book"]
 * [[], [10, 20], [15, 25], [20, 30]]
 * 输出：
 * [null, true, false, true]
 *
 * 解释：
 * MyCalendar myCalendar = new MyCalendar();
 * myCalendar.book(10, 20); // return True
 * myCalendar.book(15, 25); // return False ，这个日程安排不能添加到日历中，因为时间 15
 * 已经被另一个日程安排预订了。
 * myCalendar.book(20, 30); // return True ，这个日程安排可以添加到日历中，因为第一个日程安排预订的每个时间都小于
 * 20 ，且不包含时间 20 。
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= start < end <= 10^9
 * 每个测试用例，调用 book 方法的次数最多不超过 1000 次。
 *
 *
 */

export {};

// @lc code=start

/**
 * 我的日程安排表 I
 *
 * 设计思路：
 * 1. 存储已预订的时间区间
 * 2. 对于每个新的预订请求，检查是否与现有区间冲突
 * 3. 如果无冲突，添加到已预订列表；否则拒绝预订
 *
 * 区间冲突判断：
 * 两个区间 [s1,e1) 和 [s2,e2) 不冲突当且仅当：
 * s1 >= e2 || s2 >= e1 （一个区间完全在另一个区间之前或之后）
 *
 * 相反，冲突的条件是：s1 < e2 && s2 < e1
 */
class MyCalendar {
  private bookedIntervals: number[][]; // 存储已预订的时间区间

  constructor() {
    this.bookedIntervals = [];
  }

  /**
   * 预订时间段
   * @param start 开始时间
   * @param end 结束时间（不包含）
   * @returns 是否预订成功
   */
  book(start: number, end: number): boolean {
    // 检查与所有已预订区间是否冲突
    for (const [bookedStart, bookedEnd] of this.bookedIntervals) {
      // 区间冲突判断：如果有重叠则拒绝预订
      if (start < bookedEnd && bookedStart < end) {
        return false; // 存在冲突，预订失败
      }
    }

    // 无冲突，添加到已预订列表
    this.bookedIntervals.push([start, end]);
    return true; // 预订成功
  }
}

/**
 * 优化版本：使用平衡二叉搜索树（概念性实现）
 *
 * 在实际应用中，可以考虑使用平衡BST来优化查找性能：
 * - TreeMap或类似数据结构
 * - 按开始时间排序存储区间
 * - 利用二分查找快速定位可能冲突的区间
 *
 * 这样可以将时间复杂度从O(n)优化到O(log n)
 */
class MyCalendarOptimized {
  private sortedIntervals: number[][];

  constructor() {
    this.sortedIntervals = [];
  }

  book(start: number, end: number): boolean {
    // 二分查找插入位置
    const insertPos = this.findInsertPosition(start);

    // 检查与前一个区间的冲突
    if (insertPos > 0) {
      const [prevStart, prevEnd] = this.sortedIntervals[insertPos - 1];
      if (prevEnd > start) {
        return false; // 与前一个区间冲突
      }
    }

    // 检查与后一个区间的冲突
    if (insertPos < this.sortedIntervals.length) {
      const [nextStart, nextEnd] = this.sortedIntervals[insertPos];
      if (nextStart < end) {
        return false; // 与后一个区间冲突
      }
    }

    // 无冲突，插入新区间
    this.sortedIntervals.splice(insertPos, 0, [start, end]);
    return true;
  }

  /**
   * 二分查找插入位置
   * @param start 新区间的开始时间
   * @returns 应该插入的位置索引
   */
  private findInsertPosition(start: number): number {
    let left = 0;
    let right = this.sortedIntervals.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.sortedIntervals[mid][0] < start) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 实现一个日程安排系统
   - 不允许重复预订（时间冲突）
   - 支持动态添加和冲突检测

2. 区间冲突的数学原理：
   设两个区间为 [a,b) 和 [c,d)
   
   无冲突的情况：
   - 区间1完全在区间2之前：b ≤ c
   - 区间2完全在区间1之前：d ≤ a
   合并条件：b ≤ c || d ≤ a
   
   有冲突的情况（取反）：
   - b > c && d > a
   - 等价于：a < d && c < b
   
3. 算法分析：
   - 基础版本：O(n)时间，O(n)空间
   - 优化版本：O(log n)时间，O(n)空间
   
4. 实现方案对比：
   
   方案一：线性搜索（当前实现）
   - 时间复杂度：O(n) 每次预订需要检查所有已有区间
   - 空间复杂度：O(n) 存储所有区间
   - 优点：实现简单，适合小规模数据
   - 缺点：大量预订时性能较差

   方案二：排序 + 二分查找
   - 时间复杂度：O(log n) 查找 + O(n) 插入
   - 空间复杂度：O(n)
   - 优点：查找效率高
   - 缺点：插入仍需O(n)时间

   方案三：平衡二叉搜索树
   - 时间复杂度：O(log n) 查找和插入
   - 空间复杂度：O(n)
   - 优点：查找和插入都是O(log n)
   - 缺点：实现复杂度高

5. 区间操作的扩展应用：
   - 区间合并：将相邻或重叠的区间合并
   - 区间查询：查找某个时间点的预订情况
   - 区间删除：取消已有的预订
   - 多资源调度：多个日历的并行管理

6. 实际应用场景：
   - 会议室预订系统
   - 医院预约挂号
   - 在线课程时间安排
   - 资源调度系统

7. 边界情况处理：
   - 开始时间等于结束时间：视为无效区间
   - 区间边界相邻：[1,3) 和 [3,5) 不冲突
   - 负数时间：需要根据具体业务决定是否允许
   - 时间溢出：考虑时间戳的范围限制

8. 性能优化策略：
   - 批量预订：一次处理多个区间
   - 缓存机制：记录最近的查询结果
   - 懒惰删除：标记删除而非实际删除
   - 分片存储：按时间段分片存储区间

9. 数据结构选择：
   - 数组：简单但效率较低
   - 有序集合：如TreeSet，平衡查找和插入
   - 线段树：适合复杂的区间查询
   - 堆：按时间优先级管理

10. 测试用例设计：
    - 基本功能：正常预订和冲突检测
    - 边界情况：相邻区间、零长度区间
    - 性能测试：大量预订的响应时间
    - 压力测试：并发预订的处理能力
*/
