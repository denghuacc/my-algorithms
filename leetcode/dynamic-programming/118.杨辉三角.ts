/*
 * @lc app=leetcode.cn id=118 lang=typescript
 *
 * [118] 杨辉三角
 *
 * https://leetcode-cn.com/problems/pascals-triangle/description/
 *
 * algorithms
 * Easy (59.32%)
 * Likes:    277
 * Dislikes: 0
 * Total Accepted:    70.5K
 * Total Submissions: 106.6K
 * Testcase Example:  '5'
 *
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 *
 *
 *
 * 在杨辉三角中，每个数是它左上方和右上方的数的和。
 *
 * 示例:
 *
 * 输入: 5
 * 输出:
 * [
 * ⁠    [1],
 * ⁠   [1,1],
 * ⁠  [1,2,1],
 * ⁠ [1,3,3,1],
 * ⁠[1,4,6,4,1]
 * ]
 *
 */

// @lc code=start
var generate = function (numRows: number): number[][] {
  const ret: number[][] = [];
  if (numRows <= 0) return ret;
  for (let i = 0; i < numRows; i++) {
    const subArr = [];
    for (let j = 0; j <= i; j++) {
      if (j > 0 && j < i) {
        subArr.push(ret[i - 1][j - 1] + ret[i - 1][j]);
      } else {
        subArr.push(1);
      }
    }
    ret.push(subArr);
  }
  return ret;
};

// improve
var generate = function (numRows: number): number[][] {
  if (numRows <= 0) return [];
  const res: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    // 先全部填充1
    const row = new Array(i + 1).fill(1);

    // 根据上一行修改中间的值（除了首尾）
    for (let j = 1; j < i; j++) {
      row[j] = res[i - 1][j - 1] + res[i - 1][j];
    }

    res.push(row);
  }

  return res;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 生成杨辉三角的前 numRows 行
   - 每个数是它左上方和右上方数的和
   - 每行首尾都是1

2. 算法分析：
   - 时间复杂度：O(numRows²) - 需要填充 numRows 行，每行最多 numRows 个元素
   - 空间复杂度：O(numRows²) - 存储整个杨辉三角
   - 算法类型：动态规划（自底向上）

3. 实现要点：
   - 边界情况：numRows <= 0 时返回空数组
   - 每行首尾元素都是1，无需计算
   - 中间元素通过上一行相邻元素相加得到
   - 预分配数组大小避免动态扩容

4. 优化思路：
   - 使用 const 和箭头函数提高代码风格
   - 预分配数组大小提升性能
   - 简化条件判断逻辑
   - 利用杨辉三角的对称性（虽然此题不需要）
   - 变量命名更清晰（result 替代 res，row 替代 subArr）

5. 进一步优化可能性：
   - 如果只需要第n行，可以使用组合数学公式 C(n,k)
   - 可以利用对称性只计算一半，然后复制
   - 对于大数，可以考虑使用 BigInt 避免溢出
*/
