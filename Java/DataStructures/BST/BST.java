import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

/**
 * 二分搜索树 天然的递归结构，查询高效
 * 
 * @param <E>
 */
public class BST<E extends Comparable<E>> {

	private class Node {
		public E e;
		public Node left, right;

		public Node(E e) {
			this.e = e;
			left = null;
			right = null;
		}
	}

	private Node root;
	private int size;

	public BST() {
		root = null;
		size = 0;
	}

	// 节点个数
	public int size() {
		return size;
	}

	// 是否为空
	public boolean isEmpty() {
		return size == 0;
	}

	// 向二分搜索树中添加新的元素 e
	public void add(E e) {
		// if (root = null) {
		// root = new Node(e);
		// size++;
		// } else {
		// add(root, e)
		// }

		root = add(root, e);
	}

	// 向以 node 为根的二分搜索树中插入元素 e，递归算法
	// 返回插入新节点后二分搜索树的根
	private Node add(Node node, E e) {

		// 递归终止条件
		// if (e.equals(node.e)) {
		// return;
		// } else if (e.compareTo(node.e) < 0 && node.lefe == null) {
		// node.left = new Node(e);
		// size++;
		// return;
		// } else if (e.compareTo(node.e) < 0 && node.right == null) {
		// node.right = new Node(e);
		// size++;
		// return;
		// }

		// 递归
		// if (e.compareTo(node.e) < 0) {
		// add(node.left, e);
		// } else {
		// add(node.right, e);
		// }

		// 递归终止条件。节点的左孩子或者有孩子为空时插入。
		if (node == null) {
			size++;
			return new Node(e);
		}

		// 递归
		if (e.compareTo(node.e) < 0) {
			node.left = add(node.left, e);
		} else if (e.compareTo(node.e) > 0) {
			node.right = add(node.right, e);
		}

		return node; // 返回根节点
	}

	// 查询是否包含元素 e
	public boolean contains(E e) {
		return contains(root, e);
	}

	// 查询以 node为根的二分搜索树中是否包含元素 e, 递归算法
	private boolean contains(Node node, E e) {
		if (node == null) {
			return false;
		}

		if (e.compareTo(node.e) == 0) {
			return true;
		} else if (e.compareTo(node.e) < 0) {
			return contains(node.left, e);
		} else {
			return contains(node.right, e);
		}
	}

	// 前序遍历 => 深度优先遍历
	public void preOrder() {
		preOrder(root);
	}

	// 前序遍历以 node 为根的二分搜索树, 递归算法
	private void preOrder(Node node) {
		// 递归终止条件
		if (node == null) {
			return;
		}

		System.out.println(node.e);
		preOrder(node.left);
		preOrder(node.right);
	}

	// 非递归前序遍历；使用栈 => 深度优先遍历
	public void preOrderNR() {
		Stack<Node> stack = new Stack<>();
		stack.push(root); // 根节点入栈

		while (!stack.isEmpty()) {
			Node curNode = stack.pop(); // 出栈
			System.out.println(curNode.e);
			if (curNode.right != null) {
				stack.push(curNode.right); // 先压 right 入栈
			}
			if (curNode.left != null) {
				stack.push(curNode.left);
			}
		}
	}

	// 中序遍历
	public void inOrder() {
		inOrder(root);
	}

	// 中序遍历以 node 为根的二分搜索树, 递归算法
	private void inOrder(Node node) {
		if (node == null) {
			return;
		}

		inOrder(node.left);
		System.out.println(node.e);
		inOrder(node.right);
	}

	// 后序遍历
	public void postOrder() {
		postOrder(root);
	}

	// 后序遍历以 node 为根的二分搜索树, 递归算法
	private void postOrder(Node node) {
		if (node == null) {
			return;
		}

		postOrder(node.left);
		postOrder(node.right);
		System.out.println(node.e);
	}

	// 层序遍历 => 广度优先遍历 => 使用队列
	public void levelOrder() {
		Queue<Node> queue = new LinkedList<>(); // 使用链表实例化
		queue.add(root); // 根节点入队列

		while (!queue.isEmpty()) {
			Node curNode = queue.remove(); // 出队列
			System.out.println(curNode.e);

			if (curNode.left != null) {
				queue.add(curNode.left); // left 先入队列
			}
			if (curNode.right != null) {
				queue.add(curNode.right);
			}
		}
	}

	// 寻找二分搜索树的最小元素
	public E minimum() {
		if (size == 0) {
			throw new IllegalArgumentException("BST is empty");
		}

		Node minNode = minimum(root);
		return minNode.e;
	}

	// 返回以 node 为根的二分搜索树的最小值所在的节点
	private Node minimum(Node node) {
		if (node.left == null) { // 从左子树中去找
			return node;
		}

		return minimum(node.left);
	}

	// 寻找二分搜索树的最大元素
	public E maximum() {
		if (size == 0) {
			throw new IllegalArgumentException("BST is empty");
		}

		Node maxNode = maximum(root);
		return maxNode.e;
	}

	// 返回以 node 为根的二分搜索树的最大值所在的节点
	private Node maximum(Node node) {
		if (node.right == null) { // 从右子树中去找
			return node;
		}

		return maximum(node.right);
	}

	// 从二分搜索树中删除最小值所在节点, 返回最小值
	public E removeMin() {
		E ret = minimum();
		root = removeMin(root);
		return ret;
	}

	// 删除掉以 node 为根的二分搜索树中的最小节点
	// 返回删除节点后新的二分搜索树的根
	private Node removeMin(Node node) {
		if (node.left == null) {
			Node rightNode = node.right; // 存储右子树
			node.right = null;
			size--;
			return rightNode; // 返回右子树
		}

		node.left = removeMin(node.left); // 最小节点右子树替换掉它
		return node; // 返回根节点
	}

	// 从二分搜索树中删除最大值所在节点, 返回最大值
	public E removeMax() {
		E ret = maximum();
		root = removeMax(root);
		return ret;
	}

	// 删除掉以 node 为根的二分搜索树中的最大节点
	// 返回删除节点后新的二分搜索树的根
	private Node removeMax(Node node) {
		if (node.right == null) {
			Node leftNode = node.left;
			node.left = null;
			size--;
			return leftNode;
		}

		node.right = removeMax(node.right);
		return node;
	}

	// 从二分搜索树中删除元素为 e 的节点
	public void remove(E e) {
		root = remove(root, e);
	}

	// 删除掉以node为根的二分搜索树中值为e的节点, 递归算法
	// 返回删除节点后新的二分搜索树的根
	private Node remove(Node node, E e) {
		if (node == null) {
			return null;
		}

		if (e.compareTo(node.e) < 0) {
			node.left = remove(node.left, e);
			return node;
		} else if (e.compareTo(node.e) > 0) {
			node.right = remove(node.right, e);
			return node;
		} else {

			// 待删除节点左子树为空的情况
			if (node.left == null) {
				Node rightNode = node.right;
				node.right = null;
				size--;
				return rightNode;
			}

			// 待删除节点右子树为空的情况
			if (node.right == null) {
				Node leftNode = node.left;
				node.left = null;
				size--;
				return leftNode;
			}

			// 待删除节点左右子树均不为空的情况

			// 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
			// 用这个节点顶替待删除节点的位置
			Node successor = minimum(node.right);
			successor.right = removeMin(node.right);
			successor.left = node.left;
			node.left = node.right = null;
			return successor;
		}

	}

	@Override
	public String toString() {
		StringBuilder res = new StringBuilder();
		generateBSTString(root, 0, res);
		return res.toString();
	}

	// 生成以 node 为根节点，深度为 depth 的描述二叉树的字符串
	private void generateBSTString(Node node, int depth, StringBuilder res) {
		if (node == null) {
			res.append(generateDepthString(depth) + "null\n");
			return;
		}

		res.append(generateDepthString(depth) + node.e + "\n");
		generateBSTString(node.left, depth + 1, res);
		generateBSTString(node.right, depth + 1, res);
	}

	private String generateDepthString(int depth) {
		StringBuilder res = new StringBuilder();
		for (int i = 0; i < depth; i++) {
			res.append("--");
		}
		return res.toString();
	}
}