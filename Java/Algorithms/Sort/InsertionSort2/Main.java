import java.util.Arrays;

/**
 * Main
 */
public class Main {

  // 测试选择排序 和 插入排序（优化）的时间
  public static void main(String[] args) {
    int N = 20000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr3 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr4 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("SelectionSort", arr1);
    SortTestHelper.testSort("SelectionSort2", arr2);
    SortTestHelper.testSort("InsertionSort", arr3);
    SortTestHelper.testSort("InsertionSort2", arr4);

    System.out.println();

    // 测试 2 有序性更强的测试
    System.out.println("Test for more ordered random array, size = " + N + ", random range [0, 3]");

    arr1 = SortTestHelper.generateRandomArray(N, 0, 3);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);
    arr4 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("SelectionSort", arr1);
    SortTestHelper.testSort("SelectionSort2", arr2);
    SortTestHelper.testSort("InsertionSort", arr3);
    SortTestHelper.testSort("InsertionSort2", arr4);

    System.out.println();

    // 测试 3 测试近乎有序的数组
    int swapTimes = 100;
    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);
    arr4 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("SelectionSort", arr1);
    SortTestHelper.testSort("SelectionSort2", arr2);
    SortTestHelper.testSort("InsertionSort", arr3);
    SortTestHelper.testSort("InsertionSort2", arr4);

    return;
  }
}