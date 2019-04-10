/**
 * Definition for singly-linked list.
 * 
 * public class ListNode { int val; ListNode next; ListNode(int x) { val = x; }
 * }
 */
class Solution5 {
  public ListNode removeElements(ListNode head, int val) {
    if (head == null) {
      return null;
    }

    head.next = removeElements(head.next, val); // 使用递归，简化

    // if (head.val == val) {
    // return head.next;
    // } else {
    // return head;
    // }

    return head.val == val ? head.next : head; // 简化
  }

  public static void main(String[] args) {

    int[] nums = { 1, 2, 6, 3, 4, 5, 6 };
    ListNode head = new ListNode(nums);
    System.out.println(head);

    ListNode res = (new Solution5()).removeElements(head, 6);
    System.out.println(res);
  }
}