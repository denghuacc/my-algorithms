/*
 * @lc app=leetcode.cn id=3484 lang=typescript
 *
 * [3484] 设计电子表格
 *
 * https://leetcode.cn/problems/design-spreadsheet/description/
 *
 * algorithms
 * Medium (59.08%)
 * Likes:    19
 * Dislikes: 0
 * Total Accepted:    12.9K
 * Total Submissions: 18.6K
 * Testcase Example:  '["Spreadsheet","getValue","setCell","getValue","setCell","getValue","resetCell","getValue"]\n' +
  '[[3],["=5+7"],["A1",10],["=A1+6"],["B2",15],["=A1+B2"],["A1"],["=A1+B2"]]'
 *
 * 电子表格是一个网格，它有 26 列（从 'A' 到 'Z'）和指定数量的 rows。每个单元格可以存储一个 0 到 10^5 之间的整数值。
 * 
 * 请你实现一个 Spreadsheet 类：
 * 
 * 
 * Spreadsheet(int rows) 初始化一个具有 26 列（从 'A' 到 'Z'）和指定行数的电子表格。所有单元格最初的值都为 0
 * 。
 * void setCell(String cell, int value) 设置指定单元格的值。单元格引用以 "AX"
 * 的格式提供（例如，"A1"，"B10"），其中字母表示列（从 'A' 到 'Z'），数字表示从 1 开始的行号。
 * void resetCell(String cell) 重置指定单元格的值为 0 。
 * int getValue(String formula) 计算一个公式的值，格式为 "=X+Y"，其中 X 和 Y 要么
 * 是单元格引用，要么非负整数，返回计算的和。
 * 
 * 
 * 注意： 如果 getValue 引用一个未通过 setCell 明确设置的单元格，则该单元格的值默认为 0 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * ["Spreadsheet", "getValue", "setCell", "getValue", "setCell", "getValue",
 * "resetCell", "getValue"]
 * [[3], ["=5+7"], ["A1", 10], ["=A1+6"], ["B2", 15], ["=A1+B2"], ["A1"],
 * ["=A1+B2"]]
 * 
 * 输出：
 * [null, 12, null, 16, null, 25, null, 15] 
 * 
 * 解释
 * Spreadsheet spreadsheet = new Spreadsheet(3); // 初始化一个具有 3 行和 26 列的电子表格
 * spreadsheet.getValue("=5+7"); // 返回 12 (5+7)
 * spreadsheet.setCell("A1", 10); // 设置 A1 为 10
 * spreadsheet.getValue("=A1+6"); // 返回 16 (10+6)
 * spreadsheet.setCell("B2", 15); // 设置 B2 为 15
 * spreadsheet.getValue("=A1+B2"); // 返回 25 (10+15)
 * spreadsheet.resetCell("A1"); // 重置 A1 为 0
 * spreadsheet.getValue("=A1+B2"); // 返回 15 (0+15)
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= rows <= 10^3
 * 0 <= value <= 10^5
 * 公式保证采用 "=X+Y" 格式，其中 X 和 Y 要么是有效的单元格引用，要么是小于等于 10^5 的 非负 整数。
 * 每个单元格引用由一个大写字母 'A' 到 'Z' 和一个介于 1 和 rows 之间的行号组成。
 * 总共 最多会对 setCell、resetCell 和 getValue 调用 10^4 次。
 * 
 * 
 */

export {};

// @lc code=start
class Spreadsheet {
  // 使用哈希表存储单元格数据
  // key: 单元格引用字符串（如 "A1", "B2"）
  // value: 单元格的数值
  map: Record<string, number>;

  /**
   * 初始化电子表格
   * @param rows - 行数（虽然参数存在，但哈希表实现不需要预分配空间）
   */
  constructor(rows: number) {
    // 初始化空的哈希表，只存储实际被设置的单元格
    this.map = {};
  }

  /**
   * 设置指定单元格的值
   * @param cell - 单元格引用，格式如 "A1", "B10"
   * @param value - 要设置的值
   */
  setCell(cell: string, value: number): void {
    // 直接在哈希表中存储单元格值
    this.map[cell] = value;
  }

  /**
   * 重置指定单元格的值为0
   * @param cell - 单元格引用，格式如 "A1", "B10"
   */
  resetCell(cell: string): void {
    // 将单元格值设置为0（注意：这里仍然存储0，而不是删除键）
    this.map[cell] = 0;
  }

  /**
   * 计算公式的值
   * @param formula - 公式字符串，格式为 "=X+Y"
   * @returns 计算结果
   */
  getValue(formula: string): number {
    // 找到加号的位置
    const idx = formula.indexOf("+");
    // 提取第一个操作数（去掉开头的"="）
    const c1 = formula.slice(1, idx);
    // 提取第二个操作数
    const c2 = formula.slice(idx + 1);
    // 计算两个操作数的值并相加
    // 使用空值合并操作符 ?? 处理未定义的单元格（默认为0）
    return (this.getCellVal(c1) ?? 0) + (this.getCellVal(c2) ?? 0);
  }

  /**
   * 获取单元格或数字的值
   * @param cell - 单元格引用或数字字符串
   * @returns 对应的数值，如果单元格未设置则返回undefined
   */
  private getCellVal(cell: string): number {
    // 检查是否为单元格引用（以大写字母开头）
    if (/[A-Z]/.test(cell[0])) {
      // 从哈希表中获取单元格值（可能为undefined）
      return this.map[cell];
    }
    // 否则直接解析为数字
    return parseInt(cell);
  }
}

/**
 * Your Spreadsheet object will be instantiated and called as such:
 * var obj = new Spreadsheet(rows)
 * obj.setCell(cell,value)
 * obj.resetCell(cell)
 * var param_3 = obj.getValue(formula)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个简化的电子表格系统，支持单元格的读写和简单公式计算
   - 核心功能：存储数据、解析单元格引用、计算公式表达式
   - 关键挑战：高效存储稀疏的单元格数据，避免不必要的内存浪费

2. 算法分析：
   - 时间复杂度：
     * setCell: O(1) - 哈希表插入操作
     * resetCell: O(1) - 哈希表更新操作
     * getValue: O(1) - 字符串解析和哈希表查找
   - 空间复杂度：O(k) - k为实际被设置的单元格数量（稀疏存储）
   - 算法类型：哈希表 + 字符串解析

3. 核心设计思想：
   - 稀疏存储：只存储实际被设置的单元格，避免预分配大量空间
   - 直接映射：将单元格引用字符串直接作为哈希表的键
   - 延迟初始化：未设置的单元格在访问时返回undefined，通过??操作符处理

4. 数据结构选择：
   - map: Record<string, number>
     * 哈希表，key为单元格引用字符串（如"A1"），value为数值
     * 优势：O(1)查找和插入，只存储实际数据
     * 劣势：无法直接遍历所有可能的单元格

5. 关键实现细节：
   - 稀疏存储策略：
     ```typescript
     this.map = {};  // 只存储实际被设置的单元格
     ```
     * 不预分配空间，按需存储
     * 未设置的单元格在哈希表中不存在
   
   - 未定义值处理：
     ```typescript
     return (this.getCellVal(c1) ?? 0) + (this.getCellVal(c2) ?? 0);
     ```
     * 使用空值合并操作符 ?? 处理undefined
     * 未设置的单元格默认为0
   
   - 重置策略：
     ```typescript
     this.map[cell] = 0;  // 存储0而不是删除键
     ```
     * 保持键的存在，便于后续访问
     * 避免频繁的删除和插入操作

6. 示例分析：
   初始化：Spreadsheet(3) 创建空的哈希表 {}
   
   setCell("A1", 10)：
   - 存储：map["A1"] = 10
   - 状态：{"A1": 10}
   
   setCell("B2", 15)：
   - 存储：map["B2"] = 15
   - 状态：{"A1": 10, "B2": 15}
   
   getValue("=A1+B2")：
   - 解析：c1="A1", c2="B2"
   - 计算：map["A1"] + map["B2"] = 10 + 15 = 25
   
   resetCell("A1")：
   - 更新：map["A1"] = 0
   - 状态：{"A1": 0, "B2": 15}
   
   getValue("=A1+B2")：
   - 计算：map["A1"] + map["B2"] = 0 + 15 = 15

7. 算法优势：
   - 内存效率：只存储实际数据，适合稀疏场景
   - 实现简洁：代码量少，逻辑清晰
   - 性能优秀：所有操作都是O(1)时间复杂度
   - 扩展性好：容易添加新的单元格引用格式

8. 与二维数组方案对比：
   - 内存使用：
     * 哈希表：O(k)，k为实际单元格数
     * 二维数组：O(rows × 26)，固定空间
   - 适用场景：
     * 哈希表：稀疏数据，大部分单元格为空
     * 二维数组：密集数据，大部分单元格被使用
   - 实现复杂度：
     * 哈希表：更简单，无需坐标转换
     * 二维数组：需要坐标转换逻辑

9. 边界情况处理：
   - 未设置的单元格：通过 ?? 操作符处理，默认为0
   - 重置为0的单元格：仍然存储在哈希表中
   - 无效单元格引用：题目保证输入合法
   - 公式格式：题目保证为"=X+Y"格式

10. 字符串处理技巧：
    - 使用正则表达式 /[A-Z]/ 检测单元格引用
    - 使用 slice() 和 indexOf() 进行字符串分割
    - 使用空值合并操作符 ?? 处理undefined值

11. 内存优化策略：
    - 稀疏存储：只存储非零单元格
    - 延迟初始化：按需创建单元格
    - 避免预分配：不创建未使用的空间

12. 扩展思考：
    - 支持删除操作：delete this.map[cell]
    - 支持批量操作：遍历所有单元格
    - 支持范围查询：A1:Z100格式
    - 支持公式缓存：避免重复计算
    - 支持依赖追踪：检测循环引用

13. 类似问题：
    - 稀疏矩阵存储
    - 键值对数据库
    - 配置管理系统
    - 缓存系统设计
    - 分布式哈希表

14. 实现要点总结：
    - 稀疏存储是核心：只存储实际数据
    - 空值处理要小心：使用 ?? 操作符
    - 字符串解析要准确：公式分割和类型识别
    - 重置策略要一致：存储0而不是删除
    - 内存效率要优先：避免不必要的空间分配

15. 性能考虑：
    - 哈希表查找：O(1)平均时间复杂度
    - 字符串操作：slice和indexOf都是O(n)，但n很小
    - 内存访问：局部性好，缓存友好
    - 垃圾回收：减少对象创建，降低GC压力
*/
