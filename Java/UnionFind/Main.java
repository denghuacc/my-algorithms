import java.util.Random;

public class Main {

  // 测试并查集查询和合并的时间复杂度
  private static double testUF(UF uf, int n) {
    int size = uf.getSize();
    Random random = new Random();

    long startTime = System.nanoTime();

    for (int i = 0; i < n; i++) {
      int a = random.nextInt(size);
      int b = random.nextInt(size);
      uf.unionElements(a, b);
    }

    for (int i = 0; i < n; i++) {
      int a = random.nextInt(size);
      int b = random.nextInt(size);
      uf.isConnected(a, b);
    }

    long endTime = System.nanoTime();

    return (endTime - startTime) / 1000000000.0;
  }

  public static void main(String[] args) {

    int size = 10000000;
    int n = 10000000;

    // 使用数组实现并查集
    // UnionFind1 uf1 = new UnionFind1(size);
    // double time1 = testUF(uf1, n);
    // System.out.println("UnionFind1: " + time1 + " s");

    // 使用树实现并查集，为优化
    // UnionFind2 uf2 = new UnionFind2(size);
    // double time2 = testUF(uf2, n);
    // System.out.println("UnionFind2: " + time2 + " s");

    // 使用树实现并查集，优化 size
    UnionFind3 uf3 = new UnionFind3(size);
    double time3 = testUF(uf3, n);
    System.out.println("UnionFind3: " + time3 + " s");

    // 使用树实现并查集，优化 rank
    UnionFind4 uf4 = new UnionFind4(size);
    double time4 = testUF(uf4, n);
    System.out.println("UnionFind4: " + time4 + " s");

    // 使用树实现并查集，优化 rank 和 使用非递归路径压缩 => 性能最好
    UnionFind5 uf5 = new UnionFind5(size);
    double time5 = testUF(uf5, n);
    System.out.println("UnionFind5: " + time5 + " s");

    // 使用树实现并查集，优化 rank 和 使用递归路径压缩
    UnionFind6 uf6 = new UnionFind6(size);
    double time6 = testUF(uf6, n);
    System.out.println("UnionFind6: " + time6 + " s");
  }
}