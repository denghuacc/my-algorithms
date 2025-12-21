/*
 * @lc app=leetcode.cn id=955 lang=typescript
 *
 * [955] 删列造序 II
 *
 * https://leetcode.cn/problems/delete-columns-to-make-sorted-ii/description/
 *
 * algorithms
 * Medium (36.14%)
 * Likes:    753
 * Dislikes: 111
 * Total Accepted:    33.6K
 * Total Submissions: 82.9K
 * Testcase Example:  '["ca","bb","ac"]'
 *
 * 给你一个由 n 个字符串组成的数组 strs，所有字符串长度相同。
 *
 * 你可以选择若干删除列索引，并对每个字符串删除这些索引处的字符。
 *
 * 例如，strs = ["abcdef","uvwxyz"]，删除列索引 {0, 2, 3} 后，最终数组为
 * ["bef", "vyz"]。
 *
 * 设你选择的删除列集合 answer 使得删除后的数组按字典序非递减排列
 * （即 strs[0] <= strs[1] <= strs[2] <= ... <= strs[n - 1]），
 * 请返回 answer.length 的最小可能值。
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["ca","bb","ac"]
 * 输出：1
 * 解释：
 * 删除第 0 列后，strs = ["a", "b", "c"]。
 * 此时 strs 按字典序排列（即 strs[0] <= strs[1] <= strs[2]）。
 * 由于初始时不满足字典序，至少需要删除 1 列，因此答案为 1。
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["xc","yb","za"]
 * 输出：0
 * 解释：
 * strs 已经按字典序排列，因此不需要删除任何列。
 * 注意：strs 的行内字符不一定按字典序排列，即并不要求
 * strs[0][0] <= strs[0][1] <= ... 成立。
 *
 *
 * 示例 3：
 *
 *
 * 输入：strs = ["zyx","wvu","tsr"]
 * 输出：3
 * 解释：必须删除每一列。
 *
 *
 *
 * 提示：
 *
 *
 * n == strs.length
 * 1 <= n <= 100
 * 1 <= strs[i].length <= 100
 * strs[i] 由小写英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 方法一：逐列拼接前缀字符串，再判断字典序是否有序。
 *
 * @param strs - 等长字符串数组，1 <= strs.length <= 100
 * @returns 需要删除的最小列数
 */
var minDeletionSize = function (strs: string[]): number {
  const m = strs.length;
  const n = strs[0].length;
  let deletions = 0;
  // currentPrefixes 保存当前已保留列形成的“前缀字符串”
  // 用于模拟真实的字典序比较
  let currentPrefixes = new Array(m).fill("");
  for (let j = 0; j < n; j++) {
    // 尝试保留当前列，先复制一份前缀再拼接
    const nextPrefixes = currentPrefixes.slice();
    for (let i = 0; i < m; i++) {
      // 拼接当前列字符，形成“到目前为止”的比较前缀
      nextPrefixes[i] += strs[i][j];
    }
    let valid = true;
    for (let i = 1; i < m; i++) {
      // 只要有相邻行前缀逆序，就必须删除该列
      // 一旦出现前缀逆序，说明保留这一列会破坏整体字典序
      if (nextPrefixes[i] < nextPrefixes[i - 1]) {
        valid = false;
        break;
      }
    }
    if (valid) {
      // 本列保留：更新前缀
      // 仅在前缀仍保持非降序时，才确认保留该列
      currentPrefixes = nextPrefixes;
    } else {
      // 本列删除：前缀不变，删除计数加一
      // 否则删除该列，保持原前缀不变
      deletions++;
    }
  }
  return deletions;
};

// method 2
/**
 * 方法二：贪心地逐列判定是否删除，并记录已确定有序的相邻行对。
 *
 * @param strs - 等长字符串数组，1 <= strs.length <= 100
 * @returns 需要删除的最小列数
 */
var minDeletionSize = function (strs: string[]): number {
  const rowCount = strs.length;
  const colCount = strs[0].length;
  // fixedOrder[i] 表示第 i 行与第 i+1 行的顺序已被前缀确定
  const fixedOrder = new Array(rowCount - 1).fill(false);
  // unresolvedPairs 记录尚未确定顺序的相邻行对数量，用于提前结束
  let unresolvedPairs = rowCount - 1;
  let deletions = 0;

  for (let col = 0; col < colCount; col++) {
    let shouldDelete = false;

    // 先判断本列是否会破坏仍未确定顺序的相邻行对
    for (let row = 0; row < rowCount - 1; row++) {
      if (fixedOrder[row]) {
        // 已确定的相邻行对不再需要比较
        continue;
      }
      // 仅比较仍未确定的相邻行对，避免重复判断
      if (strs[row][col] > strs[row + 1][col]) {
        // 本列出现降序，必须删除该列，避免破坏字典序
        shouldDelete = true;
        break;
      }
    }

    if (shouldDelete) {
      // 删除该列，不更新任何“已确定顺序”的信息
      deletions++;
      continue;
    }

    // 本列保留后，更新哪些相邻行对已经确定顺序
    for (let row = 0; row < rowCount - 1; row++) {
      if (fixedOrder[row]) {
        // 已确定顺序的行对无需重复标记
        continue;
      }
      if (strs[row][col] < strs[row + 1][col]) {
        // 严格升序可永久确定这一对的顺序
        fixedOrder[row] = true;
        unresolvedPairs--;
      }
    }

    if (unresolvedPairs === 0) {
      // 所有相邻行对顺序已确定，后续列不再影响结果
      break;
    }
  }

  return deletions;
};
// @lc code=end

/*
解题思路详解：

题目名称（中文）：删列造序 II

1. 题目理解
   - 问题本质：从左到右选择要删除的列，使字符串数组整体按字典序非递减。
   - 关键特点：所有字符串等长，删除列对所有字符串同步生效。
   - 目标：最少删除列数，保证最终数组有序。

2. 解题思路
   核心思想
   - 使用贪心：逐列决定是否删除。
   - 若某列会破坏当前仍未确定顺序的相邻行对，则必须删除该列。
   - 若某列能让部分相邻行对的顺序固定，则记录为已确定。

   算法步骤
   1) 初始化一个布尔数组 fixedOrder，表示相邻行对是否已确定顺序。
   2) 从左到右遍历列：
      - 若存在未确定的相邻行对在该列出现降序，则删除该列。
      - 否则保留该列，并将出现严格升序的行对标记为已确定。
   3) 当所有相邻行对都已确定顺序时提前结束。

3. 代码实现
   实现步骤
   1) 读取行数 rowCount 与列数 colCount，初始化 deletions 为 0。
   2) 创建布尔数组 fixedOrder，长度为 rowCount - 1，初始为 false。
   3) 从左到右遍历列 col：
      - 先扫描所有未确定的相邻行对，若出现降序则标记需要删除。
      - 若需要删除该列，deletions 加 1，继续处理下一列。
      - 若不删除，则再次扫描未确定的行对，遇到严格升序时标记为已确定。
   4) 若所有相邻行对都已确定顺序，提前结束遍历。
   5) 返回 deletions。

   关键函数说明
   - minDeletionSize：主函数，按列贪心判断删列与否。
   - fixedOrder：记录相邻行对是否已由前缀确定字典序。

4. 复杂度分析
   - 时间复杂度：O(n * m)，n 为行数，m 为列数。
     每列最多扫描一次相邻行对。
   - 空间复杂度：O(n)，仅使用长度为 n - 1 的状态数组。
   - 关键观察：一旦某相邻行对在某列严格升序，该对顺序永久固定。

5. 示例分析
   图解过程
   示例一：strs = ["ca", "bb", "ac"]
   - col0: c > b，破坏顺序，删除该列，deletions = 1
   - col1: a < b < c，全部有序，结束

   示例二：strs = ["xc", "yb", "za"]
   - col0: x < y < z，三对相邻行均确定顺序
   - 已全部确定，无需删除，结果为 0

   示例三：strs = ["zyx", "wvu", "tsr"]
   - col0: z > w，删除
   - col1: y > v，删除
   - col2: x > u，删除
   - 结果为 3

   边界情况
   - 只有一行：无需删除，答案为 0。
   - 所有列都相等：任意列都不会破坏顺序，答案为 0。
   - 每列都降序：每列都必须删除。

6. 算法要点总结
   核心技巧
   - 只关注尚未确定顺序的相邻行对。
   - 保留列后，利用严格升序来固定相邻行对。

   优化要点
   - 通过 fixedOrder 跳过已确定行对，避免无效比较。
   - 当所有相邻行对都固定后提前结束遍历。

   类似问题
   - 944. 删列造序（只需判断每列是否单调）
   - 基于字典序前缀的贪心类问题

7. 常见错误
   - 忽略“已确定顺序”的行对，导致误删列。
   - 在未检测降序前就更新状态，破坏贪心正确性。
   - 误将“非降序”当作“严格升序”，导致过早固定行对。
*/
