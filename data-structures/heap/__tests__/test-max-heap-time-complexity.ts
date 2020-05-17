import MaxHeap from "../max-heap";

function testMaxHeap(testData: Array<number>, isHeapify: boolean) {
  const label = isHeapify ? "with heapify" : "without heapify";

  console.time(label);
  let maxHeap: MaxHeap<number>;

  if (isHeapify) {
    maxHeap = new MaxHeap(testData); // 把数组一次性放入堆中
  } else {
    maxHeap = new MaxHeap();
    testData.forEach((item) => maxHeap.add(item)); // 把数组的元素一个一个依次放入堆中
  }

  let arr = [];

  for (let i = 0; i < n; i++) {
    arr[i] = maxHeap.extractMax();
  }

  for (let i = 1; i < n; i++) {
    if (arr[i - 1] < arr[i]) {
      throw new Error("error");
    }
  }

  console.timeEnd(label);
}

// test
const n = 2000000;
let testData = [];
for (let i = 0; i < n; i++) {
  testData.push(
    Math.min(Math.floor(Math.random() * n), Number.MAX_SAFE_INTEGER)
  );
}

testMaxHeap(testData, false);
testMaxHeap(testData, true);

// 结论：
// 把数组一次性放入堆中，一般性能会更好，只从最后一个非叶子节点开始下沉直到根节点
// 把数组的元素一个一个依次放入堆中，每一个元素都要从叶子节点开始上浮，性能较差
