/**
 * Sum 使用递归实现数组求和
 */
public class Sum {

  public static int sum(int[] arr) {
    return sum(arr, 0);
  }

  private static int sum(int[] arr, int index) {
    if (index == arr.length) {
      return 0;
    }

    int res = arr[index] + sum(arr, index + 1); // 单步调试变量
    return res;
  }

  public static void main(String[] args) {

    int[] nums = { 1, 2, 3, 4, 5, 6, 7, 8 };
    System.out.println(sum(nums));

  }

}