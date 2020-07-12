/*
 * @lc app=leetcode.cn id=138 lang=typescript
 *
 * [138] 复制带随机指针的链表
 *
 * https://leetcode-cn.com/problems/copy-list-with-random-pointer/description/
 *
 * algorithms
 * Medium (23.93%)
 * Likes:    253
 * Dislikes: 0
 * Total Accepted:    28.1K
 * Total Submissions: 56.2K
 * Testcase Example:  '[[7,null],[13,0],[11,4],[10,2],[1,0]]'
 *
 * 给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。
 *
 * 要求返回这个链表的 深拷贝。
 *
 * 我们用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
 *
 *
 * val：一个表示 Node.val 的整数。
 * random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：head = [[1,1],[2,1]]
 * 输出：[[1,1],[2,1]]
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：head = [[3,null],[3,0],[3,null]]
 * 输出：[[3,null],[3,0],[3,null]]
 *
 *
 * 示例 4：
 *
 * 输入：head = []
 * 输出：[]
 * 解释：给定的链表为空（空指针），因此返回 null。
 *
 *
 *
 *
 * 提示：
 *
 *
 * -10000 <= Node.val <= 10000
 * Node.random 为空（null）或指向链表中的节点。
 * 节点数目不超过 1000 。
 *
 *
 */

export {};

class Node {
  val: number;
  next: Node | null;
  random: Node | null;
  constructor(val?: number, next?: Node | null, random?: Node | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

// @lc code=start
// ! hash table Compile Error
var copyRandomList = function (head: Node | null): Node | null {
  if (!head) return null;
  const map: Map<Node, Node> = new Map();

  let oldNode = head;
  let newNode = new Node(oldNode.val);
  map.set(oldNode, newNode);

  while (oldNode) {
    newNode.random = getClonedNode(oldNode.random!);
    newNode.next = getClonedNode(oldNode.next!);

    oldNode = oldNode.next!;
    newNode = newNode.next!;
  }

  return map.get(head) || null;

  function getClonedNode(node: Node | null): Node | null {
    if (node) {
      if (map.has(node)) {
        return map.get(node)!;
      } else {
        map.set(node, new Node(node.val));
        return map.get(node)!;
      }
    }
    return null;
  }
};

// ! iterative Compile Error
var copyRandomList = function (head: Node | null): Node | null {
  if (!head) return null;

  let ptr = head;
  while (ptr) {
    let newNode = new Node(ptr.val);
    newNode.next = ptr.next;
    ptr.next = newNode;
    ptr = newNode.next!;
  }

  ptr = head;

  while (ptr) {
    ptr.next!.random = ptr.random ? ptr.random.next : null;
    ptr = ptr.next!.next!;
  }

  let ptrOldList = head;
  let ptrNewList = head.next!;
  let OldHead = head.next;
  while (ptrOldList) {
    ptrOldList.next = ptrOldList.next!.next;
    ptrNewList.next = ptrNewList.next ? ptrNewList.next.next : null;
    ptrOldList = ptrOldList.next!;
    ptrNewList = ptrNewList.next!;
  }

  return OldHead;
};
// @lc code=end
