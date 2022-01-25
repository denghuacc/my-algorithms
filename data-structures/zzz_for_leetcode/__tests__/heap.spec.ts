import Heap from "../heap";

describe("minHeap", () => {
  let minHeap: Heap<number>;

  beforeEach(() => {
    minHeap = new Heap<number>((a, b) => a - b < 0);
    [23, 16, 45, 7, 88].forEach((val) => minHeap.push(val));
  });

  test("size", () => {
    expect(minHeap.size).toBe(5);
    minHeap.push(66);
    expect(minHeap.size).toBe(6);
    minHeap.push(99);
    expect(minHeap.size).toBe(7);
    minHeap.pop();
    expect(minHeap.size).toBe(6);
  });

  test("isEmpty", () => {
    expect(minHeap.isEmpty()).toBe(false);
    minHeap = new Heap((a, b) => a - b < 0);
    expect(minHeap.isEmpty()).toBe(true);
    minHeap.push(66);
    expect(minHeap.isEmpty()).toBe(false);
  });

  test("push", () => {
    expect(minHeap.size).toBe(5);
    expect(minHeap.peek()).toBe(7);
    minHeap.push(5);
    expect(minHeap.size).toBe(6);
    expect(minHeap.peek()).toBe(5);
    minHeap.push(1);
    expect(minHeap.size).toBe(7);
    expect(minHeap.peek()).toBe(1);
  });

  test("peek", () => {
    expect(minHeap.peek()).toBe(7);
    minHeap.push(5);
    expect(minHeap.peek()).toBe(5);
    minHeap.push(3);
    expect(minHeap.peek()).toBe(3);
    minHeap.pop();
    expect(minHeap.peek()).toBe(5);
    minHeap.pop();
    expect(minHeap.peek()).toBe(7);
  });

  test("pop", () => {
    expect(minHeap.size).toBe(5);
    expect(minHeap.pop()).toBe(7);
    expect(minHeap.size).toBe(4);
    expect(minHeap.pop()).toBe(16);
    expect(minHeap.size).toBe(3);
    minHeap.push(12);
    expect(minHeap.size).toBe(4);
    expect(minHeap.pop()).toBe(12);
  });
});

describe("MaxHeap", () => {
  let maxHeap: Heap<number>;

  beforeEach(() => {
    maxHeap = new Heap((a, b) => b - a < 0);
    [23, 16, 45, 7, 88].forEach((val) => maxHeap.push(val));
  });

  test("size", () => {
    expect(maxHeap.size).toBe(5);
    maxHeap.push(66);
    expect(maxHeap.size).toBe(6);
    maxHeap.push(99);
    expect(maxHeap.size).toBe(7);
    maxHeap.pop();
    expect(maxHeap.size).toBe(6);
  });

  test("isEmpty", () => {
    expect(maxHeap.isEmpty()).toBe(false);
    maxHeap = new Heap((a, b) => b - a < 0);
    expect(maxHeap.isEmpty()).toBe(true);
    maxHeap.push(66);
    expect(maxHeap.isEmpty()).toBe(false);
  });

  test("push", () => {
    expect(maxHeap.size).toBe(5);
    expect(maxHeap.peek()).toBe(88);
    maxHeap.push(90);
    expect(maxHeap.size).toBe(6);
    expect(maxHeap.peek()).toBe(90);
    maxHeap.push(95);
    expect(maxHeap.size).toBe(7);
    expect(maxHeap.peek()).toBe(95);
  });

  test("peek", () => {
    expect(maxHeap.peek()).toBe(88);
    maxHeap.push(90);
    expect(maxHeap.peek()).toBe(90);
    maxHeap.push(95);
    expect(maxHeap.peek()).toBe(95);
    maxHeap.pop();
    expect(maxHeap.peek()).toBe(90);
    maxHeap.pop();
    expect(maxHeap.peek()).toBe(88);
  });

  test("pop", () => {
    expect(maxHeap.size).toBe(5);
    expect(maxHeap.pop()).toBe(88);
    expect(maxHeap.size).toBe(4);
    expect(maxHeap.pop()).toBe(45);
    expect(maxHeap.size).toBe(3);
    maxHeap.push(90);
    expect(maxHeap.size).toBe(4);
    expect(maxHeap.pop()).toBe(90);
  });
});
