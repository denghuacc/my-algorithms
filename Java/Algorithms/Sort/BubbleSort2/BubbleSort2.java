/**
 * BubbleSort 冒泡排序
 */
public class BubbleSort2 {

  private BubbleSort2() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;
    // boolean swapped = false;
    int newN;

    do {
      newN = 0;
      for (int i = 1; i < n; i++) {
        if (arr[i - 1].compareTo(arr[i]) > 0) {
          swap(arr, i - 1, i);
          newN = i;
        }
      }
      n = newN;
    } while (newN > 0);
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