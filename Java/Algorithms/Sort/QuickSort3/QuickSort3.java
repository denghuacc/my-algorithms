/**
 * QuickSort 快速排序
 * 
 * 优化快排: 双路快排
 */
public class QuickSort3 {

  private QuickSort3() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;
    sort(arr, 0, n - 1);
  }

  // 递归使用快速排序,对 arr[l...r] 的范围进行排序
  private static void sort(Comparable[] arr, int l, int r) {

    // 对于小规模数组, 使用插入排序
    if (r - l <= 15) {
      InsertionSort2.sort(arr, l, r);
      return;
    }

    int p = partition(arr, l, r);
    sort(arr, l, p - 1);
    sort(arr, p + 1, r);
  }

  // 双路快速排序的 partition
  // 返回 p, 使得 arr[l...p-1] <= arr[p] ; arr[p+1...r] >= arr[p]
  // 双路快排处理的元素正好等于 arr[p] 的时候要注意，详见下面的注释
  private static int partition(Comparable[] arr, int l, int r) {

    // 随机在 arr[l...r] 的范围中, 选择一个数值作为标定点 pivot
    swap(arr, l, (int) (Math.random() * (r - l + 1)) + l);

    Comparable v = arr[l];

    // int j = l;
    // for (int i = l + 1; i <= r; i++) {
    //   if (arr[i].compareTo(v) < 0) {
    //     j++;
    //     swap(arr, j, i);
    //   }
    // }

    int i = l + 1, j = r;
    while (true) {

      // 注意这里的边界, arr[i].compareTo(v) < 0, 不能是arr[i].compareTo(v) <= 0
      while (i <= r && arr[i].compareTo(v) < 0) {
        i++;
      }

      // 注意这里的边界, arr[j].compareTo(v) > 0, 不能是arr[j].compareTo(v) >= 0
      while (j >= l + 1 && arr[j].compareTo(v) > 0) {
        j--;
      }
      if (i > j) {
        break;
      }
      swap(arr, i, j);
      i++;
      j--;
    }

    swap(arr, l, j);

    return j;
  }

  private static void swap(Object[] arr, int i, int j) {
    Object temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {

    // 双路快速排序算法也是一个 O(nlogn) 复杂度的算法
    // 可以在 1 秒之内轻松处理 100 万数量级的数据
    int N = 1000000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 1000000);
    SortTestHelper.testSort("QuickSort3", arr);

    return;
  }
}