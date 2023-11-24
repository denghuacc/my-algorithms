#
# @lc app=leetcode.cn id=1410 lang=python3
#
# [1410] HTML 实体解析器
#
# https://leetcode.cn/problems/html-entity-parser/description/
#
# algorithms
# Medium (51.42%)
# Likes:    62
# Dislikes: 0
# Total Accepted:    28.3K
# Total Submissions: 53.9K
# Testcase Example:  '"&amp; is an HTML entity but &ambassador; is not."'
#
# 「HTML 实体解析器」 是一种特殊的解析器，它将 HTML 代码作为输入，并用字符本身替换掉所有这些特殊的字符实体。
#
# HTML 里这些特殊字符和它们对应的字符实体包括：
#
#
# 双引号：字符实体为 " ，对应的字符是 " 。
# 单引号：字符实体为 ' ，对应的字符是 ' 。
# 与符号：字符实体为 & ，对应对的字符是 & 。
# 大于号：字符实体为 > ，对应的字符是 > 。
# 小于号：字符实体为 < ，对应的字符是 < 。
# 斜线号：字符实体为 ⁄ ，对应的字符是 / 。
#
#
# 给你输入字符串 text ，请你实现一个 HTML 实体解析器，返回解析器解析后的结果。
#
#
#
# 示例 1：
#
#
# 输入：text = "& is an HTML entity but &ambassador; is not."
# 输出："& is an HTML entity but &ambassador; is not."
# 解释：解析器把字符实体 & 用 & 替换
#
#
# 示例 2：
#
#
# 输入：text = "and I quote: "...""
# 输出："and I quote: \"...\""
#
#
# 示例 3：
#
#
# 输入：text = "Stay home! Practice on Leetcode :)"
# 输出："Stay home! Practice on Leetcode :)"
#
#
# 示例 4：
#
#
# 输入：text = "x > y && x < y is always false"
# 输出："x > y && x < y is always false"
#
#
# 示例 5：
#
#
# 输入：text = "leetcode.com⁄problemset⁄all"
# 输出："leetcode.com/problemset/all"
#
#
#
#
# 提示：
#
#
# 1 <= text.length <= 10^5
# 字符串可能包含 256 个ASCII 字符中的任意字符。
#
#
#

# @lc code=start
from operator import contains


class Solution:

    def entityParser(self, text: str) -> str:
        map = {
            '&quot;': '"',
            '&apos;': "'",
            '&amp;': '&',
            '&gt;': '>',
            '&lt;': '<',
            '&frasl;': '/',
        }
        i, n = 0, len(text)
        res = ""
        while i < n:
            if text[i] == "&":
                i += 1
                symbol = "&"
                while i < n and text[i] != "&" and text[i] != ";":
                    symbol += text[i]
                    i += 1
                if i < n and text[i] == ';':
                    symbol += ';'
                    i += 1
                if contains(map, symbol):
                    res += map[symbol]
                else:
                    res += symbol
            else:
                res += text[i]
                i += 1
        return res


# @lc code=end
