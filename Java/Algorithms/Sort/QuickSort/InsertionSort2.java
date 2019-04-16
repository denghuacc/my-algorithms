/**
 * InsertionSort 插入排序
 * 
 * 优化插入排序
 */
public class InsertionSort2 {

  private InsertionSort2() {
  }

  // 对整个 arr 数组使用 InsertionSort 排序
  public static void sort(Comparable[] arr) {

    int n = arr.length;

    for (int i = 1; i < n; i++) {
      // 优化排序
      Comparable e = arr[i]; // 寻找元素 arr[i] 合适的插入位置
      int j = i; // j 保存元素 e 应该插入的位置 
      for (; j > 0 && arr[j - 1].compareTo(e) > 0; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = e;
    }
  }

  // 对 arr[l...r] 的区间使用 InsertionSort 排序
  public static void sort(Comparable[] arr, int l, int r) {

    for (int i = l + 1; i <= r; i++) {
      // 优化排序
      Comparable e = arr[i];
      int j = i;
      for (; j > 0 && arr[j - 1].compareTo(e) > 0; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = e;
    }
  }

  private static void swap(Object[] arr, int i, int j) {
    Object temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {
    int N = 20000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 100000);
    SortTestHelper.testSort("InsertionSort2", arr);
    return;
  }
}