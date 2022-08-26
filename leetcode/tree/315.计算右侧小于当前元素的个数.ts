/*
 * @lc app=leetcode.cn id=315 lang=typescript
 *
 * [315] 计算右侧小于当前元素的个数
 *
 * https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/description/
 *
 * algorithms
 * Hard (37.55%)
 * Likes:    267
 * Dislikes: 0
 * Total Accepted:    18.7K
 * Total Submissions: 48.8K
 * Testcase Example:  '[5,2,6,1]'
 *
 * 给定一个整数数组 nums，按要求返回一个新数组 counts。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于
 * nums[i] 的元素的数量。
 *
 * 示例:
 *
 * 输入: [5,2,6,1]
 * 输出: [2,1,1,0]
 * 解释:
 * 5 的右侧有 2 个更小的元素 (2 和 1).
 * 2 的右侧仅有 1 个更小的元素 (1).
 * 6 的右侧有 1 个更小的元素 (1).
 * 1 的右侧有 0 个更小的元素.
 *
 *
 */

export {};

// @lc code=start
// BST
class TNode {
  val: number;
  left: TNode | null;
  right: TNode | null;
  count: number;

  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.count = 0; // the count of left child
  }
}

var countSmaller = function (nums: number[]): number[] {
  const n = nums.length;
  let root: TNode | null = null;
  const res = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    root = insertNode(root, nums[i], res, i)!;
  }
  return res;

  function insertNode(
    root: TNode | null,
    val: number,
    res: number[],
    retIndx: number
  ): TNode | null {
    if (!root) {
      root = new TNode(val);
    } else if (val <= root.val) {
      root.count += 1;
      root.left = insertNode(root.left, val, res, retIndx);
    } else if (val > root.val) {
      res[retIndx] += root.count + 1;
      root.right = insertNode(root.right, val, res, retIndx);
    }
    return root;
  }
};
// @lc code=end
