/*
 * @lc app=leetcode.cn id=165 lang=typescript
 *
 * [165] 比较版本号
 *
 * https://leetcode-cn.com/problems/compare-version-numbers/description/
 *
 * algorithms
 * Medium (48.64%)
 * Likes:    204
 * Dislikes: 0
 * Total Accepted:    59.8K
 * Total Submissions: 119.9K
 * Testcase Example:  '"1.01"\n"1.001"'
 *
 * 给你两个版本号 version1 和 version2 ，请你比较它们。
 *
 * 版本号由一个或多个修订号组成，各修订号由一个 '.' 连接。每个修订号由 多位数字 组成，可能包含 前导零
 * 。每个版本号至少包含一个字符。修订号从左到右编号，下标从 0 开始，最左边的修订号下标为 0 ，下一个修订号下标为 1 ，以此类推。例如，2.5.33
 * 和 0.1 都是有效的版本号。
 *
 * 比较版本号时，请按从左到右的顺序依次比较它们的修订号。比较修订号时，只需比较 忽略任何前导零后的整数值 。也就是说，修订号 1 和修订号 001 相等
 * 。如果版本号没有指定某个下标处的修订号，则该修订号视为 0 。例如，版本 1.0 小于版本 1.1 ，因为它们下标为 0 的修订号相同，而下标为 1
 * 的修订号分别为 0 和 1 ，0 < 1 。
 *
 * 返回规则如下：
 *
 *
 * 如果 version1 > version2 返回 1，
 * 如果 version1 version2 返回 -1，
 * 除此之外返回 0。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：version1 = "1.01", version2 = "1.001"
 * 输出：0
 * 解释：忽略前导零，"01" 和 "001" 都表示相同的整数 "1"
 *
 *
 * 示例 2：
 *
 *
 * 输入：version1 = "1.0", version2 = "1.0.0"
 * 输出：0
 * 解释：version1 没有指定下标为 2 的修订号，即视为 "0"
 *
 *
 * 示例 3：
 *
 *
 * 输入：version1 = "0.1", version2 = "1.1"
 * 输出：-1
 * 解释：version1 中下标为 0 的修订号是 "0"，version2 中下标为 0 的修订号是 "1" 。0 < 1，所以 version1 <
 * version2
 *
 *
 * 示例 4：
 *
 *
 * 输入：version1 = "1.0.1", version2 = "1"
 * 输出：1
 *
 *
 * 示例 5：
 *
 *
 * 输入：version1 = "7.5.2.4", version2 = "7.5.3"
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * version1 和 version2 仅包含数字和 '.'
 * version1 和 version2 都是 有效版本号
 * version1 和 version2 的所有修订号都可以存储在 32 位整数 中
 *
 *
 */

// @lc code=start
/**
 * 解法一：数组模拟法
 * 将版本号按点分割成数组，然后逐段比较
 */
function compareVersion(version1: string, version2: string): number {
  // 1. 将版本号按 '.' 分割成数组
  const arrV1 = version1.split(".");
  const arrV2 = version2.split(".");

  // 2. 获取两个版本号的最大段数，用于处理长度不同的情况
  const maxLen = Math.max(arrV1.length, arrV2.length);

  // 3. 逐段比较版本号
  for (let i = 0; i < maxLen; i++) {
    // 使用 ?? 操作符处理 undefined 情况，当某版本号段数不足时默认为 0
    // Number() 会自动忽略前导零，如 "001" -> 1
    const v1 = Number(arrV1[i] ?? 0);
    const v2 = Number(arrV2[i] ?? 0);

    // 4. 比较当前段的数值
    if (v1 > v2) {
      return 1; // version1 > version2
    } else if (v1 < v2) {
      return -1; // version1 < version2
    }
    // 如果相等，继续比较下一段
  }

  // 5. 所有段都相等，返回 0
  return 0;
}

/**
 * 解法二：双指针法（空间优化）
 * 使用双指针直接在字符串上遍历，避免创建额外数组
 */
function compareVersion2(version1: string, version2: string): number {
  const n1 = version1.length;
  const n2 = version2.length;
  let i = 0; // version1 的指针
  let j = 0; // version2 的指针

  // 6. 当任一版本号还有字符时继续比较
  while (i < n1 || j < n2) {
    // 7. 解析 version1 的当前段
    let x = 0;
    for (; i < n1 && version1[i] !== "."; i++) {
      // 将字符转换为数字：'0' -> 0, '1' -> 1, ..., '9' -> 9
      x = x * 10 + getCharCodeFromZero(version1[i]);
    }
    i++; // 跳过 '.' 字符

    // 8. 解析 version2 的当前段
    let y = 0;
    for (; j < n2 && version2[j] !== "."; j++) {
      y = y * 10 + getCharCodeFromZero(version2[j]);
    }
    j++; // 跳过 '.' 字符

    // 9. 比较当前段的数值
    if (x !== y) {
      return x > y ? 1 : -1;
    }
  }

  // 10. 所有段都相等，返回 0
  return 0;

  /**
   * 辅助函数：将字符转换为对应的数字
   * @param str 单个字符
   * @returns 对应的数字值
   */
  function getCharCodeFromZero(str: string): number {
    return str.charCodeAt(0) - "0".charCodeAt(0);
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 比较两个版本号字符串的大小关系
   - 版本号由多个用点分隔的数字段组成，需要逐段比较
   - 忽略前导零，缺失的段视为 0

2. 算法分析：
   - 时间复杂度：O(max(m, n)) - m 和 n 分别是两个版本号的长度
   - 空间复杂度：
     * 解法一：O(m + n) - 需要存储分割后的数组
     * 解法二：O(1) - 只使用常数额外空间
   - 算法类型：字符串处理、双指针

3. 解题思路：
   - 核心思想：将版本号按点分割，逐段比较数值大小
   - 关键观察：前导零不影响数值大小，缺失段默认为 0
   - 算法步骤：
     a) 分割版本号为数字段数组
     b) 逐段比较，处理长度不同的情况
     c) 返回比较结果

4. 实现要点：
   - 数据结构选择：
     * 解法一：使用数组存储分割后的段，便于索引访问
     * 解法二：使用双指针直接在字符串上遍历，节省空间
   - 边界条件处理：
     * 使用 ?? 操作符处理 undefined（段数不足的情况）
     * Number() 自动处理前导零
     * 双指针法需要处理字符串结束的情况
   - 优化技巧：
     * 解法二避免了创建额外数组，空间复杂度更优
     * 字符转数字使用 charCodeAt 比 parseInt 更高效

5. 示例分析：
   示例1：version1 = "1.01", version2 = "1.001"
   - 分割后：["1", "01"] vs ["1", "001"]
   - 转换后：[1, 1] vs [1, 1]
   - 逐段比较：1 == 1, 1 == 1
   - 结果：0

   示例2：version1 = "1.0", version2 = "1.0.0"
   - 分割后：["1", "0"] vs ["1", "0", "0"]
   - 转换后：[1, 0, 0] vs [1, 0, 0] (使用 ?? 补0)
   - 逐段比较：1 == 1, 0 == 0, 0 == 0
   - 结果：0

   示例3：version1 = "0.1", version2 = "1.1"
   - 分割后：["0", "1"] vs ["1", "1"]
   - 转换后：[0, 1] vs [1, 1]
   - 逐段比较：0 < 1，直接返回 -1

6. 常见陷阱：
   - 前导零处理：不要直接比较字符串，要转换为数字
   - 长度不同：较短的版本号缺失段要视为 0
   - 边界检查：确保指针不越界
   - 字符转数字：使用正确的方法避免类型错误

7. 扩展思考：
   - 类似问题：比较IP地址、比较时间版本等
   - 算法变种：支持字母版本号（如 "1.0a"）
   - 实际应用：软件版本管理、依赖版本比较
   - 优化方向：支持更复杂的版本号格式（如语义化版本）
*/
