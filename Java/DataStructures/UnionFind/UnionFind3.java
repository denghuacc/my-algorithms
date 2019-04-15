/**
 * UnionFind3 并查集 第三版
 * 
 * 基于第二版；优化 size；基于节点的元素数量来进行优化
 */
public class UnionFind3 implements UF {

  private int[] parent;
  private int[] sz; // sz[i] 表示以 i 为根的集合中的元素个数

  public UnionFind3(int size) {
    parent = new int[size];
    sz = new int[size];

    // 初始化, 每一个节点指向自己, 没有合并的元素
    // 每一个节点的没有子节点，只有它本身为 1
    for (int i = 0; i < size; i++) {
      parent[i] = i;
      sz[i] = 1;
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

    // 根据两个元素所在树的元素个数不同判断合并方向
    // 将元素个数少的集合合并到元素个数多的集合上
    if (sz[pRoot] < sz[qRoot]) {
      parent[pRoot] = qRoot;
      sz[qRoot] += sz[pRoot];
    } else { // sz[qRoot] <= sz[qRoot]
      parent[qRoot] = pRoot;
      sz[pRoot] += sz[qRoot];
    }
  }
}