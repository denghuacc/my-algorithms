export class Node<K> {
  constructor(public key: K, public next?: Node<K>) {}
}

export class KVNode<K, V> extends Node<K> {
  constructor(public key: K, public val: V, public next?: KVNode<K, V>) {
    super(key, next)
  }
}
