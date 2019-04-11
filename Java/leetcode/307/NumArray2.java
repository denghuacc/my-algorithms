// https://leetcode-cn.com/problems/range-sum-query-mutable/
// leetcode 307 pass

/**
 * 使用非线段树解答 适用于数组不可变
 */
class NumArray2 {

  // sum[i] 存储前 i 个元素和，sum[0] = 0
  // sum[i] 存储 nums[0...i-1] 的和
  private int[] sum;
  private int[] data;

  public NumArray2(int[] nums) {

    data = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
      data[i] = nums[i];
    }

    sum = new int[nums.length + 1]; // 在最前面多了一个 0
    sum[0] = 0;
    for (int i = 1; i < sum.length; i++) {
      sum[i] = sum[i - 1] + nums[i - 1]; // 递归； 类似 js 数组的 reduce
    }
  }

  public void update(int index, int val) {
    data[index] = val;
    for (int i = index + 1; i < sum.length; i++) {
      sum[i] = sum[i - 1] + data[i - 1];
    }
  }

  public int sumRange(int i, int j) {
    return sum[j + 1] - sum[i];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * 
 * NumArray obj = new NumArray(nums); obj.update(i,val); int param_2 =
 * obj.sumRange(i,j);
 */