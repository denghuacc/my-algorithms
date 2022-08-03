/*
 * @lc app=leetcode.cn id=211 lang=typescript
 *
 * [211] 添加与搜索单词 - 数据结构设计
 *
 * https://leetcode-cn.com/problems/add-and-search-word-data-structure-design/description/
 *
 * algorithms
 * Medium (43.08%)
 * Total Accepted:    2.1K
 * Total Submissions: 5K
 * Testcase Example:  '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]'
 *
 * 设计一个支持以下两种操作的数据结构：
 *
 * void addWord(word)
 * bool search(word)
 *
 *
 * search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。 . 可以表示任何一个字母。
 *
 * 示例:
 *
 * addWord("bad")
 * addWord("dad")
 * addWord("mad")
 * search("pad") -> false
 * search("bad") -> true
 * search(".ad") -> true
 * search("b..") -> true
 *
 *
 * 说明:
 *
 * 你可以假设所有单词都是由小写字母 a-z 组成的。
 *
 */

export {};

// @lc code=start
class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;

  constructor(isWord = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

class WordDictionary {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  addWord(word: string): void {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!cur.next.get(ch)) {
        cur.next.set(ch, new TrieNode());
      }
      cur = cur.next.get(ch)!;
    }
    cur.isWord = true;
  }

  search(word: string): boolean {
    return match(this.root, word, 0);

    function match(node: TrieNode, word: string, index: number): boolean {
      if (index === word.length) {
        return node.isWord;
      }
      const ch = word[index];
      if (ch !== ".") {
        if (!node.next.get(ch)) {
          return false;
        }
        return match(node.next.get(ch)!, word, index + 1);
      } else {
        // 匹配下一个所有的点
        for (const nextC of node.next.keys()) {
          if (match(node.next.get(nextC)!, word, index + 1)) {
            return true;
          }
        }
        return false;
      }
    }
  }
}
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
// @lc code=end
