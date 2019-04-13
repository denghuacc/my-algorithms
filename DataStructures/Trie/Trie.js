class Node {
  constructor(isWord = false) {
    this.isWord = isWord
    this.next = new Map() // 映射
  }
}

/**
 * Trie 字典树 前缀数
 */
class Trie {
  constructor() {
    this.root = new Node()
    this.size = 0
  }

  getSize() {
    return this.size
  }

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

  contains(word) {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) === undefined) {
        return false
      }
      cur = cur.next.get(c)
    }
    return cur.isWord
  }

  isPrefix(word) {
    let cur = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) === undefined) {
        return false
      }
      cur = cur.next.get(c)
    }
    return true
  }
}

module.exports = Trie
