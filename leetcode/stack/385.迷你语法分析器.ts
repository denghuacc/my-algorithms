/*
 * @lc app=leetcode.cn id=385 lang=typescript
 *
 * [385] 迷你语法分析器
 *
 * https://leetcode-cn.com/problems/mini-parser/description/
 *
 * algorithms
 * Medium (48.00%)
 * Likes:    109
 * Dislikes: 0
 * Total Accepted:    12.2K
 * Total Submissions: 25.4K
 * Testcase Example:  '"324"'
 *
 * 给定一个字符串 s 表示一个整数嵌套列表，实现一个解析它的语法分析器并返回解析的结果 NestedInteger 。
 *
 * 列表中的每个元素只可能是整数或整数嵌套列表
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "324",
 * 输出：324
 * 解释：你应该返回一个 NestedInteger 对象，其中只包含整数值 324。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "[123,[456,[789]]]",
 * 输出：[123,[456,[789]]]
 * 解释：返回一个 NestedInteger 对象包含一个有两个元素的嵌套列表：
 * 1. 一个 integer 包含值 123
 * 2. 一个包含两个元素的嵌套列表：
 * ⁠   i.  一个 integer 包含值 456
 * ⁠   ii. 一个包含一个元素的嵌套列表
 * ⁠        a. 一个 integer 包含值 789
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 5 * 10^4
 * s 由数字、方括号 "[]"、负号 '-' 、逗号 ','组成
 * 用例保证 s 是可解析的 NestedInteger
 * 输入中的所有值的范围是 [-10^6, 10^6]
 *
 *
 */

// fake class for type check
class NestedInteger {
  private value: number | null = null;
  private list: NestedInteger[] = [];
  constructor(value = 0) {
    this.setInteger(value);
  }
  isInteger(): boolean {
    return this.value !== null;
  }
  getInteger(): number | null {
    return this.value;
  }
  setInteger(value: number): void {
    this.value = value;
  }
  add(ni: NestedInteger): void {
    this.list.push(ni);
  }
  getList(): NestedInteger[] {
    return this.list;
  }
}

// @lc code=start
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *     If value is provided, then it holds a single integer
 *     Otherwise it holds an empty nested list
 *     constructor(value?: number) {
 *         ...
 *     };
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     isInteger(): boolean {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     getInteger(): number | null {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     setInteger(value: number) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     add(elem: NestedInteger) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds,
 *     or an empty list if this NestedInteger holds a single integer
 *     getList(): NestedInteger[] {
 *         ...
 *     };
 * };
 */

//stack
function deserialize(s: string): NestedInteger {
  if (s[0] !== "[") {
    return new NestedInteger(parseInt(s, 10));
  }
  const stack: NestedInteger[] = [];
  let num = 0;
  let negative = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "-") {
      negative = true;
    } else if (isDigit(c)) {
      num = num * 10 + c.charCodeAt(0) - "0".charCodeAt(0);
    } else if (c === "[") {
      stack.push(new NestedInteger());
    } else if (c === "," || c === "]") {
      if (isDigit(s[i - 1])) {
        if (negative) {
          num = -num;
        }
        stack[stack.length - 1].add(new NestedInteger(num));
      }
      num = 0;
      negative = false;
      if (c === "]" && stack.length > 1) {
        const ni = stack.pop()!;
        stack[stack.length - 1].add(ni);
      }
    }
  }
  return stack.pop()!;

  function isDigit(c: string): boolean {
    return parseFloat(c).toString() === "NaN" ? false : true;
  }
}
// @lc code=end
