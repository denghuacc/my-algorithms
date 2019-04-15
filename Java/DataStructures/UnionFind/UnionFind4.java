/**
 * UnionFind4 并查集 第四版
 * 
 * 基于第三版；修改成基于树的 Rank（不仅仅指树的高度） 的优化
 */
public class UnionFind4 implements UF {

  private int[] parent;
  // private int[] sz; // sz[i] 表示以 i 为根的集合中的元素个数
  private int[] rank; // rank[i] 表示以 i 为根的集合中所表示树的层数，不仅仅指树的高度，只一个泛值，表示排行

  public UnionFind4(int size) {
    parent = new int[size];
    rank = new int[size];

    // 初始化, 每一个节点指向自己, 没有合并的元素
    for (int i = 0; i < size; i++) {
      parent[i] = i;
      rank[i] = 1;
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

    // 根据两个元素所在树的 rank 不同判断合并方向
    // 将 rank 低的集合合并到 rank 高的集合上
    if (rank[pRoot] < rank[qRoot]) {
      parent[pRoot] = qRoot;
    } else if (rank[qRoot] < rank[pRoot]) {
      parent[qRoot] = pRoot;
    } else { // rank[qRoot] == rank[qRoot]
      parent[qRoot] = pRoot;
      rank[pRoot] += 1; // 此处需要维护 rank
    }
  }
}