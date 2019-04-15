/**
 * Solution leetcode 20题
 */
public class Solution {

  public boolean isValid(String s) {
    ArrayStack<Character> stack = new ArrayStack<>();

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i); // 获取当前元素

      if (c == '(' || c == '[' || c == '{') {
        stack.push(c); // 左括号元素入栈
      } else {
        if (stack.isEmpty()) {
          return false;
        }

        char topChar = stack.pop(); // 左括号元素出栈

        // 出栈元素和当前元素对比
        if (c == ')' && topChar != '(') {
          return false;
        }

        if (c == ']' && topChar != '[') {
          return false;
        }

        if (c == '}' && topChar != '{') {
          return false;
        }
      }
    }

    return stack.isEmpty(); // 遍历完毕后，全部元素出栈（匹配成功）为 true
  }

  public static void main(String[] args) {
    System.out.println(new Solution().isValid("()[]{}"));
    System.out.println(new Solution().isValid("([)]"));
  }
}
