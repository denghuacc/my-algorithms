import java.util.Random;

public class Main {

  // 测试栈的时间复杂度方法
  // 时间复杂度都为 O(1)，差异不大
  private static double testStack(Stack<Integer> stack, int opCount) {
    long startTime = System.nanoTime();

    Random random = new Random();

    for (int i = 0; i < opCount; i++) {
      stack.push(random.nextInt(Integer.MAX_VALUE)); // 入栈
    }

    for (int i = 0; i < opCount; i++) {
      stack.pop(); // 出栈
    }

    long endTime = System.nanoTime();
    return (endTime - startTime) / 1000000000.0;
  }

  public static void main(String[] args) {

    // int opCount = 100000; // 10 万级别数目 time1 > time2
    int opCount = 10000000; // 1000 万级别数目 time1 < time2

    ArrayStack<Integer> arrayStack = new ArrayStack<>();
    double time1 = testStack(arrayStack, opCount);
    System.out.println("arrayStack, time: " + time1 + " s");
    // ArrayStack 有时需要扩容

    LinkedListStack<Integer> linkedListStack = new LinkedListStack<>();
    double time2 = testStack(linkedListStack, opCount);
    System.out.println("linkedListStack, time: " + time2 + " s");

    // 其实这个时间比较复杂，因为 LinkedListStack 包含更多的 new 操作
  }
}