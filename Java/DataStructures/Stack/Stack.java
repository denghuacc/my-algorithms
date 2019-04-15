/**
 * Stack 接口
 * 
 * @param <E>
 */
public interface Stack<E> {
  int getSize();

  boolean isEmpty();

  void push(E e);

  E pop();

  E peek();
}