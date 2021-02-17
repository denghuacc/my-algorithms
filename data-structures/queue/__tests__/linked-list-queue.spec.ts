import LinkedListQueue from "../linked-list-queue";

describe("LinkedListQueue", () => {
  let queue: LinkedListQueue<number>;

  beforeEach(() => {
    queue = new LinkedListQueue();
  });

  test("enqueue", () => {
    expect(queue.toString()).toBe("");
    queue.enqueue(1);
    expect(queue.toString()).toBe("Queue: head { 1 -> undefined }");
    queue.enqueue(2);
    expect(queue.toString()).toBe("Queue: head { 1 -> 2 -> undefined }");
    queue.enqueue(3);
    expect(queue.toString()).toBe("Queue: head { 1 -> 2 -> 3 -> undefined }");
  });

  test("dequeue", () => {
    expect(queue.dequeue()).toBe(undefined);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(undefined);
  });

  test("peek", () => {
    expect(queue.peek()).toBe(undefined);
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    expect(queue.peek()).toBe(1);
    queue.dequeue();
    expect(queue.peek()).toBe(2);
    queue.dequeue();
    expect(queue.peek()).toBe(3);
    queue.dequeue();
    expect(queue.peek()).toBe(undefined);
  });

  test("size", () => {
    expect(queue.size).toBe(0);
    queue.enqueue(1);
    expect(queue.size).toBe(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
    queue.enqueue(3);
    expect(queue.size).toBe(3);
    queue.dequeue();
    expect(queue.size).toBe(2);
    queue.clear();
    expect(queue.size).toBe(0);
  });

  test("isEmpty", () => {
    expect(queue.isEmpty()).toBe(true);
    queue.enqueue(1);
    expect(queue.isEmpty()).toBe(false);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
    queue.enqueue(3);
    expect(queue.isEmpty()).toBe(false);
    queue.enqueue(2);
    expect(queue.isEmpty()).toBe(false);
    queue.clear();
    expect(queue.isEmpty()).toBe(true);
  });

  test("clear", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.size).toBe(2);
    expect(queue.isEmpty()).toBe(false);
    queue.clear();
    expect(queue.size).toBe(0);
    expect(queue.isEmpty()).toBe(true);
  });
});
