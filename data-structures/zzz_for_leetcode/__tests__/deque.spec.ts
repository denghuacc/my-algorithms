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

  test("pushBack", () => {
    expect(deque.peekBack()).toBe(undefined);
    deque.pushBack(1);
    expect(deque.peekBack()).toBe(1);
    deque.pushBack(2);
    expect(deque.peekBack()).toBe(2);
    deque.pushBack(3);
    expect(deque.peekBack()).toBe(3);
  });

  test("popFront", () => {
    expect(deque.popFront()).toBe(undefined);
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);
    expect(deque.popFront()).toBe(1);
    expect(deque.popFront()).toBe(2);
    expect(deque.popFront()).toBe(3);
    expect(deque.popFront()).toBe(undefined);
  });

  test("popBack", () => {
    expect(deque.popFront()).toBe(undefined);
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);
    expect(deque.popBack()).toBe(3);
    expect(deque.popBack()).toBe(2);
    expect(deque.popBack()).toBe(1);
    expect(deque.popBack()).toBe(undefined);
  });

  test("peekFront", () => {
    expect(deque.peekFront()).toBe(undefined);
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);
    expect(deque.peekFront()).toBe(1);
    deque.popFront();
    expect(deque.peekFront()).toBe(2);
    deque.popFront();
    expect(deque.peekFront()).toBe(3);
    deque.popFront();
    expect(deque.peekFront()).toBe(undefined);
  });

  test("peekFront", () => {
    expect(deque.peekBack()).toBe(undefined);
    deque.pushBack(1);
    deque.pushBack(2);
    deque.pushBack(3);
    expect(deque.peekBack()).toBe(3);
    deque.popBack();
    expect(deque.peekBack()).toBe(2);
    deque.popBack();
    expect(deque.peekBack()).toBe(1);
    deque.popBack();
    expect(deque.peekBack()).toBe(undefined);
  });

  test("size", () => {
    expect(deque.size).toBe(0);
    deque.pushBack(1);
    expect(deque.size).toBe(1);
    deque.pushBack(2);
    expect(deque.size).toBe(2);
    deque.pushBack(3);
    expect(deque.size).toBe(3);
    deque.popFront();
    expect(deque.size).toBe(2);
    deque.clear();
    expect(deque.size).toBe(0);
  });

  test("isEmpty", () => {
    expect(deque.isEmpty()).toBe(true);
    deque.pushBack(1);
    expect(deque.isEmpty()).toBe(false);
    deque.pushBack(2);
    expect(deque.size).toBe(2);
    deque.pushBack(3);
    expect(deque.isEmpty()).toBe(false);
    deque.pushBack(2);
    expect(deque.isEmpty()).toBe(false);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });

  test("clear", () => {
    deque.pushBack(1);
    deque.pushBack(2);
    expect(deque.size).toBe(2);
    expect(deque.isEmpty()).toBe(false);
    deque.clear();
    expect(deque.size).toBe(0);
    expect(deque.isEmpty()).toBe(true);
  });
});
