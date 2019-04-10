import java.util.ArrayList;

public class Main {

	// 测试集合的时间复杂度方法
	// 这两个集合的增、删、查的时间复杂度都是一致的
	// 只测试其中一种操作即可，这里测试 add 增加元素
	private static double testSet(Set<String> set, String filename) {
		long startTime = System.nanoTime();

		System.out.println(filename);
		ArrayList<String> words = new ArrayList<>();
		if (FileOperation.readFile("pride-and-prejudice.txt", words)) {

			System.out.println("Total words: " + words.size());

			for (String word : words) {
				set.add(word);
			}
			System.out.println("Total different words: " + set.getSize());
		}

		long endTime = System.nanoTime();

		return (endTime - startTime) / 1000000000.0;
	}

	public static void main(String[] args) {

		// BSTSet 的时间复杂度为 O(h) h是树的高度(层级) O(log2(n))
		// LinkedListSet 的时间复杂度为 O(n)
		// 指的都是在一般情况下
		String filename = "pride-and-prejudice.txt";

		BSTSet<String> bstSet = new BSTSet<>();
		double time1 = testSet(bstSet, filename);
		System.out.println("BST Set: " + time1 + " s");

		System.out.println();

		LinkedListSet<String> linkedListSet = new LinkedListSet<>();
		double time2 = testSet(linkedListSet, filename);
		System.out.println("LinkedList Set: " + time2 + " s");
	}
}