/**
 * QuickSort 快速排序
 * 
 * 优化快排
 * 优化 1：随机在 arr[l...r] 的范围中, 选择一个数值作为标定点 pivot
 * 优化 2：对于小规模数组, 使用插入排序
 */
public class QuickSort2 {

  private QuickSort2() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;
    sort(arr, 0, n - 1);
  }

  // 递归使用快速排序,对 arr[l...r] 的范围进行排序
  private static void sort(Comparable[] arr, int l, int r) {
    // if (l >= r) {
    //   return;
    // }

    // 优化 2：对于小规模数组, 使用插入排序
    if (r - l <= 15) {
      InsertionSort2.sort(arr, l, r);
      return;
    }

    int p = partition(arr, l, r);
    sort(arr, l, p - 1);
    sort(arr, p + 1, r);
  }

  // 对 arr[l...r] 部分进行 partition 操作
  // 返回 p, 使得 arr[l...p-1] < arr[p] ; arr[p+1...r] > arr[p]
  private static int partition(Comparable[] arr, int l, int r) {

    // 优化 1：随机在 arr[l...r] 的范围中, 选择一个数值作为标定点 pivot
    swap(arr, l, (int) (Math.random() * (r - l + 1)) + l);

    Comparable v = arr[l];

    int j = l;
    for (int i = l + 1; i <= r; i++) {
      if (arr[i].compareTo(v) < 0) {
        j++;
        swap(arr, j, i);
      }
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

    // Quick Sort也是一个O(nlogn)复杂度的算法
    // 可以在1秒之内轻松处理100万数量级的数据
    int N = 1000000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 1000000);
    SortTestHelper.testSort("QuickSort2", arr);
    // SortTestHelper.printArray(arr);
    return;
  }
}