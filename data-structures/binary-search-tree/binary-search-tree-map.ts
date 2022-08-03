import { KVNode as Node } from "../models/tree-models";

/**
 * 注意这个 BSTMap 和 Map 文件夹下面的 BSTMap 在 API 上有些差异
 * 主要为了作为 BST 和 AVL Tree 、Red Block Tree 对比测试
 */
export default class BSTMap<K, V> {
  root: Node<K, V> | undefined;
  protected count: number;

  constructor() {
    this.count = 0;
  }

  get size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  add(key: K, val: V): void {
    this.root = this.addNode(this.root!, key, val);
  }

  private addNode(root: Node<K, V> | undefined, key: K, val: V): Node<K, V> {
    if (!root) {
      this.count++;
      return new Node(key, val);
    }

    if (key < root.key) {
      root.left = this.addNode(root.left!, key, val);
    } else if (key > root.key) {
      root.right = this.addNode(root.right!, key, val);
    } else {
      root.val = val;
    }

    return root;
  }

  private getNode(root: Node<K, V>, key: K): Node<K, V> | undefined {
    if (!root) return undefined;

    if (key === root.key) {
      return root;
    } else if (key < root.key) {
      return this.getNode(root.left!, key);
    } else {
      return this.getNode(root.right!, key);
    }
  }

  contains(key: K): boolean {
    return !!this.getNode(this.root!, key);
  }

  get(key: K): V | undefined {
    const root = this.getNode(this.root!, key);
    return !root ? undefined : root.val;
  }

  set(key: K, newVal: V): void {
    const root = this.getNode(this.root!, key);

    if (!root) {
      throw new Error(key + " doesn't exist!");
    }

    root.val = newVal;
  }

  private minNode(root: Node<K, V>): Node<K, V> {
    if (!root.left) {
      return root;
    }

    return this.minNode(root.left);
  }

  removeMin(root: Node<K, V>) {
    if (!root.left) {
      const rightNode = root.right;
      root.right = undefined;
      this.count--;
      return rightNode;
    }

    root.left = this.removeMin(root.left);
    return root;
  }

  remove(key: K): V | undefined {
    const root = this.getNode(this.root!, key);

    if (root) {
      this.root = this.removeNode(this.root!, key);
      return root.val;
    }

    return undefined;
  }

  private removeNode(root: Node<K, V>, key: K): Node<K, V> | undefined {
    if (!root) return undefined;

    if (key < root.key) {
      root.left = this.removeNode(root.left!, key);
      return root;
    } else if (key > root.key) {
      root.right = this.removeNode(root.right!, key);
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

      const successor = this.minNode(root.right);
      successor.right = this.removeMin(root.right);
      successor.left = root.left;

      root.left = root.right = undefined;
      return successor;
    }
  }
}
