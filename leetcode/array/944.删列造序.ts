/*
 * @lc app=leetcode.cn id=944 lang=typescript
 *
 * [944] 删列造序
 *
 * https://leetcode.cn/problems/delete-columns-to-make-sorted/description/
 *
 * algorithms
 * Easy (68.38%)
 * Likes:    67
 * Dislikes: 0
 * Total Accepted:    30.5K
 * Total Submissions: 44K
 * Testcase Example:  '["cba","daf","ghi"]'
 *
 * 给你由 n 个小写字母字符串组成的数组 strs，其中每个字符串长度相等。
 *
 * 这些字符串可以每个一行，排成一个网格。例如，strs = ["abc", "bce", "cae"]
 * 可以排列为：
 *
 *
 * abc
 * bce
 * cae
 *
 * 你需要找出并删除 不是按字典序升序排列的 列。在上面的例子（下标从 0
 * 开始）中，列 0（'a', 'b', 'c'）和列 2（'c', 'e', 'e'）
 * 都是按升序排列的，而列 1（'b', 'c', 'a'）不是，所以要删除列 1 。
 *
 * 返回你需要删除的列数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["cba","daf","ghi"]
 * 输出：1
 * 解释：网格示意如下：
 * ⁠ cba
 * ⁠ daf
 * ⁠ ghi
 * 列 0 和列 2 按升序排列，但列 1 不是，所以只需要删除列 1 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["a","b"]
 * 输出：0
 * 解释：网格示意如下：
 * ⁠ a
 * ⁠ b
 * 只有列 0 这一列，且已经按升序排列，所以不用删除任何列。
 *
 *
 * 示例 3：
 *
 *
 * 输入：strs = ["zyx","wvu","tsr"]
 * 输出：3
 * 解释：网格示意如下：
 * ⁠ zyx
 * ⁠ wvu
 * ⁠ tsr
 * 所有 3 列都是非升序排列的，所以都要删除。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == strs.length
 * 1
 * 1
 * strs[i] 由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 统计需要删除的列数，使每一列自上而下按字典序非递减。
 *
 * @param strs - 等长小写字母字符串数组。
 * @returns 需要删除的列数。
 */
function minDeletionSize(strs: string[]): number {
  let deleted = 0; // 需要删除的列数
  const rows = strs.length;
  const cols = strs[0].length;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows - 1; row++) {
      // 只要出现逆序，就必须删除该列
      if (strs[row][col] > strs[row + 1][col]) {
        deleted++;
        break;
      }
    }
  }
  return deleted;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：按列检查字符是否自上而下非递减，不满足则删除该列。
   - 关键特点：所有字符串等长，列数固定，列与列之间互不影响。
   - 目标：统计需要删除的列数。

2. 算法分析：
   - 时间复杂度：O(m * n)，m 为列数，n 为行数。
   - 空间复杂度：O(1)。
   - 算法类型：直接遍历。

3. 解题思路：
   - 核心思想：逐列检查是否存在相邻逆序字符。
   - 推导过程：若某列存在任意一对相邻行字符逆序，则该列必须删除。
   - 主要步骤：
     1) 遍历列。
     2) 在列内遍历相邻行字符。
     3) 一旦发现逆序，计数加一并跳过该列。

4. 实现要点：
   - 行列数从输入直接获取。
   - 发现逆序立即 break，避免无谓比较。
   - 使用清晰的 col、row 变量，避免索引混淆。

5. 算法优势
   - 逻辑简单，易于验证正确性。
   - 常数空间，适合大规模输入。

6. 核心算法步骤（可选）
   - for 每列：
     - for 相邻行：
       - 若逆序则删除计数 +1。

7. 示例分析
   - 示例 1：["cba","daf","ghi"]。
     - 列 1 出现 b > a，删除 1 列，答案 1。
   - 示例 2：["a","b"]。
     - 只有一列且有序，答案 0。
   - 示例 3：["zyx","wvu","tsr"]。
     - 每一列都逆序，答案 3。

8. 常见错误
   - 忘记相邻比较，只比较首尾导致遗漏逆序。
   - 列内逆序后未 break，重复计数。
   - 行列索引写反，导致越界或判断错误。

10. 扩展思考
   - 若需删除最少列使整张表按行排序，则是另一个更复杂的问题。
   - 本题列与列独立，适合直接扫描统计。
*/
