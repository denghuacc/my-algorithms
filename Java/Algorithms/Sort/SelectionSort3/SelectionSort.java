
/**
 * SelectionSort 选择排序
 * 
 * 使用 Comparable 类型进行比较
 */
public class SelectionSort {

  private SelectionSort() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;

    for (int i = 0; i < n; i++) {

      // 寻找 [i..n-1] 区间里的最小值的索引
      int minIndex = i;

      for (int j = i + 1; j < n; j++) {

        // 使用compareTo方法比较两个Comparable对象的大小
        if (arr[j].compareTo(arr[minIndex]) < 0) {
          minIndex = j;
        }
      }
      swap(arr, i, minIndex);
    }
  }

  private static void swap(Object[] arr, int i, int j) {
    Object temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {

    // 测试排序算法的辅助函数
    int N = 20000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 100000);
    SelectionSort.sort(arr);
    SortTestHelper.printArray(arr);
    return;
  }
}