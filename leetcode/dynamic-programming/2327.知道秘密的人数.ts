/*
 * @lc app=leetcode.cn id=2327 lang=typescript
 *
 * [2327] 知道秘密的人数
 *
 * https://leetcode.cn/problems/number-of-people-aware-of-a-secret/description/
 *
 * algorithms
 * Medium (46.31%)
 * Likes:    113
 * Dislikes: 0
 * Total Accepted:    19.2K
 * Total Submissions: 38.4K
 * Testcase Example:  '6\n2\n4'
 *
 * 在第 1 天，有一个人发现了一个秘密。
 *
 * 给你一个整数 delay ，表示每个人会在发现秘密后的 delay 天之后，每天 给一个新的人 分享 秘密。同时给你一个整数 forget
 * ，表示每个人在发现秘密 forget 天之后会 忘记 这个秘密。一个人 不能 在忘记秘密那一天及之后的日子里分享秘密。
 *
 * 给你一个整数 n ，请你返回在第 n 天结束时，知道秘密的人数。由于答案可能会很大，请你将结果对 10^9 + 7 取余 后返回。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 6, delay = 2, forget = 4
 * 输出：5
 * 解释：
 * 第 1 天：假设第一个人叫 A 。（一个人知道秘密）
 * 第 2 天：A 是唯一一个知道秘密的人。（一个人知道秘密）
 * 第 3 天：A 把秘密分享给 B 。（两个人知道秘密）
 * 第 4 天：A 把秘密分享给一个新的人 C 。（三个人知道秘密）
 * 第 5 天：A 忘记了秘密，B 把秘密分享给一个新的人 D 。（三个人知道秘密）
 * 第 6 天：B 把秘密分享给 E，C 把秘密分享给 F 。（五个人知道秘密）
 *
 *
 * 示例 2：
 *
 * 输入：n = 4, delay = 1, forget = 3
 * 输出：6
 * 解释：
 * 第 1 天：第一个知道秘密的人为 A 。（一个人知道秘密）
 * 第 2 天：A 把秘密分享给 B 。（两个人知道秘密）
 * 第 3 天：A 和 B 把秘密分享给 2 个新的人 C 和 D 。（四个人知道秘密）
 * 第 4 天：A 忘记了秘密，B、C、D 分别分享给 3 个新的人。（六个人知道秘密）
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 1000
 * 1 <= delay < forget <= n
 *
 *
 */

export {};

// @lc code=start
function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
  const MOD = 1e9 + 7;

  // 使用双端队列模拟时间线
  // know队列：存储[知道秘密的天数, 人数]，表示这些人知道秘密但还不能分享
  const know = new MyDeque<[number, number]>();
  // share队列：存储[知道秘密的天数, 人数]，表示这些人知道秘密且可以分享
  const share = new MyDeque<[number, number]>();

  // 第1天有1个人知道秘密
  know.pushLast([1, 1]);
  let knowCnt = 1; // 当前知道秘密但不能分享的人数
  let shareCnt = 0; // 当前知道秘密且可以分享的人数

  // 从第2天开始模拟每一天的情况
  for (let i = 2; i <= n; i++) {
    // 检查是否有人的delay时间到了，可以开始分享秘密
    if (!know.isEmpty() && know.peekFront()![0] + delay === i) {
      const [day, cnt] = know.popFront()!;
      knowCnt = (knowCnt - cnt + MOD) % MOD; // 从know队列移除
      shareCnt = (shareCnt + cnt) % MOD; // 加入share队列
      share.pushLast([day, cnt]);
    }

    // 检查是否有人到了forget时间，需要忘记秘密
    if (!share.isEmpty() && share.peekFront()![0] + forget === i) {
      const [, cnt] = share.popFront()!;
      shareCnt = (shareCnt - cnt + MOD) % MOD; // 从share队列移除
    }

    // 如果当前有可以分享的人，他们每天都会分享给新的人
    if (!share.isEmpty()) {
      knowCnt = (knowCnt + shareCnt) % MOD; // 新知道秘密的人数
      know.pushLast([i, shareCnt]); // 新知道秘密的人加入know队列
    }
  }

  // 返回最终知道秘密的总人数
  return (knowCnt + shareCnt) % MOD;
}

class MyDeque<T> {
  items: Record<string, T>;
  frontPointer: number;
  rearPointer: number;

  constructor() {
    this.items = {};
    this.frontPointer = 0;
    this.rearPointer = 0;
  }

  get size(): number {
    return this.rearPointer - this.frontPointer;
  }

  pushFront(val: T) {
    this.frontPointer--;
    this.items[this.frontPointer] = val;
  }

  pushLast(val: T) {
    this.items[this.rearPointer] = val;
    this.rearPointer++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.frontPointer];
    delete this.items[this.frontPointer];
    this.frontPointer++;
    return res;
  }

  popLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.rearPointer--;
    const res = this.items[this.rearPointer];
    delete this.items[this.rearPointer];
    return res;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontPointer];
  }

  peekLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.rearPointer - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear() {
    this.items = {};
    this.rearPointer = 0;
    this.frontPointer = 0;
  }

  toArray(): T[] {
    return Object.values(this.items);
  }
}

// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个时间序列模拟问题，需要跟踪每个人在不同时间点的状态
   - 核心是模拟秘密传播的时间线：知道→可以分享→忘记
   - 关键约束：delay天后才能分享，forget天后会忘记

2. 算法分析：
   - 时间复杂度：O(n)，需要遍历每一天
   - 空间复杂度：O(n)，最多存储n天的数据
   - 算法类型：模拟 + 队列

3. 实现要点：
   - 使用两个双端队列分别管理"知道但未分享"和"可以分享"的人群
   - 队列中存储[知道秘密的天数, 人数]的元组
   - 每天检查三个状态转换：
     * 从know队列转移到share队列（delay时间到）
     * 从share队列移除（forget时间到）
     * 新增知道秘密的人（当前可分享人数）

4. 优化思路：
   - 使用双端队列避免频繁的数组操作
   - 按时间顺序处理，确保状态转换的正确性
   - 使用模运算防止整数溢出
   - 队列按时间排序，可以快速找到需要处理的时间点

5. 关键技巧：
   - 将人群按状态分组，而不是跟踪每个个体
   - 利用队列的FIFO特性，按时间顺序处理状态转换
   - 使用元组[天数, 人数]同时记录时间和数量信息
   - 通过队列头部元素快速判断是否需要处理状态转换

6. 边界情况处理：
   - 第1天只有1个人知道秘密
   - delay和forget的约束关系：1 <= delay < forget <= n
   - 大数取模防止溢出
   - 空队列的安全检查

7. 算法流程：
   - 初始化：第1天1个人知道秘密
   - 每天循环：
     1. 检查know队列中是否有人的delay时间到了
     2. 检查share队列中是否有人的forget时间到了  
     3. 当前可分享的人每天都会分享给新的人
   - 返回最终知道秘密的总人数
*/
