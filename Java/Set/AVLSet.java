/**
 * AVLSet 使用 AVLTree 实现 Set
 */
public class AVLSet<E extends Comparable<E>> implements Set<E> {

  private AVLTree<E, Object> avl;

  public AVLSet() {
    avl = new AVLTree<>();
  }

  @Override
  public void add(E e) {
    avl.add(e, null); // value 使用 null 代替
  }

  @Override
  public void remove(E e) {
    avl.remove(e);
  }

  @Override
  public boolean contains(E e) {
    return avl.contains(e);
  }

  @Override
  public int getSize() {
    return avl.getSize();
  }

  @Override
  public boolean isEmpty() {
    return avl.isEmpty();
  }
}