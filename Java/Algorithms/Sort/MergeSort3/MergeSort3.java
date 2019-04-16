import java.util.Arrays;

/**
 * MergeSort 归并排序
 * 优化：自底向上
 */
public class MergeSort3 {

  private MergeSort3() {
  }

  public static void sort(Comparable[] arr) {
    int n = arr.length;

    // Merge Sort Bottom Up 无优化版本
    // for (int sz = 1; sz < n; sz *= 2) {
    //   for (int i = 0; i < n - sz; i += sz + sz) {
    //     merge(arr, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1));
    //   }
    // }

    // Merge Sort Bottom Up 优化
    // 对于小数组, 使用插入排序优化
    for (int i = 0; i < n; i += 16) {
      InsertionSort2.sort(arr, i, Math.min(i + 15, n - 1));
    }

    for (int sz = 16; sz < n; sz += sz) {
      for (int i = 0; i < n - sz; i += sz + sz) {

        // 对于 arr[mid] <= arr[mid+1] 的情况,不进行 merge
        if (arr[i + sz - 1].compareTo(arr[i + sz]) > 0) {
          merge(arr, i, i + sz - 1, Math.min(i + sz + sz - 1, n - 1));
        }
      }
    }

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

    // Merge Sort 3 是我们学习的第一个 O(nlogn) 复杂度的算法,虽然只使用两重for循环
    // 所以，Merge Sort 3也可以在1秒之内轻松处理100万数量级的数据
    // 注意：不要轻易根据循环层数来判断算法的复杂度，Merge Sort 3就是一个反例
    int N = 1000000;
    Integer[] arr = SortTestHelper.generateRandomArray(N, 0, 1000000);
    SortTestHelper.testSort("MergeSort3", arr);
    // SortTestHelper.printArray(arr);
    return;
  }
}