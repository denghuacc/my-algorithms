import Deque from "../deque";

describe("Deque", () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque();
  });

  test("pushFront", () => {
    expect(deque.peekFront()).toBe(undefined);
    deque.pushFront(1);
    expect(deque.peekFront()).toBe(1);
    deque.pushFront(2);
    expect(deque.peekFront()).toBe(2);
    deque.pushFront(3);
    expect(deque.peekFront()).toBe(3);
  });

  test("pushLast", () => {
    expect(deque.peekLast()).toBe(undefined);
    deque.pushLast(1);
    expect(deque.peekLast()).toBe(1);
    deque.pushLast(2);
    expect(deque.peekLast()).toBe(2);
    deque.pushLast(3);
    expect(deque.peekLast()).toBe(3);
  });

  test("popFront", () => {
    expect(deque.popFront()).toBe(undefined);
    deque.pushLast(1);
    deque.pushLast(2);
    deque.pushLast(3);
    expect(deque.popFront()).toBe(1);
    expect(deque.popFront()).toBe(2);
    expect(deque.popFront()).toBe(3);
    expect(deque.popFront()).toBe(undefined);
  });

  test("popLast", () => {
    expect(deque.popFront()).toBe(undefined);
    deque.pushLast(1);
    deque.pushLast(2);
    deque.pushLast(3);
    expect(deque.popLast()).toBe(3);
    expect(deque.popLast()).toBe(2);
    expect(deque.popLast()).toBe(1);
    expect(deque.popLast()).toBe(undefined);
  });

  test("peekFront", () => {
    expect(deque.peekFront()).toBe(undefined);
    deque.pushLast(1);
    deque.pushLast(2);
    deque.pushLast(3);
    expect(deque.peekFront()).toBe(1);
    deque.popFront();
    expect(deque.peekFront()).toBe(2);
    deque.popFront();
    expect(deque.peekFront()).toBe(3);
    deque.popFront();
    expect(deque.peekFront()).toBe(undefined);
  });

  test("peekFront", () => {
    expect(deque.peekLast()).toBe(undefined);
    deque.pushLast(1);
    deque.pushLast(2);
    deque.pushLast(3);
    expect(deque.peekLast()).toBe(3);
    deque.popLast();
    expect(deque.peekLast()).toBe(2);
    deque.popLast();
    expect(deque.peekLast()).toBe(1);
    deque.popLast();
    expect(deque.peekLast()).toBe(undefined);
  });

  test("size", () => {
    expect(deque.size).toBe(0);
    deque.pushLast(1);
    expect(deque.size).toBe(1);
    deque.pushLast(2);
    expect(deque.size).toBe(2);
    deque.pushLast(3);
    expect(deque.size).toBe(3);
    deque.popFront();
    expect(deque.size).toBe(2);
    deque.clear();
    expect(deque.size).toBe(0);
  });

  test("isEmpty", () => {
    expect(deque.isEmpty()).toBe(true);
    deque.pushLast(1);
    expect(deque.isEmpty()).toBe(false);
    deque.pushLast(2);
    expect(deque.size).toBe(2);
    deque.pushLast(3);
    expect(deque.isEmpty()).toBe(false);
    deque.pushLast(2);
    expect(deque.isEmpty()).toBe(false);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });

  test("clear", () => {
    deque.pushLast(1);
    deque.pushLast(2);
    expect(deque.size).toBe(2);
    expect(deque.isEmpty()).toBe(false);
    deque.clear();
    expect(deque.size).toBe(0);
    expect(deque.isEmpty()).toBe(true);
  });
});
