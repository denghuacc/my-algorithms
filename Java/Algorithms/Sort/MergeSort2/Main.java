import java.util.Arrays;

/**
 * Main
 */
public class Main {

  // 测试 InsertionSort 和 MergeSort 时间
  // 整体而言, MergeSort的性能最优
  public static void main(String[] args) {
    int N = 50000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("InsertionSort2", arr1);
    SortTestHelper.testSort("MergeSort", arr2);
    SortTestHelper.testSort("MergeSort2", arr3);

    System.out.println();

    // 测试 2 测试近乎有序的数组
    int swapTimes = 10;
    assert swapTimes >= 0;

    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("InsertionSort2", arr1);
    SortTestHelper.testSort("MergeSort", arr2);
    SortTestHelper.testSort("MergeSort2", arr3);

    return;
  }
}