import Trie from "../trie";

describe("Trie", () => {
  let trie: Trie<string, string>;

  beforeEach(() => {
    trie = new Trie();
  });

  test("size", () => {
    expect(trie.size).toBe(0);
    trie.add("cat");
    expect(trie.size).toBe(1);
    trie.add("dog");
    expect(trie.size).toBe(2);
    trie.add("deer");
    expect(trie.size).toBe(3);
    trie.add("dog");
    expect(trie.size).toBe(3);
    trie.add("do");
    expect(trie.size).toBe(4);
  });

  test("add", () => {
    expect(trie.size).toBe(0);
    expect(trie.contains("cat")).toBe(false);
    trie.add("cat");
    expect(trie.size).toBe(1);
    expect(trie.contains("cat")).toBe(true);
    trie.add("dog");
    expect(trie.size).toBe(2);
    expect(trie.contains("dog")).toBe(true);
  });

  test("contains", () => {
    expect(trie.size).toBe(0);
    expect(trie.contains("cat")).toBe(false);
    trie.add("cat");
    expect(trie.size).toBe(1);
    expect(trie.contains("cat")).toBe(true);
    expect(trie.contains("ca")).toBe(false);
    expect(trie.contains("c")).toBe(false);
  });

  test("isPrefix", () => {
    trie.add("cat");
    expect(trie.contains("cat")).toBe(true);
    expect(trie.isPrefix("cat")).toBe(true);
    expect(trie.isPrefix("ca")).toBe(true);
    expect(trie.isPrefix("c")).toBe(true);
  });
});
