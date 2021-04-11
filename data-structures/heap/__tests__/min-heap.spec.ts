import MinHeap from "../min-heap";

describe("MinHeap", () => {
  let minHeap: MinHeap<number>;

  beforeEach(() => {
    minHeap = new MinHeap([23, 16, 45, 7, 88]);
  });

  test("size", () => {
    expect(minHeap.size).toBe(5);
    minHeap.add(66);
    expect(minHeap.size).toBe(6);
    minHeap.add(99);
    expect(minHeap.size).toBe(7);
    minHeap.extractMin();
    expect(minHeap.size).toBe(6);
  });

  test("isEmpty", () => {
    expect(minHeap.isEmpty()).toBe(false);
    minHeap = new MinHeap();
    expect(minHeap.isEmpty()).toBe(true);
    minHeap.add(66);
    expect(minHeap.isEmpty()).toBe(false);
  });

  test("add", () => {
    expect(minHeap.size).toBe(5);
    expect(minHeap.findMin()).toBe(7);
    minHeap.add(5);
    expect(minHeap.size).toBe(6);
    expect(minHeap.findMin()).toBe(5);
    minHeap.add(1);
    expect(minHeap.size).toBe(7);
    expect(minHeap.findMin()).toBe(1);
  });

  test("findMin", () => {
    expect(minHeap.findMin()).toBe(7);
    minHeap.add(5);
    expect(minHeap.findMin()).toBe(5);
    minHeap.add(3);
    expect(minHeap.findMin()).toBe(3);
    minHeap.extractMin();
    expect(minHeap.findMin()).toBe(5);
    minHeap.extractMin();
    expect(minHeap.findMin()).toBe(7);
  });

  test("extractMin", () => {
    expect(minHeap.size).toBe(5);
    expect(minHeap.extractMin()).toBe(7);
    expect(minHeap.size).toBe(4);
    expect(minHeap.extractMin()).toBe(16);
    expect(minHeap.size).toBe(3);
    minHeap.add(12);
    expect(minHeap.size).toBe(4);
    expect(minHeap.extractMin()).toBe(12);
  });

  test("replace", () => {
    expect(minHeap.size).toBe(5);
    expect(minHeap.replace(5)).toBe(7);
    expect(minHeap.size).toBe(5);
    expect(minHeap.findMin()).toBe(5);
    expect(minHeap.replace(3)).toBe(5);
    expect(minHeap.findMin()).toBe(3);
  });
});
