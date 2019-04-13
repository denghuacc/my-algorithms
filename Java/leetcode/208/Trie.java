// https://leetcode-cn.com/problems/implement-trie-prefix-tree/
// leetcode 208. 实现 Trie (前缀树) pass

import java.util.TreeMap;

/**
 * Trie 字典树、前缀数
 */
public class Trie {
  private class Node {
    public boolean isWord;
    public TreeMap<Character, Node> next;

    public Node(boolean isWord) {
      this.isWord = isWord;
      this.next = new TreeMap<>();
    }

    public Node() {
      this(false);
    }
  }

  private Node root;
  private int size;

  public Trie() {
    root = new Node();
    size = 0;
  }

  public int getSize() {
    return size;
  }

  public void insert(String word) {
    Node cur = root;

    for (int i = 0; i < word.length(); i++) {
      char c = word.charAt(i);

      if (cur.next.get(c) == null) {
        cur.next.put(c, new Node());
      }

      cur = cur.next.get(c);
    }

    if (!cur.isWord) {
      cur.isWord = true;
      size++;
    }
  }

  public boolean search(String word) {
    Node cur = root;

    for (int i = 0; i < word.length(); i++) {
      char c = word.charAt(i);

      if (cur.next.get(c) == null) {
        return false;
      }

      cur = cur.next.get(c);
    }

    return cur.isWord;
  }

  public boolean startsWith(String word) {
    Node cur = root;

    for (int i = 0; i < word.length(); i++) {
      char c = word.charAt(i);

      if (cur.next.get(c) == null) {
        return false;
      }

      cur = cur.next.get(c);
    }

    return true;
  }
}