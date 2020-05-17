import BSTSet from "../binary-search-tree-set";
let set: BSTSet<number>;

describe("BSTSet", () => {
  beforeEach(() => {
    set = new BSTSet();
  });

  test("size", () => {
    expect(set.size).toBe(0);
    set.add(1);
    expect(set.size).toBe(1);
    set.add(2);
    expect(set.size).toBe(2);
    set.add(2);
    expect(set.size).toBe(2);
    set.delete(2);
    expect(set.size).toBe(1);
    set.clear();
    expect(set.size).toBe(0);
  });

  test("add", () => {
    expect(set.size).toBe(0);
    expect(set.has(1)).toBe(false);
    set.add(1);
    expect(set.size).toBe(1);
    expect(set.has(1)).toBe(true);
    set.add(2);
    expect(set.size).toBe(2);
    expect(set.has(2)).toBe(true);
    set.add(2);
    expect(set.size).toBe(2);
    const newSet = set.add(3);
    expect(newSet.size).toBe(3);
  });

  test("delete", () => {
    expect(set.size).toBe(0);
    set.add(1);
    set.add(2);
    expect(set.size).toBe(2);
    expect(set.has(1)).toBe(true);
    set.delete(1);
    expect(set.size).toBe(1);
    expect(set.has(1)).toBe(false);
    expect(set.delete(2)).toBe(true);
    expect(set.size).toBe(0);
    expect(set.delete(3)).toBe(false);
  });

  test("has", () => {
    expect(set.has(1)).toBe(false);
    set.add(1);
    expect(set.has(1)).toBe(true);
    set.delete(1);
    expect(set.has(1)).toBe(false);
  });

  test("clear", () => {
    expect(set.has(1)).toBe(false);
    set.add(1);
    set.add(2);
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
    set.clear();
    expect(set.has(1)).toBe(false);
    expect(set.has(2)).toBe(false);
  });
});
