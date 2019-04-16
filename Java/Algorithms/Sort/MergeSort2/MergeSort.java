import java.util.Arrays;

/**
 * MergeSort 归并排序
 */
public class MergeSort {

  private MergeSort() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;
    sort(arr, 0, n - 1);
  }

  // 递归使用归并排序,对 arr[l...r] 的范围进行排序
  private static void sort(Comparable[] arr, int l, int r) {
    if (l >= r) {
      return;
    }

    int mid = l + (r - l) / 2;
    sort(arr, l, mid);
    sort(arr, mid + 1, r);
    merge(arr, l, mid, r);
  }

  // 将 arr[l...mid] 和 arr[mid+1...r] 两部分进行归并
  private static void merge(Comparable[] arr, int l, int mid, int r) {

    Comparable[] aux = Arrays.copyOfRange(arr, l, r + 1);

    // 初始化，i 指向左半部分的起始索引位置 l；j 指向右半部分起始索引位置 mid+1
    int i = l, j = mid + 1;

    for (int k = l; k <= r; k++) {
      if (i > mid) { // 如果左半部分元素已经全部处理完毕
        arr[k] = aux[j - l];
        j++;
      } else if (j > r) { // 如果右半部分元素已经全部处理完毕
        arr[k] = aux[i - l];
        i++;
      } else if (aux[i - l].compareTo(aux[j - l]) < 0) { // 左半部分所指元素 < 右半部分所指元素
        arr[k] = aux[i - l];
        i++;
      } else { // 左半部分所指元素 >= 右半部分所指元素
        arr[k] = aux[j - l];
        j++;
      }
    }
  }

  public static void main(String[] args) {

    // Merge Sort 是我们学习的第一个 O(nlogn) 复杂度的算法
    // 可以在 1 秒之内轻松处理 100 万数量级的数据
    int N = 1000000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 1000000);
    SortTestHelper.testSort("MergeSort", arr);
    // SortTestHelper.printArray(arr);
    return;
  }
}