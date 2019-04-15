public class LinkedList<E> {

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

  // private Node head;
  private Node dummyHead; // 虚拟头部节点
  private int size;

  public LinkedList() {
    // head = null;
    dummyHead = new Node(null, null);
    size = 0;
  }

  // 获取链表中的元素个数
  public int getSize() {
    return size;
  }

  // 返回链表是否为空
  public boolean isEmpty() {
    return size == 0;
  }

  // 在链表的 index（0-based）位置添加新的元素 e
  // 在链表中不是一个常用的操作，练习用
  public void add(int index, E e) {
    if (index < 0 || index > size) {
      throw new IllegalArgumentException("Add failed. Illegal index.");
    }

    // Node prev = head;
    Node prev = dummyHead;

    for (int i = 0; /* i < index - 1 */ i < index; i++) {
      prev = prev.next;
    }

    // Node node = new Node(e);
    // node.next = prev.next;
    // prev.next = node;

    prev.next = new Node(e, prev.next);

    size++;
  }

  // 在链表头添加元素 e
  public void addFirst(E e) {
    // Node node = new Node(e);
    // node.next = head;
    // head = node;

    // head = new Node(e, head);
    // size++;

    add(0, e);
  }

  // 在链表末尾添加元素 e
  public void addLast(E e) {
    add(size, e);
  }

  // 获得链表第 index（0-based）个位置的元素
  // 在链表中不是一个常用的操作，练习用
  public E get(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException("Get failed. Illegal index.");
    }

    Node cur = dummyHead.next;
    for (int i = 0; i < index; i++) {
      cur = cur.next;
    }
    return cur.e;
  }

  // 获得链表的第一个元素
  public E getFirst() {
    return get(0);
  }

  // 获得链表的最后一个元素
  public E getLast() {
    return get(size - 1);
  }

  // 设置链表第 index（0-based）个位置的元素为新元素 e
  // 在链表中不是一个常用的操作，练习用
  public void set(int index, E e) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException("set failed. Illegal index.");
    }

    Node cur = dummyHead.next;
    for (int i = 0; i < index; i++) {
      cur = cur.next;
    }
    cur.e = e;
  }

  // 查找链表中是否有元素 e
  public boolean contains(E e) {
    Node cur = dummyHead.next;

    while (cur != null) {
      if (cur.e.equals(e)) {
        return true;
      }
      cur = cur.next;
    }

    return false;
  }

  // 删除链表第 index（0-based）个位置的元素，返回删除的元素
  // 在链表中不是一个常用的操作，练习用
  public E remove(int index) {
    if (index < 0 || index >= size) {
      throw new IllegalArgumentException("remove failed. Illegal index.");
    }

    Node prev = dummyHead;
    for (int i = 0; i < index; i++) {
      prev = prev.next;
    }

    Node retNode = prev.next; // 要删除的节点
    prev.next = retNode.next;
    retNode.next = null;
    size--;
    return retNode.e;
  }

  // 删除链表的第一个元素，返回删除的元素
  public E removeFirst() {
    return remove(0);
  }

  // 删除链表的最后一个元素，返回删除的元素
  public E removeLast() {
    return remove(size - 1);
  }

  // 从链表中删除元素 e
  public void removeElement(E e) {
    Node prev = dummyHead;

    while (prev.next != null) {
      if (prev.next.e.equals(e)) {
        break;
      }
      prev = prev.next;
    }

    if (prev.next != null) {
      Node delNode = prev.next;
      prev.next = delNode.next;
      delNode.next = null;
      size--;
    }
  }

  @Override
  public String toString() {
    StringBuilder res = new StringBuilder();

    // Node cur = dummyHead.next;
    // while (cur != null) {
    // res.append(cur + "->");
    // cur = cur.next;
    // }

    // for 循环
    for (Node cur = dummyHead.next; cur != null; cur = cur.next) {
      res.append(cur + " -> ");
    }

    res.append("NULL");
    return res.toString();
  }
}