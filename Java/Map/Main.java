import java.util.ArrayList;

public class Main {

  // 测试集合的时间复杂度方法
  // 这两个集合的增、删、查、改的时间复杂度都是一致的
  private static double testMap(Map<String, Integer> map, String filename) {
    long startTime = System.nanoTime();

    System.out.println(filename);

    ArrayList<String> words = new ArrayList<>();
    if (FileOperation.readFile(filename, words)) {

      System.out.println("Total words: " + words.size());

      for (String word : words) {
        if (map.contains(word)) {
          map.set(word, map.get(word) + 1);
        } else {
          map.add(word, 1);
        }
      }

      System.out.println("Total different words: " + map.getSize()); // 查询不同的单词数
      System.out.println("Frequency of PRIDE: " + map.get("pride")); // 查询 price 出现的频率
      System.out.println("Frequency of PREJUDICE: " + map.get("prejudice")); // 查询 prejudice 出现的频率
    }

    long endTime = System.nanoTime();

    return (endTime - startTime) / 1000000000.0;
  }

  public static void main(String[] args) {

    // BSTMap 的时间复杂度为 O(h) h是树的高度(层级) O(log2(n))
    // LinkedListMap 的时间复杂度为 O(n)
    // 指的都是在一般情况下

    String filename = "pride-and-prejudice.txt";

    BSTMap<String, Integer> bstMap = new BSTMap<>();
    double time1 = testMap(bstMap, filename);
    System.out.println("BST Map: " + time1 + " s");

    System.out.println();

    LinkedListMap<String, Integer> linkedListMap = new LinkedListMap<>();
    double time2 = testMap(linkedListMap, filename);
    System.out.println("LinkedList Map: " + time2 + " s");
  }
}