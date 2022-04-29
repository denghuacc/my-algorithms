/*
 * @lc app=leetcode.cn id=427 lang=typescript
 *
 * [427] 建立四叉树
 *
 * https://leetcode-cn.com/problems/construct-quad-tree/description/
 *
 * algorithms
 * Medium (62.12%)
 * Likes:    101
 * Dislikes: 0
 * Total Accepted:    8.1K
 * Total Submissions: 12K
 * Testcase Example:  '[[0,1],[1,0]]'
 *
 * 给你一个 n * n 矩阵 grid ，矩阵由若干 0 和 1 组成。请你用四叉树表示该矩阵 grid 。
 *
 * 你需要返回能表示矩阵的 四叉树 的根结点。
 *
 * 注意，当 isLeaf 为 False 时，你可以把 True 或者 False 赋值给节点，两种值都会被判题机制 接受 。
 *
 * 四叉树数据结构中，每个内部节点只有四个子节点。此外，每个节点都有两个属性：
 *
 *
 * val：储存叶子结点所代表的区域的值。1 对应 True，0 对应 False；
 * isLeaf: 当这个节点是一个叶子结点时为 True，如果它有 4 个子节点则为 False 。
 *
 *
 * class Node {
 * ⁠   public boolean val;
 * public boolean isLeaf;
 * public Node topLeft;
 * public Node topRight;
 * public Node bottomLeft;
 * public Node bottomRight;
 * }
 *
 * 我们可以按以下步骤为二维区域构建四叉树：
 *
 *
 * 如果当前网格的值相同（即，全为 0 或者全为 1），将 isLeaf 设为 True ，将 val 设为网格相应的值，并将四个子节点都设为 Null
 * 然后停止。
 * 如果当前网格的值不同，将 isLeaf 设为 False， 将 val 设为任意值，然后如下图所示，将当前网格划分为四个子网格。
 * 使用适当的子网格递归每个子节点。
 *
 *
 *
 *
 * 如果你想了解更多关于四叉树的内容，可以参考 wiki 。
 *
 * 四叉树格式：
 *
 * 输出为使用层序遍历后四叉树的序列化形式，其中 null 表示路径终止符，其下面不存在节点。
 *
 * 它与二叉树的序列化非常相似。唯一的区别是节点以列表形式表示 [isLeaf, val] 。
 *
 * 如果 isLeaf 或者 val 的值为 True ，则表示它在列表 [isLeaf, val] 中的值为 1 ；如果 isLeaf 或者 val
 * 的值为 False ，则表示值为 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：grid = [[0,1],[1,0]]
 * 输出：[[0,1],[1,0],[1,1],[1,1],[1,0]]
 * 解释：此示例的解释如下：
 * 请注意，在下面四叉树的图示中，0 表示 false，1 表示 True 。
 *
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：grid =
 * [[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0],[1,1,1,1,0,0,0,0]]
 *
 * 输出：[[0,1],[1,1],[0,1],[1,1],[1,0],null,null,null,null,[1,0],[1,0],[1,1],[1,1]]
 * 解释：网格中的所有值都不相同。我们将网格划分为四个子网格。
 * topLeft，bottomLeft 和 bottomRight 均具有相同的值。
 * topRight 具有不同的值，因此我们将其再分为 4 个子网格，这样每个子网格都具有相同的值。
 * 解释如下图所示：
 *
 *
 *
 * 示例 3：
 *
 * 输入：grid = [[1,1],[1,1]]
 * 输出：[[1,1]]
 *
 *
 * 示例 4：
 *
 * 输入：grid = [[0]]
 * 输出：[[1,0]]
 *
 *
 * 示例 5：
 *
 * 输入：grid = [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]
 * 输出：[[0,1],[1,1],[1,0],[1,0],[1,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == grid.length == grid[i].length
 * n == 2^x 其中 0 <= x <= 6
 *
 *
 */

export {};

//  Definition for node.
class Node {
  val: boolean;
  isLeaf: boolean;
  topLeft: Node | null;
  topRight: Node | null;
  bottomLeft: Node | null;
  bottomRight: Node | null;
  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: Node,
    topRight?: Node,
    bottomLeft?: Node,
    bottomRight?: Node
  ) {
    this.val = val === undefined ? false : val;
    this.isLeaf = isLeaf === undefined ? false : isLeaf;
    this.topLeft = topLeft === undefined ? null : topLeft;
    this.topRight = topRight === undefined ? null : topRight;
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
    this.bottomRight = bottomRight === undefined ? null : bottomRight;
  }
}

// @lc code=start
var construct = function (grid: number[][]): Node | null {
  return dfs(grid, 0, 0, grid.length, grid.length);

  function dfs(
    grid: number[][],
    r0: number,
    c0: number,
    r1: number,
    c1: number
  ): Node | null {
    let isSame = true;
    for (let r = r0; r < r1; r++) {
      for (let c = c0; c < c1; c++) {
        if (grid[r][c] !== grid[r0][c0]) {
          isSame = false;
          break;
        }
      }
      if (!isSame) {
        break;
      }
    }
    if (isSame) {
      return new Node(grid[r0][c0] === 1, true);
    }

    const res = new Node(
      true,
      false,
      dfs(grid, r0, c0, (r0 + r1) >> 1, (c0 + c1) >> 1)!,
      dfs(grid, r0, (c0 + c1) >> 1, (r0 + r1) >> 1, c1)!,
      dfs(grid, (r0 + r1) >> 1, c0, r1, (c0 + c1) >> 1)!,
      dfs(grid, (r0 + r1) >> 1, (c0 + c1) >> 1, r1, c1)!
    );

    return res;
  }
};

// preSum
var construct = function (grid: number[][]): Node | null {
  const n = grid.length;
  const preSum: number[][] = Array.from(new Array(n + 1), () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      preSum[i][j] =
        preSum[i - 1][j] +
        preSum[i][j - 1] -
        preSum[i - 1][j - 1] +
        grid[i - 1][j - 1];
    }
  }

  return dfs(grid, 0, 0, n, n);

  function dfs(
    grid: number[][],
    r0: number,
    c0: number,
    r1: number,
    c1: number
  ): Node | null {
    const total = getSum(preSum, r0, c0, r1, c1);
    if (total === 0) {
      return new Node(false, true);
    } else if (total === (r1 - r0) * (c1 - c0)) {
      return new Node(true, true);
    }

    const res = new Node(
      true,
      false,
      dfs(grid, r0, c0, (r0 + r1) >> 1, (c0 + c1) >> 1)!,
      dfs(grid, r0, (c0 + c1) >> 1, (r0 + r1) >> 1, c1)!,
      dfs(grid, (r0 + r1) >> 1, c0, r1, (c0 + c1) >> 1)!,
      dfs(grid, (r0 + r1) >> 1, (c0 + c1) >> 1, r1, c1)!
    );

    return res;
  }

  function getSum(
    preSum: number[][],
    r0: number,
    c0: number,
    r1: number,
    c1: number
  ): number {
    return preSum[r1][c1] - preSum[r0][c1] - preSum[r1][c0] + preSum[r0][c0];
  }
};
// @lc code=end
