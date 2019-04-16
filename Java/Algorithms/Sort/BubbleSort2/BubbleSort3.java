/**
 * BubbleSort 冒泡排序
 */
public class BubbleSort3 {

  private BubbleSort3() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;

    for (int i = 0; i < n; i++) {
      for (int j = i; j < n - 1 - i; j++) {
        if (arr[j].compareTo(arr[j + 1]) > 0)
          swap(arr, j, j + 1);
      }
    }
  }

  private static void swap(Object[] arr, int i, int j) {
    Object temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {
    // 测试排序算法的辅助函数
    int N = 10000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 100000);
    SortTestHelper.testSort("BubbleSort2", arr);
    SortTestHelper.printArray(arr);
    return;
  }
}