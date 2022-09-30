/**
 * 
有个内含单词的超大文本文件，给定任意两个不同的单词，找出在这个文件中这两个单词的最短距离(相隔单词数)。
如果寻找过程在这个文件中会重复多次，而每次寻找的单词不同，你能对此优化吗?

示例：
输入：words = ["I","am","a","student","from","a","university","in","a","city"], word1 = "a", word2 = "student"
输出：1

提示：
words.length <= 100000

难度：中等

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/find-closest-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

function findClosest(words: string[], word1: string, word2: string): number {
  const n = words.length;
  let closest = Infinity;
  let idx1 = -1;
  let idx2 = -1;
  for (let i = 0; i < n; i++) {
    const word = words[i];
    if (word === word1) idx1 = i;
    if (word === word2) idx2 = i;
    if (idx1 !== -1 && idx2 !== -1) {
      closest = Math.min(closest, Math.abs(idx1 - idx2));
    }
  }
  return closest;
}
