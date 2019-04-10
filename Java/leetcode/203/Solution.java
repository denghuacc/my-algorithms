/**
 * Definition for singly-linked list.
 * 
 * public class ListNode { int val; ListNode next; ListNode(int x) { val = x; }
 * }
 */
class Solution {
  public ListNode removeElements(ListNode head, int val) {

    // 特性处理第一个节点
    while (head != null && head.val == val) {
      ListNode delNode = head;
      head = head.next;
      delNode.next = null;
    }

    if (head == null) {
      return null;
    }

    ListNode prev = head; // 找到要删除节点的前一个节点

    while (prev.next != null) {
      if (prev.next.val == val) {
        ListNode delNode = prev.next;
        prev.next = delNode.next;
        delNode.next = null;
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

    ListNode res = (new Solution()).removeElements(head, 6);
    System.out.println(res);
  }
}