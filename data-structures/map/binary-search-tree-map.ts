import { KVNode as Node } from "../models/tree-models";

/**
 * @name BSTMap 映射
 * @description 使用二叉搜索树实现 ES6 映射 Map
 */
export default class BSTMap<K, V> {
  root: Node<K, V> | undefined;
  size: number = 0;

  constructor() {}

  // 设置值 O(logN)
  set(key: K, val: V) {
    this.root = this.setNode(this.root!, key, val);
    return this;
  }

  private setNode(root: Node<K, V>, key: K, val: V): Node<K, V> {
    if (root == null) {
      this.size++;
      return new Node(key, val);
    }

    if (key < root.key) {
      root.left = this.setNode(root.left!, key, val);
    } else if (key > root.key) {
      root.right = this.setNode(root.right!, key, val);
    } else {
      root.val = val;
    }

    return root;
  }

  // 获取值 O(logN)
  get(key: K) {
    const node = this.getNode(this.root!, key);
    return node?.val;
  }

  // 查询值 O(logN)
  has(key: K) {
    return this.getNode(this.root!, key) != null;
  }

  // 清空值 O(1)
  clear() {
    this.root = undefined;
    this.size = 0;
  }

  // 删除值 O(logN)
  delete(key: K) {
    const node = this.getNode(this.root!, key);

    if (node != null) {
      this.root = this.deleteNode(this.root!, key);
      return true;
    }

    return false;
  }

  private deleteNode(root: Node<K, V>, key: K) {
    if (root == null) return undefined;

    if (key < root.key) {
      root.left = this.deleteNode(root.left!, key);
      return root;
    } else if (key > root.key) {
      root.right = this.deleteNode(root.right!, key);
      return root;
    } else {
      if (root.left == null) {
        const rightNode = root.right;
        root.right = undefined;
        this.size--;
        return rightNode;
      }

      if (root.right == null) {
        const leftNode = root.left;
        root.left = undefined;
        this.size--;
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
    if (root.left == null) return root;
    return this.minimum(root.left);
  }

  private deleteMin(root: Node<K, V>) {
    if (root.left == null) {
      const rightNode = root.right;
      root.right = undefined;
      this.size--;
      return rightNode;
    }

    root.left = this.deleteMin(root.left);
    return root;
  }

  // 通过 key 获取对应的节点 辅助函数
  private getNode(root: Node<K, V>, key: K): Node<K, V> | undefined {
    if (root == null) return undefined;

    if (key === root.key) {
      return root;
    } else if (key < root.key) {
      return this.getNode(root.left!, key);
    } else {
      return this.getNode(root.right!, key);
    }
  }
}
