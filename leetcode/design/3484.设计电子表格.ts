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

// @lc code=start
class Spreadsheet {
  // 二维数组存储电子表格数据
  // grid[x][y] 表示第x行第y列的单元格值
  // x: 行号（1-based），y: 列号（0-based，A=0, B=1, ..., Z=25）
  grid: number[][];

  /**
   * 初始化电子表格
   * @param rows - 行数（1-based）
   */
  constructor(rows: number) {
    // 创建 (rows+1) × 27 的二维数组
    // +1 是因为行号从1开始，数组索引从0开始
    // 27列：A-Z（26列）+ 索引0（不使用）
    this.grid = Array.from({ length: rows + 1 }, () => Array(27).fill(0));
  }

  /**
   * 设置指定单元格的值
   * @param cell - 单元格引用，格式如 "A1", "B10"
   * @param value - 要设置的值
   */
  setCell(cell: string, value: number): void {
    // 解析单元格位置
    const [x, y] = this.getPos(cell);
    // 设置单元格值
    this.grid[x][y] = value;
  }

  /**
   * 重置指定单元格的值为0
   * @param cell - 单元格引用，格式如 "A1", "B10"
   */
  resetCell(cell: string): void {
    // 解析单元格位置
    const [x, y] = this.getPos(cell);
    // 重置为0
    this.grid[x][y] = 0;
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
    return this.getCellVal(c1) + this.getCellVal(c2);
  }

  /**
   * 解析单元格引用，返回行列坐标
   * @param cell - 单元格引用，如 "A1", "B10"
   * @returns [行号, 列号] 元组
   */
  private getPos(cell: string): [number, number] {
    // 提取行号：从第1个字符开始到结尾的数字部分
    const x = parseInt(cell.slice(1));
    // 提取列号：将字母转换为数字（A=0, B=1, ..., Z=25）
    const y = cell.charCodeAt(0) - "A".charCodeAt(0);
    return [x, y];
  }

  /**
   * 获取单元格或数字的值
   * @param cell - 单元格引用或数字字符串
   * @returns 对应的数值
   */
  private getCellVal(cell: string): number {
    // 检查是否为单元格引用（以大写字母开头）
    if (/[A-Z]/.test(cell[0])) {
      // 解析单元格位置并返回对应的值
      const [x, y] = this.getPos(cell);
      return this.grid[x][y];
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
   - 关键挑战：将Excel风格的单元格引用（如"A1"）转换为数组坐标

2. 算法分析：
   - 时间复杂度：
     * setCell: O(1) - 直接数组访问
     * resetCell: O(1) - 直接数组访问
     * getValue: O(1) - 字符串解析和数组访问
   - 空间复杂度：O(rows × 26) - 存储所有单元格数据
   - 算法类型：模拟 + 字符串解析

3. 核心设计思想：
   - 二维数组存储：使用二维数组模拟电子表格的网格结构
   - 坐标转换：将Excel风格的单元格引用转换为数组索引
   - 公式解析：解析简单的加法公式，支持单元格引用和数字

4. 数据结构选择：
   - grid: number[][]
     * 二维数组，grid[x][y] 表示第x行第y列的值
     * x: 行号（1-based，对应Excel行号）
     * y: 列号（0-based，A=0, B=1, ..., Z=25）

5. 关键实现细节：
   - 数组大小设计：
     ```typescript
     Array.from({ length: rows + 1 }, () => Array(27).fill(0))
     ```
     * rows + 1：因为Excel行号从1开始，数组索引从0开始
     * 27列：A-Z（26列）+ 索引0（不使用，保持一致性）
   
   - 单元格引用解析：
     ```typescript
     const x = parseInt(cell.slice(1));  // 行号
     const y = cell.charCodeAt(0) - "A".charCodeAt(0);  // 列号
     ```
     * 行号：从第1个字符开始解析数字
     * 列号：将字母转换为数字（A=0, B=1, ..., Z=25）
   
   - 公式解析策略：
     ```typescript
     const idx = formula.indexOf("+");
     const c1 = formula.slice(1, idx);  // 第一个操作数
     const c2 = formula.slice(idx + 1); // 第二个操作数
     ```
     * 找到加号位置，分割公式
     * 去掉开头的"="符号
     * 分别处理两个操作数

6. 示例分析：
   初始化：Spreadsheet(3) 创建 4×27 的数组
   
   setCell("A1", 10)：
   - 解析：A1 → [1, 0]
   - 设置：grid[1][0] = 10
   
   getValue("=A1+6")：
   - 解析：c1="A1", c2="6"
   - 计算：getCellVal("A1") + getCellVal("6") = 10 + 6 = 16
   
   getValue("=A1+B2")：
   - 解析：c1="A1", c2="B2"
   - 计算：getCellVal("A1") + getCellVal("B2") = 10 + 15 = 25

7. 算法优势：
   - 实现简单：直接使用二维数组，逻辑清晰
   - 性能优秀：所有操作都是O(1)时间复杂度
   - 内存效率：只存储实际需要的数据
   - 易于扩展：可以轻松添加更多公式类型

8. 边界情况处理：
   - 未设置的单元格：默认为0（符合题目要求）
   - 无效单元格引用：题目保证输入合法
   - 公式格式：题目保证为"=X+Y"格式
   - 数字范围：0到10^5，在JavaScript安全范围内

9. 字符串处理技巧：
   - 使用正则表达式 /[A-Z]/ 检测单元格引用
   - 使用 charCodeAt() 进行字母到数字的转换
   - 使用 slice() 和 indexOf() 进行字符串分割

10. 坐标系统设计：
    - Excel风格：A1, B2, C3...
    - 数组索引：grid[1][0], grid[2][1], grid[3][2]...
    - 转换公式：x = parseInt(cell.slice(1)), y = cell.charCodeAt(0) - 'A'

11. 扩展思考：
    - 支持更多公式：减法、乘法、除法
    - 支持多单元格引用：=A1+B2+C3
    - 支持函数：=SUM(A1:A10)
    - 支持循环引用检测
    - 支持公式缓存和依赖追踪

12. 类似问题：
    - Excel公式计算器
    - 计算器设计
    - 表达式求值
    - 表格数据处理系统
    - 数据透视表设计

13. 实现要点总结：
    - 坐标转换是核心：Excel引用 ↔ 数组索引
    - 字符串解析要准确：公式分割和类型识别
    - 数组设计要考虑边界：行号从1开始的问题
    - 类型判断要可靠：单元格引用 vs 数字
*/
