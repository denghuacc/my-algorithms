/*
 * @lc app=leetcode.cn id=887 lang=typescript
 *
 * [887] 鸡蛋掉落
 *
 * https://leetcode-cn.com/problems/super-egg-drop/description/
 *
 * algorithms
 * Hard (15.23%)
 * Likes:    415
 * Dislikes: 0
 * Total Accepted:    25.8K
 * Total Submissions: 90.3K
 * Testcase Example:  '1\n2'
 *
 * 你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N  共有 N 层楼的建筑。
 *
 * 每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
 *
 * 你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
 *
 * 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
 *
 * 你的目标是确切地知道 F 的值是多少。
 *
 * 无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：K = 1, N = 2
 * 输出：2
 * 解释：
 * 鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
 * 否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
 * 如果它没碎，那么我们肯定知道 F = 2 。
 * 因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
 *
 *
 * 示例 2：
 *
 * 输入：K = 2, N = 6
 * 输出：3
 *
 *
 * 示例 3：
 *
 * 输入：K = 3, N = 14
 * 输出：4
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= K <= 100
 * 1 <= N <= 10000
 *
 *
 */

// @lc code=start
// dp timeout
var superEggDrop = function (K: number, N: number): number {
  const cache: Map<number, number> = new Map();
  return dpf(K, N);

  function dpf(K: number, N: number): number {
    if (K === 1) return N;
    if (N === 0) return 0;

    const key = N * 100 + K;

    if (cache.has(key)) return cache.get(key)!;

    let ret = Infinity;
    for (let i = 1; i < N + 1; i++) {
      ret = Math.min(ret, Math.max(dpf(K, N - i), dpf(K - 1, i - 1)) + 1);
    }

    cache.set(key, ret);
    return ret;
  }
};

// dp + binary search
var superEggDrop = function (K: number, N: number): number {
  const dp: number[][] = Array.from(new Array(K + 1), () =>
    new Array(N + 1).fill(-1)
  );
  return dpf(K, N);

  function dpf(K: number, N: number): number {
    if (dp[K][N] !== -1) return dp[K][N];
    if (N === 0) return 0;
    if (K === 1) return N;
    let ret = Infinity;
    let left = 1;
    let right = N;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const broken = dpf(K - 1, mid - 1);
      const notBroken = dpf(K, N - mid);
      if (broken > notBroken) {
        right = mid - 1;
        ret = Math.min(ret, broken + 1);
      } else if (broken < notBroken) {
        left = mid + 1;
        ret = Math.min(ret, notBroken + 1);
      } else {
        ret = Math.min(ret, broken + 1);
        break;
      }
    }

    dp[K][N] = ret;
    return ret;
  }
};

// new dp two-dimension
var superEggDrop = function (K: number, N: number): number {
  const dp: number[][] = Array.from(new Array(K + 1), () =>
    new Array(N + 1).fill(0)
  );
  let m = 0;

  while (dp[K][m] < N) {
    m++;
    for (let k = 1; k <= K; k++) {
      dp[k][m] = dp[k][m - 1] + dp[k - 1][m - 1] + 1;
    }
  }

  return m;
};

// new dp one-dimension
var superEggDrop = function (K: number, N: number): number {
  const dp: number[] = new Array(K + 1).fill(0);
  let m = 0;

  while (dp[K] < N) {
    m++;
    for (let k = K; k > 0; k--) {
      dp[k] = dp[k - 1] + dp[k] + 1;
    }
  }

  return m;
};
// @lc code=end
