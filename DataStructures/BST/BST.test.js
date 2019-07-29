const BST = require('./BST')

// 实例化
let bst = new BST()

// 插入数据
bst.add(23)
bst.add(45)
bst.add(16)
bst.add(37)
bst.add(3)
bst.add(99)
bst.add(22)

// 中序遍历
console.log('InOrder Traverse:')
bst.inOrder()

console.log('----------')

// 先序遍历
console.log('PreOrder Traverse:')
bst.preOrder()

// 非递归先序遍历
console.log('PreOrder Traverse Not Recursion:')
bst.preOrderNR()

console.log('----------')

// 后序遍历
console.log('PostOrder Traverse:')
bst.postOrder()

console.log('----------')

// 层序遍历
console.log('LevelOrder Traverse:')
bst.levelOrder()

console.log('----------')

// 节点个数

console.log('Size:', bst.getSize())

// 查找最小值
console.log('Minimum:', bst.minimum())

// 查找最大值
console.log('Maximum:', bst.maximum())

// 查找指定值
console.log('Is Contains 23', bst.contains(23))

// 删除指定值
bst.remove(37)
console.log('After Remove 37')
bst.inOrder()
console.log('Size:', bst.getSize())
