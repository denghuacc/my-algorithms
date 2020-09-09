import { Node } from "../models/trie-models";

/**
 * @name Trie 字典树 前缀数
 */
export default class Trie<K, V> {
  root: Node<K, V>;
  count: number;

  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  get size(): number {
    return this.count;
  }

  // 添加单词
  add(word: string): void {
    let cur = this.root;

    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (cur.next.get(c) == null) {
        cur.next.set(c, new Node());
      }
      cur = cur.next.get(c)!;
    }

    if (!cur.isWord) {
      cur.isWord = true;
      this.count++;
    }
  }

  // 查询单词
  contains(word: string): boolean {
    let cur = this.root;

    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (cur.next.get(c) == null) return false;
      cur = cur.next.get(c)!;
    }
    return cur.isWord;
  }

  // 是否是前缀
  isPrefix(word: string): boolean {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (cur.next.get(c) == null) return false;
      cur = cur.next.get(c)!;
    }
    return true;
  }
}
