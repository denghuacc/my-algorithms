const Trie = require('../trie')
let trie

describe('Trie', () => {
  beforeEach(() => {
    trie = new Trie()
  })

  test('getSize', () => {
    expect(trie.getSize()).toBe(0)
    trie.add('cat')
    expect(trie.getSize()).toBe(1)
    trie.add('dog')
    expect(trie.getSize()).toBe(2)
    trie.add('deer')
    expect(trie.getSize()).toBe(3)
    trie.add('dog')
    expect(trie.getSize()).toBe(3)
    trie.add('do')
    expect(trie.getSize()).toBe(4)
  })

  test('add', () => {
    expect(trie.getSize()).toBe(0)
    expect(trie.contains('cat')).toBe(false)
    trie.add('cat')
    expect(trie.getSize()).toBe(1)
    expect(trie.contains('cat')).toBe(true)
    trie.add('dog')
    expect(trie.getSize()).toBe(2)
    expect(trie.contains('dog')).toBe(true)
  })

  test('contains', () => {
    expect(trie.getSize()).toBe(0)
    expect(trie.contains('cat')).toBe(false)
    trie.add('cat')
    expect(trie.getSize()).toBe(1)
    expect(trie.contains('cat')).toBe(true)
  })

  test('isPrefix', () => {
    trie.add('cat')
    expect(trie.contains('cat')).toBe(true)
    expect(trie.isPrefix('cat')).toBe(true)
    expect(trie.isPrefix('ca')).toBe(true)
    expect(trie.isPrefix('c')).toBe(true)
  })
})
