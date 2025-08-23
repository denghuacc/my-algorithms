/*
 * @lc app=leetcode.cn id=752 lang=typescript
 *
 * [752] 打开转盘锁
 *
 * https://leetcode-cn.com/problems/open-the-lock/description/
 *
 * algorithms
 * Medium (50.40%)
 * Likes:    289
 * Dislikes: 0
 * Total Accepted:    46.8K
 * Total Submissions: 92.7K
 * Testcase Example:  '["0201","0101","0102","1212","2002"]\n"0202"'
 *
 * 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8',
 * '9' 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 *
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 *
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 *
 * 字符串 target 代表可以解锁的数字，你需要给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
 * 输出：6
 * 解释：
 * 可能的移动序列为 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"。
 * 注意 "0000" -> "0001" -> "0002" -> "0102" -> "0202" 这样的序列是不能解锁的，
 * 因为当拨动到 "0102" 时这个锁就会被锁定。
 *
 *
 * 示例 2:
 *
 *
 * 输入: deadends = ["8888"], target = "0009"
 * 输出：1
 * 解释：
 * 把最后一位反向旋转一次即可 "0000" -> "0009"。
 *
 *
 * 示例 3:
 *
 *
 * 输入: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"],
 * target = "8888"
 * 输出：-1
 * 解释：
 * 无法旋转到目标数字且不被锁定。
 *
 *
 * 示例 4:
 *
 *
 * 输入: deadends = ["0000"], target = "8888"
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * deadends[i].length == 4
 * target.length == 4
 * target 不在 deadends 之中
 * target 和 deadends[i] 仅由若干位数字组成
 *
 *
 */

// @lc code=start
/**
 * 广度优先搜索 (BFS) 解决方案
 *
 * 核心思想：将转盘锁的状态看作图中的节点，每次旋转看作边，使用BFS寻找从"0000"到target的最短路径
 */
function openLock(deadends: string[], target: string): number {
  // 特殊情况：目标就是初始状态
  if (target === "0000") {
    return 0;
  }

  // 将死亡数字转换为Set，提高查找效率
  const dead = new Set(deadends);

  // 如果初始状态就是死亡数字，无法解锁
  if (dead.has("0000")) {
    return -1;
  }

  let step = 0; // 当前步数
  const queue: string[] = []; // BFS队列
  queue.push("0000"); // 从初始状态开始

  const visited: Set<string> = new Set(); // 记录已访问的状态
  visited.add("0000");

  // BFS主循环
  while (queue.length) {
    step++; // 增加步数
    const size = queue.length; // 当前层的节点数量

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const status = queue.shift()!; // 取出当前状态

      // 获取所有可能的下一个状态
      for (const nextStatus of get(status)) {
        // 如果状态未访问且不是死亡数字
        if (!visited.has(nextStatus) && !dead.has(nextStatus)) {
          // 如果找到目标状态，返回步数
          if (nextStatus === target) {
            return step;
          }
          // 将新状态加入队列和已访问集合
          queue.push(nextStatus);
          visited.add(nextStatus);
        }
      }
    }
  }

  return -1; // 无法到达目标状态

  /**
   * 获取当前状态的所有可能的下一个状态
   * @param status 当前状态
   * @returns 所有可能的下一个状态数组
   */
  function get(status: string): string[] {
    const ret: string[] = [];
    const array = Array.from(status); // 转换为字符数组

    // 对每个位置进行旋转
    for (let i = 0; i < 4; i++) {
      const num = array[i];

      // 向前旋转一位
      array[i] = numPrev(num);
      ret.push(array.join(""));

      // 向后旋转一位
      array[i] = numNext(num);
      ret.push(array.join(""));

      // 恢复原状态，继续处理下一个位置
      array[i] = num;
    }
    return ret;
  }

  /**
   * 获取数字的前一个值（向前旋转）
   * @param num 当前数字
   * @returns 前一个数字
   */
  function numPrev(num: string): string {
    return num === "0" ? "9" : String(parseInt(num) - 1);
  }

  /**
   * 获取数字的后一个值（向后旋转）
   * @param num 当前数字
   * @returns 后一个数字
   */
  function numNext(num: string): string {
    return num === "9" ? "0" : String(parseInt(num) + 1);
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将转盘锁的状态空间建模为图
   - 每个状态是一个节点，每次旋转是一条边
   - 寻找从"0000"到target的最短路径
   - 死亡数字是不可访问的节点

2. 算法分析：
   - 时间复杂度：O(10^4 * 8) = O(80000)
     * 状态空间大小：10^4 = 10000个状态
     * 每个状态最多8个邻居（4个位置，每个位置2个方向）
     * BFS每个状态最多访问一次
   - 空间复杂度：O(10^4)，队列和visited集合
   - 算法类型：广度优先搜索 (BFS)

3. 实现要点：
   - 使用BFS保证找到最短路径
   - 使用Set存储死亡数字和已访问状态，提高查找效率
   - 层序遍历：每次处理一层，步数递增
   - 状态生成：对每个位置进行向前和向后旋转

4. 优化思路：
   - 使用Set代替数组存储死亡数字，查找时间O(1)
   - 提前检查初始状态是否为死亡数字
   - 使用visited集合避免重复访问
   - 找到目标状态立即返回，无需继续搜索

5. 关键技巧：
   - 状态表示：使用字符串表示4位数字
   - 状态转换：对每个位置分别进行旋转
   - 边界处理：0->9, 9->0的循环
   - 层序遍历：确保找到最短路径

6. 算法步骤：
   - 初始化：检查特殊情况，设置初始状态
   - BFS搜索：逐层扩展，记录步数
   - 状态生成：对每个位置进行双向旋转
   - 终止条件：找到目标状态或无法继续

7. 类似问题：
   - 单词接龙 (127)
   - 最小基因变化 (433)
   - 滑动谜题 (773)
   - 任何状态空间搜索问题

8. 算法优势：
   - 保证找到最短路径
   - 时间复杂度可控
   - 适合处理状态空间搜索问题
   - 代码结构清晰，易于理解

9. 边界情况处理：
   - 目标状态就是初始状态
   - 初始状态是死亡数字
   - 无法到达目标状态
   - 死亡数字包围目标状态
*/
