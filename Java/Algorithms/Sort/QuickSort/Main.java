import java.util.Arrays;

/**
 * Main
 */
public class Main {

  public static void main(String[] args) {

    // 比较 Merge Sort 和 Quick Sort 两种排序算法的性能效率
    // 两种排序算法虽然都是 O(nlogn) 级别的, 但是 Quick Sort 算法有常数级的优势
    // Quick Sort 要比 Merge Sort 快, 即使我们对 Merge Sort 进行了优化

    // int N = 50000;
    int N = 1000000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort", arr2);

    System.out.println();

    // 测试 2 测试近乎有序的数组
    // 但是对于近乎有序的数组, 快速排序算法退化成了O(n^2)级别的算法
    int swapTimes = 10;
    assert swapTimes >= 0;

    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort", arr2); // 爆栈

    return;
  }
}