import java.util.ArrayList;

public class Main3 {

  public static void main(String[] args) {

    int n = 20000000;

    ArrayList<Integer> testData = new ArrayList<>(n);

    // 添加顺序数
    for (int i = 0; i < n; i++) {
      testData.add(i);
    }

    // Test AVLTree
    long startTime = System.nanoTime();

    AVLTree<Integer, Integer> avl = new AVLTree<>();
    for (Integer x : testData) {
      avl.add(x, null);
    }

    long endTime = System.nanoTime();

    double time = (endTime - startTime) / 1000000000.0;
    System.out.println("AVLTree: " + time + " s");

    // Test RBTree
    startTime = System.nanoTime();

    RBTree<Integer, Integer> rbt = new RBTree<>();
    for (Integer x : testData) {
      rbt.add(x, null);
    }

    endTime = System.nanoTime();

    time = (endTime - startTime) / 1000000000.0;
    System.out.println("RBTree: " + time + " s");
  }
}
