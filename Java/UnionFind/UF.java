/**
 * UF 并查集接口
 */
public interface UF {
  int getSize();

  boolean isConnected(int p, int q);

  void unionElements(int p, int q);
}