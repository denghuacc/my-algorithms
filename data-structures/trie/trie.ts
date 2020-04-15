import { Node } from '../models/trie-models'

/**
 * @name Trie 字典树 前缀数
 */
export default class Trie<K, V> {
  root: Node<K, V>
  size: number

  constructor() {
    this.root = new Node()
    this.size = 0
  }

  getSize() {
    return this.size
  }

  // 添加单词
  add(word: string) {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) == null) {
        cur.next.set(c, new Node())
      }
      cur = cur.next.get(c)!
    }

    if (!cur.isWord) {
      cur.isWord = true
      this.size++
    }
  }

  // 查询单词
  contains(word: string) {
    let cur = this.root

    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) == null) return false
      cur = cur.next.get(c)!
    }
    return cur.isWord
  }

  // 是否是前缀
  isPrefix(word: string) {
    let cur = this.root
    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      if (cur.next.get(c) == null) return false
      cur = cur.next.get(c)!
    }
    return true
  }
}
