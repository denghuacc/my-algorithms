// https://leetcode-cn.com/problems/range-sum-query-immutable/
// leetcode 303 pass

/**
 * 使用非线段树解答 适用于数组不可变
 */
class NumArray2 {

  // sum[i] 存储前 i 个元素和，sum[0] = 0
  // sum[i] 存储 nums[0...i-1] 的和
  private int[] sum;

  public NumArray2(int[] nums) {
    sum = new int[nums.length + 1]; // 在最前面多了一个 0
    sum[0] = 0;
    for (int i = 1; i < sum.length; i++) {
      sum[i] = sum[i - 1] + nums[i - 1]; // 递归； 类似 js 数组的 reduce
    }
  }

  public int sumRange(int i, int j) {
    return sum[j + 1] - sum[i];
  }
}

/**
 * Your NumArray object will be instantiated and called as such: NumArray obj =
 * new NumArray(nums); int param_1 = obj.sumRange(i,j);
 */