export enum Color {
  RED,
  BLACK,
}

export class Node<K> {
  constructor(public key: K, public left?: Node<K>, public right?: Node<K>) {}
}

export class KVNode<K, V> extends Node<K> {
  height: number = 1;
  color: Color = Color.RED;
  constructor(
    public key: K,
    public val: V,
    public left?: KVNode<K, V>,
    public right?: KVNode<K, V>
  ) {
    super(key, left, right);
  }
}
