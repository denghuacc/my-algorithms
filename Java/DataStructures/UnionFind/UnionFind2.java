/**
 * UnionFind2 并查集 第二版
 * 
 * 使用树(森林)实现并查集 => 使用数组模拟树
 */
public class UnionFind2 implements UF {

  private int[] parent;

  public UnionFind2(int size) {
    parent = new int[size];

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (int i = 0; i < size; i++) {
      parent[i] = i;
    }
  }

  @Override
  public int getSize() {
    return parent.length;
  }

  // 查找元素 p 所对应的集合编号
  // O(h) 复杂度
  private int find(int p) {
    if (p < 0 && p >= parent.length) {
      throw new IllegalArgumentException("p is out of bound.");
    }
    while (p != parent[p]) {
      p = parent[p];
    }
    return p;
  }

  // 查看元素 p 和元素 q 是否所属一个集合
  // O(h) 复杂度，h 为树的高度
  @Override
  public boolean isConnected(int p, int q) {
    return find(p) == find(q);
  }

  // 合并元素 p 和元素 q 所属的集合
  // O(h) 复杂度，h 为树的高度
  @Override
  public void unionElements(int p, int q) {
    int pRoot = find(p);
    int qRoot = find(q);

    if (pRoot == qRoot) {
      return;
    }

    // p 元素的根节点指向 q 元素的根节点
    parent[pRoot] = qRoot;
  }
}