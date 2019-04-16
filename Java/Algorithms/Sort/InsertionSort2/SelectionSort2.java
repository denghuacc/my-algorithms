
/**
 * SelectionSort 选择排序
 * 
 * 使用 Comparable 类型进行比较
 * 
 * 优化选择排序：在每一轮中, 可以同时找到当前未处理元素的最大值和最小值
 */
public class SelectionSort2 {

  private SelectionSort2() {
  }

  public static void sort(Comparable[] arr) {
    int left = 0, right = arr.length - 1;

    while (left < right) {
      int minIndex = left;
      int maxIndex = right;

      if (arr[minIndex].compareTo(arr[maxIndex]) > 0) {
        swap(arr, minIndex, maxIndex);
      }

      // 在每一轮查找时, 要保证 arr[minIndex] <= arr[maxIndex]
      for (int i = left + 1; i < right; i++) {
        if (arr[i].compareTo(arr[minIndex]) < 0) {
          minIndex = i;
        } else if (arr[i].compareTo(arr[maxIndex]) > 0) {
          maxIndex = i;
        }
      }

      swap(arr, left, minIndex);
      swap(arr, right, maxIndex);

      left++;
      right--;
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
    SortTestHelper.testSort("SelectionSort2", arr);

    return;
  }
}