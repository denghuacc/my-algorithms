/*
 * @lc app=leetcode.cn id=648 lang=typescript
 *
 * [648] 单词替换
 *
 * https://leetcode.cn/problems/replace-words/description/
 *
 * algorithms
 * Medium (64.39%)
 * Likes:    238
 * Dislikes: 0
 * Total Accepted:    55.5K
 * Total Submissions: 86.1K
 * Testcase Example:  '["cat","bat","rat"]\n"the cattle was rattled by the battery"'
 *
 * 在英语中，我们有一个叫做 词根(root) 的概念，可以词根后面添加其他一些词组成另一个较长的单词——我们称这个词为
 * 继承词(successor)。例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。
 *
 * 现在，给定一个由许多词根组成的词典 dictionary 和一个用空格分隔单词形成的句子
 * sentence。你需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。
 *
 * 你需要输出替换之后的句子。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by
 * the battery"
 * 输出："the cat was rat by the bat"
 *
 *
 * 示例 2：
 *
 *
 * 输入：dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
 * 输出："a a b c"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= dictionary.length <= 1000
 * 1 <= dictionary[i].length <= 100
 * dictionary[i] 仅由小写字母组成。
 * 1 <= sentence.length <= 10^6
 * sentence 仅由小写字母和空格组成。
 * sentence 中单词的总量在范围 [1, 1000] 内。
 * sentence 中每个单词的长度在范围 [1, 1000] 内。
 * sentence 中单词之间由一个空格隔开。
 * sentence 没有前导或尾随空格。
 *
 *
 *
 *
 */

// @lc code=start
// api
var replaceWords = function (dictionary: string[], sentence: string): string {
  const words = sentence.split(" ");
  const n = words.length;
  dictionary.sort((a, b) => a.length - b.length);
  const resArr: string[] = new Array(n);
  for (let i = 0; i < n; i++) {
    const word = words[i];
    for (const dic of dictionary) {
      if (word.startsWith(dic)) {
        resArr[i] = dic;
        break;
      }
    }
    if (!resArr[i]) {
      resArr[i] = word;
    }
  }
  return resArr.join(" ");
};

var replaceWords = function (dictionary: string[], sentence: string): string {
  const dictionarySet: Set<string> = new Set(dictionary);
  const words = sentence.split(" ");
  const n = words.length;
  for (let i = 0; i < n; i++) {
    const word = words[i];
    for (let j = 1; j <= word.length; j++) {
      if (dictionarySet.has(word.slice(0, j))) {
        words[i] = word.slice(0, j); // only replace
        break;
      }
    }
  }
  return words.join(" ");
};
