/**
 * @name Node 节点
 * @description 树的节点
 */
class Node {
  constructor(isWord = false) {
    this.isWord = isWord // 是否是单词节点
    this.next = new Map() // 映射
  }
}

/**
 * @name Trie 字典树 前缀数
 */
class Trie {
  constructor() {
    this.root = new Node()
    this.size = 0
  }

  getSize() {
    return this.size
  }

  // 添加单词
  add(word) {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) === undefined) {
        cur.next.set(c, new Node())
      }
      cur = cur.next.get(c)
    }

    if (!cur.isWord) {
      cur.isWord = true
      this.size++
    }
  }

  // 查询单词
  contains(word) {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) === undefined) return false
      cur = cur.next.get(c)
    }
    return cur.isWord
  }

  // 是否是前缀
  isPrefix(word) {
    let cur = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) === undefined) return false
      cur = cur.next.get(c)
    }
    return true
  }
}

module.exports = Trie
