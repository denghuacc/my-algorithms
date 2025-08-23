/*
 * @lc app=leetcode.cn id=127 lang=typescript
 *
 * [127] 单词接龙
 *
 * https://leetcode-cn.com/problems/word-ladder/description/
 *
 * algorithms
 * Medium (43.53%)
 * Likes:    441
 * Dislikes: 0
 * Total Accepted:    60.5K
 * Total Submissions: 138.8K
 * Testcase Example:  '"hit"\n"cog"\n["hot","dot","dog","lot","log","cog"]'
 *
 * 给定两个单词（beginWord 和 endWord）和一个字典，找到从 beginWord 到 endWord
 * 的最短转换序列的长度。转换需遵循如下规则：
 *
 *
 * 每次转换只能改变一个字母。
 * 转换过程中的中间单词必须是字典中的单词。
 *
 *
 * 说明:
 *
 *
 * 如果不存在这样的转换序列，返回 0。
 * 所有单词具有相同的长度。
 * 所有单词只由小写字母组成。
 * 字典中不存在重复的单词。
 * 你可以假设 beginWord 和 endWord 是非空的，且二者不相同。
 *
 *
 * 示例 1:
 *
 * 输入:
 * beginWord = "hit",
 * endWord = "cog",
 * wordList = ["hot","dot","dog","lot","log","cog"]
 *
 * 输出: 5
 *
 * 解释: 一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog",
 * ⁠    返回它的长度 5。
 *
 *
 * 示例 2:
 *
 * 输入:
 * beginWord = "hit"
 * endWord = "cog"
 * wordList = ["hot","dot","dog","lot","log"]
 *
 * 输出: 0
 *
 * 解释: endWord "cog" 不在字典中，所以无法进行转换。
 *
 */

// @lc code=start
/**
 * 广度优先搜索 (BFS) 解决方案
 *
 * 核心思想：将单词看作图中的节点，每次改变一个字母看作边，使用BFS寻找从beginWord到endWord的最短路径
 */
function ladderLength(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const letters = "abcdefghijklmnopqrstuvwxyz"; // 所有可能的小写字母

  // 将单词列表转换为Set，提高查找效率
  const wordSet: Set<string> = new Set(wordList);

  // 边界条件检查：字典为空或endWord不在字典中
  if (!wordSet.size || !wordSet.has(endWord)) {
    return 0;
  }

  // 从字典中删除beginWord，避免重复访问
  wordSet.delete(beginWord);

  const queue: string[] = []; // BFS队列
  queue.push(beginWord); // 从beginWord开始

  const visited: Set<string> = new Set(); // 记录已访问的单词
  visited.add(beginWord);

  let step = 1; // 当前步数
  while (queue.length) {
    const size = queue.length; // 当前层的单词数量

    // 处理当前层的所有单词
    for (let i = 0; i < size; i++) {
      const curWord = queue.shift()!;
      // 尝试改变curWord的每个字母
      if (changeWordEveryOneLetter(curWord)) {
        return step + 1; // 找到endWord，返回步数
      }
    }
    step++; // 进入下一层
  }
  return 0; // 无法到达endWord

  /**
   * 尝试改变单词的每个字母，生成新的单词
   * @param curWord 当前单词
   * @returns 是否找到endWord
   */
  function changeWordEveryOneLetter(curWord: string): boolean {
    const charArray = curWord.split(""); // 转换为字符数组

    // 遍历单词的每个位置
    for (let i = 0; i < endWord.length; i++) {
      const originChar = charArray[i]; // 保存原始字符

      // 尝试用每个字母替换当前位置
      for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        if (originChar === letter) continue; // 跳过相同字符

        charArray[i] = letter; // 替换字符
        const nextWord = charArray.join(""); // 生成新单词

        // 检查新单词是否在字典中
        if (wordSet.has(nextWord)) {
          if (nextWord === endWord) {
            return true; // 找到目标单词
          }
          if (!visited.has(nextWord)) {
            queue.push(nextWord); // 加入队列
            visited.add(nextWord); // 标记为已访问
          }
        }
      }
      charArray[i] = originChar; // 恢复原始字符
    }
    return false;
  }
}

/**
 * 双向广度优先搜索 (Bidirectional BFS) 解决方案
 *
 * 核心思想：同时从beginWord和endWord开始BFS，当两个搜索相遇时找到最短路径
 */
function ladderLength2(
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const wordSet: Set<string> = new Set(wordList);
  if (!wordSet.size || !wordSet.has(endWord)) return 0;
  wordSet.delete(beginWord);

  const visited: Set<string> = new Set(); // 全局访问标记

  // 双向BFS：从beginWord和endWord同时开始
  let beginVisited: Set<string> = new Set();
  beginVisited.add(beginWord);
  let endVisited: Set<string> = new Set();
  endVisited.add(endWord);

  let step = 1;
  while (beginVisited.size || endVisited.size) {
    // 优先处理较小的集合，减少搜索空间
    if (beginVisited.size > endVisited.size) {
      const tmp = beginVisited;
      beginVisited = endVisited;
      endVisited = tmp;
    }

    // beginVisited现在是较小的集合
    // nextLevelVisited将成为新的beginVisited
    const nextLevelVisited: Set<string> = new Set();

    // 处理当前层的所有单词
    for (const word of beginVisited.values()) {
      if (changeWordEveryOneLetter(word, endVisited, nextLevelVisited)) {
        return step + 1; // 找到路径
      }
    }

    // 更新beginVisited为下一层
    beginVisited = nextLevelVisited;
    step++;
  }
  return 0;

  /**
   * 尝试改变单词的每个字母，检查是否与endVisited中的单词相遇
   * @param word 当前单词
   * @param endVisited 从endWord开始的访问集合
   * @param nextLevelVisited 下一层的访问集合
   * @returns 是否找到相遇点
   */
  function changeWordEveryOneLetter(
    word: string,
    endVisited: Set<string>,
    nextLevelVisited: Set<string>
  ): boolean {
    const charArray = word.split("");
    for (let i = 0; i < word.length; i++) {
      const originChar = charArray[i];
      for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        if (originChar === letter) continue;

        charArray[i] = letter;
        const nextWord = charArray.join("");

        if (wordSet.has(nextWord)) {
          // 检查是否与endVisited相遇
          if (endVisited.has(nextWord)) {
            return true; // 找到相遇点
          }
          if (!visited.has(nextWord)) {
            nextLevelVisited.add(nextWord);
            visited.add(nextWord);
          }
        }
      }
      charArray[i] = originChar;
    }
    return false;
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将单词看作图中的节点
   - 每次改变一个字母看作边
   - 寻找从beginWord到endWord的最短路径
   - 等价于：在无向图中寻找最短路径

2. 算法分析：
   - 时间复杂度：O(26 * L * N)，其中L是单词长度，N是字典大小
     * 每个单词最多生成26*L个新单词
     * 每个单词最多访问一次
   - 空间复杂度：O(N)，队列和访问集合
   - 算法类型：广度优先搜索 / 双向广度优先搜索

3. 两种解法的比较：
   - 单向BFS：简单直观，适合理解问题
   - 双向BFS：更高效，减少搜索空间

4. 单向BFS实现要点：
   - 层序遍历：确保找到最短路径
   - 字符替换：尝试每个位置的每个字母
   - 访问标记：避免重复访问
   - 字典查找：使用Set提高效率

5. 双向BFS实现要点：
   - 双向搜索：同时从起点和终点开始
   - 集合交换：优先处理较小的集合
   - 相遇检测：当两个搜索相遇时找到路径
   - 层数计算：正确计算总步数

6. 关键技巧：
   - 字符替换：逐个位置替换，逐个字母尝试
   - 字典优化：使用Set代替数组查找
   - 访问标记：避免重复计算
   - 边界检查：处理特殊情况

7. 算法步骤（单向BFS）：
   - 初始化：将beginWord加入队列
   - 层序遍历：逐层处理单词
   - 字符替换：生成所有可能的相邻单词
   - 路径检测：找到endWord时返回步数

8. 算法步骤（双向BFS）：
   - 初始化：从beginWord和endWord同时开始
   - 集合管理：优先处理较小的集合
   - 相遇检测：检查是否与另一方向相遇
   - 路径计算：相遇时计算总步数

9. 为什么双向BFS更高效：
   - 搜索空间减少：从两端同时搜索
   - 相遇概率：在中间相遇，减少搜索深度
   - 集合优化：优先处理较小的集合

10. 类似问题：
    - 打开转盘锁 (752)
    - 最小基因变化 (433)
    - 任何状态空间搜索问题
    - 图的最短路径问题

11. 算法优势：
    - 保证找到最短路径
    - 双向BFS效率更高
    - 代码结构清晰
    - 适合处理状态转换问题

12. 边界情况处理：
    - endWord不在字典中：返回0
    - 字典为空：返回0
    - beginWord等于endWord：返回1
    - 无法到达：返回0

13. 优化思路：
    - 双向BFS：减少搜索空间
    - 字符替换优化：避免不必要的替换
    - 字典预处理：构建邻接表
    - 启发式搜索：使用A*算法
*/
