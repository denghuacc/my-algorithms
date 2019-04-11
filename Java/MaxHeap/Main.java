import java.util.Random;

public class Main {

  public static double testHeap(Integer[] testData, boolean isHeapity) {

    long startTime = System.nanoTime();

    MaxHeap<Integer> maxHeap;

    if (isHeapity) {
      maxHeap = new MaxHeap<>(testData); // 通过一个数组转行成堆
    } else {
      maxHeap = new MaxHeap<>();
      for (int num : testData) {
        maxHeap.add(num); // 通添加一个个元素转换成堆
      }
    }

    int[] arr = new int[testData.length];

    for (int i = 0; i < testData.length; i++) {
      arr[i] = maxHeap.extractMax();
    }

    for (int i = 1; i < testData.length; i++) {
      if (arr[i - 1] < arr[i]) {
        throw new IllegalArgumentException("Error");
      }
    }
    System.out.println("Test MaxHeap completed.");

    long endTime = System.nanoTime();

    return (endTime - startTime) / 1000000000.0;
  }

  public static void main(String[] args) {
    int n = 10000000;

    Random random = new Random();

    Integer[] testData = new Integer[n];

    for (int i = 0; i < n; i++) {
      testData[i] = random.nextInt(Integer.MAX_VALUE);
    }

    double time1 = testHeap(testData, false);
    System.out.println("Without heapity: " + time1 + " s");

    double time2 = testHeap(testData, true);
    System.out.println("With heapity: " + time2 + " s");
  }
}