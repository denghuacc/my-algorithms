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
console.log('inOrderTraverse:')
bst.inOrder()

console.log('----------')

// 先序遍历
console.log('preOrderTraverse:')
bst.preOrder()

console.log('----------')

// 后序遍历
console.log('postOrderTraverse:')
bst.postOrder()

console.log('----------')

// 节点个数

console.log('size:', bst.getSize())

// 查找最小值
console.log('minimum:', bst.minimum())

// 查找最大值
console.log('maximum:', bst.maximum())

// 查找指定值
console.log('is contains 23', bst.contains(23))

// 删除指定值
bst.remove(37)
console.log('after remove 37')
bst.inOrder()
console.log('size:', bst.getSize())
