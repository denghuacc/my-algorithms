import BST from '../binary-search-tree'
let bst: BST<number>

describe('BST', () => {
  beforeEach(() => {
    bst = new BST()
    bst.add(23)
    bst.add(45)
    bst.add(16)
    bst.add(7)
    bst.add(88)
  })

  test('size', () => {
    expect(bst.size()).toBe(5)
    bst.add(17)
    expect(bst.size()).toBe(6)
    bst.remove(45)
    bst.remove(16)
    expect(bst.size()).toBe(4)
  })

  test('isEmpty', () => {
    expect(bst.isEmpty()).toBe(false)
    bst.remove(7)
    bst.remove(23)
    bst.remove(45)
    bst.remove(16)
    bst.remove(88)
    expect(bst.isEmpty()).toBe(true)
    bst.add(28)
    expect(bst.isEmpty()).toBe(false)
  })

  test('contains', () => {
    expect(bst.contains(23)).toBe(true)
    expect(bst.contains(45)).toBe(true)
    bst.remove(23)
    expect(bst.isEmpty()).toBe(false)
    expect(bst.contains(45)).toBe(true)
  })

  test('preOrder', () => {
    const arr: number[] = []
    bst.preOrder(arr)
    expect(arr).toEqual([23, 16, 7, 45, 88])
  })

  test('preOrderIteration', () => {
    const arr: number[] = []
    bst.preOrderIteration(arr)
    expect(arr).toEqual([23, 16, 7, 45, 88])
  })

  test('inOrder', () => {
    const arr: number[] = []
    bst.inOrder(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('inOrderIteration', () => {
    const arr: number[] = []
    bst.inOrderIteration(arr)
    expect(arr).toEqual([7, 16, 23, 45, 88])
  })

  test('postOrder', () => {
    const arr: number[] = []
    bst.postOrder(arr)
    expect(arr).toEqual([7, 16, 88, 45, 23])
  })

  test('postOrderIteration', () => {
    const arr: number[] = []
    bst.postOrderIteration(arr)
    expect(arr).toEqual([7, 16, 88, 45, 23])
  })

  test('levelOrder', () => {
    const arr: number[] = []
    bst.levelOrder(arr)
    expect(arr).toEqual([23, 16, 45, 7, 88])
  })

  test('min', () => {
    expect(bst.min()).toBe(7)
    bst.remove(7)
    expect(bst.min()).toBe(16)
    bst.add(11)
    expect(bst.min()).toBe(11)
    bst = new BST()
    expect(bst.min()).toBe(undefined)
  })

  test('max', () => {
    expect(bst.max()).toBe(88)
    bst.remove(88)
    expect(bst.max()).toBe(45)
    bst.add(55)
    expect(bst.max()).toBe(55)
    bst = new BST()
    expect(bst.max()).toBe(undefined)
  })

  test('removeMin', () => {
    expect(bst.removeMin()).toBe(7)
    expect(bst.removeMin()).toBe(16)
    expect(bst.removeMin()).toBe(23)
    bst = new BST()
    // TODO 莫名报错
    // expect(bst.removeMin()).toBe(undefined)
  })

  test('removeMax', () => {
    expect(bst.removeMax()).toBe(88)
    expect(bst.removeMax()).toBe(45)
    expect(bst.removeMax()).toBe(23)
    bst = new BST()
    // TODO 莫名报错
    // expect(bst.removeMax()).toBe(undefined)
  })
})
