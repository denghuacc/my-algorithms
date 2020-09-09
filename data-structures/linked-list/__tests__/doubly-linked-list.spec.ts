import DoublyLinkedList from "../doubly-linked-list";

describe("LinkedList", () => {
  let linkedList: DoublyLinkedList<number>;

  beforeEach(() => {
    linkedList = new DoublyLinkedList();
  });

  test("size", () => {
    expect(linkedList.size).toBe(0);
    linkedList.addFirst(1);
    expect(linkedList.size).toBe(1);
    linkedList.addFirst(2);
    expect(linkedList.size).toBe(2);
    linkedList.addFirst(3);
    expect(linkedList.size).toBe(3);
    linkedList.removeFirst();
    expect(linkedList.size).toBe(2);
    linkedList.removeFirst();
    expect(linkedList.size).toBe(1);
    linkedList.removeFirst();
    expect(linkedList.size).toBe(0);
  });

  test("isEmpty", () => {
    expect(linkedList.isEmpty()).toBe(true);
    linkedList.addFirst(1);
    expect(linkedList.isEmpty()).toBe(false);
    linkedList.addFirst(2);
    expect(linkedList.isEmpty()).toBe(false);
    linkedList.removeFirst();
    expect(linkedList.isEmpty()).toBe(false);
    linkedList.removeFirst();
    expect(linkedList.isEmpty()).toBe(true);
  });

  test("addFirst", () => {
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    linkedList.addFirst(1);
    expect(linkedList.head?.key).toBe(1);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next).toBe(undefined);
    expect(linkedList.size).toBe(1);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 1 -> undefined }"
    );
    linkedList.addFirst(2);
    expect(linkedList.head?.key).toBe(2);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.next).toBe(undefined);
    expect(linkedList.head?.next?.key).toBe(1);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 2 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(2);
    linkedList.addFirst(3);
    expect(linkedList.head?.key).toBe(3);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.key).toBe(2);
    expect(linkedList.head?.next?.next?.key).toBe(1);
    expect(linkedList.head?.next?.next?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 2 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(3);
  });

  test("addLast", () => {
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    linkedList.addLast(1);
    expect(linkedList.head?.key).toBe(1);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 1 -> undefined }"
    );
    expect(linkedList.size).toBe(1);
    linkedList.addLast(2);
    expect(linkedList.head?.key).toBe(1);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.next).toBe(undefined);
    expect(linkedList.head?.next?.key).toBe(2);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 1 <-> 2 -> undefined }"
    );
    expect(linkedList.size).toBe(2);
    linkedList.addLast(3);
    expect(linkedList.head?.key).toBe(1);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.key).toBe(2);
    expect(linkedList.head?.next?.next?.key).toBe(3);
    expect(linkedList.head?.next?.next?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 1 <-> 2 <-> 3 -> undefined }"
    );
    expect(linkedList.size).toBe(3);
  });

  test("getFirst", () => {
    expect(linkedList.getFirst()).toBe(undefined);
    linkedList.addFirst(1);
    expect(linkedList.getFirst()).toBe(1);
    linkedList.addFirst(2);
    expect(linkedList.getFirst()).toBe(2);
    linkedList.addLast(3);
    expect(linkedList.getFirst()).toBe(2);
    linkedList.addFirst(4);
    expect(linkedList.getFirst()).toBe(4);
  });

  test("getLast", () => {
    expect(linkedList.getFirst()).toBe(undefined);
    linkedList.addFirst(1);
    expect(linkedList.getLast()).toBe(1);
    linkedList.addFirst(2);
    expect(linkedList.getLast()).toBe(1);
    linkedList.addLast(3);
    expect(linkedList.getLast()).toBe(3);
    linkedList.addFirst(4);
    expect(linkedList.getLast()).toBe(3);
  });

  test("set", () => {
    expect(linkedList.set(0, 3)).toBe(false);
    linkedList.addFirst(1);
    linkedList.addFirst(2);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 2 <-> 1 -> undefined }"
    );
    expect(linkedList.set(0, 3)).toBe(true);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 1 -> undefined }"
    );
    expect(linkedList.set(1, 5)).toBe(true);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 5 -> undefined }"
    );
    expect(linkedList.set(2, 7)).toBe(false);
  });

  test("indexOf", () => {
    expect(linkedList.indexOf(1)).toBe(-1);
    linkedList.addFirst(1);
    linkedList.addFirst(2);
    linkedList.addFirst(3);
    expect(linkedList.indexOf(1)).toBe(2);
    expect(linkedList.indexOf(2)).toBe(1);
    expect(linkedList.indexOf(3)).toBe(0);
    expect(linkedList.indexOf(4)).toBe(-1);
    linkedList.addFirst(1); // add repeat key
    expect(linkedList.indexOf(1)).toBe(0);
  });

  test("contains", () => {
    expect(linkedList.contains(1)).toBe(false);
    linkedList.addFirst(1);
    linkedList.addFirst(2);
    expect(linkedList.contains(1)).toBe(true);
    expect(linkedList.contains(2)).toBe(true);
    expect(linkedList.contains(3)).toBe(false);
    linkedList.addLast(3);
    expect(linkedList.contains(3)).toBe(true);
  });

  test("removeFirst", () => {
    expect(linkedList.removeFirst()).toBe(undefined);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    linkedList.addFirst(1);
    linkedList.addFirst(2);
    linkedList.addFirst(3);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 2 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(3);
    linkedList.removeFirst();
    expect(linkedList.head?.key).toBe(2);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.key).toBe(1);
    expect(linkedList.head?.next?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 2 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(2);
    linkedList.removeFirst();
    expect(linkedList.head?.key).toBe(1);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 1 -> undefined }"
    );
    expect(linkedList.size).toBe(1);
    linkedList.removeFirst();
    expect(linkedList.head).toBe(undefined);
    expect(linkedList.head?.key).toBe(undefined);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    expect(linkedList.removeFirst()).toBe(undefined);
  });

  test("removeLast", () => {
    expect(linkedList.removeLast()).toBe(undefined);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    linkedList.addFirst(1);
    linkedList.addFirst(2);
    linkedList.addFirst(3);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 2 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(3);
    expect(linkedList.removeLast()).toBe(1);
    expect(linkedList.head?.key).toBe(3);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.key).toBe(2);
    expect(linkedList.head?.next?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 2 -> undefined }"
    );
    expect(linkedList.size).toBe(2);
    expect(linkedList.removeLast()).toBe(2);
    expect(linkedList.head?.key).toBe(3);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 -> undefined }"
    );
    expect(linkedList.size).toBe(1);
    expect(linkedList.removeLast()).toBe(3);
    expect(linkedList.head).toBe(undefined);
    expect(linkedList.head?.key).toBe(undefined);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    expect(linkedList.removeLast()).toBe(undefined);
  });

  test("removeKey", () => {
    expect(linkedList.removeKey(1)).toBe(false);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    linkedList.addFirst(1);
    linkedList.addFirst(2);
    linkedList.addFirst(3);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 2 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(3);
    expect(linkedList.removeKey(2)).toBe(true);
    expect(linkedList.head?.key).toBe(3);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.key).toBe(1);
    expect(linkedList.head?.next?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(2);
    expect(linkedList.removeKey(5)).toBe(false);
    expect(linkedList.head?.key).toBe(3);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next?.prev).toBe(linkedList.head);
    expect(linkedList.head?.next?.key).toBe(1);
    expect(linkedList.head?.next?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 3 <-> 1 -> undefined }"
    );
    expect(linkedList.size).toBe(2);
    expect(linkedList.removeKey(3)).toBe(true);
    expect(linkedList.head?.key).toBe(1);
    expect(linkedList.head?.prev).toBe(undefined);
    expect(linkedList.head?.next).toBe(undefined);
    expect(linkedList.toString()).toBe(
      "Doubly Linked List { undefined <- 1 -> undefined }"
    );
    expect(linkedList.size).toBe(1);
  });
});
