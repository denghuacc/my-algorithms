import ObjectStack from "../object-stack";

describe("ObjectStack", () => {
  let stack: ObjectStack<number>;

  beforeEach(() => {
    stack = new ObjectStack();
  });

  test("push", () => {
    expect(stack.toString()).toBe("");
    stack.push(1);
    expect(stack.toString()).toBe("Stack { 1 }");
    stack.push(2);
    expect(stack.toString()).toBe("Stack { 1, 2 }");
    stack.push(3);
    expect(stack.toString()).toBe("Stack { 1, 2, 3 }");
  });

  test("pop", () => {
    expect(stack.pop()).toBe(undefined);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBe(undefined);
  });

  test("peep", () => {
    expect(stack.peek()).toBe(undefined);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
    stack.pop();
    expect(stack.peek()).toBe(2);
    stack.pop();
    expect(stack.peek()).toBe(1);
    stack.pop();
    expect(stack.peek()).toBe(undefined);
  });

  test("size", () => {
    expect(stack.size()).toBe(0);
    stack.push(1);
    expect(stack.size()).toBe(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    stack.push(3);
    expect(stack.size()).toBe(3);
    stack.pop();
    expect(stack.size()).toBe(2);
    stack.clear();
    expect(stack.size()).toBe(0);
  });

  test("isEmpty", () => {
    expect(stack.isEmpty()).toBe(true);
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
    stack.push(2);
    expect(stack.isEmpty()).toBe(false);
    stack.push(3);
    expect(stack.isEmpty()).toBe(false);
    stack.pop();
    expect(stack.isEmpty()).toBe(false);
    stack.clear();
    expect(stack.isEmpty()).toBe(true);
  });

  test("clear", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    expect(stack.isEmpty()).toBe(false);
    stack.clear();
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });
});
