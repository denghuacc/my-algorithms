/**
 * QuickSort 快速排序
 * 
 * 优化快排: 三路快排
 */
public class QuickSort4 {

  private QuickSort4() {
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

    // 随机在 arr[l...r] 的范围中, 选择一个数值作为标定点 pivot
    swap(arr, l, (int) (Math.random() * (r - l + 1)) + l);
    Comparable v = arr[l];

    int lt = l; // arr[l+1...lt] < v
    int gt = r + 1; // arr[gt...r] > v
    int i = l + 1; // arr[lt+1...i) == v
    while (i < gt) {
      if (arr[i].compareTo(v) < 0) {
        swap(arr, i, lt + 1);
        i++;
        lt++;
      } else if (arr[i].compareTo(v) > 0) {
        swap(arr, i, gt - 1);
        gt--;
      } else { // arr[i] == v
        i++;
      }
    }

    swap(arr, l, lt);
    sort(arr, l, lt - 1);
    sort(arr, gt, r);

  }

  private static void swap(Object[] arr, int i, int j) {
    Object temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {

    // 三路快速排序算法也是一个 O(nlogn) 复杂度的算法
    // 可以在 1 秒之内轻松处理 100 万数量级的数据
    int N = 1000000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 1000000);
    SortTestHelper.testSort("QuickSort4", arr);
    // SortTestHelper.printArray(arr);
    return;
  }
}