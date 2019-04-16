/**
 * SortTestHelper
 */
public class SortTestHelper {

  private SortTestHelper() {
  }

  // 生成有 n 个元素的随机数组,每个元素的随机范围为 [rangeL, rangeR]
  public static Integer[] generateRandomArray(int n, int rangeL, int rangeR) {

    assert rangeL <= rangeR;

    Integer[] arr = new Integer[n];

    for (int i = 0; i < n; i++) {
      arr[i] = new Integer((int) (Math.random() * (rangeR - rangeL + 1) + rangeL));
    }

    return arr;
  }

  // 打印 arr 数组的所有内容
  public static void printArray(Object arr[]) {
    for (int i = 0; i < arr.length; i++) {
      System.out.println(arr[i]);
    }
    System.out.println();
    return;
  }
}