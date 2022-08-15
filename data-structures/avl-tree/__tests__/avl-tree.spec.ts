import AVLTree from "../avl-tree";
let avl: AVLTree<number>;

describe("AVLTree", () => {
  beforeEach(() => {
    avl = new AVLTree();
    avl.add(23);
    avl.add(45);
    avl.add(16);
    avl.add(7);
    avl.add(88);
  });

  test("size", () => {
    expect(avl.size).toBe(5);
    avl.add(17);
    expect(avl.size).toBe(6);
    avl.remove(45);
    avl.remove(16);
    expect(avl.size).toBe(4);
  });

  test("isEmpty", () => {
    expect(avl.isEmpty()).toBe(false);
    avl.remove(23);
    avl.remove(45);
    avl.remove(16);
    avl.remove(7);
    avl.remove(88);
    expect(avl.isEmpty()).toBe(true);
    avl.add(28);
    expect(avl.isEmpty()).toBe(false);
  });

  test("contains", () => {
    expect(avl.contains(23)).toBe(true);
    expect(avl.contains(45)).toBe(true);
    avl.remove(23);
    expect(avl.isEmpty()).toBe(false);
    expect(avl.contains(45)).toBe(true);
  });

  test("preOrder", () => {
    const arr: Array<number> = [];
    avl.preOrder(arr);
    expect(arr).toEqual([23, 16, 7, 45, 88]);
  });

  test("inOrder", () => {
    const arr: Array<number> = [];
    avl.inOrder(arr);
    expect(arr).toEqual([7, 16, 23, 45, 88]);
  });

  test("postOrder", () => {
    const arr: Array<number> = [];
    avl.postOrder(arr);
    expect(arr).toEqual([7, 16, 23, 45, 88]);
  });

  test("levelOrder", () => {
    const arr: Array<number> = [];
    avl.levelOrder(arr);
    expect(arr).toEqual([23, 16, 45, 7, 88]);
  });

  test("min", () => {
    expect(avl.min()).toBe(7);
    avl.remove(7);
    expect(avl.min()).toBe(16);
    avl.add(11);
    expect(avl.min()).toBe(11);
    avl = new AVLTree();
    expect(avl.min()).toBe(undefined);
  });

  test("max", () => {
    expect(avl.max()).toBe(88);
    avl.remove(88);
    expect(avl.max()).toBe(45);
    avl.add(55);
    expect(avl.max()).toBe(55);
    avl = new AVLTree();
    expect(avl.max()).toBe(undefined);
  });

  test("removeMin", () => {
    expect(avl.removeMin()).toBe(7);
    expect(avl.removeMin()).toBe(16);
    expect(avl.removeMin()).toBe(23);
    avl = new AVLTree();
    // expect(avl.removeMin()).toBe(undefined)
  });

  test("removeMax", () => {
    expect(avl.removeMax()).toBe(88);
    expect(avl.removeMax()).toBe(45);
    expect(avl.removeMax()).toBe(23);
    avl = new AVLTree();
    // expect(avl.removeMax()).toBe(undefined)
  });

  test("isBST", () => {
    expect(avl.isBST()).toBe(true);
  });

  test("isBalanced", () => {
    expect(avl.isBalanced()).toBe(true);
    avl.add(90);
    avl.add(91);
    avl.add(92);
    avl.add(93);
    expect(avl.isBalanced()).toBe(true);
  });
});
