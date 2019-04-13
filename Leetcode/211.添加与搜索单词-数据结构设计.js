/*
 * @lc app=leetcode.cn id=211 lang=javascript
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

class Node {
  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map() // 映射
  }
}

/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
  this.root = new Node()
}

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
  let cur = this.root

  for (let i = 0; i < word.length; i++) {
    const c = word[i]
    if (!cur.next.get(c)) {
      cur.next.set(c, new Node())
    }
    cur = cur.next.get(c)
  }

  cur.isWord = true
}

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
  return match(this.root, word, 0)

  function match(node, word, index) {
    if (index === word.length) {
      return node.isWord
    }

    let c = word[index]

    if (c !== '.') {
      if (!node.next.get(c)) {
        return false
      }
      return match(node.next.get(c), word, index + 1)
    } else {
      // 匹配下一个所有的点
      for (let nextC of node.next.keys()) {
        if (match(node.next.get(nextC), word, index + 1)) {
          return true
        }
      }
      return false
    }
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */
