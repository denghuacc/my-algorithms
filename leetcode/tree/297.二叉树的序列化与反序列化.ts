/*
 * @lc app=leetcode.cn id=297 lang=typescript
 *
 * [297] 二叉树的序列化与反序列化
 *
 * https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/description/
 *
 * algorithms
 * Hard (35.25%)
 * Likes:    177
 * Dislikes: 0
 * Total Accepted:    21K
 * Total Submissions: 45.1K
 * Testcase Example:  '[1,2,3,null,null,4,5]'
 *
 *
 * 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
 *
 * 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 /
 * 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 *
 * 示例:
 *
 * 你可以将以下二叉树：
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * ⁠    / \
 * ⁠   4   5
 *
 * 序列化为 "[1,2,3,null,null,4,5]"
 *
 * 提示: 这与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode
 * 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。
 *
 * 说明: 不要使用类的成员 / 全局 / 静态变量来存储状态，你的序列化和反序列化算法应该是无状态的。
 *
 */

export {};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// @lc code=start
var serialize = function (root: TreeNode | null): string {
  let ret = "";
  if (!root) return ret;

  const queue: Array<TreeNode | null> = [root];
  while (queue.length) {
    const front = queue.shift()!;
    if (front) {
      ret += `${front.val},`;
      queue.push(front.left);
      queue.push(front.right);
    } else {
      ret += "null,";
    }
  }

  ret = ret.substring(0, ret.length - 1); // 去最后一个逗号
  return ret;
};

var deserialize = function (data: string): TreeNode | null {
  if (!data.length) return null;

  const nodes: string[] = data.split(",");
  const root = new TreeNode(Number(nodes[0]));
  nodes.shift();

  const queue: Array<TreeNode | null> = [root];
  while (queue.length) {
    const node = queue.shift();
    const leftVal = nodes.shift()!;
    if (leftVal !== "null") {
      node!.left = new TreeNode(Number(leftVal));
      queue.push(node!.left);
    }
    const rightVal = nodes.shift();
    if (rightVal !== "null") {
      node!.right = new TreeNode(Number(rightVal));
      queue.push(node!.right);
    }
  }

  return root;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// @lc code=end
