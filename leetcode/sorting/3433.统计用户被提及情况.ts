/*
 * @lc app=leetcode.cn id=3433 lang=typescript
 *
 * [3433] 统计用户被提及情况
 *
 * https://leetcode.cn/problems/count-mentions-per-user/description/
 *
 * algorithms
 * Medium (30.56%)
 * Likes:    232
 * Dislikes: 166
 * Total Accepted:    44.2K
 * Total Submissions: 100.9K
 * Testcase Example:  '2\n[["MESSAGE","10","id1 id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]'
 *
 * 给你整数 numberOfUsers 表示用户总数，以及大小为 n x 3 的数组 events。
 *
 * 每个 events[i] 有两种类型：
 *
 *
 * 消息事件：["MESSAGE", "timestampi", "mentions_stringi"]
 *
 *
 *   表示在时间 timestampi 的消息中提到了若干用户。mentions_stringi 可以包含
 *   这些标记：
 *
 *   id<number>：其中 <number> 在 [0,numberOfUsers - 1]。可以有多个 id，
 *   以空格分隔，可能重复，可提及离线用户。
 *   ALL：提及所有用户。
 *   HERE：提及当前在线的所有用户。
 *
 *
 *
 * 离线事件：["OFFLINE", "timestampi", "idi"]
 *
 *   表示用户 idi 从 timestampi 开始离线 60 个时间单位，到 timestampi+60
 *   自动恢复在线。
 *
 *
 *
 * 返回数组 mentions，其中 mentions[i] 是 id 为 i 的用户在所有 MESSAGE 事件中被
 * 提及的次数。
 *
 * 初始所有用户在线，若同一时间既有上下线变化又有消息，先处理状态变化再处理消息。
 *
 * 注意：同一条消息中用户可被多次提及，需要逐次计数。
 *
 *
 * 示例 1：
 *
 *
 * 输入：numberOfUsers = 2, events = [["MESSAGE","10","id1
 * id0"],["OFFLINE","11","0"],["MESSAGE","71","HERE"]]
 *
 * 输出：[2,2]
 *
 * 解释：
 *
 *
 * 初始都在线。
 *
 * t=10，提及 id1 和 id0，mentions = [1,1]。
 * t=11，id0 下线。
 * t=71，id0 恢复在线且出现 "HERE"，两人都在线，mentions = [2,2]。
 *
 *
 * 示例 2：
 *
 *
 * 输入：numberOfUsers = 2, events = [["MESSAGE","10","id1
 * id0"],["OFFLINE","11","0"],["MESSAGE","12","ALL"]]
 *
 * 输出：[2,2]
 *
 * 解释：
 *
 *
 * t=12 的 "ALL" 包括离线用户，所以两人再次被提及。
 *
 *
 * 示例 3：
 *
 *
 * 输入：numberOfUsers = 2, events =
 * [["OFFLINE","10","0"],["MESSAGE","12","HERE"]]
 *
 * 输出：[0,1]
 *
 * 解释：
 *
 *
 * t=12 的 "HERE" 只提及在线用户，id0 仍离线，因此只计 id1。
 *
 *
 * 提示：
 *
 *
 * 1 <= numberOfUsers <= 100
 * 1 <= events.length <= 100
 * events[i].length == 3
 * events[i][0] 为 MESSAGE 或 OFFLINE
 * 1 <= int(events[i][1]) <= 10^5
 * 每个 MESSAGE 中 id<number> 的数量在 1..100
 * 0 <= <number> <= numberOfUsers - 1
 * 保证 OFFLINE 事件出现时该用户在线
 *
 *
 */

// @lc code=start
/**
 * 先按时间排序，若同一时间存在上下线与消息，保证 OFFLINE 在前。
 * 用 nextOnlineTime 记录用户下次恢复在线的时间；timestamp >= nextOnlineTime
 * 表示当前在线。
 * 对每条消息遍历 token，ALL/HERE 分别全量或在线用户累加；idX 直接累加。
 *
 * @param numberOfUsers - 用户总数
 * @param events - 事件列表
 * @returns 每个用户被提及次数
 */
function countMentions(numberOfUsers: number, events: string[][]): number[] {
  events.sort((a, b) => {
    const timeA = parseInt(a[1], 10);
    const timeB = parseInt(b[1], 10);
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    return a[0] === "OFFLINE" ? -1 : 1; // 同时刻先处理上下线
  });
  const counts = new Array(numberOfUsers).fill(0); // 被提及次数
  const nextOnlineTime = new Array(numberOfUsers).fill(0); // 下次上线时间，0 代表已在线

  for (const event of events) {
    const timestamp = parseInt(event[1], 10); // 当前事件时间戳
    const type = event[0]; // 事件类型

    if (type === "OFFLINE") {
      const userId = parseInt(event[2], 10); // 下线用户 id
      nextOnlineTime[userId] = timestamp + 60; // 记录恢复时间
    } else if (type === "MESSAGE") {
      const mentions = event[2].split(" "); // 消息中的 token 列表
      for (const mention of mentions) {
        if (mention === "ALL") {
          for (let i = 0; i < numberOfUsers; i++) {
            counts[i]++;
          }
        } else if (mention === "HERE") {
          for (let i = 0; i < numberOfUsers; i++) {
            if (timestamp >= nextOnlineTime[i]) {
              counts[i]++; // 仅在线用户计数
            }
          }
        } else if (mention.startsWith("id")) {
          const userId = parseInt(mention.slice(2), 10); // 提及具体用户
          counts[userId]++; // 离线也计数
        }
      }
    }
  }

  return counts;
}
// @lc code=end

/*
解题思路详解：

1. 同时刻事件顺序：
   - 题意要求上下线变化先于消息处理，因此对 events 按时间升序排序，同时间
     OFFLINE 排前，保证在线状态正确。

2. 在线判定：
   - nextOnlineTime[u] 记录用户 u 下次恢复在线的时间戳。
   - 初始为 0 表示已在线。离线事件更新为 t+60，消息时只要 timestamp >=
     nextOnlineTime[u] 即视为在线。

3. 消息计数：
   - "ALL"：所有用户 +1。
   - "HERE"：仅当前在线用户 +1。
   - "idX"：指定用户 +1，即便离线也要计数，且允许在同条消息内重复出现。

4. 复杂度：
   - 排序 O(m log m)，m=events.length (<=100)；遍历消息最坏 O(m * n)，
     n<=100，符合约束。
   - 空间 O(n)。

5. 边界与正确性：
   - 离线固定 60 时间单位，若多次 OFFLINE 之间时间小于 60，不会发生（保证
     下线时用户在线）；若再次下线则覆盖为新的恢复时间。
   - 同条消息多个 idX 会被多次计数，符合题意。
   - numberOfUsers 至多 100，双重循环在数据范围内可接受。

6. 示例验证：
   - 示例 1：排序后 t=10 消息计 [1,1]；t=11 下线 id0；t=71 之前恢复，HERE
     对两人都 +1，得到 [2,2]。
   - 示例 2：t=12 ALL 无视在线状态，两人各 +1，得到 [2,2]。
   - 示例 3：t=12 HERE 仅在线用户，id0 不计，得到 [0,1]。
*/
