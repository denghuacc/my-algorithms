/*
 * @lc app=leetcode.cn id=208 lang=typescript
 *
 * [208] 实现 Trie (前缀树)
 *
 * https://leetcode-cn.com/problems/implement-trie-prefix-tree/description/
 *
 * algorithms
 * Medium (54.21%)
 * Total Accepted:    5.2K
 * Total Submissions: 9.2K
 * Testcase Example:  '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]'
 *
 * 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
 *
 * 示例:
 *
 * Trie trie = new Trie();
 *
 * trie.insert("apple");
 * trie.search("apple");   // 返回 true
 * trie.search("app");     // 返回 false
 * trie.startsWith("app"); // 返回 true
 * trie.insert("app");
 * trie.search("app");     // 返回 true
 *
 * 说明:
 *
 *
 * 你可以假设所有的输入都是由小写字母 a-z 构成的。
 * 保证所有输入均为非空字符串。
 *
 *
 */

// @lc code=start
class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;

  constructor(isWord = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let cur = this.root;

    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!cur.next.get(c)) {
        cur.next.set(c, new TrieNode());
      }
      cur = cur.next.get(c)!;
    }

    if (!cur.isWord) {
      cur.isWord = true;
    }
  }

  search(word: string): boolean {
    let cur = this.root;

    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!cur.next.get(c)) {
        return false;
      }
      cur = cur.next.get(c)!;
    }
    return cur.isWord;
  }

  startsWith(prefix: string): boolean {
    let cur = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i];
      if (!cur.next.get(c)) {
        return false;
      }
      cur = cur.next.get(c)!;
    }
    return true;
  }
}
/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end
