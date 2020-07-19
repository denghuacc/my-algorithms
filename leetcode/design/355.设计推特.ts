/*
 * @lc app=leetcode.cn id=355 lang=typescript
 *
 * [355] 设计推特
 *
 * https://leetcode-cn.com/problems/design-twitter/description/
 *
 * algorithms
 * Medium (32.40%)
 * Likes:    142
 * Dislikes: 0
 * Total Accepted:    16.3K
 * Total Submissions: 39.4K
 * Testcase Example:  '["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n' +
  '[[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]'
 *
 * 
 * 设计一个简化版的推特(Twitter)，可以让用户实现发送推文，关注/取消关注其他用户，能够看见关注人（包括自己）的最近十条推文。你的设计需要支持以下的几个功能：
 * 
 * 
 * postTweet(userId, tweetId): 创建一条新的推文
 * getNewsFeed(userId):
 * 检索最近的十条推文。每个推文都必须是由此用户关注的人或者是用户自己发出的。推文必须按照时间顺序由最近的开始排序。
 * follow(followerId, followeeId): 关注一个用户
 * unfollow(followerId, followeeId): 取消关注一个用户
 * 
 * 
 * 示例:
 * 
 * 
 * Twitter twitter = new Twitter();
 * 
 * // 用户1发送了一条新推文 (用户id = 1, 推文id = 5).
 * twitter.postTweet(1, 5);
 * 
 * // 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
 * twitter.getNewsFeed(1);
 * 
 * // 用户1关注了用户2.
 * twitter.follow(1, 2);
 * 
 * // 用户2发送了一个新推文 (推文id = 6).
 * twitter.postTweet(2, 6);
 * 
 * // 用户1的获取推文应当返回一个列表，其中包含两个推文，id分别为 -> [6, 5].
 * // 推文id6应当在推文id5之前，因为它是在5之后发送的.
 * twitter.getNewsFeed(1);
 * 
 * // 用户1取消关注了用户2.
 * twitter.unfollow(1, 2);
 * 
 * // 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
 * // 因为用户1已经不再关注用户2.
 * twitter.getNewsFeed(1);
 * 
 * 
 */

// @lc code=start
// hash-table
class Twitter {
  followMap: Map<number, Set<number>>;
  postMap: Map<number, [number, number][]>;
  postId: number;

  constructor() {
    this.followMap = new Map();
    this.postMap = new Map();
    this.postId = 0; // timestamp
  }

  postTweet(userId: number, tweetId: number): void {
    if (!this.postMap.has(userId)) {
      this.postMap.set(userId, [[tweetId, this.postId++]]);
    } else {
      this.postMap.get(userId)!.push([tweetId, this.postId++]);
    }
  }

  getNewsFeed(userId: number): number[] {
    const followList = this.followMap.get(userId) || new Set();
    followList.add(userId);
    const collection: [number, number][] = [];
    followList.forEach((userId) => {
      if (this.postMap.has(userId)) {
        const pairs = this.postMap.get(userId)!;
        collection.push(...pairs);
      }
    });

    const newsFeed = collection
      .sort((a, b) => b[1] - a[1])
      .map((pair) => pair[0])
      .slice(0, 10);

    return newsFeed;
  }

  follow(followerId: number, followeeId: number): void {
    if (!this.followMap.has(followerId)) {
      this.followMap.set(followerId, new Set<number>().add(followeeId));
    } else {
      this.followMap.get(followerId)!.add(followeeId);
    }
  }

  unfollow(followerId: number, followeeId: number): void {
    if (this.followMap.has(followerId)) {
      this.followMap.get(followerId)?.delete(followeeId);
    }
  }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
// @lc code=end
