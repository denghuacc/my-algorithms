export class Node<K, V> {
  isWord: boolean;
  next: Map<string, Node<K, V>> = new Map();

  constructor(isWord: boolean = false) {
    this.isWord = isWord; // 是否是单词节点
  }
}
