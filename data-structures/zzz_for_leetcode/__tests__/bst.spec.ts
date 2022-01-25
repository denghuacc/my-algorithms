import BST from "../bst";
let bst: BST<number>;

describe("BST", () => {
  beforeEach(() => {
    bst = new BST();
    [23, 45, 16, 7, 88].forEach((val) => bst.add(val));
  });

  test("size", () => {
    expect(bst.size).toBe(5);
    bst.add(17);
    expect(bst.size).toBe(6);
    bst.remove(45);
    bst.remove(16);
    expect(bst.size).toBe(4);
  });

  test("isEmpty", () => {
    expect(bst.isEmpty()).toBe(false);
    bst.remove(7);
    bst.remove(23);
    bst.remove(45);
    bst.remove(16);
    bst.remove(88);
    expect(bst.isEmpty()).toBe(true);
    bst.add(28);
    expect(bst.isEmpty()).toBe(false);
  });

  test("contains", () => {
    expect(bst.contains(23)).toBe(true);
    expect(bst.contains(45)).toBe(true);
    bst.remove(23);
    expect(bst.isEmpty()).toBe(false);
    expect(bst.contains(45)).toBe(true);
  });

  test("inOrder", () => {
    const arr: number[] = [];
    bst.inOrder(arr);
    expect(arr).toEqual([7, 16, 23, 45, 88]);
  });

  test("min", () => {
    expect(bst.min()).toBe(7);
    bst.remove(7);
    expect(bst.min()).toBe(16);
    bst.add(11);
    expect(bst.min()).toBe(11);
    bst = new BST();
    expect(bst.min()).toBe(undefined);
  });

  test("max", () => {
    expect(bst.max()).toBe(88);
    bst.remove(88);
    expect(bst.max()).toBe(45);
    bst.add(55);
    expect(bst.max()).toBe(55);
    bst = new BST();
    expect(bst.max()).toBe(undefined);
  });

  test("removeMin", () => {
    expect(bst.removeMin()).toBe(7);
    expect(bst.removeMin()).toBe(16);
    expect(bst.removeMin()).toBe(23);
    bst = new BST();
    expect(bst.removeMin()).toBe(undefined);
  });

  test("removeMax", () => {
    expect(bst.removeMax()).toBe(88);
    expect(bst.removeMax()).toBe(45);
    expect(bst.removeMax()).toBe(23);
    bst = new BST();
    expect(bst.removeMax()).toBe(undefined);
  });

  test("toArray", () => {
    expect(bst.toArray()).toEqual([7, 16, 23, 45, 88]);
    bst.remove(45);
    expect(bst.toArray()).toEqual([7, 16, 23, 88]);
  });
});
