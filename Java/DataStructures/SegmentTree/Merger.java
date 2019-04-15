/**
 * Merger 融合接口
 */
public interface Merger<E> {

  E merge(E a, E b);
}