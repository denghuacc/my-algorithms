/*
 * @lc app=leetcode.cn id=839 lang=typescript
 *
 * [839] 相似字符串组
 *
 * https://leetcode-cn.com/problems/similar-string-groups/description/
 *
 * algorithms
 * Hard (37.16%)
 * Likes:    68
 * Dislikes: 0
 * Total Accepted:    5.3K
 * Total Submissions: 12.3K
 * Testcase Example:  '["tars","rats","arts","star"]'
 *
 * 如果交换字符串 X 中的两个不同位置的字母，使得它和字符串 Y 相等，那么称 X 和 Y
 * 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。
 *
 * 例如，"tars" 和 "rats" 是相似的 (交换 0 与 2 的位置)； "rats" 和 "arts" 也是相似的，但是 "star" 不与
 * "tars"，"rats"，或 "arts" 相似。
 *
 * 总之，它们通过相似性形成了两个关联组：{"tars", "rats", "arts"} 和 {"star"}。注意，"tars" 和 "arts"
 * 是在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。
 *
 * 给你一个字符串列表 strs。列表中的每个字符串都是 strs 中其它所有字符串的一个字母异位词。请问 strs 中有多少个相似字符串组？
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["tars","rats","arts","star"]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["omv","ovm"]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * sum(strs[i].length)
 * strs[i] 只包含小写字母。
 * strs 中的所有单词都具有相同的长度，且是彼此的字母异位词。
 *
 *
 *
 *
 * 备注：
 *
 * 字母异位词（anagram），一种把某个字符串的字母的位置（顺序）加以改换所形成的新词。
 *
 */

// @lc code=start
/**
 * 并查集 (Union Find) 解决方案
 *
 * 核心思想：将相似的字符串合并到同一个连通分量中，最后统计连通分量的数量
 */
function numSimilarGroups(strs: string[]): number {
  const n = strs.length;
  const m = strs[0].length;
  // 初始化并查集，每个字符串初始时属于自己的集合
  const f: number[] = new Array(n).fill(0).map((_, index) => index);

  // 遍历所有字符串对，检查是否相似
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const fi = find(i); // 找到i的根节点
      const fj = find(j); // 找到j的根节点

      // 如果已经在同一个集合中，跳过
      if (fi === fj) {
        continue;
      }

      // 如果两个字符串相似，合并它们的集合
      if (check(strs[i], strs[j], m)) {
        f[fi] = fj; // 将fi的根节点指向fj的根节点
      }
    }
  }

  // 统计连通分量的数量（根节点等于自己的节点数量）
  let ret = 0;
  for (let i = 0; i < n; i++) {
    if (f[i] === i) {
      ret++;
    }
  }
  return ret;

  /**
   * 并查集查找函数（带路径压缩）
   * @param x 要查找的节点
   * @returns 节点x的根节点
   */
  function find(x: number): number {
    return f[x] === x ? x : (f[x] = find(f[x]));
  }

  /**
   * 检查两个字符串是否相似
   * 相似条件：最多只有两个位置的字符不同
   * @param a 第一个字符串
   * @param b 第二个字符串
   * @param len 字符串长度
   * @returns 是否相似
   */
  function check(a: string, b: string, len: number): boolean {
    let num = 0; // 不同字符的数量
    for (let i = 0; i < len; i++) {
      if (a[i] !== b[i]) {
        num++;
        // 如果不同字符超过2个，则不相似
        if (num > 2) {
          return false;
        }
      }
    }
    return true; // 最多2个不同字符，相似
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将字符串按相似性分组，相似字符串在同一组
   - 相似性具有传递性：A相似B，B相似C，则A、B、C在同一组
   - 本质是求图的连通分量数量

2. 算法分析：
   - 时间复杂度：O(n² * m)，其中n是字符串数量，m是字符串长度
     * 需要比较所有字符串对：O(n²)
     * 每次比较需要遍历字符串：O(m)
   - 空间复杂度：O(n)，并查集数组
   - 算法类型：并查集 (Union Find)

3. 实现要点：
   - 使用并查集维护连通分量
   - 相似性判断：最多2个位置字符不同
   - 路径压缩优化查找效率
   - 统计根节点数量得到连通分量数

4. 优化思路：
   - 路径压缩：find函数中直接更新父节点
   - 按秩合并：可以进一步优化（此题数据规模较小，未使用）
   - 提前退出：发现超过2个不同字符时立即返回false

5. 关键技巧：
   - 并查集的路径压缩：f[x] = find(f[x])
   - 相似性判断的优化：计数不同字符，超过2个立即返回
   - 连通分量统计：根节点等于自己的节点数量

6. 类似问题：
   - 朋友圈问题 (547)
   - 岛屿数量问题 (200)
   - 冗余连接问题 (684)
   - 任何需要分组或连通分量统计的问题

7. 算法优势：
   - 并查集操作接近O(1)时间复杂度
   - 代码简洁，逻辑清晰
   - 适合处理具有传递性的关系问题
*/
