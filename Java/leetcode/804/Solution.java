import java.util.TreeSet;

class Solution {
	public static int uniqueMorseRepresentations(String[] words) {

		String[] codes = { ".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.",
				"---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.." };

		TreeSet<String> set = new TreeSet<>();

		for (String word : words) {
			StringBuilder res = new StringBuilder();

			for (int i = 0; i < word.length(); i++) {
				res.append(codes[word.charAt(i) - 'a']);
			}

			set.add(res.toString());
		}

		return set.size();
	}

	public static void main(String[] args) {
		String[] words = { "gin", "zen", "gig", "msg" };

		int size = uniqueMorseRepresentations(words);

		System.out.println(size);
	}
}