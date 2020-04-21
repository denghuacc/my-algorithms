import RedBlackTree from '../red-black-tree'
let rbt: RedBlackTree<Number, string>

describe('RedBlackTree', () => {
  beforeEach(() => {
    rbt = new RedBlackTree()
    rbt.add(23, '23')
    rbt.add(45, '45')
    rbt.add(16, '16')
    rbt.add(7, '7')
    rbt.add(88, '88')
  })

  test('size', () => {
    expect(rbt.size()).toBe(5)
    rbt.add(17, '17')
    expect(rbt.size()).toBe(6)
    rbt.remove(45)
    rbt.remove(16)
    expect(rbt.size()).toBe(4)
  })

  test('isEmpty', () => {
    expect(rbt.isEmpty()).toBe(false)
    rbt.remove(23)
    rbt.remove(45)
    rbt.remove(16)
    rbt.remove(7)
    rbt.remove(88)
    expect(rbt.isEmpty()).toBe(true)
    rbt.add(28, '28')
    expect(rbt.isEmpty()).toBe(false)
  })

  test('contains', () => {
    expect(rbt.contains(23)).toBe(true)
    expect(rbt.contains(45)).toBe(true)
    rbt.remove(23)
    expect(rbt.isEmpty()).toBe(false)
    expect(rbt.contains(45)).toBe(true)
  })

  test('preOrder', () => {
    const arr: Array<number> = []
    rbt.preOrder(arr)
    expect(arr).toEqual([23, 16, 7, 88, 45])
  })

  test('inOrder', () => {
    const arr: Array<number> = []
    rbt.inOrder(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('postOrder', () => {
    const arr: Array<number> = []
    rbt.postOrder(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('levelOrder', () => {
    const arr: Array<number> = []
    rbt.levelOrder(arr)
    expect(arr).toEqual([23, 16, 88, 7, 45])
  })

  test('minimum', () => {
    expect(rbt.minimum()).toBe(7)
    rbt.remove(7)
    expect(rbt.minimum()).toBe(16)
    rbt.add(11, '11')
    expect(rbt.minimum()).toBe(11)
  })

  test('maximum', () => {
    expect(rbt.maximum()).toBe(88)
    rbt.remove(88)
    expect(rbt.maximum()).toBe(45)
    rbt.add(55, '55')
    expect(rbt.maximum()).toBe(55)
  })

  test('removeMin', () => {
    expect(rbt.minimum()).toBe(7)
    rbt.removeMin()
    expect(rbt.minimum()).toBe(16)
    rbt.removeMin()
    expect(rbt.minimum()).toBe(23)
  })

  test('removeMax', () => {
    expect(rbt.maximum()).toBe(88)
    rbt.removeMax()
    expect(rbt.maximum()).toBe(45)
    rbt.removeMax()
    expect(rbt.maximum()).toBe(23)
  })

  test('isBST', () => {
    expect(rbt.isBST()).toBe(true)
  })
})
