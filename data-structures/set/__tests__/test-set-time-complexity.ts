import MapSet from "../map-set";
import ArraySet from "../array-set";
import LinkedListSet from "../linked-list-set";
import BSTSet from "../binary-search-tree-set";
import AVLSet from "../avl-tree-set";
import RBTSet from "../red-black-tree-set";

function testComplexity(name: string, set: any, testData: Array<number>) {
  const label = name;
  console.time(label);

  for (let item of testData) {
    set.add(item);
  }

  console.timeEnd(label);
}

// test
const testData = [];
const n = 20000;
for (let i = 0; i < n; i++) {
  testData.push(
    Math.min(Math.floor(Math.random() * n), Number.MAX_SAFE_INTEGER)
  );
}

const mapSet = new MapSet();
const arraySet = new ArraySet();
const linkedListSet = new LinkedListSet();
const bstSet = new BSTSet();
const avlSet = new AVLSet();
const rbtSet = new RBTSet();
const originalSet = new Set(); // ES6 原生 Set

testComplexity("MapSet", mapSet, testData);
testComplexity("ArraySet", arraySet, testData);
testComplexity("LinkedListSet", linkedListSet, testData);
testComplexity("BSTSet", bstSet, testData);
testComplexity("AVLSet", avlSet, testData);
testComplexity("RedBlackSet", rbtSet, testData);
testComplexity("OriginalSet", originalSet, testData);

// 当前测试 add 的结论：
// ES6 原生的 Set 性能最好
// 链表实现的 Set 性能最差 O(N)
// 对象和数组实现的 Set 性也很差 O(N)
// 树实现的性能很好 O(logN)，其中 BST 不用平衡二叉树，较 AVL Tree 和 Red Black Tree 性能好点
