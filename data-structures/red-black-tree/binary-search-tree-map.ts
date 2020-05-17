import { KVNode as Node } from "../models/tree-models";

/**
 * 注意这个 BSTMap 和 Map 文件夹下面的 BSTMap 在 API 上有些差异
 * 主要为了作为 BST 和 AVL Tree 、Red Block Tree 对比测试
 */
export default class BSTMap<K, V> {
  root: Node<K, V> | undefined;
  size: number = 0;

  constructor() {}

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }

  add(key: K, val: V) {
    this.root = this._add(this.root!, key, val);
  }

  _add(root: Node<K, V>, key: K, val: V) {
    if (root == null) {
      this.size++;
      return new Node(key, val);
    }

    if (key < root.key) {
      root.left = this._add(root.left!, key, val);
    } else if (key > root.key) {
      root.right = this._add(root.right!, key, val);
    } else {
      root.val = val;
    }

    return root;
  }

  _getNode(root: Node<K, V>, key: K): Node<K, V> | undefined {
    if (root == null) return undefined;

    if (key === root.key) {
      return root;
    } else if (key < root.key) {
      return this._getNode(root.left!, key);
    } else {
      return this._getNode(root.right!, key);
    }
  }

  contains(key: K) {
    return this._getNode(this.root!, key) != null;
  }

  get(key: K) {
    const root = this._getNode(this.root!, key);
    return root == null ? undefined : root.val;
  }

  set(key: K, newVal: V) {
    const root = this._getNode(this.root!, key);

    if (root == null) {
      throw new Error(key + " doesn't exist!");
    }

    root.val = newVal;
  }

  _minimum(root: Node<K, V>): Node<K, V> {
    if (root.left == null) {
      return root;
    }

    return this._minimum(root.left);
  }

  _removeMin(root: Node<K, V>) {
    if (root.left == null) {
      const rightNode = root.right;
      root.right = undefined;
      this.size--;
      return rightNode;
    }

    root.left = this._removeMin(root.left);
    return root;
  }

  remove(key: K) {
    const root = this._getNode(this.root!, key);

    if (root != null) {
      this.root = this._remove(this.root!, key);
      return root.val;
    }

    return undefined;
  }

  _remove(root: Node<K, V>, key: K) {
    if (root == null) return undefined;

    if (key < root.key) {
      root.left = this._remove(root.left!, key);
      return root;
    } else if (key > root.key) {
      root.right = this._remove(root.right!, key);
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

      const successor = this._minimum(root.right);
      successor.right = this._removeMin(root.right);
      successor.left = root.left;

      root.left = root.right = undefined;
      return successor;
    }
  }
}
