class TrieNode<K, V> {
  isWord: boolean;
  next: Map<string, TrieNode<K, V>>;

  constructor(isWord = false) {
    this.isWord = isWord; // 是否是单词节点
    this.next = new Map();
  }
}

/**
 * @name Trie 字典树/前缀树
 */
export default class Trie<K, V> {
  root: TrieNode<K, V>;
  count: number;

  constructor() {
    this.root = new TrieNode();
    this.count = 0;
  }

  get size(): number {
    return this.count;
  }

  // 添加单词
  add(word: string): void {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!cur.next.get(ch)) {
        cur.next.set(ch, new TrieNode());
      }
      cur = cur.next.get(ch)!;
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
      const ch = word[i];
      if (!cur.next.get(ch)) {
        return false;
      }
      cur = cur.next.get(ch)!;
    }
    return cur.isWord;
  }

  // 是否是前缀
  isPrefix(word: string): boolean {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const ch = word[i];
      if (!cur.next.get(ch)) {
        return false;
      }
      cur = cur.next.get(ch)!;
    }
    return true;
  }
}
