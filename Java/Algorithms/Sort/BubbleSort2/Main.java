import java.util.Arrays;

/**
 * Main
 */
public class Main {

  // 测试冒泡排序、插入排序、选择排序时间
  public static void main(String[] args) {
    int N = 20000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr3 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr4 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr5 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr6 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr7 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("BubbleSort", arr1);
    SortTestHelper.testSort("BubbleSort2", arr2);
    SortTestHelper.testSort("BubbleSort3", arr3);
    SortTestHelper.testSort("InsertionSort", arr4);
    SortTestHelper.testSort("InsertionSort2", arr5);
    SortTestHelper.testSort("SelectionSort", arr6);
    SortTestHelper.testSort("SelectionSort2", arr7);

    System.out.println();

    // 测试 2 有序性更强的测试
    System.out.println("Test for more ordered random array, size = " + N + ", random range [0, 3]");

    arr1 = SortTestHelper.generateRandomArray(N, 0, 3);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);
    arr4 = Arrays.copyOf(arr1, arr1.length);
    arr5 = Arrays.copyOf(arr1, arr1.length);
    arr6 = Arrays.copyOf(arr1, arr1.length);
    arr7 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("BubbleSort", arr1);
    SortTestHelper.testSort("BubbleSort2", arr2);
    SortTestHelper.testSort("BubbleSort3", arr3);
    SortTestHelper.testSort("InsertionSort", arr4);
    SortTestHelper.testSort("InsertionSort2", arr5);
    SortTestHelper.testSort("SelectionSort", arr6);
    SortTestHelper.testSort("SelectionSort2", arr7);

    System.out.println();

    // 测试 3 测试近乎有序的数组
    int swapTimes = 100;
    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);
    arr4 = Arrays.copyOf(arr1, arr1.length);
    arr5 = Arrays.copyOf(arr1, arr1.length);
    arr6 = Arrays.copyOf(arr1, arr1.length);
    arr7 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("BubbleSort", arr1);
    SortTestHelper.testSort("BubbleSort2", arr2);
    SortTestHelper.testSort("BubbleSort3", arr3);
    SortTestHelper.testSort("InsertionSort", arr4);
    SortTestHelper.testSort("InsertionSort2", arr5);
    SortTestHelper.testSort("SelectionSort", arr6);
    SortTestHelper.testSort("SelectionSort2", arr7);

    return;

    // 在平均时间复杂度都是 O(n^2)的三个基础排序算法中：
    // 大多数情况下，冒泡排序性能都是比较差的，建议少用冒泡排序。
    // 近乎有序的数组，插入排序性能是最好的，优先使用。
  }
}