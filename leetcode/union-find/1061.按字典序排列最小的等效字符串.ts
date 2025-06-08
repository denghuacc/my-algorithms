/*
 * @lc app=leetcode.cn id=1061 lang=typescript
 *
 * [1061] 按字典序排列最小的等效字符串
 *
 * https://leetcode.cn/problems/lexicographically-smallest-equivalent-string/description/
 *
 * algorithms
 * Medium (67.60%)
 * Likes:    73
 * Dislikes: 0
 * Total Accepted:    17K
 * Total Submissions: 23.3K
 * Testcase Example:  '"parker"\n"morris"\n"parser"'
 *
 * 给出长度相同的两个字符串s1 和 s2 ，还有一个字符串 baseStr 。
 *
 * 其中 s1[i] 和 s2[i]  是一组等价字符。
 *
 *
 * 举个例子，如果 s1 = "abc" 且 s2 = "cde"，那么就有 'a' == 'c', 'b' == 'd', 'c' == 'e'。
 *
 *
 * 等价字符遵循任何等价关系的一般规则：
 *
 *
 * 自反性 ：'a' == 'a'
 * 对称性 ：'a' == 'b' 则必定有 'b' == 'a'
 * 传递性 ：'a' == 'b' 且 'b' == 'c' 就表明 'a' == 'c'
 *
 *
 * 例如， s1 = "abc" 和 s2 = "cde" 的等价信息和之前的例子一样，那么 baseStr = "eed", "acd" 或
 * "aab"，这三个字符串都是等价的，而 "aab" 是 baseStr 的按字典序最小的等价字符串
 *
 * 利用 s1 和 s2 的等价信息，找出并返回 baseStr 的按字典序排列最小的等价字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "parker", s2 = "morris", baseStr = "parser"
 * 输出："makkek"
 * 解释：根据 A 和 B 中的等价信息，我们可以将这些字符分为 [m,p], [a,o], [k,r,s], [e,i] 共 4
 * 组。每组中的字符都是等价的，并按字典序排列。所以答案是 "makkek"。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1 = "hello", s2 = "world", baseStr = "hold"
 * 输出："hdld"
 * 解释：根据 A 和 B 中的等价信息，我们可以将这些字符分为 [h,w], [d,e,o], [l,r] 共 3 组。所以只有 S 中的第二个字符
 * 'o' 变成 'd'，最后答案为 "hdld"。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
 * 输出："aauaaaaada"
 * 解释：我们可以把 A 和 B 中的等价字符分为 [a,o,e,r,s,c], [l,p], [g,t] 和 [d,m] 共 4 组，因此 S 中除了
 * 'u' 和 'd' 之外的所有字母都转化成了 'a'，最后答案为 "aauaaaaada"。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s1.length, s2.length, baseStr <= 1000
 * s1.length == s2.length
 * 字符串s1, s2, and baseStr 仅由从 'a' 到 'z' 的小写英文字母组成。
 *
 *
 */

// @lc code=start
function smallestEquivalentString(
  s1: string,
  s2: string,
  baseStr: string
): string {
  // 并查集数组，索引代表字符相对于'a'的偏移量
  const parent = Array.from({ length: 26 }, (_, i) => i);

  // 查找根节点，带路径压缩
  function find(x: number): number {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // 路径压缩
    }
    return parent[x];
  }

  // 合并两个集合，总是让字典序小的作为根
  function union(x: number, y: number): void {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX !== rootY) {
      // 让字典序更小的字符作为根节点
      if (rootX < rootY) {
        parent[rootY] = rootX;
      } else {
        parent[rootX] = rootY;
      }
    }
  }

  // 建立等价关系
  for (let i = 0; i < s1.length; i++) {
    const char1 = s1.charCodeAt(i) - 97; // 'a'.charCodeAt(0) = 97
    const char2 = s2.charCodeAt(i) - 97;
    union(char1, char2);
  }

  // 构建结果字符串
  let result = "";
  for (let i = 0; i < baseStr.length; i++) {
    const charCode = baseStr.charCodeAt(i) - 97;
    const rootCode = find(charCode);
    result += String.fromCharCode(rootCode + 97);
  }

  return result;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 根据给定的字符等价关系，将字符串中的每个字符替换为其等价组中字典序最小的字符
   - 等价关系具有传递性：如果a=b且b=c，则a=c

2. 算法分析：
   - 时间复杂度：O((n+m) * α(26)) ≈ O(n+m)，其中n是s1,s2长度，m是baseStr长度，α是反阿克曼函数
   - 空间复杂度：O(1)，只使用了固定大小的数组（26个字母）
   - 算法类型：并查集（Union-Find）

3. 实现要点：
   - 使用数组实现并查集，索引0-25对应字符'a'-'z'
   - find函数实现路径压缩，优化查找性能
   - union函数确保字典序小的字符作为根节点
   - 字符与数组索引的转换：char.charCodeAt(0) - 97

4. 优化思路：
   - 路径压缩：在find过程中将节点直接连接到根节点
   - 按秩合并：总是让字典序更小的字符作为根，确保结果的字典序最小
   - 空间优化：只需要26个位置的数组，不依赖输入字符串长度

核心算法流程：
1. 初始化：每个字符的根节点为自己
2. 建立关系：遍历s1和s2，合并等价字符对
3. 查找替换：对baseStr中每个字符，找到其等价组的最小字符
4. 构建结果：将所有字符替换后组成最终字符串

关键优化：
- 在union操作中确保字典序小的字符作为根
- 使用路径压缩减少查找时间
- 利用字符ASCII码的连续性简化数组索引计算
*/
