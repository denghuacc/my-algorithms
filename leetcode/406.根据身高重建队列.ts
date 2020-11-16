/*
 * @lc app=leetcode.cn id=406 lang=typescript
 *
 * [406] 根据身高重建队列
 *
 * https://leetcode-cn.com/problems/queue-reconstruction-by-height/description/
 *
 * algorithms
 * Medium (68.52%)
 * Likes:    558
 * Dislikes: 0
 * Total Accepted:    49.6K
 * Total Submissions: 72.5K
 * Testcase Example:  '[[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]'
 *
 * 假设有打乱顺序的一群人站成一个队列。 每个人由一个整数对(h, k)表示，其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。
 * 编写一个算法来重建这个队列。
 *
 * 注意：
 * 总人数少于1100人。
 *
 * 示例
 *
 *
 * 输入:
 * [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
 *
 * 输出:
 * [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
 *
 *
 */

// @lc code=start
// sort from low to high
var reconstructQueue = function (people: number[][]): number[][] {
  people.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else {
      return b[1] - a[1];
    }
  });

  const n = people.length;
  const ret: number[][] = Array.from(new Array(n), () => []);

  for (const person of people) {
    let spaces = person[1] + 1;
    for (let i = 0; i < n; i++) {
      if (!ret[i].length) {
        --spaces;
        if (spaces === 0) {
          ret[i] = person;
          break;
        }
      }
    }
  }

  return ret;
};

// sort from high to low
var reconstructQueue = function (people: number[][]): number[][] {
  people.sort((a, b) => {
    if (a[0] !== b[0]) {
      return b[0] - a[0];
    } else {
      return a[1] - b[1];
    }
  });

  const ret: number[][] = [];
  for (const person of people) {
    ret.splice(person[1], 0, person);
  }
  return ret;
};
// @lc code=end
