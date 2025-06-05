/*
 * @lc app=leetcode.cn id=1298 lang=typescript
 *
 * [1298] 你能从盒子里获得的最大糖果数
 *
 * https://leetcode.cn/problems/maximum-candies-you-can-get-from-boxes/description/
 *
 * algorithms
 * Hard (58.32%)
 * Likes:    60
 * Dislikes: 0
 * Total Accepted:    10K
 * Total Submissions: 16.1K
 * Testcase Example:  '[1,0,1,0]\n[7,5,4,100]\n[[],[],[1],[]]\n[[1,2],[3],[],[]]\n[0]'
 *
 * 给你 n 个盒子，每个盒子的格式为 [status, candies, keys, containedBoxes] ，其中：
 *
 *
 * 状态字 status[i]：整数，如果 box[i] 是开的，那么是 1 ，否则是 0 。
 * 糖果数 candies[i]: 整数，表示 box[i] 中糖果的数目。
 * 钥匙 keys[i]：数组，表示你打开 box[i] 后，可以得到一些盒子的钥匙，每个元素分别为该钥匙对应盒子的下标。
 * 内含的盒子 containedBoxes[i]：整数，表示放在 box[i] 里的盒子所对应的下标。
 *
 *
 * 给你一个 initialBoxes
 * 数组，表示你现在得到的盒子，你可以获得里面的糖果，也可以用盒子里的钥匙打开新的盒子，还可以继续探索从这个盒子里找到的其他盒子。
 *
 * 请你按照上述规则，返回可以获得糖果的 最大数目 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：status = [1,0,1,0], candies = [7,5,4,100], keys = [[],[],[1],[]],
 * containedBoxes = [[1,2],[3],[],[]], initialBoxes = [0]
 * 输出：16
 * 解释：
 * 一开始你有盒子 0 。你将获得它里面的 7 个糖果和盒子 1 和 2。
 * 盒子 1 目前状态是关闭的，而且你还没有对应它的钥匙。所以你将会打开盒子 2 ，并得到里面的 4 个糖果和盒子 1 的钥匙。
 * 在盒子 1 中，你会获得 5 个糖果和盒子 3 ，但是你没法获得盒子 3 的钥匙所以盒子 3 会保持关闭状态。
 * 你总共可以获得的糖果数目 = 7 + 4 + 5 = 16 个。
 *
 *
 * 示例 2：
 *
 * 输入：status = [1,0,0,0,0,0], candies = [1,1,1,1,1,1], keys =
 * [[1,2,3,4,5],[],[],[],[],[]], containedBoxes = [[1,2,3,4,5],[],[],[],[],[]],
 * initialBoxes = [0]
 * 输出：6
 * 解释：
 * 你一开始拥有盒子 0 。打开它你可以找到盒子 1,2,3,4,5 和它们对应的钥匙。
 * 打开这些盒子，你将获得所有盒子的糖果，所以总糖果数为 6 个。
 *
 *
 * 示例 3：
 *
 * 输入：status = [1,1,1], candies = [100,1,100], keys = [[],[0,2],[]],
 * containedBoxes = [[],[],[]], initialBoxes = [1]
 * 输出：1
 *
 *
 * 示例 4：
 *
 * 输入：status = [1], candies = [100], keys = [[]], containedBoxes = [[]],
 * initialBoxes = []
 * 输出：0
 *
 *
 * 示例 5：
 *
 * 输入：status = [1,1,1], candies = [2,3,2], keys = [[],[],[]], containedBoxes =
 * [[],[],[]], initialBoxes = [2,1,0]
 * 输出：7
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= status.length <= 1000
 * status.length == candies.length == keys.length == containedBoxes.length ==
 * n
 * status[i] 要么是 0 要么是 1 。
 * 1 <= candies[i] <= 1000
 * 0 <= keys[i].length <= status.length
 * 0 <= keys[i][j] < status.length
 * keys[i] 中的值都是互不相同的。
 * 0 <= containedBoxes[i].length <= status.length
 * 0 <= containedBoxes[i][j] < status.length
 * containedBoxes[i] 中的值都是互不相同的。
 * 每个盒子最多被一个盒子包含。
 * 0 <= initialBoxes.length <= status.length
 * 0 <= initialBoxes[i] < status.length
 *
 *
 */

export {};

// @lc code=start
function maxCandies(
  status: number[],
  candies: number[],
  keys: number[][],
  containedBoxes: number[][],
  initialBoxes: number[]
): number {
  const n = status.length;

  // 三个关键状态数组
  const canOpen = new Array(n).fill(false); // 记录是否有钥匙能打开某个盒子
  const hasBox = new Array(n).fill(false); // 记录是否拥有某个盒子
  const used = new Array(n).fill(false); // 记录某个盒子是否已经被使用过

  // 初始化：根据status数组设置初始可打开状态
  for (let i = 0; i < n; i++) {
    canOpen[i] = status[i] === 1; // status[i] === 1 表示盒子本身就是开的
  }

  // BFS队列，存储可以立即打开并处理的盒子
  const queue: number[] = [];
  let res = 0; // 总糖果数

  // 处理初始盒子
  for (const box of initialBoxes) {
    hasBox[box] = true; // 标记拥有这个盒子
    // 如果能打开且未使用过，则加入队列处理
    if (canOpen[box]) {
      queue.push(box);
      used[box] = true;
      res += candies[box]; // 立即获得糖果
    }
  }

  // BFS处理所有可以打开的盒子
  while (queue.length > 0) {
    const bigBox = queue.shift()!; // 取出当前要处理的盒子

    // 处理从当前盒子中获得的钥匙
    for (const key of keys[bigBox]) {
      canOpen[key] = true; // 获得钥匙，现在可以打开对应盒子
      // 如果有这个盒子且未使用过，则可以立即处理
      if (!used[key] && hasBox[key]) {
        queue.push(key);
        used[key] = true;
        res += candies[key];
      }
    }

    // 处理从当前盒子中获得的新盒子
    for (const box of containedBoxes[bigBox]) {
      hasBox[box] = true; // 现在拥有这个盒子
      // 如果能打开且未使用过，则可以立即处理
      if (!used[box] && canOpen[box]) {
        queue.push(box);
        used[box] = true;
        res += candies[box];
      }
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个状态依赖的搜索问题，需要在满足条件时才能打开盒子获得糖果
   - 打开盒子的条件：既要有盒子，又要有对应的钥匙（或盒子本身就是开的）
   - 目标是获得最大糖果数，实际上就是获得所有能打开的盒子中的糖果

2. 算法分析：
   - 时间复杂度：O(n + m)，其中n是盒子数量，m是所有钥匙和内含盒子的总数
   - 空间复杂度：O(n)，需要三个长度为n的数组记录状态，以及BFS队列
   - 算法类型：广度优先搜索(BFS) + 状态管理

3. 实现要点：
   
   **关键数据结构选择：**
   - `canOpen[]`: 记录是否有钥匙能打开某个盒子
   - `hasBox[]`: 记录是否拥有某个盒子  
   - `used[]`: 防止重复处理同一个盒子
   - `queue`: BFS队列，存储当前可以处理的盒子

   **核心算法步骤：**
   1. 初始化状态：根据status设置初始可打开状态
   2. 处理初始盒子：将能立即打开的盒子加入队列
   3. BFS遍历：不断处理队列中的盒子
      - 获得钥匙：更新canOpen状态，检查是否有新盒子可以打开
      - 获得新盒子：更新hasBox状态，检查是否能立即打开
   4. 返回总糖果数

   **边界情况处理：**
   - 初始盒子列表为空：返回0
   - 所有盒子都无法打开：只能获得初始可打开盒子的糖果
   - 盒子本身就是开的：不需要钥匙即可打开

4. 优化思路：
   
   **性能优化点：**
   - 使用三个布尔数组快速查询状态，避免重复计算
   - BFS确保每个盒子最多被处理一次
   - 及时更新状态，一旦满足条件立即加入队列

   **算法精髓：**
   - 状态分离：将"有盒子"和"能打开"两个条件分开管理
   - 动态更新：获得钥匙或新盒子时及时检查是否有新的可处理项
   - 避免重复：used数组确保每个盒子只被处理一次

   **类似问题应用：**
   - 图的连通性问题（需要特定条件才能访问某些节点）
   - 游戏中的解锁机制（获得道具后解锁新区域）
   - 依赖关系的任务调度问题
*/
