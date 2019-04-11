/**
 * SegmentTree 线段树
 */
public class SegmentTree<E> {

  private E[] data; // 数组数据
  private E[] tree; // 线段树数据
  private Merger<E> merger;

  public SegmentTree(E[] arr, Merger<E> merger) {
    this.merger = merger;

    data = (E[]) new Object[arr.length];

    for (int i = 0; i < arr.length; i++) {
      data[i] = arr[i];
    }
    tree = (E[]) new Object[arr.length * 4]; // 转换成线段树时需要 4 倍空间

    buildSegmentTree(0, 0, arr.length - 1);
  }

  // 在 treeIndex 的位置创建表示区间 [l...r] 的线段树
  private void buildSegmentTree(int treeIndex, int l, int r) {
    if (l == r) {
      tree[treeIndex] = data[l];
      return;
    }

    int leftTreeIndex = leftChild(treeIndex);
    int rightTreeIndex = rightChild(treeIndex);

    // int mid = (l + r) / 2;
    int mid = l + (r - l) / 2;

    buildSegmentTree(leftTreeIndex, l, mid); // 递归创建左边的子节点线段树
    buildSegmentTree(rightTreeIndex, mid + 1, r); // 递归创建右边的子节点线段树

    // 融合左右两边的线段树
    tree[treeIndex] = merger.merge(tree[leftTreeIndex], tree[rightTreeIndex]);
  }

  public int getSize() {
    return data.length;
  }

  public E get(int index) {
    if (index < 0 || index >= data.length) {
      throw new IllegalArgumentException("Index is illegal.");
    }

    return data[index];
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
  private int leftChild(int index) {
    return index * 2 + 1;
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
  private int rightChild(int index) {
    return index * 2 + 2;
  }

  // 返回区间 [queryL, queryR] 的值
  public E query(int queryL, int queryR) {
    if (queryL < 0 || queryL >= data.length || queryR < 0 || queryR >= data.length || queryL > queryR) {
      throw new IllegalArgumentException("Index is illegal.");
    }

    return query(0, 0, data.length - 1, queryL, queryR);
  }

  // 在以 treeIndex 为根的线段树中 [l...r] 的范围里，搜索区间 [queryL...queryR] 的值
  private E query(int treeIndex, int l, int r, int queryL, int queryR) {
    if (l == queryL && r == queryR) {
      return tree[treeIndex];
    }

    int mid = l + (r - l) / 2;

    // treeIndex 的节点分为 [l...mid] 和 [mid+1...r] 两部分
    int leftTreeIndex = leftChild(treeIndex);
    int rightTreeIndex = rightChild(treeIndex);

    if (queryL >= mid + 1) {
      return query(rightTreeIndex, mid + 1, r, queryL, queryR); // 在右边的子节点中继续递归
    } else if (queryR <= mid) {
      return query(leftTreeIndex, l, mid, queryL, queryR); // 在左边的子节点中继续递归
    }

    // 在左右两边区别都存在时，两边都要找
    E leftResult = query(leftTreeIndex, l, mid, queryL, mid);
    E rightResult = query(rightTreeIndex, mid + 1, r, mid + 1, queryR);

    // 融合两边的结果，融合函数由自己掌控
    return merger.merge(leftResult, rightResult);
  }

  // 将 index 位置的值，更新为 e
  public void set(int index, E e) {
    if (index < 0 || index >= data.length) {
      throw new IllegalArgumentException("Index is illegal.");
    }

    data[index] = e;
    set(0, 0, data.length - 1, index, e);
  }

  // 在以 treeIndex 为根的线段树中更新 index 的值为 e
  private void set(int treeIndex, int l, int r, int index, E e) {
    if (l == r) {
      tree[treeIndex] = e;
      return;
    }

    int mid = l + (r - l) / 2;

    // treeIndex 的节点分为 [l...mid] 和 [mid+1...r] 两部分
    int leftTreeIndex = leftChild(treeIndex);
    int rightTreeIndex = rightChild(treeIndex);

    if (index > mid + 1) {
      set(rightTreeIndex, mid + 1, r, index, e);
    } else {
      set(leftTreeIndex, l, mid, index, e);
    }

    tree[treeIndex] = merger.merge(tree[leftTreeIndex], tree[rightTreeIndex]);
  }

  @Override
  public String toString() {
    StringBuilder res = new StringBuilder();

    res.append("[");

    for (int i = 0; i < tree.length; i++) {
      if (tree[i] != null) {
        res.append(tree[i]);
      } else {
        res.append("null");
      }

      if (i != tree.length - 1) {
        res.append(", ");
      }
    }

    res.append("]");
    return res.toString();
  }
}
