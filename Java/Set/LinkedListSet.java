import java.util.ArrayList;

/**
 * LinkedListSet 使用链表实现集合
 */
public class LinkedListSet<E> implements Set<E> {

  private LinkedList<E> list;

  public LinkedListSet() {
    list = new LinkedList<>();
  }

  @Override
  public int getSize() {
    return list.getSize();
  }

  @Override
  public boolean isEmpty() {
    return list.isEmpty();
  }

  @Override
  public boolean contains(E e) {
    return list.contains(e);
  }

  @Override
  public void add(E e) {
    // 添加元素需要判断是否已存在
    if (!list.contains(e)) {
      list.addFirst(e);
    }
  }

  @Override
  public void remove(E e) {
    list.removeElement(e);
  }

  public static void main(String[] args) {

    // 测试 LinkedListSet
    System.out.println("Pride and Prejudice");
    ArrayList<String> words1 = new ArrayList<>();
    if (FileOperation.readFile("pride-and-prejudice.txt", words1)) {

      System.out.println("Total words: " + words1.size());

      LinkedListSet<String> set1 = new LinkedListSet<>();
      for (String word : words1) {
        set1.add(word);
      }
      System.out.println("Total different words: " + set1.getSize());
    }

    System.out.println();

    System.out.println("A Tale of Two Cities");
    ArrayList<String> words2 = new ArrayList<>();
    if (FileOperation.readFile("a-tale-of-two-cities.txt", words2)) {

      System.out.println("Total words: " + words2.size());

      LinkedListSet<String> set2 = new LinkedListSet<>();
      for (String word : words2) {
        set2.add(word);
      }
      System.out.println("Total different words: " + set2.getSize());
    }
  }

}