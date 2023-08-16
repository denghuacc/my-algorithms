/*
 * @lc app=leetcode.cn id=2682 lang=typescript
 *
 * [2682] 找出转圈游戏输家
 *
 * https://leetcode.cn/problems/find-the-losers-of-the-circular-game/description/
 *
 * algorithms
 * Easy (54.25%)
 * Likes:    34
 * Dislikes: 0
 * Total Accepted:    14.3K
 * Total Submissions: 23.5K
 * Testcase Example:  '5\n2'
 *
 * n 个朋友在玩游戏。这些朋友坐成一个圈，按 顺时针方向 从 1 到 n 编号。从第 i 个朋友的位置开始顺时针移动 1 步会到达第 (i + 1)
 * 个朋友的位置（1 <= i < n），而从第 n 个朋友的位置开始顺时针移动 1 步会回到第 1 个朋友的位置。
 *
 * 游戏规则如下：
 *
 * 第 1 个朋友接球。
 *
 *
 * 接着，第 1 个朋友将球传给距离他顺时针方向 k 步的朋友。
 * 然后，接球的朋友应该把球传给距离他顺时针方向 2 * k 步的朋友。
 * 接着，接球的朋友应该把球传给距离他顺时针方向 3 * k 步的朋友，以此类推。
 *
 *
 * 换句话说，在第 i 轮中持有球的那位朋友需要将球传递给距离他顺时针方向 i * k 步的朋友。
 *
 * 当某个朋友第 2 次接到球时，游戏结束。
 *
 * 在整场游戏中没有接到过球的朋友是 输家 。
 *
 * 给你参与游戏的朋友数量 n 和一个整数 k ，请按升序排列返回包含所有输家编号的数组 answer 作为答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, k = 2
 * 输出：[4,5]
 * 解释：以下为游戏进行情况：
 * 1）第 1 个朋友接球，第 1 个朋友将球传给距离他顺时针方向 2 步的玩家 —— 第 3 个朋友。
 * 2）第 3 个朋友将球传给距离他顺时针方向 4 步的玩家 —— 第 2 个朋友。
 * 3）第 2 个朋友将球传给距离他顺时针方向 6 步的玩家 —— 第 3 个朋友。
 * 4）第 3 个朋友接到两次球，游戏结束。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 4, k = 4
 * 输出：[2,3,4]
 * 解释：以下为游戏进行情况：
 * 1）第 1 个朋友接球，第 1 个朋友将球传给距离他顺时针方向 4 步的玩家 —— 第 1 个朋友。
 * 2）第 1 个朋友接到两次球，游戏结束。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= n <= 50
 *
 *
 */

// @lc code=start
var circularGameLosers = function (n: number, k: number): number[] {
  const set: Set<number> = new Set();
  let num = 1;
  set.add(1);
  for (let i = 1; i <= n; i++) {
    num = (num + k * i) % n;
    num = num === 0 ? n : num;
    if (set.has(num)) {
      break;
    }
    set.add(num);
  }
  const res: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (!set.has(i)) {
      res.push(i);
    }
  }
  return res;
};

var circularGameLosers = function (n: number, k: number): number[] {
  const visit = new Array(n).fill(0);
  for (let i = k, j = 0; !visit[j]; i += k) {
    visit[j] = true;
    j = (i + j) % n;
  }
  const res: number[] = [];
  for (let i = 0; i < n; i++) {
    if (!visit[i]) {
      res.push(i + 1);
    }
  }
  return res;
};
// @lc code=end
