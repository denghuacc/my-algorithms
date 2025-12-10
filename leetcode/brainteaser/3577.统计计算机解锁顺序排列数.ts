/*
 * @lc app=leetcode.cn id=3577 lang=typescript
 *
 * [3577] 统计计算机解锁顺序排列数
 *
 * https://leetcode.cn/problems/count-the-number-of-computer-unlocking-permutations/description/
 *
 * algorithms
 * Medium (39.44%)
 * Likes:    85
 * Dislikes: 26
 * Total Accepted:    21K
 * Total Submissions: 47.8K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个长度为 n 的数组 complexity。
 *
 * 房间里有 n 台上锁电脑，标签为 0 到 n - 1，每台电脑有唯一密码，i
 * 号电脑的密码复杂度为 complexity[i]。
 *
 * 标签为 0 的电脑密码已解密，作为根。其他电脑必须使用它或已解锁电脑
 * 解锁，规则：
 *
 *
 * 若 j < i 且 complexity[j] < complexity[i]，可用电脑 j 的密码解锁电脑 i。
 * 要解锁电脑 i，必须先解锁某个 j，满足 j < i 且 complexity[j] < complexity[i]。
 *
 *
 * 计算排列 [0,1,2,...,n-1] 的数量，使其为合法解锁顺序，初始仅电脑 0 已
 * 解锁。
 *
 * 答案很大时请对 10^9 + 7 取模。
 *
 * 注意：已解密的是标签为 0 的电脑密码，并非排列中的第一位电脑。
 *
 *
 * Example 1:
 *
 *
 * Input: complexity = [1,2,3]
 *
 * Output: 2
 *
 * Explanation:
 *
 * The valid permutations are:
 *
 *
 * [0, 1, 2]
 *
 * Unlock computer 0 first with root password.
 * Unlock computer 1 with password of computer 0 since complexity[0] <
 * complexity[1].
 * Unlock computer 2 with password of computer 1 since complexity[1] <
 * complexity[2].
 *
 *
 * [0, 2, 1]
 *
 * Unlock computer 0 first with root password.
 * Unlock computer 2 with password of computer 0 since complexity[0] <
 * complexity[2].
 * Unlock computer 1 with password of computer 0 since complexity[0] <
 * complexity[1].
 *
 *
 *
 *
 *
 * Example 2:
 *
 *
 * Input: complexity = [3,3,3,4,4,4]
 *
 * Output: 0
 *
 * Explanation:
 *
 * There are no possible permutations which can unlock all computers.
 *
 *
 *
 * Constraints:
 *
 *
 * 2 <= complexity.length <= 10^5
 * 1 <= complexity[i] <= 10^9
 *
 *
 */

// @lc code=start
/**
 * 若存在 i>0 但 complexity[i] <= complexity[0]，则 0 无法解锁该机，答案为 0。
 * 否则，根的复杂度最小，可解锁任意其他电脑；固定 0 在首位，剩余
 * (n-1) 台电脑的任意顺序皆可行，方案数为 (n-1)!。
 *
 * @param complexity - 各电脑密码复杂度
 * @returns 合法解锁序列数量，取模 1e9+7
 */
function countPermutations(complexity: number[]): number {
  const MOD = 1e9 + 7;
  const n = complexity.length;

  // 若存在复杂度不大于根的电脑，无法被任何已解锁电脑解锁
  for (let i = 1; i < n; i++) {
    if (complexity[i] <= complexity[0]) {
      return 0;
    }
  }

  // 除 0 号外还剩 n-1 台，0 固定首位，排列数为 (n-1)!
  let res = 1;
  for (let i = 2; i <= n - 1; i++) {
    res = (res * i) % MOD;
  }
  return res;
}
// @lc code=end

/*
解题思路：

1. 核心判断：
   - 0 号电脑复杂度最低才能解锁其余电脑；若存在 complexity[i] <=
     complexity[0]，则 i 无法被任何已解锁电脑解锁，答案 0。
   - 原因：解锁 i 需要一个下标更小且复杂度更低的 j。唯一下标小于 i 的候选是
     0（及更小下标），但若 complexity[i] 不高于根，则不存在更低复杂度的前驱，
     条件被破坏。

2. 排列计数：
   - 当所有 i>0 的复杂度都大于根时，可用 0 解锁任意电脑。
   - 0 必须在首位，剩余 n-1 个位置自由排列，方案数为 (n-1)!。
   - n=2 时 (n-1)!=1，循环不会执行仍返回 1，符合直觉。

3. 复杂度：
   - 时间 O(n)，空间 O(1)。

4. 示例验证：
   - [1,2,3]：根最小，可行排列数 (3-1)!=2，与题意一致。
   - [3,3,3,4,4,4]：存在与根同复杂度的电脑，返回 0。

5. 正确性补充：
   - 若根最小，则任意 i>0 均可直接由 0 解锁，不依赖其他顺序约束；因此除固定
     根外全排列皆合法。
   - 取模仅在乘法时应用，避免阶乘溢出。
*/
