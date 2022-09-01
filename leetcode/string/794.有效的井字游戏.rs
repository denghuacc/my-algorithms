/*
 * @lc app=leetcode.cn id=794 lang=rust
 *
 * [794] 有效的井字游戏
 *
 * https://leetcode-cn.com/problems/valid-tic-tac-toe-state/description/
 *
 * algorithms
 * Medium (34.37%)
 * Likes:    56
 * Dislikes: 0
 * Total Accepted:    11.3K
 * Total Submissions: 30.9K
 * Testcase Example:  '["O  ","   ","   "]'
 *
 * 给你一个字符串数组 board 表示井字游戏的棋盘。当且仅当在井字游戏过程中，棋盘有可能达到 board 所显示的状态时，才返回 true 。
 *
 * 井字游戏的棋盘是一个 3 x 3 数组，由字符 ' '，'X' 和 'O' 组成。字符 ' ' 代表一个空位。
 *
 * 以下是井字游戏的规则：
 *
 *
 * 玩家轮流将字符放入空位（' '）中。
 * 玩家 1 总是放字符 'X' ，而玩家 2 总是放字符 'O' 。
 * 'X' 和 'O' 只允许放置在空位中，不允许对已放有字符的位置进行填充。
 * 当有 3 个相同（且非空）的字符填充任何行、列或对角线时，游戏结束。
 * 当所有位置非空时，也算为游戏结束。
 * 如果游戏结束，玩家不允许再放置字符。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：board = ["O  ","   ","   "]
 * 输出：false
 * 解释：玩家 1 总是放字符 "X" 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：board = ["XOX"," X ","   "]
 * 输出：false
 * 解释：玩家应该轮流放字符。
 *
 * 示例 3：
 *
 *
 * 输入：board = ["XXX","   ","OOO"]
 * 输出：false
 *
 *
 * Example 4:
 *
 *
 * 输入：board = ["XOX","O O","XOX"]
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * board.length == 3
 * board[i].length == 3
 * board[i][j] 为 'X'、'O' 或 ' '
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn valid_tic_tac_toe(board: Vec<String>) -> bool {
        let mut x_count = 0;
        let mut o_count = 0;
        for row in board.clone() {
            for c in row.chars() {
                if c == 'X' {
                    x_count += 1;
                } else if c == 'O' {
                    o_count += 1;
                }
            }
        }

        if o_count != x_count && o_count != x_count - 1 {
            return false;
        }
        if win(board.clone(), 'X') && o_count != x_count - 1 {
            return false;
        }
        if win(board.clone(), 'O') && o_count != x_count {
            return false;
        }
        return true;

        fn win(board: Vec<String>, c: char) -> bool {
            for i in 0..3 {
                if board[i].chars().nth(0) == Some(c)
                    && board[i].chars().nth(1) == Some(c)
                    && board[i].chars().nth(2) == Some(c)
                {
                    return true;
                }
            }
            for i in 0..3 {
                if board[0].chars().nth(i) == Some(c)
                    && board[1].chars().nth(i) == Some(c)
                    && board[2].chars().nth(i) == Some(c)
                {
                    return true;
                }
            }
            if board[0].chars().nth(0) == Some(c)
                && board[1].chars().nth(1) == Some(c)
                && board[2].chars().nth(2) == Some(c)
            {
                return true;
            }
            if board[0].chars().nth(2) == Some(c)
                && board[1].chars().nth(1) == Some(c)
                && board[2].chars().nth(0) == Some(c)
            {
                return true;
            }
            return false;
        }
    }
}
// @lc code=end
