import java.util.Arrays;

/**
 * Main
 */
public class Main {

  // 测试选择排序 和 插入排序（未优化）的时间
  public static void main(String[] args) {
    int N = 20000;

    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("SelectionSort", arr1);
    SortTestHelper.testSort("InsertionSort", arr2);

    return;
  }
}