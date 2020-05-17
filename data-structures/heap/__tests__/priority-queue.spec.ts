import PriorityQueue from "../priority-queue";

describe("PriorityQueue", () => {
  let priorityQueue: PriorityQueue<number>;

  beforeEach(() => {
    priorityQueue = new PriorityQueue();
  });

  test("enqueue", () => {
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
    expect(priorityQueue.print()).toBe("");
    priorityQueue.enqueue(1);
    expect(priorityQueue.size()).toBe(1);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 1 ]");
    priorityQueue.enqueue(5);
    expect(priorityQueue.size()).toBe(2);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 5, 1 ]");
    priorityQueue.enqueue(3);
    expect(priorityQueue.size()).toBe(3);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 5, 1, 3 ]");
  });

  test("dequeue", () => {
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
    expect(priorityQueue.dequeue()).toBe(undefined);
    expect(priorityQueue.print()).toBe("");
    priorityQueue.enqueue(1);
    priorityQueue.enqueue(5);
    priorityQueue.enqueue(3);
    expect(priorityQueue.size()).toBe(3);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 5, 1, 3 ]");
    expect(priorityQueue.dequeue()).toBe(5);
    expect(priorityQueue.size()).toBe(2);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 3, 1 ]");
    expect(priorityQueue.dequeue()).toBe(3);
    expect(priorityQueue.size()).toBe(1);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 1 ]");
    expect(priorityQueue.dequeue()).toBe(1);
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
    expect(priorityQueue.print()).toBe("");
  });

  test("peek", () => {
    expect(priorityQueue.peek()).toBe(undefined);
    expect(priorityQueue.size()).toBe(0);
    priorityQueue.enqueue(1);
    priorityQueue.enqueue(5);
    priorityQueue.enqueue(3);
    expect(priorityQueue.peek()).toBe(5);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 5, 1, 3 ]");
    priorityQueue.dequeue();
    expect(priorityQueue.peek()).toBe(3);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 3, 1 ]");
    priorityQueue.dequeue();
    expect(priorityQueue.peek()).toBe(1);
    expect(priorityQueue.print()).toBe("PriorityQueue: front [ 1 ]");
    priorityQueue.dequeue();
    expect(priorityQueue.peek()).toBe(undefined);
    expect(priorityQueue.print()).toBe("");
  });

  test("size", () => {
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
    priorityQueue.enqueue(1);
    priorityQueue.enqueue(5);
    priorityQueue.enqueue(3);
    expect(priorityQueue.size()).toBe(3);
    expect(priorityQueue.isEmpty()).toBe(false);
    priorityQueue.dequeue();
    expect(priorityQueue.size()).toBe(2);
    priorityQueue.dequeue();
    expect(priorityQueue.size()).toBe(1);
    priorityQueue.dequeue();
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
  });

  test("isEmpty", () => {
    expect(priorityQueue.isEmpty()).toBe(true);
    expect(priorityQueue.size()).toBe(0);
    priorityQueue.enqueue(1);
    priorityQueue.enqueue(5);
    priorityQueue.enqueue(3);
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.size()).toBe(3);
    priorityQueue.dequeue();
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.size()).toBe(2);
    priorityQueue.dequeue();
    expect(priorityQueue.isEmpty()).toBe(false);
    expect(priorityQueue.size()).toBe(1);
    priorityQueue.dequeue();
    expect(priorityQueue.isEmpty()).toBe(true);
    expect(priorityQueue.size()).toBe(0);
  });

  test("clear", () => {
    priorityQueue.enqueue(1);
    priorityQueue.enqueue(2);
    expect(priorityQueue.size()).toBe(2);
    expect(priorityQueue.isEmpty()).toBe(false);
    priorityQueue.clear();
    expect(priorityQueue.size()).toBe(0);
    expect(priorityQueue.isEmpty()).toBe(true);
  });
});
