/*
 * @lc app=leetcode.cn id=2325 lang=typescript
 *
 * [2325] 解密消息
 *
 * https://leetcode.cn/problems/decode-the-message/description/
 *
 * algorithms
 * Easy (85.56%)
 * Likes:    35
 * Dislikes: 0
 * Total Accepted:    19.1K
 * Total Submissions: 22.3K
 * Testcase Example:  '"the quick brown fox jumps over the lazy dog"\n"vkbs bs t suepuv"'
 *
 * 给你字符串 key 和 message ，分别表示一个加密密钥和一段加密消息。解密 message 的步骤如下：
 *
 *
 * 使用 key 中 26 个英文小写字母第一次出现的顺序作为替换表中的字母 顺序 。
 * 将替换表与普通英文字母表对齐，形成对照表。
 * 按照对照表 替换 message 中的每个字母。
 * 空格 ' ' 保持不变。
 *
 *
 *
 * 例如，key = "happy boy"（实际的加密密钥会包含字母表中每个字母 至少一次），据此，可以得到部分对照表（'h' -> 'a'、'a' ->
 * 'b'、'p' -> 'c'、'y' -> 'd'、'b' -> 'e'、'o' -> 'f'）。
 *
 *
 * 返回解密后的消息。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：key = "the quick brown fox jumps over the lazy dog", message = "vkbs bs t
 * suepuv"
 * 输出："this is a secret"
 * 解释：对照表如上图所示。
 * 提取 "the quick brown fox jumps over the lazy dog" 中每个字母的首次出现可以得到替换表。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：key = "eljuxhpwnyrdgtqkviszcfmabo", message = "zwx hnfx lqantp mnoeius
 * ycgk vcnjrdb"
 * 输出："the five boxing wizards jump quickly"
 * 解释：对照表如上图所示。
 * 提取 "eljuxhpwnyrdgtqkviszcfmabo" 中每个字母的首次出现可以得到替换表。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 26 <= key.length <= 2000
 * key 由小写英文字母及 ' ' 组成
 * key 包含英文字母表中每个字符（'a' 到 'z'）至少一次
 * 1 <= message.length <= 2000
 * message 由小写英文字母和 ' ' 组成
 *
 *
 */

// @lc code=start
function decodeMessage(key: string, message: string): string {
  const map: Map<string, string> = new Map();
  let code = "a".charCodeAt(0);
  for (let i = 0; i < key.length; i++) {
    const ch = key[i];
    if (!map.has(ch) && ch != " ") {
      map.set(ch, String.fromCharCode(code));
      code += 1;
    }
    if (code > "z".charCodeAt(0)) {
      break;
    }
  }
  let res = "";
  for (const ch of message) {
    res += map.get(ch) ?? " ";
  }
  return res;
}
// @lc code=end
