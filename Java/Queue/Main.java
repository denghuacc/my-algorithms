import java.util.Random;

/**
 * Main
 */
public class Main {

  // 测试队列的时间复杂度方法
  // ArrayQueue 出列时间复杂度为 O(n)
  // LoopQueue 出列时间复杂度为 O(1)
  // LinkedListQueue 出列时间复杂度为 O(1)
  // ArrayQueue 和其他 2 个队列为不同级别的时间复杂度，差异巨大
  private static double testQueue(Queue<Integer> queue, int opCount) {
    long startTime = System.nanoTime();

    Random random = new Random();

    for (int i = 0; i < opCount; i++) {
      queue.enqueue(random.nextInt(Integer.MAX_VALUE)); // 入列
    }

    for (int i = 0; i < opCount; i++) {
      queue.dequeue(); // 出列
    }

    long endTime = System.nanoTime();
    return (endTime - startTime) / 1000000000.0;
  }

  public static void main(String[] args) {

    // int opCount = 100000; // 10 万级别数目
    int opCount = 10000000; // 1000 万级别数目，注释 ArrayQueue， 只比较 LoopQueue 和 LinkedListQueue

    // ArrayQueue<Integer> arrayQueue = new ArrayQueue<>();
    // double time1 = testQueue(arrayQueue, opCount);
    // System.out.println("ArrayQueue, time: " + time1 + " s");

    LoopQueue<Integer> loopQueue = new LoopQueue<>();
    double time2 = testQueue(loopQueue, opCount);
    System.out.println("LoopQueue, time: " + time2 + " s");

    LinkedListQueue<Integer> linkedListQueue = new LinkedListQueue<>();
    double time3 = testQueue(linkedListQueue, opCount);
    System.out.println("linkedListQueue, time: " + time3 + " s");
  }
}