import java.util.Arrays;

/**
 * Main
 */
public class Main {

  public static void main(String[] args) {

    // 比较 Merge Sort 2 和 Merge Sort 3 两种排序算法的性能效率
    // 整体而言, 两种算法的效率是差不多的。但是如果进行仔细测试, 自底向上的归并排序会略胜一筹。

    // int N = 50000;
    int N = 1000000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort", arr1);
    SortTestHelper.testSort("MergeSort2", arr2);
    SortTestHelper.testSort("MergeSort3", arr3);

    System.out.println();

    // 测试 2 测试近乎有序的数组
    int swapTimes = 10;
    assert swapTimes >= 0;

    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort", arr1);
    SortTestHelper.testSort("MergeSort2", arr2);
    SortTestHelper.testSort("MergeSort3", arr3);

    return;
  }
}