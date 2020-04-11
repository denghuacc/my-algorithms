const BST = require('./BST')
let bst

describe('BST', () => {
  beforeEach(() => {
    bst = new BST()
    bst.add(23)
    bst.add(45)
    bst.add(16)
    bst.add(7)
    bst.add(88)
  })

  test('getSize', () => {
    expect(bst.getSize()).toBe(5)
    bst.add(17)
    expect(bst.getSize()).toBe(6)
    bst.remove(45)
    bst.remove(16)
    expect(bst.getSize()).toBe(4)
  })

  test('isEmpty', () => {
    expect(bst.isEmpty()).toBe(false)
    bst.remove(23)
    bst.remove(45)
    bst.remove(16)
    bst.remove(7)
    bst.remove(88)
    expect(bst.isEmpty()).toBe(true)
    bst.add(28)
    expect(bst.isEmpty()).toBe(false)
  })

  test('contains', () => {
    expect(bst.contains(23)).toBe(true)
    expect(bst.contains(45)).toBe(true)
    bst.remove(23)
    expect(bst.isEmpty(23)).toBe(false)
    expect(bst.contains(45)).toBe(true)
  })

  test('preOrder', () => {
    let arr = []
    bst.preOrder(arr)
    expect(arr).toEqual([23, 16, 7, 45, 88])
  })

  test('preOrderNR', () => {
    let arr = []
    bst.preOrderNR(arr)
    expect(arr).toEqual([23, 16, 7, 45, 88])
  })

  test('inOrder', () => {
    let arr = []
    bst.inOrder(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('postOrder', () => {
    let arr = []
    bst.postOrder(arr)
    expect(arr).toEqual([7, 16, 88, 45, 23])
  })

  test('levelOrder', () => {
    let arr = []
    bst.levelOrder(arr)
    expect(arr).toEqual([23, 16, 45, 7, 88])
  })

  test('minimum', () => {
    expect(bst.minimum()).toBe(7)
    bst.remove(7)
    expect(bst.minimum()).toBe(16)
    bst.add(11)
    expect(bst.minimum()).toBe(11)
  })

  test('maximum', () => {
    expect(bst.maximum()).toBe(88)
    bst.remove(88)
    expect(bst.maximum()).toBe(45)
    bst.add(55)
    expect(bst.maximum()).toBe(55)
  })

  test('removeMin', () => {
    expect(bst.minimum()).toBe(7)
    bst.removeMin()
    expect(bst.minimum()).toBe(16)
    bst.removeMin()
    expect(bst.minimum()).toBe(23)
  })

  test('removeMax', () => {
    expect(bst.maximum()).toBe(88)
    bst.removeMax()
    expect(bst.maximum()).toBe(45)
    bst.removeMax()
    expect(bst.maximum()).toBe(23)
  })
})
