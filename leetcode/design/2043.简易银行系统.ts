/*
 * @lc app=leetcode.cn id=2043 lang=typescript
 *
 * [2043] 简易银行系统
 *
 * https://leetcode-cn.com/problems/simple-bank-system/description/
 *
 * algorithms
 * Medium (59.11%)
 * Likes:    34
 * Dislikes: 0
 * Total Accepted:    15.9K
 * Total Submissions: 24K
 * Testcase Example:  '["Bank","withdraw","transfer","deposit","transfer","withdraw"]\n' +
  '[[[10,100,20,50,30]],[3,10],[5,1,20],[5,20],[3,4,15],[10,50]]'
 *
 * 你的任务是为一个很受欢迎的银行设计一款程序，以自动化执行所有传入的交易（转账，存款和取款）。银行共有 n 个账户，编号从 1 到 n
 * 。每个账号的初始余额存储在一个下标从 0 开始的整数数组 balance 中，其中第 (i + 1) 个账户的初始余额是 balance[i] 。
 * 
 * 请你执行所有 有效的 交易。如果满足下面全部条件，则交易 有效 ：
 * 
 * 
 * 指定的账户数量在 1 和 n 之间，且
 * 取款或者转账需要的钱的总数 小于或者等于 账户余额。
 * 
 * 
 * 实现 Bank 类：
 * 
 * 
 * Bank(long[] balance) 使用下标从 0 开始的整数数组 balance 初始化该对象。
 * boolean transfer(int account1, int account2, long money) 从编号为 account1
 * 的账户向编号为 account2 的账户转帐 money 美元。如果交易成功，返回 true ，否则，返回 false 。
 * boolean deposit(int account, long money) 向编号为 account 的账户存款 money
 * 美元。如果交易成功，返回 true ；否则，返回 false 。
 * boolean withdraw(int account, long money) 从编号为 account 的账户取款 money
 * 美元。如果交易成功，返回 true ；否则，返回 false 。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["Bank", "withdraw", "transfer", "deposit", "transfer", "withdraw"]
 * [[[10, 100, 20, 50, 30]], [3, 10], [5, 1, 20], [5, 20], [3, 4, 15], [10,
 * 50]]
 * 输出：
 * [null, true, true, true, false, false]
 * 
 * 解释：
 * Bank bank = new Bank([10, 100, 20, 50, 30]);
 * bank.withdraw(3, 10);    // 返回 true ，账户 3 的余额是 $20 ，所以可以取款 $10 。
 * ⁠                        // 账户 3 余额为 $20 - $10 = $10 。
 * bank.transfer(5, 1, 20); // 返回 true ，账户 5 的余额是 $30 ，所以可以转账 $20 。
 * ⁠                        // 账户 5 的余额为 $30 - $20 = $10 ，账户 1 的余额为 $10 + $20 =
 * $30 。
 * bank.deposit(5, 20);     // 返回 true ，可以向账户 5 存款 $20 。
 * ⁠                        // 账户 5 的余额为 $10 + $20 = $30 。
 * bank.transfer(3, 4, 15); // 返回 false ，账户 3 的当前余额是 $10 。
 * ⁠                        // 所以无法转账 $15 。
 * bank.withdraw(10, 50);   // 返回 false ，交易无效，因为账户 10 并不存在。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * n == balance.length
 * 1 <= n, account, account1, account2 <= 10^5
 * 0 <= balance[i], money <= 10^12
 * transfer, deposit, withdraw 三个函数，每个 最多调用 10^4 次
 * 
 * 
 */

// @lc code=start
class Bank {
  balance: number[]; // 存储所有账户余额的数组，balance[i] 表示账户 i+1 的余额

  /**
   * 构造函数：初始化银行系统
   * @param balance - 初始余额数组，balance[i] 是账户 i+1 的初始余额
   *
   * 注意：账户编号从 1 开始，但数组索引从 0 开始
   * 账户 n 的余额存储在 balance[n-1]
   */
  constructor(balance: number[]) {
    this.balance = balance;
  }

  /**
   * 转账操作：从 account1 转账到 account2
   * @param account1 - 转出账户编号（1-based）
   * @param account2 - 转入账户编号（1-based）
   * @param money - 转账金额
   * @returns 转账是否成功
   *
   * 转账成功的条件：
   * 1. account1 和 account2 都必须是有效账户（在 [1, n] 范围内）
   * 2. account1 的余额必须 >= money
   */
  transfer(account1: number, account2: number, money: number): boolean {
    // 验证 account1 是否有效
    if (account1 < 1 || account1 > this.balance.length) return false;

    // 验证 account2 是否有效
    if (account2 < 1 || account2 > this.balance.length) return false;

    // 验证 account1 余额是否足够
    if (money > this.balance[account1 - 1]) return false;

    // 执行转账：从 account1 扣除，向 account2 增加
    this.balance[account1 - 1] -= money;
    this.balance[account2 - 1] += money;

    return true;
  }

  /**
   * 存款操作：向指定账户存入金额
   * @param account - 账户编号（1-based）
   * @param money - 存款金额
   * @returns 存款是否成功
   *
   * 存款成功的条件：
   * 1. account 必须是有效账户（在 [1, n] 范围内）
   * 2. 存款金额没有限制（题目假设总是有效的正数）
   */
  deposit(account: number, money: number): boolean {
    // 验证账户是否有效
    if (account < 1 || account > this.balance.length) return false;

    // 执行存款：增加账户余额
    this.balance[account - 1] += money;

    return true;
  }

  /**
   * 取款操作：从指定账户取出金额
   * @param account - 账户编号（1-based）
   * @param money - 取款金额
   * @returns 取款是否成功
   *
   * 取款成功的条件：
   * 1. account 必须是有效账户（在 [1, n] 范围内）
   * 2. 账户余额必须 >= money
   */
  withdraw(account: number, money: number): boolean {
    // 验证账户是否有效
    if (account < 1 || account > this.balance.length) return false;

    // 验证余额是否足够
    if (money > this.balance[account - 1]) return false;

    // 执行取款：减少账户余额
    this.balance[account - 1] -= money;

    return true;
  }
}

/**
 * Your Bank object will be instantiated and called as such:
 * var obj = new Bank(balance)
 * var param_1 = obj.transfer(account1,account2,money)
 * var param_2 = obj.deposit(account,money)
 * var param_3 = obj.withdraw(account,money)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个简易银行系统，管理多个账户的余额
   - 支持三种基本操作：转账、存款、取款
   - 账户编号从 1 开始（1-based），但数组索引从 0 开始（0-based）
   - 需要验证操作的有效性（账户存在性、余额充足性）

2. 算法分析：
   - 时间复杂度：
     * 构造函数：O(1) - 直接赋值引用
     * transfer：O(1) - 常数次检查和更新操作
     * deposit：O(1) - 常数次检查和更新操作
     * withdraw：O(1) - 常数次检查和更新操作
   - 空间复杂度：O(n) - 存储 n 个账户的余额
   - 算法类型：数组模拟 + 设计题

3. 解题思路：

   核心思想：
   - 使用数组存储每个账户的余额
   - 在执行操作前先验证有效性
   - 验证通过后再修改余额
   - 返回操作结果（成功/失败）

   数据结构设计：
   - balance 数组：balance[i] 存储账户 i+1 的余额
   - 索引转换：账户编号 account → 数组索引 account-1

   操作实现要点：

   转账（transfer）：
   步骤1：验证 account1 有效性（1 <= account1 <= n）
   步骤2：验证 account2 有效性（1 <= account2 <= n）
   步骤3：验证 account1 余额是否 >= money
   步骤4：执行转账（account1 减少，account2 增加）
   步骤5：返回 true

   存款（deposit）：
   步骤1：验证 account 有效性（1 <= account <= n）
   步骤2：增加账户余额
   步骤3：返回 true

   取款（withdraw）：
   步骤1：验证 account 有效性（1 <= account <= n）
   步骤2：验证账户余额是否 >= money
   步骤3：减少账户余额
   步骤4：返回 true

4. 实现要点：

   关键技巧：
   - 账户编号与数组索引的转换：account → account-1
   - 先验证再操作：避免非法操作导致数据不一致
   - 早期返回（early return）：验证失败立即返回 false
   
   边界条件处理：
   - 账户编号 < 1：无效账户
   - 账户编号 > n：无效账户
   - 余额不足：无法取款或转账
   - money 可以为 0：题目没有限制，视为有效操作
   
   数据一致性：
   - 转账操作是原子性的：要么成功（两个账户都更新），要么失败（都不更新）
   - 验证失败时不修改任何余额
   
   TypeScript 特性：
   - 使用类（class）封装数据和方法
   - 使用类型注解（number[]、boolean）提高类型安全

5. 示例分析：

   初始状态：balance = [10, 100, 20, 50, 30]
   账户编号：         1    2    3    4    5
   
   操作1：withdraw(3, 10)
   - 验证：账户 3 有效 ✓
   - 验证：balance[2] = 20 >= 10 ✓
   - 执行：balance[2] = 20 - 10 = 10
   - 结果：true
   - 状态：[10, 100, 10, 50, 30]
   
   操作2：transfer(5, 1, 20)
   - 验证：账户 5 有效 ✓
   - 验证：账户 1 有效 ✓
   - 验证：balance[4] = 30 >= 20 ✓
   - 执行：balance[4] = 30 - 20 = 10
   -       balance[0] = 10 + 20 = 30
   - 结果：true
   - 状态：[30, 100, 10, 50, 10]
   
   操作3：deposit(5, 20)
   - 验证：账户 5 有效 ✓
   - 执行：balance[4] = 10 + 20 = 30
   - 结果：true
   - 状态：[30, 100, 10, 50, 30]
   
   操作4：transfer(3, 4, 15)
   - 验证：账户 3 有效 ✓
   - 验证：账户 4 有效 ✓
   - 验证：balance[2] = 10 >= 15 ✗（余额不足）
   - 结果：false
   - 状态：[30, 100, 10, 50, 30]（未修改）
   
   操作5：withdraw(10, 50)
   - 验证：账户 10 有效 ✗（只有 5 个账户）
   - 结果：false
   - 状态：[30, 100, 10, 50, 30]（未修改）

6. 算法要点总结：

   核心技巧：
   - 数组模拟：用数组直接存储账户余额
   - 索引映射：处理 1-based 和 0-based 的转换
   - 防御性编程：先验证后操作，确保数据一致性
   
   设计模式：
   - 封装（Encapsulation）：数据和操作封装在类中
   - 单一职责（Single Responsibility）：每个方法只负责一个操作
   - 验证优先：所有操作都先验证再执行
   
   类似问题：
   - LeetCode 1396: 设计地铁系统（时间管理）
   - LeetCode 1603: 设计停车系统（资源管理）
   - LeetCode 705/706: 设计哈希集合/哈希映射（数据结构设计）

7. 常见错误：

   错误1：忘记索引转换
   - 错误：直接使用 balance[account]
   - 正确：使用 balance[account - 1]
   - 原因：账户编号从 1 开始，数组索引从 0 开始
   
   错误2：边界检查不完整
   - 错误：只检查 account <= balance.length
   - 正确：同时检查 account >= 1 和 account <= balance.length
   - 原因：账户编号必须是正数
   
   错误3：转账时只检查一个账户
   - 错误：只验证 account1，忘记验证 account2
   - 正确：两个账户都要验证
   - 原因：转账涉及两个账户，都必须有效
   
   错误4：验证失败后仍修改余额
   - 错误：先修改余额再验证
   - 正确：先验证，验证通过后再修改
   - 原因：保证操作的原子性和数据一致性
   
   错误5：浮点数精度问题（如果使用 number）
   - 注意：JavaScript/TypeScript 的 number 类型是浮点数
   - 对于大额金额（> 2^53），可能存在精度损失
   - 题目中 money 可达 10^12，在安全范围内（2^53 ≈ 9×10^15）

8. 扩展思考：

   功能扩展1：添加交易历史记录
   ```typescript
   interface Transaction {
     type: 'transfer' | 'deposit' | 'withdraw';
     account: number;
     amount: number;
     timestamp: number;
   }
   
   class BankWithHistory extends Bank {
     private history: Transaction[] = [];
     
     transfer(account1: number, account2: number, money: number): boolean {
       const success = super.transfer(account1, account2, money);
       if (success) {
         this.history.push({
           type: 'transfer',
           account: account1,
           amount: money,
           timestamp: Date.now()
         });
       }
       return success;
     }
     
     getHistory(account: number): Transaction[] {
       return this.history.filter(t => t.account === account);
     }
   }
   ```

   功能扩展2：添加利息计算
   ```typescript
   class BankWithInterest extends Bank {
     private interestRate: number;
     
     constructor(balance: number[], interestRate: number) {
       super(balance);
       this.interestRate = interestRate;
     }
     
     applyInterest(): void {
       for (let i = 0; i < this.balance.length; i++) {
         this.balance[i] *= (1 + this.interestRate);
       }
     }
   }
   ```

   功能扩展3：添加透支保护
   ```typescript
   class BankWithOverdraft extends Bank {
     private overdraftLimit: number[];
     
     constructor(balance: number[], overdraftLimit: number[]) {
       super(balance);
       this.overdraftLimit = overdraftLimit;
     }
     
     withdraw(account: number, money: number): boolean {
       if (account < 1 || account > this.balance.length) return false;
       const maxWithdraw = this.balance[account - 1] + 
                          this.overdraftLimit[account - 1];
       if (money > maxWithdraw) return false;
       this.balance[account - 1] -= money;
       return true;
     }
   }
   ```

   性能优化思考：
   - 当前实现已经是 O(1) 时间复杂度，无需进一步优化
   - 如果需要支持大量并发操作，可以考虑：
     * 使用锁（Lock）机制保证线程安全
     * 使用 Map 代替数组（如果账户编号稀疏）
     * 使用数据库存储持久化数据

9. 设计模式应用：

   当前设计体现的模式：
   
   1. **封装模式（Encapsulation）**
      - 数据（balance）是私有的，只能通过公共方法访问
      - 客户端无法直接修改余额，保证数据安全
   
   2. **防御性编程（Defensive Programming）**
      - 所有方法都进行参数验证
      - 验证失败立即返回，不执行任何操作
      - 保证系统的健壮性
   
   3. **单一职责原则（Single Responsibility）**
      - 每个方法只负责一个操作
      - transfer 只负责转账
      - deposit 只负责存款
      - withdraw 只负责取款

   实际应用中的考虑：
   - 并发控制：多个用户同时操作同一账户
   - 事务处理：转账失败时的回滚机制
   - 审计日志：记录所有操作便于追踪
   - 权限管理：不同用户的操作权限
   - 数据持久化：余额需要保存到数据库

10. 总结：

    这是一道典型的**系统设计题**，考察：
    
    ✓ 面向对象编程能力
      - 类的设计和封装
      - 方法的实现和调用
    
    ✓ 边界条件处理
      - 账户有效性验证
      - 余额充足性验证
    
    ✓ 数据结构选择
      - 使用数组存储账户余额
      - 索引映射的正确处理
    
    ✓ 代码质量
      - 清晰的命名和注释
      - 合理的逻辑组织
      - 防御性编程思想
    
    关键要点：
    1. 账户编号从 1 开始，数组索引从 0 开始
    2. 先验证后操作，保证数据一致性
    3. 所有操作都是 O(1) 时间复杂度
    4. 注意边界情况的处理
    
    这道题虽然简单，但体现了软件工程中的重要思想：
    - 封装和抽象
    - 防御性编程
    - 数据一致性保证
    - 清晰的接口设计
*/
