/**
 * InsertionSort 插入排序
 */
public class InsertionSort {

  private InsertionSort() {
  }

  public static void sort(Comparable[] arr) {

    int n = arr.length;

    for (int i = 1; i < n; i++) {

      // 寻找元素 arr[i] 合适的插入位置
      // for (int j = i; j > 0; j--) {
      //   if (arr[j].compareTo(arr[j - 1]) < 0) {
      //     swap(arr, j, j - 1);
      //   } else {
      //     break;
      //   }
      // }

      for (int j = i; j > 0 && arr[j].compareTo(arr[j - 1]) < 0; j--) {
        swap(arr, j, j - 1);
      }
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
    SortTestHelper.testSort("InsertionSort", arr);
    return;
  }
}