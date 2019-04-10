/**
 * Definition for singly-linked list.
 * 
 * public class ListNode { int val; ListNode next; ListNode(int x) { val = x; }
 * }
 */
class Solution2 {
  public ListNode removeElements(ListNode head, int val) {

    // 特性处理第一个节点
    while (head != null && head.val == val) {
      // ListNode delNode = head;
      head = head.next;
      // delNode.next = null; // leetcode 可以不用处理内存
    }

    if (head == null) {
      return null;
    }

    ListNode prev = head; // 找到要删除节点的前一个节点

    while (prev.next != null) {
      if (prev.next.val == val) {
        // ListNode delNode = prev.next;
        prev.next = prev.next.next;
        // delNode.next = null; // leetcode 可以不用处理内存
      } else {
        prev = prev.next; // 继续
      }
    }

    return head;
  }

  public static void main(String[] args) {

    int[] nums = { 1, 2, 6, 3, 4, 5, 6 };
    ListNode head = new ListNode(nums);
    System.out.println(head);

    ListNode res = (new Solution2()).removeElements(head, 6);
    System.out.println(res);
  }
}