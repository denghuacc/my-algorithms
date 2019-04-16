import java.util.Arrays;

/**
 * Main
 */
public class Main {

  // 测试冒泡排序、插入排序、选择排序时间
  // 全部使用优化过的排序
  public static void main(String[] args) {
    int N = 20000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr3 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr4 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("BubbleSort3", arr1);
    SortTestHelper.testSort("InsertionSort2", arr2);
    SortTestHelper.testSort("SelectionSort", arr3);
    SortTestHelper.testSort("ShellSort", arr4);

    System.out.println();

    // 测试 2 有序性更强的测试
    System.out.println("Test for more ordered random array, size = " + N + ", random range [0, 3]");

    arr1 = SortTestHelper.generateRandomArray(N, 0, 3);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);
    arr4 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("BubbleSort3", arr1);
    SortTestHelper.testSort("InsertionSort2", arr2);
    SortTestHelper.testSort("SelectionSort", arr3);
    SortTestHelper.testSort("ShellSort", arr4);

    System.out.println();

    // 测试 3 测试近乎有序的数组
    int swapTimes = 100;
    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);
    arr4 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("BubbleSort3", arr1);
    SortTestHelper.testSort("InsertionSort2", arr2);
    SortTestHelper.testSort("SelectionSort", arr3);
    SortTestHelper.testSort("ShellSort", arr4);

    return;

    // 在四种基础排序算法中：
    // 大多数情况下，冒泡排序性能都是比较差的，建议少用冒泡排序。
    // 大多数情况下，希尔排序性能都很好。
    // 近乎有序的数组，插入排序性能是最好的，优先使用。
    // 近乎有序的数组，希尔排序性能也很好。
    // 希尔算法是除去归并排序和快速排序这 2 种高级算法的比较好的选择
  }
}