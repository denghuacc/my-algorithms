import MaxHeap from '../max-heap'
let maxHeap: MaxHeap<number>

describe('MaxHeap', () => {
  beforeEach(() => {
    maxHeap = new MaxHeap([23, 16, 45, 7, 88])
  })

  test('size', () => {
    expect(maxHeap.size()).toBe(5)
    maxHeap.add(66)
    expect(maxHeap.size()).toBe(6)
    maxHeap.add(99)
    expect(maxHeap.size()).toBe(7)
  })

  test('isEmpty', () => {
    expect(maxHeap.isEmpty()).toBe(false)
    maxHeap = new MaxHeap()
    expect(maxHeap.isEmpty()).toBe(true)
  })

  test('parent', () => {
    expect(maxHeap.parent(4)).toBe(1)
    expect(maxHeap.parent(5)).toBe(2)
  })

  test('leftChild', () => {
    expect(maxHeap.leftChild(1)).toBe(3)
    expect(maxHeap.leftChild(2)).toBe(5)
  })

  test('rightChild', () => {
    expect(maxHeap.rightChild(1)).toBe(4)
    expect(maxHeap.rightChild(2)).toBe(6)
  })

  test('add and findMax', () => {
    expect(maxHeap.size()).toBe(5)
    expect(maxHeap.findMax()).toBe(88)
    maxHeap.add(90)
    expect(maxHeap.size()).toBe(6)
    expect(maxHeap.findMax()).toBe(90)
    maxHeap.add(95)
    expect(maxHeap.size()).toBe(7)
    expect(maxHeap.findMax()).toBe(95)
  })

  test('extractMax', () => {
    expect(maxHeap.size()).toBe(5)
    expect(maxHeap.extractMax()).toBe(88)
    expect(maxHeap.size()).toBe(4)
    expect(maxHeap.extractMax()).toBe(45)
    expect(maxHeap.size()).toBe(3)
    maxHeap.add(90)
    expect(maxHeap.size()).toBe(4)
    expect(maxHeap.extractMax()).toBe(90)
  })

  test('replace', () => {
    expect(maxHeap.size()).toBe(5)
    expect(maxHeap.replace(77)).toBe(88)
    expect(maxHeap.size()).toBe(5)
    expect(maxHeap.findMax()).toBe(77)
    expect(maxHeap.replace(33)).toBe(77)
    expect(maxHeap.findMax()).toBe(45)
  })
})
