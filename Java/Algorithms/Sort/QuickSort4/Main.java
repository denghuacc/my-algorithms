import java.util.Arrays;

/**
 * Main
 */
public class Main {

  // 比较 Merge Sort 和 双路快速排序 和 三路快排三种排序算法的性能效率
  // 对于包含有大量重复数据的数组, 三路快排有巨大的优势
  // 对于一般性的随机数组和近乎有序的数组, 三路快排的效率虽然不是最优的, 但是是在非常可以接受的范围里
  // 因此, 在一些语言中, 三路快排是默认的语言库函数中使用的排序算法。比如 Java

  public static void main(String[] args) {
    // int N = 50000;
    int N = 1000000;

    // 测试 1 一般测试
    System.out.println("Test for random array, size = " + N + ", random range [0, " + N + "]");

    Integer[] arr1 = SortTestHelper.generateRandomArray(N, 0, N);
    Integer[] arr2 = Arrays.copyOf(arr1, arr1.length);
    Integer[] arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort3", arr2);
    SortTestHelper.testSort("QuickSort4", arr3);

    System.out.println();

    // 测试 2 测试近乎有序的数组
    int swapTimes = 10;
    assert swapTimes >= 0;

    System.out.println("Test for nearly ordered array, size = " + N + ", swap time = " + swapTimes);

    arr1 = SortTestHelper.generateNearlyOrderArray(N, swapTimes);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort3", arr2);
    SortTestHelper.testSort("QuickSort4", arr3);

    System.out.println();

    // 测试 3 测试存在包含大量相同元素的数组
    System.out.println("Test for random array, size = " + N + " , random range [0,10]");

    arr1 = SortTestHelper.generateRandomArray(N, 0, 10);
    arr2 = Arrays.copyOf(arr1, arr1.length);
    arr3 = Arrays.copyOf(arr1, arr1.length);

    SortTestHelper.testSort("MergeSort3", arr1);
    SortTestHelper.testSort("QuickSort3", arr2);
    SortTestHelper.testSort("QuickSort4", arr3);

    return;
  }
}