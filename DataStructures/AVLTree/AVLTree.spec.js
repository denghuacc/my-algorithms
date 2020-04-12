const AVLTree = require('./AVLTree')
let avl

describe('AVLTree', () => {
  beforeEach(() => {
    avl = new AVLTree()
    avl.add(23, '23')
    avl.add(45, '45')
    avl.add(16, '16')
    avl.add(7, '7')
    avl.add(88, '88')
  })

  test('getSize', () => {
    expect(avl.getSize()).toBe(5)
    avl.add(17)
    expect(avl.getSize()).toBe(6)
    avl.remove(45)
    avl.remove(16)
    expect(avl.getSize()).toBe(4)
  })

  test('isEmpty', () => {
    expect(avl.isEmpty()).toBe(false)
    avl.remove(23)
    avl.remove(45)
    avl.remove(16)
    avl.remove(7)
    avl.remove(88)
    expect(avl.isEmpty()).toBe(true)
    avl.add(28)
    expect(avl.isEmpty()).toBe(false)
  })

  test('contains', () => {
    expect(avl.contains(23)).toBe(true)
    expect(avl.contains(45)).toBe(true)
    avl.remove(23)
    expect(avl.isEmpty(23)).toBe(false)
    expect(avl.contains(45)).toBe(true)
  })

  test('preOrder', () => {
    let arr = []
    avl.preOrder(arr)
    expect(arr).toEqual([23, 16, 7, 45, 88])
  })

  test('preOrderNR', () => {
    let arr = []
    avl.preOrderNR(arr)
    expect(arr).toEqual([23, 16, 7, 45, 88])
  })

  test('inOrder', () => {
    let arr = []
    avl.inOrder(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('postOrder', () => {
    let arr = []
    avl.postOrder(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('levelOrder', () => {
    let arr = []
    avl.levelOrder(arr)
    expect(arr).toEqual([23, 16, 45, 7, 88])
  })

  test('minimum', () => {
    expect(avl.minimum()).toBe(7)
    avl.remove(7)
    expect(avl.minimum()).toBe(16)
    avl.add(11)
    expect(avl.minimum()).toBe(11)
  })

  test('maximum', () => {
    expect(avl.maximum()).toBe(88)
    avl.remove(88)
    expect(avl.maximum()).toBe(45)
    avl.add(55)
    expect(avl.maximum()).toBe(55)
  })

  test('removeMin', () => {
    expect(avl.minimum()).toBe(7)
    avl.removeMin()
    expect(avl.minimum()).toBe(16)
    avl.removeMin()
    expect(avl.minimum()).toBe(23)
  })

  test('removeMax', () => {
    expect(avl.maximum()).toBe(88)
    avl.removeMax()
    expect(avl.maximum()).toBe(45)
    avl.removeMax()
    expect(avl.maximum()).toBe(23)
  })

  test('isBST', () => {
    expect(avl.isBST()).toBe(true)
  })

  test('isBalanced', () => {
    expect(avl.isBalanced()).toBe(true)
    avl.add(90, '90')
    avl.add(91, '91')
    avl.add(92, '92')
    avl.add(93, '94')
    expect(avl.isBalanced()).toBe(true)
  })
})
