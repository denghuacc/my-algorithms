import java.util.Arrays;

/**
 * Main
 */
public class Main {

  public static void main(String[] args) {
    // int N = 50000;
    int N = 1000000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort3", arr2);

    System.out.println();

    // 测试 2 测试近乎有序的数组
    // 双路快速排序算法也可以轻松处理近乎有序的数组
    int swapTimes = 10;
    assert swapTimes >= 0;

    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort3", arr2);

    System.out.println();

    // 测试 3 测试存在包含大量相同元素的数组
    // 使用双快速排序后, 我们的快速排序算法可以轻松的处理包含大量元素的数组
    System.out.println("Test for random array, size = " + N + " , random range [0,10]");

    arr1 = SortTestHelper.generateRandomArray(N, 0, 10);
    arr2 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort3", arr2);
    return;
  }
}