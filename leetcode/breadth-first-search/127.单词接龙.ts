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
// bfs
var ladderLength = function (
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const wordSet: Set<string> = new Set(wordList);
  if (!wordSet.size || !wordSet.has(endWord)) {
    return 0;
  }
  wordSet.delete(beginWord);

  const queue: string[] = [];
  queue.push(beginWord);
  const visited: Set<string> = new Set();
  visited.add(beginWord);

  let step = 1;
  while (queue.length) {
    const size = queue.length;
    // traverse current queue
    for (let i = 0; i < size; i++) {
      const curWord = queue.shift()!;
      if (changeWordEveryOneLetter(curWord)) {
        return step + 1;
      }
    }
    step++;
  }
  return 0;

  // try modify each char of curWord to match endWord
  function changeWordEveryOneLetter(curWord: string): boolean {
    const charArray = curWord.split("");
    for (let i = 0; i < endWord.length; i++) {
      const originChar = charArray[i]; // store char
      for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        if (originChar === letter) continue;
        charArray[i] = letter;
        const nextWord = charArray.join("");
        if (wordSet.has(nextWord)) {
          if (nextWord === endWord) {
            return true;
          }
          if (!visited.has(nextWord)) {
            queue.push(nextWord); // add nextWord
            visited.add(nextWord); // mark nextWord
          }
        }
      }
      charArray[i] = originChar; // restore char
    }
    return false;
  }
};
// @lc code=end

// two direction bfs
// time out
var ladderLength = function (
  beginWord: string,
  endWord: string,
  wordList: string[]
): number {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  const wordSet: Set<string> = new Set(wordList);
  if (!wordSet.size || !wordSet.has(endWord)) return 0;
  wordSet.delete(beginWord);

  const visited: Set<string> = new Set();
  let beginVisited: Set<string> = new Set();
  beginVisited.add(beginWord);
  let endVisited: Set<string> = new Set();
  endVisited.add(endWord);

  let step = 1;
  while (beginVisited.size || endVisited.size) {
    // prioritize smaller size collection
    if (beginVisited.size > endVisited.size) {
      let tmp = beginVisited;
      beginVisited = endVisited;
      endVisited = tmp;
    }

    // beginVisited is smaller size collection now
    // nextLevelVisited will become to new beginVisited after change word
    const nextLevelVisited: Set<string> = new Set();
    for (const word of beginVisited.values()) {
      if (changeWordEveryOneLetter(word, endVisited, nextLevelVisited)) {
        return step + 1;
      }
    }

    // replace old beginVisited with nextLevelVisited
    // and prepare next loop
    beginVisited = nextLevelVisited;
    step++;
  }
  return 0;

  // try modify each char of word to confirm it if in endVisited
  // and put nextWord in nextLevelVisited
  function changeWordEveryOneLetter(
    word: string,
    endVisited: Set<string>,
    nextLevelVisited: Set<string>
  ): boolean {
    const charArray = word.split("");
    for (let i = 0; i < word.length; i++) {
      const originChar = charArray[i]; // store char
      for (let k = 0; k < letters.length; k++) {
        const letter = letters[k];
        if (originChar === letter) continue;
        charArray[i] = letter;
        const nextWord = charArray.join("");
        if (wordSet.has(nextWord)) {
          if (endVisited.has(nextWord)) {
            return true;
          }
          if (!visited.has(nextWord)) {
            nextLevelVisited.add(nextWord);
            visited.add(nextWord); // mark nextWord
          }
        }
      }
      charArray[i] = originChar; // restore char
    }
    return false;
  }
};
