/*
 * @lc app=leetcode.cn id=1233 lang=typescript
 *
 * [1233] 删除子文件夹
 *
 * https://leetcode.cn/problems/remove-sub-folders-from-the-filesystem/description/
 *
 * algorithms
 * Medium (51.46%)
 * Likes:    100
 * Dislikes: 0
 * Total Accepted:    17.2K
 * Total Submissions: 30.6K
 * Testcase Example:  '["/a","/a/b","/c/d","/c/d/e","/c/f"]'
 *
 * 你是一位系统管理员，手里有一份文件夹列表 folder，你的任务是要删除该列表中的所有 子文件夹，并以 任意顺序 返回剩下的文件夹。
 *
 * 如果文件夹 folder[i] 位于另一个文件夹 folder[j] 下，那么 folder[i] 就是 folder[j] 的 子文件夹 。
 *
 * 文件夹的「路径」是由一个或多个按以下格式串联形成的字符串：'/' 后跟一个或者多个小写英文字母。
 *
 *
 * 例如，"/leetcode" 和 "/leetcode/problems" 都是有效的路径，而空字符串和 "/" 不是。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
 * 输出：["/a","/c/d","/c/f"]
 * 解释："/a/b" 是 "/a" 的子文件夹，而 "/c/d/e" 是 "/c/d" 的子文件夹。
 *
 *
 * 示例 2：
 *
 *
 * 输入：folder = ["/a","/a/b/c","/a/b/d"]
 * 输出：["/a"]
 * 解释：文件夹 "/a/b/c" 和 "/a/b/d" 都会被删除，因为它们都是 "/a" 的子文件夹。
 *
 *
 * 示例 3：
 *
 *
 * 输入: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
 * 输出: ["/a/b/c","/a/b/ca","/a/b/d"]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= folder.length <= 4 * 10^4
 * 2 <= folder[i].length <= 100
 * folder[i] 只包含小写字母和 '/'
 * folder[i] 总是以字符 '/' 起始
 * 每个文件夹名都是 唯一 的
 *
 *
 */

export {};

// @lc code=start
// 方法1：排序 + 贪心
function removeSubfolders(folder: string[]): string[] {
  // 对文件夹路径进行字典序排序
  // 排序后，父文件夹一定在子文件夹之前出现
  folder.sort();

  // 结果数组，初始化包含第一个文件夹（排序后第一个一定不是任何文件夹的子文件夹）
  const res = [folder[0]];

  // 从第二个文件夹开始遍历
  for (let i = 1; i < folder.length; i++) {
    const prev = res.at(-1)!; // 结果数组中最后一个文件夹（已确认的父文件夹）
    const cur = folder[i]; // 当前检查的文件夹

    // 如果当前文件夹不是已保留文件夹的子文件夹，则保留它
    if (!isSubfolder(cur, prev)) {
      res.push(cur);
    }
  }
  return res;

  /**
   * 检查 sub 是否是 parent 的子文件夹
   * @param sub - 待检查的子文件夹路径
   * @param parent - 父文件夹路径
   * @returns 如果 sub 是 parent 的子文件夹返回 true，否则返回 false
   */
  function isSubfolder(sub: string, parent: string): boolean {
    return (
      sub.length > parent.length && // 子文件夹路径必须更长
      sub.slice(0, parent.length) === parent && // 子文件夹路径必须以父文件夹路径开头
      sub[parent.length] === "/" // 确保是真正的子文件夹（避免 "/a" 和 "/ab" 的情况）
    );
  }
}

// 方法2：字典树（Trie）
function removeSubfolders2(folder: string[]): string[] {
  const root = new Trie();

  // 构建字典树，将所有文件夹路径插入
  for (let i = 0; i < folder.length; i++) {
    const path = split(folder[i]); // 将路径按 '/' 分割成数组
    let cur = root;

    // 沿着路径在字典树中创建节点
    for (const p of path) {
      if (!cur.children.has(p)) {
        cur.children.set(p, new Trie());
      }
      cur = cur.children.get(p)!;
    }

    // 在路径末尾标记文件夹索引
    cur.ref = i;
  }

  const res: string[] = [];
  dfs(root, res);
  return res;

  /**
   * 深度优先搜索字典树
   * 遇到第一个完整路径就停止搜索其子树（因为子树中的路径都是其子文件夹）
   */
  function dfs(cur: Trie, res: string[]) {
    // 如果当前节点是某个文件夹的结束位置
    if (cur.ref !== -1) {
      res.push(folder[cur.ref]); // 将该文件夹加入结果
      return; // 不再搜索子树，避免添加子文件夹
    }

    // 继续搜索所有子节点
    for (const child of cur.children.values()) {
      dfs(child, res);
    }
  }

  /**
   * 将文件夹路径按 '/' 分割成路径组件数组
   * 例如: "/a/b/c" -> ["", "a", "b", "c"]
   *
   * 注意：第一个空字符串 "" 代表根目录，这是必要的，因为：
   * 1. 所有路径都以 '/' 开头，分割后第一个元素必然是空字符串
   * 2. 在字典树中，空字符串作为所有路径的公共根节点
   * 3. 这样可以正确表示文件系统的层级结构
   *
   * 字典树结构示例（输入: ["/a", "/a/b", "/c"]）：
   * root
   *  └── "" (空字符串根节点)
   *      ├── "a" (ref=0, 表示路径 "/a")
   *      │   └── "b" (ref=1, 表示路径 "/a/b")
   *      └── "c" (ref=2, 表示路径 "/c")
   *
   * DFS遍历时，在 "a" 节点发现完整路径就停止，不会访问 "b" 节点
   */
  function split(s: string): string[] {
    const res: string[] = [];
    let cur = "";

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === "/") {
        res.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    res.push(cur);
    return res;
  }
}

/**
 * 字典树节点类
 */
class Trie {
  ref: number; // 文件夹在原数组中的索引，-1 表示不是完整路径的结束
  children: Map<string, Trie>; // 子节点映射，键是路径组件，值是子节点

  constructor() {
    this.ref = -1;
    this.children = new Map();
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 从文件夹列表中移除所有子文件夹，保留根文件夹
   - 关键特点：如果一个文件夹是另一个文件夹的子文件夹，则需要被删除
   - 目标：返回没有子文件夹关系的文件夹列表

2. 算法分析：

   方法1 - 排序 + 贪心：
   - 时间复杂度：O(n log n + nm)，其中 n 是文件夹数量，m 是平均路径长度
     * 排序：O(n log n)
     * 遍历和字符串比较：O(nm)
   - 空间复杂度：O(1)，不考虑输出数组的空间
   - 算法类型：贪心算法

   方法2 - 字典树：
   - 时间复杂度：O(nm)，其中 n 是文件夹数量，m 是平均路径长度
   - 空间复杂度：O(nm)，字典树的空间消耗
   - 算法类型：字典树 + 深度优先搜索

3. 实现要点：

   方法1 关键点：
   - 排序保证父文件夹在子文件夹前出现
   - 子文件夹判断条件：长度更长 + 前缀匹配 + '/' 分隔符检查
   - 贪心策略：遇到非子文件夹就保留

   方法2 关键点：
   - 路径分割：按 '/' 将路径转换为组件数组
   - 字典树构建：每个路径组件作为树的一层
   - DFS 剪枝：遇到完整路径就停止搜索子树

4. 边界情况处理：
   - 空数组：直接返回空数组
   - 单个文件夹：直接返回原数组
   - 路径前缀相似但不是子文件夹：如 "/a" 和 "/ab"，通过检查 '/' 分隔符避免误判
   - 所有文件夹都是同一个根文件夹的子文件夹：只返回根文件夹

5. 优化要点：
   - 方法1：排序后利用字符串前缀特性，无需完整路径解析
   - 方法2：字典树避免重复的前缀比较，适合路径数量多且有大量公共前缀的情况
   - 字符串比较优化：使用 slice 而不是逐字符比较

6. 算法选择建议：
   - 当文件夹数量较少或路径较短时：推荐方法1（排序）
   - 当有大量公共前缀或需要频繁查询时：推荐方法2（字典树）
   - 实际应用中方法1更常用，因为实现简单且空间效率高
*/
