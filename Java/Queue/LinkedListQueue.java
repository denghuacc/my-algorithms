/**
 * LinkedListQueue 使用链表模拟队列；
 * 
 * 没有继承以前的链表，不使用 dummyHead，而是使用 head 和 tail
 */
public class LinkedListQueue<E> implements Queue<E> {

  private class Node {
    public E e;
    public Node next;

    public Node(E e, Node next) {
      this.e = e;
      this.next = next;
    }

    public Node(E e) {
      this(e, null);
    }

    public Node() {
      this(null, null);
    }

    @Override
    public String toString() {
      return e.toString();
    }
  }

  private Node head, tail;
  private int size;

  public LinkedListQueue() {
    head = null;
    tail = null;
    size = 0;
  }

  @Override
  public int getSize() {
    return size;
  }

  @Override
  public boolean isEmpty() {
    return size == 0;
  }

  @Override
  public void enqueue(E e) {
    if (tail == null) {
      tail = new Node(e);
      head = tail;
    } else {
      tail.next = new Node(e); // 末尾添加节点
      tail = tail.next; // 更新 tail 位置
    }
    size++;
  }

  @Override
  public E dequeue() {
    if (isEmpty()) {
      throw new IllegalArgumentException("Cannot dequeue from an empty queue.");
    }

    Node retNode = head; // 存储出栈的表头
    head = head.next; // 更新 head 位置
    retNode.next = null; // 清除内存，next 为 null

    // 如果此时链表为空，不仅 head 为空， tail 也为空
    if (head == null) {
      tail = null;
    }
    size--;
    return retNode.e;
  }

  @Override
  public E getFront() {
    if (isEmpty()) {
      throw new IllegalArgumentException("Queue is empty.");
    }
    return head.e;
  }

  @Override
  public String toString() {
    StringBuilder res = new StringBuilder();
    res.append("Queue: front ");

    Node cur = head;

    while (cur != null) {
      res.append(cur + " -> ");
      cur = cur.next;
    }

    res.append("NULL tail");
    return res.toString();
  }

  public static void main(String[] args) {
    LinkedListQueue<Integer> queue = new LinkedListQueue<>();
    for (int i = 0; i < 10; i++) {
      queue.enqueue(i);
      System.out.println(queue);

      if (i % 3 == 2) {
        queue.dequeue();
        System.out.println(queue);
      }
    }
  }
}