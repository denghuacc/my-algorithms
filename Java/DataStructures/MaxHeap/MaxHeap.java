import java.util.Random;

/**
 * MaxHeap 使用动态数组实现最大堆
 */
public class MaxHeap<E extends Comparable<E>> {

  private Array<E> data;

  public MaxHeap(int capacity) {
    data = new Array<>(capacity);
  }

  public MaxHeap() {
    data = new Array<>();
  }

  // 将数组转换成堆
  public MaxHeap(E[] arr) {
    data = new Array<>(arr);

    // 从最后一个非叶子节点开始转换
    for (int i = parent(arr.length - 1); i >= 0; i--) {
      siftDown(i);
    }
  }

  // 返回堆中的元素个数
  public int size() {
    return data.getSize();
  }

  // 返回一个布尔值, 表示堆中是否为空
  public boolean isEmpty() {
    return data.isEmpty();
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
  public int parent(int index) {
    if (index == 0) {
      throw new IllegalArgumentException("index-0 doesn't have parent.");
    }
    return (index - 1) / 2;
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
  public int leftChild(int index) {
    return index * 2 + 1;
  }

  // 返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
  public int rightChild(int index) {
    return index * 2 + 2;
  }

  // 向堆中添加元素
  public void add(E e) {
    data.addLast(e);
    siftUp(data.getSize() - 1);
  }

  private void siftUp(int k) {
    // 父节点比子节点小时，交换节点位置
    while (k > 0 && data.get(parent(k)).compareTo(data.get(k)) < 0) {
      data.swap(k, parent(k));
      k = parent(k);
    }
  }

  // 查找堆中最大元素
  public E findMax() {
    if (data.getSize() == 0) {
      throw new IllegalArgumentException("Can not findMax when heap is empty");
    }

    return data.get(0);
  }

  // 取出堆中最大元素
  public E extractMax() {
    E ret = findMax();

    data.swap(0, size() - 1);
    data.removeLast();
    siftDown(0);

    return ret;
  }

  private void siftDown(int k) {
    // 左子节点索引和节点数相等或者大时终止循环
    while (leftChild(k) < size()) {
      int j = leftChild(k);

      // 存在右节点，且右节点比左节点大时
      if (j + 1 < size() && data.get(j + 1).compareTo(data.get(j)) > 0) {
        j = rightChild(k); // 此时，j 为左子节点和右子节点中的最大值
      }

      // 子节点的最大值和父节点作比较
      if (data.get(k).compareTo(data.get(j)) >= 0) {
        break;
      }

      data.swap(k, j); // 交换位置
      k = j; // 继续往下
    }
  }

  // 取出堆中的最大值，并且替换成元素 e
  public E replace(E e) {
    E ret = findMax();
    data.set(0, e);
    siftDown(0);
    return ret;
  }

  public static void main(String[] args) {
    int n = 1000000;

    MaxHeap<Integer> maxHeap = new MaxHeap<>();

    Random random = new Random();

    for (int i = 0; i < n; i++) {
      maxHeap.add(random.nextInt(Integer.MAX_VALUE));
    }

    int[] arr = new int[n];

    for (int i = 0; i < n; i++) {
      arr[i] = maxHeap.extractMax();
    }

    for (int i = 1; i < n; i++) {
      if (arr[i - 1] < arr[i]) {
        throw new IllegalArgumentException("Error");
      }
    }

    System.out.println("Test MaxHeap completed.");
  }
}