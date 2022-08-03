import { KVNode as Node } from "../models/tree-models";

/**
 * @name BSTMap 映射
 * @description 使用二叉搜索树实现 ES6 映射 Map
 */
export default class BSTMap<K, V> {
  root: Node<K, V> | undefined;
  private count: number;

  constructor() {
    this.count = 0;
  }

  // 查询元素数量 O(1)
  get size(): number {
    return this.count;
  }

  // 设置值 O(logN)
  set(key: K, val: V): this {
    this.root = this.setNode(this.root, key, val);
    return this;
  }

  private setNode(root: Node<K, V> | undefined, key: K, val: V): Node<K, V> {
    if (!root) {
      this.count++;
      return new Node(key, val);
    }

    if (key < root.key) {
      root.left = this.setNode(root.left, key, val);
    } else if (key > root.key) {
      root.right = this.setNode(root.right, key, val);
    } else {
      root.val = val;
    }

    return root;
  }

  // 获取值 O(logN)
  get(key: K): V | undefined {
    const node = this.getNode(this.root!, key);
    return node?.val;
  }

  // 查询值 O(logN)
  has(key: K): boolean {
    return !!this.getNode(this.root!, key);
  }

  // 清空值 O(1)
  clear(): void {
    this.root = undefined;
    this.count = 0;
  }

  // 删除值 O(logN)
  delete(key: K): boolean {
    const node = this.getNode(this.root, key);

    if (node) {
      this.root = this.deleteNode(this.root, key);
      return true;
    }

    return false;
  }

  private deleteNode(
    root: Node<K, V> | undefined,
    key: K
  ): Node<K, V> | undefined {
    if (!root) return undefined;

    if (key < root.key) {
      root.left = this.deleteNode(root.left, key);
      return root;
    } else if (key > root.key) {
      root.right = this.deleteNode(root.right, key);
      return root;
    } else {
      if (!root.left) {
        const rightNode = root.right;
        root.right = undefined;
        this.count--;
        return rightNode;
      }

      if (!root.right) {
        const leftNode = root.left;
        root.left = undefined;
        this.count--;
        return leftNode;
      }

      const successor = this.minimum(root.right);
      successor.right = this.deleteMin(root.right);
      successor.left = root.left;

      root.left = root.right = undefined;
      return successor;
    }
  }

  private minimum(root: Node<K, V>): Node<K, V> {
    if (!root.left) return root;
    return this.minimum(root.left);
  }

  private deleteMin(root: Node<K, V>): Node<K, V> | undefined {
    if (!root.left) {
      const rightNode = root.right;
      root.right = undefined;
      this.count--;
      return rightNode;
    }

    root.left = this.deleteMin(root.left);
    return root;
  }

  // 通过 key 获取对应的节点 辅助函数
  private getNode(
    root: Node<K, V> | undefined,
    key: K
  ): Node<K, V> | undefined {
    if (!root) return undefined;

    if (key === root.key) {
      return root;
    } else if (key < root.key) {
      return this.getNode(root.left, key);
    } else {
      return this.getNode(root.right, key);
    }
  }
}
