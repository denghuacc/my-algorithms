/**
 * UnionFind6 并查集 第六版
 * 
 * 基于第五版；使用递归路径压缩，一次性全部指向根节点
 * 
 * 因为使用了递归，性能反而变差了
 * 
 * 而第五版的非递归路径压缩，多次使用后也能变成所有的子节点都指向根节点
 */
public class UnionFind6 implements UF {

  private int[] parent;
  // private int[] sz; // sz[i] 表示以 i 为根的集合中的元素个数
  private int[] rank; // rank[i] 表示以 i 为根的集合中所表示树的层数

  public UnionFind6(int size) {
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
    // while => if
    if (p != parent[p]) {
      // parent[p] = parent[parent[p]]; // 路径压缩，非递归，一行代码
      // p = parent[p];
      parent[p] = find(parent[p]); // 使用递归的路径压缩，一次性都指向根节点
    }
    // return p;
    return parent[p]; // 返回 parent[p]
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
      rank[pRoot] += 1; // 需要维护 rank
    }
  }
}