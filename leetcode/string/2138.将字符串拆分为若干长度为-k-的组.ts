/*
 * @lc app=leetcode.cn id=2138 lang=typescript
 *
 * [2138] 将字符串拆分为若干长度为 k 的组
 *
 * https://leetcode.cn/problems/divide-a-string-into-groups-of-size-k/description/
 *
 * algorithms
 * Easy (67.21%)
 * Likes:    21
 * Dislikes: 0
 * Total Accepted:    16.4K
 * Total Submissions: 23.6K
 * Testcase Example:  '"abcdefghi"\n3\n"x"'
 *
 * 字符串 s 可以按下述步骤划分为若干长度为 k 的组：
 *
 *
 * 第一组由字符串中的前 k 个字符组成，第二组由接下来的 k 个字符串组成，依此类推。每个字符都能够成为 某一个 组的一部分。
 * 对于最后一组，如果字符串剩下的字符 不足 k 个，需使用字符 fill 来补全这一组字符。
 *
 *
 * 注意，在去除最后一个组的填充字符 fill（如果存在的话）并按顺序连接所有的组后，所得到的字符串应该是 s 。
 *
 * 给你一个字符串 s ，以及每组的长度 k 和一个用于填充的字符 fill ，按上述步骤处理之后，返回一个字符串数组，该数组表示 s 分组后
 * 每个组的组成情况 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abcdefghi", k = 3, fill = "x"
 * 输出：["abc","def","ghi"]
 * 解释：
 * 前 3 个字符是 "abc" ，形成第一组。
 * 接下来 3 个字符是 "def" ，形成第二组。
 * 最后 3 个字符是 "ghi" ，形成第三组。
 * 由于所有组都可以由字符串中的字符完全填充，所以不需要使用填充字符。
 * 因此，形成 3 组，分别是 "abc"、"def" 和 "ghi" 。
 *
 *
 * 示例 2：
 *
 * 输入：s = "abcdefghij", k = 3, fill = "x"
 * 输出：["abc","def","ghi","jxx"]
 * 解释：
 * 与前一个例子类似，形成前三组 "abc"、"def" 和 "ghi" 。
 * 对于最后一组，字符串中仅剩下字符 'j' 可以用。为了补全这一组，使用填充字符 'x' 两次。
 * 因此，形成 4 组，分别是 "abc"、"def"、"ghi" 和 "jxx" 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s 仅由小写英文字母组成
 * 1 <= k <= 100
 * fill 是一个小写英文字母
 *
 *
 */

// @lc code=start
export function divideString(s: string, k: number, fill: string): string[] {
  const res = [];

  // 按步长 k 遍历字符串，每次提取长度为 k 的子串
  for (let i = 0; i < s.length; i += k) {
    // slice(i, i + k) 提取从位置 i 开始的 k 个字符
    // 如果剩余字符不足 k 个，slice 会自动处理边界
    res.push(s.slice(i, i + k));
  }

  // 处理最后一组：如果长度不足 k，需要用 fill 字符补齐
  const last = res[res.length - 1];
  const lastLength = last.length;

  if (lastLength < k) {
    // 使用 repeat() 生成需要的填充字符
    // 需要补充的字符数 = k - lastLength
    res[res.length - 1] = last + fill.repeat(k - lastLength);
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将字符串按固定长度 k 分组
   - 最后一组不足 k 个字符时，用指定字符填充
   - 返回分组后的字符串数组

2. 算法分析：
   - 时间复杂度：O(n)，其中 n 是字符串长度，需要遍历整个字符串
   - 空间复杂度：O(n)，需要存储分组结果和可能的填充字符
   - 算法类型：字符串处理 + 简单模拟

3. 实现要点：
   - **分组策略**：使用步长为 k 的循环，每次提取 k 个字符
   - **边界处理**：JavaScript 的 slice() 方法自动处理越界情况
   - **填充逻辑**：检查最后一组长度，不足时补充填充字符
   - **字符串操作**：使用 repeat() 方法高效生成重复字符

4. 核心步骤：
   1. **分组阶段**：按步长 k 遍历，用 slice 提取子串
   2. **检查阶段**：判断最后一组是否需要填充
   3. **填充阶段**：如果需要，计算缺少的字符数并补充

5. 示例分析：
   - 示例1: s="abcdefghi", k=3
     * 分组：["abc", "def", "ghi"]
     * 最后一组长度=3，无需填充
   
   - 示例2: s="abcdefghij", k=3  
     * 分组：["abc", "def", "ghi", "j"]
     * 最后一组长度=1，需要填充2个字符："j" + "xx" = "jxx"

6. 优化要点：
   - 使用 slice() 而不是 substring()，因为 slice 处理边界更安全
   - 使用 repeat() 而不是循环拼接，更高效且代码更简洁
   - 只对最后一组检查填充，避免不必要的计算
   - 直接修改数组最后一个元素，避免重新构建数组

7. 边界情况：
   - k=1：每个字符单独成组
   - k >= 字符串长度：整个字符串为一组，可能需要填充
   - 字符串长度正好是 k 的倍数：无需填充
   - 空字符串：返回空数组（实际约束保证不会出现）

8. 扩展思考：
   - 可以扩展为按不同长度分组
   - 可以支持不同的填充策略（前填充、居中填充等）
   - 可以优化为流式处理大文件的分组
*/
