/*
 * @lc app=leetcode.cn id=1419 lang=typescript
 *
 * [1419] 数青蛙
 *
 * https://leetcode.cn/problems/minimum-number-of-frogs-croaking/description/
 *
 * algorithms
 * Medium (43.61%)
 * Likes:    135
 * Dislikes: 0
 * Total Accepted:    18.1K
 * Total Submissions: 38K
 * Testcase Example:  '"croakcroak"'
 *
 * 给你一个字符串 croakOfFrogs，它表示不同青蛙发出的蛙鸣声（字符串 "croak" ）的组合。由于同一时间可以有多只青蛙呱呱作响，所以
 * croakOfFrogs 中会混合多个 “croak” 。
 *
 * 请你返回模拟字符串中所有蛙鸣所需不同青蛙的最少数目。
 *
 * 要想发出蛙鸣 "croak"，青蛙必须 依序 输出 ‘c’, ’r’, ’o’, ’a’, ’k’ 这 5
 * 个字母。如果没有输出全部五个字母，那么它就不会发出声音。如果字符串 croakOfFrogs 不是由若干有效的 "croak" 字符混合而成，请返回
 * -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：croakOfFrogs = "croakcroak"
 * 输出：1
 * 解释：一只青蛙 “呱呱” 两次
 *
 *
 * 示例 2：
 *
 *
 * 输入：croakOfFrogs = "crcoakroak"
 * 输出：2
 * 解释：最少需要两只青蛙，“呱呱” 声用黑体标注
 * 第一只青蛙 "crcoakroak"
 * 第二只青蛙 "crcoakroak"
 *
 *
 * 示例 3：
 *
 *
 * 输入：croakOfFrogs = "croakcrook"
 * 输出：-1
 * 解释：给出的字符串不是 "croak" 的有效组合。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= croakOfFrogs.length <= 10^5
 * 字符串中的字符只有 'c', 'r', 'o', 'a' 或者 'k'
 *
 *
 */

// @lc code=start
function minNumberOfFrogs(croakOfFrogs: string): number {
  if (croakOfFrogs.length % 5 !== 0) {
    return -1;
  }
  let res = 0;
  let frogNum = 0;
  const cnt: number[] = new Array(4).fill(0);
  const map: Map<string, number> = new Map();
  map.set("c", 0);
  map.set("r", 1);
  map.set("o", 2);
  map.set("a", 3);
  map.set("k", 4);
  for (let i = 0; i < croakOfFrogs.length; i++) {
    const c = croakOfFrogs[i];
    const t = map.get(c)!;
    if (t === 0) {
      cnt[t]++;
      frogNum++;
      if (frogNum > res) {
        res = frogNum;
      }
    } else {
      if (cnt[t - 1] === 0) {
        return -1;
      }
      cnt[t - 1]--;
      if (t === 4) {
        frogNum--;
      } else {
        cnt[t]++;
      }
    }
  }
  if (frogNum > 0) {
    return -1;
  }
  return res;
}
// @lc code=end
