/*
 * @lc app=leetcode.cn id=297 lang=typescript
 *
 * [297] 二叉树的序列化与反序列化
 *
 * https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/description/
 *
 * algorithms
 * Hard (54.11%)
 * Likes:    508
 * Dislikes: 0
 * Total Accepted:    71.5K
 * Total Submissions: 132.1K
 * Testcase Example:  '[1,2,3,null,null,4,5]'
 *
 *
 * 序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。
 *
 * 请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 /
 * 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。
 *
 * 提示: 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode
 * 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3,null,null,4,5]
 * 输出：[1,2,3,null,null,4,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = []
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1]
 * 输出：[1]
 *
 *
 * 示例 4：
 *
 *
 * 输入：root = [1,2]
 * 输出：[1,2]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中结点数在范围 [0, 10^4] 内
 * -1000
 *
 *
 */

export {};

//  Definition for a binary tree node.
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

/**
 * 序列化：将二叉树编码为字符串
 *
 * 算法思路：
 * 1. 使用层序遍历（BFS）遍历二叉树
 * 2. 将每个节点的值（或null）转换为字符串并用逗号分隔
 * 3. null节点也要保存，以便正确恢复树结构
 * 4. 返回完整的序列化字符串
 *
 * 选择层序遍历的原因：
 * - 便于按层次结构重建树
 * - 序列化和反序列化逻辑一致
 * - 易于理解和实现
 */
function serialize(root: TreeNode | null): string {
  if (!root) return ""; // 空树返回空字符串

  let result = "";
  const queue: (TreeNode | null)[] = [root];

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    if (currentNode) {
      // 非空节点：记录值并将左右子节点入队
      result += `${currentNode.val},`;
      queue.push(currentNode.left);
      queue.push(currentNode.right);
    } else {
      // 空节点：记录null标记
      result += "null,";
    }
  }

  // 移除末尾的逗号
  return result.slice(0, -1);
}

/**
 * 反序列化：将字符串解码为二叉树
 *
 * 算法思路：
 * 1. 将字符串按逗号分割为节点值数组
 * 2. 使用队列逐层重建树结构
 * 3. 对每个非空节点，从数组中取出左右子节点的值
 * 4. 继续处理新创建的非空节点
 *
 * 关键步骤：
 * - 首先创建根节点
 * - 使用队列保存待处理的父节点
 * - 为每个父节点分配左右子节点
 */
function deserialize(data: string): TreeNode | null {
  if (!data.length) return null; // 空字符串返回null

  const nodeValues = data.split(",");
  const root = new TreeNode(Number(nodeValues[0]));
  nodeValues.shift(); // 移除根节点值

  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const parentNode = queue.shift()!;

    // 处理左子节点
    const leftValue = nodeValues.shift()!;
    if (leftValue !== "null") {
      parentNode.left = new TreeNode(Number(leftValue));
      queue.push(parentNode.left);
    }

    // 处理右子节点
    const rightValue = nodeValues.shift();
    if (rightValue !== "null") {
      parentNode.right = new TreeNode(Number(rightValue));
      queue.push(parentNode.right);
    }
  }

  return root;
}

/**
 * 使用示例：
 * const serialized = serialize(root);
 * const deserialized = deserialize(serialized);
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将二叉树转换为字符串表示
   - 能够从字符串完全恢复原始树结构
   - 处理任意形状的二叉树（包括空节点）

2. 算法选择：
   - 层序遍历（BFS）：最直观，符合数组表示
   - 前序遍历（DFS）：递归实现，代码简洁
   - 中序遍历：不适用（无法唯一确定树结构）
   - 后序遍历：可行但较复杂

3. 层序遍历实现：
   - 序列化：使用队列进行BFS，记录所有节点（包括null）
   - 反序列化：按层次顺序重建，使用队列管理父节点
   - 格式："1,2,3,null,null,4,5"

4. 数据格式设计：
   - 使用逗号分隔节点值
   - 空节点用"null"表示
   - 保持与LeetCode标准格式兼容

5. 时间空间复杂度：
   - 序列化：O(n)时间，O(n)空间（队列和结果字符串）
   - 反序列化：O(n)时间，O(n)空间（队列和新树）
   - 整体：线性复杂度，最优

6. 关键实现细节：
   - 队列类型：序列化时可包含null，反序列化时只含TreeNode
   - 边界处理：空树的特殊情况
   - 字符串处理：正确的分割和类型转换

7. 替代方案 - 前序遍历：
   ```typescript
   // 序列化（前序DFS）
   function serializeDFS(root: TreeNode | null): string {
     if (!root) return "null";
     return `${root.val},${serializeDFS(root.left)},${serializeDFS(root.right)}`;
   }
   
   // 反序列化（前序DFS）
   function deserializeDFS(data: string): TreeNode | null {
     const values = data.split(",");
     let index = 0;
     
     function buildTree(): TreeNode | null {
       if (values[index] === "null") {
         index++;
         return null;
       }
       const node = new TreeNode(Number(values[index++]));
       node.left = buildTree();
       node.right = buildTree();
       return node;
     }
     
     return buildTree();
   }
   ```

8. 应用场景：
   - 二叉树的持久化存储
   - 网络传输中的树结构
   - 缓存系统中的数据结构
   - 分布式系统中的状态同步

9. 测试用例：
   - 空树：[] -> ""
   - 单节点：[1] -> "1"
   - 完全二叉树：[1,2,3,4,5] -> "1,2,3,4,5,null,null"
   - 不平衡树：[1,2,null,3] -> "1,2,null,3,null"
*/
