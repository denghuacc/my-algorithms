import java.util.ArrayList;

public class AVLTree<K extends Comparable<K>, V> {

  private class Node {
    public K key;
    public V value;
    public Node left, right;
    public int height;

    public Node(K key, V value) {
      this.key = key;
      this.value = value;
      left = null;
      right = null;
      height = 1;
    }
  }

  private Node root;
  private int size;

  public AVLTree() {
    root = null;
    size = 0;
  }

  public int getSize() {
    return size;
  }

  public boolean isEmpty() {
    return size == 0;
  }

  // 判断该二叉树是否是一棵 AVL 树
  public boolean isBST() {
    ArrayList<K> keys = new ArrayList<>();
    inOrder(root, keys);
    for (int i = 1; i < keys.size(); i++) {
      if (keys.get(i - 1).compareTo(keys.get(i)) > 0) {
        return false;
      }
    }
    return true;
  }

  private void inOrder(Node node, ArrayList<K> keys) {
    if (node == null) {
      return;
    }

    inOrder(node.left, keys);
    keys.add(node.key);
    inOrder(node.right, keys);
  }

  // 判断该二叉树是否是一棵平衡二叉树
  public boolean isBalanced() {
    return isBalanced(root);
  }

  // 判断以 Node 为根的二叉树是否是一棵平衡二叉树，递归算法
  private boolean isBalanced(Node node) {
    if (node == null) {
      return true;
    }
    int balanceFactor = getBalanceFactor(node); // 平衡因子
    if (Math.abs(balanceFactor) > 1) {
      return false;
    }
		
		// 只有节点的左右子树都是平衡二叉树， 它才是平衡二叉树
    return isBalanced(node.left) && isBalanced(node.right);
  }

  // 获取节点 node 的高度
  private int getHeight(Node node) {
    if (node == null) {
      return 0;
    }
    return node.height;
  }

  // 获取节点 node 的平衡因子 左子树高度减去右子树高度的值
  private int getBalanceFactor(Node node) {
    if (node == null) {
      return 0;
    }
    return getHeight(node.left) - getHeight(node.right);
  }

  // 对节点 y 进行向右旋转操作，返回旋转后新的根节点 x
  //        y                              x
  //       / \                           /   \
  //      x   T4     向右旋转 (y)        z     y
  //     / \       - - - - - - - ->    / \   / \
  //    z   T3                       T1  T2 T3 T4
  //   / \
  // T1   T2
  private Node rightRotate(Node y) {
    Node x = y.left;
    Node T3 = x.right;

    // 向右旋转过程
    x.right = y;
    y.left = T3;

    // 更新 height
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

    return x;
  }

  // 对节点 y 进行向左旋转操作，返回旋转后新的根节点 x 
  //    y                             x
  //  /  \                          /   \
  // T1   x      向左旋转 (y)       y     z
  //     / \   - - - - - - - ->   / \   / \
  //   T2  z                     T1 T2 T3 T4
  //      / \
  //     T3 T4  
  private Node leftRotate(Node y) {
    Node x = y.right;
    Node T2 = x.left;

    // 向左旋转过程
    x.left = y;
    y.right = T2;

    // 更新 height
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

    return x;
  }

  // 向 AVL 树中添加新的元素 (key, value)
  public void add(K key, V value) {
    root = add(root, key, value);
  }

  // 向以 node 为根的 AVL 树中插入元素 (key, value)，递归算法
  // 返回插入新节点后 AVL 树的根
  private Node add(Node node, K key, V value) {

    if (node == null) {
      size++;
      return new Node(key, value);
    }

    if (key.compareTo(node.key) < 0) {
      node.left = add(node.left, key, value);
    } else if (key.compareTo(node.key) > 0) {
      node.right = add(node.right, key, value);
    } else { // key.compareTo(node.key) == 0
      node.value = value;
    }
		
		// 添加元素后需要维护树的平衡
    // 更新 height
    node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

    // 计算平衡因子
    int balanceFactor = getBalanceFactor(node);
    // if (Math.abs(balanceFactor) > 1) {
    //   System.out.println("unbalanced : " + balanceFactor);
    // }

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
      return rightRotate(node);
    }

    // RR 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
      return leftRotate(node);
    }

    //       y                            y                         z
    //     /  \                         /  \                      /   \
    //    x    T4   向左旋转 (x)        z    T4   向右旋转 (y)      x     y
    //  /  \       - - - - - - ->    / \        - - - - - - ->  / \   / \
    // T1   z                       x  T3                      T1 T2 T3 T4
    //     / \                     / \
    //    T2 T3                   T1 T2
    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }

    //    y                         y                            z
    //  /  \                      /  \                         /   \
    // T1   x     向右旋转 (x)    T1    z       向左旋转 (y)     y     x
    //     / \   - - - - - - ->      /  \    - - - - - - ->  / \   / \
    //   z    T4                    T2   x                  T1 T2 T3 T4
    //  / \                             / \
    // T2 T3                           T3 T4
    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }

    return node;
  }

  // 返回以node为根节点的 AVL 树中，key 所在的节点
  private Node getNode(Node node, K key) {

    if (node == null)
      return null;

    if (key.equals(node.key))
      return node;
    else if (key.compareTo(node.key) < 0)
      return getNode(node.left, key);
    else // if(key.compareTo(node.key) > 0)
      return getNode(node.right, key);
  }

  public boolean contains(K key) {
    return getNode(root, key) != null;
  }

  public V get(K key) {

    Node node = getNode(root, key);
    return node == null ? null : node.value;
  }

  public void set(K key, V newValue) {
    Node node = getNode(root, key);
    if (node == null)
      throw new IllegalArgumentException(key + " doesn't exist!");

    node.value = newValue;
  }

  // 返回以 node 为根的 AVL 树的最小值所在的节点
  private Node minimum(Node node) {
    if (node.left == null)
      return node;
    return minimum(node.left);
  }

  // 从 AVL 树中删除键为 key 的节点
  public V remove(K key) {

    Node node = getNode(root, key);
    if (node != null) {
      root = remove(root, key);
      return node.value;
    }
    return null;
  }

  private Node remove(Node node, K key) {

    if (node == null)
      return null;

    Node retNode; // 创建一个返回的节点
    if (key.compareTo(node.key) < 0) {
      node.left = remove(node.left, key);
      // return node;
      retNode = node;
    } else if (key.compareTo(node.key) > 0) {
      node.right = remove(node.right, key);
      // return node;
      retNode = node;
    } else { // key.compareTo(node.key) == 0

      // 待删除节点左子树为空的情况
			// 逻辑需要改为互斥 if ... else if ...else
      if (node.left == null) {
        Node rightNode = node.right;
        node.right = null;
        size--;
        // return rightNode;
        retNode = rightNode;
      }

      // 待删除节点右子树为空的情况
      else if (node.right == null) {
        Node leftNode = node.left;
        node.left = null;
        size--;
        // return leftNode;
        retNode = leftNode;
      }

      // 待删除节点左右子树均不为空的情况

      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      else {
        Node successor = minimum(node.right);
        // successor.right = removeMin(node.right);
        successor.right = remove(node.right, successor.key); // 删除代码复用会 remove 的平衡逻辑
        successor.left = node.left;

        node.left = node.right = null;

        // return successor;
        retNode = successor;
      }
    }

    // retNode 可能为空
    if (retNode == null) {
      return null;
    }

    // 删除元素后需要维护树的平衡，逻辑和添加元素一样 
    // 更新 height
    retNode.height = 1 + Math.max(getHeight(retNode.left), getHeight(retNode.right));

    // 计算平衡因子
    int balanceFactor = getBalanceFactor(retNode);

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && getBalanceFactor(retNode.left) >= 0) {
      return rightRotate(retNode);
    }

    // RR RL 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && getBalanceFactor(retNode.right) <= 0) {
      return leftRotate(retNode);
    }

    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && getBalanceFactor(retNode.left) < 0) {
      retNode.left = leftRotate(retNode.left);
      return rightRotate(retNode);
    }

    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && getBalanceFactor(retNode.right) > 0) {
      retNode.right = rightRotate(retNode.right);
      return leftRotate(retNode);
    }

    return retNode;
  }

  public static void main(String[] args) {

    System.out.println("Pride and Prejudice");

    ArrayList<String> words = new ArrayList<>();
    if (FileOperation.readFile("pride-and-prejudice.txt", words)) {
      System.out.println("Total words: " + words.size());

      AVLTree<String, Integer> map = new AVLTree<>();
      for (String word : words) {
        if (map.contains(word))
          map.set(word, map.get(word) + 1);
        else
          map.add(word, 1);
      }

      System.out.println("Total different words: " + map.getSize());
      System.out.println("Frequency of PRIDE: " + map.get("pride"));
      System.out.println("Frequency of PREJUDICE: " + map.get("prejudice"));

      System.out.println("is BST: " + map.isBST());
      System.out.println("is Balanced: " + map.isBalanced());

      // 测试删除单词后是否为 AVL 树和平衡二叉树
      for (String word : words) {
        map.remove(word);
        if (!map.isBST() || !map.isBalanced()) {
          throw new RuntimeException("Error");
        }
      }
    }

    System.out.println("Test Completed. No Error!");
  }
}
