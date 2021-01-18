/*
 * @lc app=leetcode.cn id=721 lang=typescript
 *
 * [721] 账户合并
 *
 * https://leetcode-cn.com/problems/accounts-merge/description/
 *
 * algorithms
 * Medium (39.73%)
 * Likes:    156
 * Dislikes: 0
 * Total Accepted:    9K
 * Total Submissions: 22.6K
 * Testcase Example:  '[["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]'
 *
 * 给定一个列表 accounts，每个元素 accounts[i] 是一个字符串列表，其中第一个元素 accounts[i][0] 是 名称
 * (name)，其余元素是 emails 表示该账户的邮箱地址。
 *
 *
 * 现在，我们想合并这些账户。如果两个账户都有一些共同的邮箱地址，则两个账户必定属于同一个人。请注意，即使两个账户具有相同的名称，它们也可能属于不同的人，因为人们可能具有相同的名称。一个人最初可以拥有任意数量的账户，但其所有账户都具有相同的名称。
 *
 * 合并账户后，按以下格式返回账户：每个账户的第一个元素是名称，其余元素是按顺序排列的邮箱地址。账户本身可以以任意顺序返回。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：
 * accounts = [["John", "johnsmith@mail.com", "john00@mail.com"], ["John",
 * "johnnybravo@mail.com"], ["John", "johnsmith@mail.com",
 * "john_newyork@mail.com"], ["Mary", "mary@mail.com"]]
 * 输出：
 * [["John", 'john00@mail.com', 'john_newyork@mail.com',
 * 'johnsmith@mail.com'],  ["John", "johnnybravo@mail.com"], ["Mary",
 * "mary@mail.com"]]
 * 解释：
 * 第一个和第三个 John 是同一个人，因为他们有共同的邮箱地址 "johnsmith@mail.com"。
 * 第二个 John 和 Mary 是不同的人，因为他们的邮箱地址没有被其他帐户使用。
 * 可以以任何顺序返回这些列表，例如答案
 * [['Mary'，'mary@mail.com']，['John'，'johnnybravo@mail.com']，
 * ['John'，'john00@mail.com'，'john_newyork@mail.com'，'johnsmith@mail.com']]
 * 也是正确的。
 *
 *
 *
 *
 * 提示：
 *
 *
 * accounts的长度将在[1，1000]的范围内。
 * accounts[i]的长度将在[1，10]的范围内。
 * accounts[i][j]的长度将在[1，30]的范围内。
 *
 *
 */

export {};

// @lc code=start
// union find
function accountsMerge(accounts: string[][]): string[][] {
  const emailToIndex: Map<string, number> = new Map();
  const emailToName: Map<string, string> = new Map();
  const indexToEmails: Map<number, string[]> = new Map();

  let emailsCount = 0;
  for (const account of accounts) {
    const name = account[0];
    const size = account.length;
    for (let i = 1; i < size; i++) {
      const email = account[i];
      if (!emailToIndex.has(email)) {
        emailToIndex.set(email, emailsCount++);
        emailToName.set(email, name);
      }
    }
  }

  const uf = new UnionFind(emailsCount);
  for (const account of accounts) {
    const firstEmail = account[1];
    const firstIndex = emailToIndex.get(firstEmail)!;
    const size = account.length;
    for (let i = 2; i < size; i++) {
      const nextEmail = account[i];
      const nextIndex = emailToIndex.get(nextEmail)!;
      uf.union(firstIndex, nextIndex);
    }
  }

  for (const email of emailToIndex.keys()) {
    const index = uf.find(emailToIndex.get(email)!);
    const account = indexToEmails.get(index) ? indexToEmails.get(index)! : [];
    account.push(email);
    indexToEmails.set(index, account);
  }

  const merged: string[][] = [];
  for (const emails of indexToEmails.values()) {
    emails.sort(); // sort
    const name = emailToName.get(emails[0])!;
    const account: string[] = [];
    account.push(name);
    account.push(...emails);
    merged.push(account);
  }
  return merged;
}

class UnionFind {
  parent: number[];

  constructor(n: number) {
    this.parent = new Array(n).fill(0).map((_, index) => index);
  }

  union(idx1: number, idx2: number) {
    this.parent[this.find(idx2)] = this.find(idx1);
  }

  find(idx: number): number {
    if (this.parent[idx] !== idx) {
      this.parent[idx] = this.find(this.parent[idx]);
    }
    return this.parent[idx];
  }
}
// @lc code=end
