import ObjectDeque from "../object-deque";

describe("ObjectDeque", () => {
  let deque: ObjectDeque<number>;

  beforeEach(() => {
    deque = new ObjectDeque();
  });

  test("addFront", () => {
    expect(deque.toString()).toBe("");
    deque.addFront(1);
    expect(deque.toString()).toBe("Deque { 1 }");
    deque.addFront(2);
    expect(deque.toString()).toBe("Deque { 2, 1 }");
    deque.addFront(3);
    expect(deque.toString()).toBe("Deque { 3, 2, 1 }");
  });

  test("addBack", () => {
    expect(deque.toString()).toBe("");
    deque.addBack(1);
    expect(deque.toString()).toBe("Deque { 1 }");
    deque.addBack(2);
    expect(deque.toString()).toBe("Deque { 1, 2 }");
    deque.addBack(3);
    expect(deque.toString()).toBe("Deque { 1, 2, 3 }");
  });

  test("removeFront", () => {
    expect(deque.removeFront()).toBe(undefined);
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    expect(deque.removeFront()).toBe(1);
    expect(deque.removeFront()).toBe(2);
    expect(deque.removeFront()).toBe(3);
    expect(deque.removeFront()).toBe(undefined);
  });

  test("removeBack", () => {
    expect(deque.removeFront()).toBe(undefined);
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    expect(deque.removeBack()).toBe(3);
    expect(deque.removeBack()).toBe(2);
    expect(deque.removeBack()).toBe(1);
    expect(deque.removeBack()).toBe(undefined);
  });

  test("peekFront", () => {
    expect(deque.peekFront()).toBe(undefined);
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    expect(deque.peekFront()).toBe(1);
    deque.removeFront();
    expect(deque.peekFront()).toBe(2);
    deque.removeFront();
    expect(deque.peekFront()).toBe(3);
    deque.removeFront();
    expect(deque.peekFront()).toBe(undefined);
  });

  test("peekFront", () => {
    expect(deque.peekBack()).toBe(undefined);
    deque.addBack(1);
    deque.addBack(2);
    deque.addBack(3);
    expect(deque.peekBack()).toBe(3);
    deque.removeBack();
    expect(deque.peekBack()).toBe(2);
    deque.removeBack();
    expect(deque.peekBack()).toBe(1);
    deque.removeBack();
    expect(deque.peekBack()).toBe(undefined);
  });

  test("size", () => {
    expect(deque.size).toBe(0);
    deque.addBack(1);
    expect(deque.size).toBe(1);
    deque.addBack(2);
    expect(deque.size).toBe(2);
    deque.addBack(3);
    expect(deque.size).toBe(3);
    deque.removeFront();
    expect(deque.size).toBe(2);
    deque.clear();
    expect(deque.size).toBe(0);
  });

  test("isEmpty", () => {
    expect(deque.isEmpty()).toBe(true);
    deque.addBack(1);
    expect(deque.isEmpty()).toBe(false);
    deque.addBack(2);
    expect(deque.size).toBe(2);
    deque.addBack(3);
    expect(deque.isEmpty()).toBe(false);
    deque.addBack(2);
    expect(deque.isEmpty()).toBe(false);
    deque.clear();
    expect(deque.isEmpty()).toBe(true);
  });

  test("clear", () => {
    deque.addBack(1);
    deque.addBack(2);
    expect(deque.size).toBe(2);
    expect(deque.isEmpty()).toBe(false);
    deque.clear();
    expect(deque.size).toBe(0);
    expect(deque.isEmpty()).toBe(true);
  });
});
