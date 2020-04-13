function testMapFn(Map) {
  let map

  describe('ObjectSet', () => {
    beforeEach(() => {
      map = new Map()
    })

    test('size', () => {
      expect(map.size).toBe(0)
      map.set(1, 'a')
      expect(map.size).toBe(1)
      map.set(2, 'b')
      expect(map.size).toBe(2)
      map.set(2, 'b')
      expect(map.size).toBe(2)
      map.delete(2)
      expect(map.size).toBe(1)
      map.clear()
      expect(map.size).toBe(0)
    })

    test('set', () => {
      expect(map.size).toBe(0)
      expect(map.has(1)).toBe(false)
      map.set(1, 'a')
      expect(map.size).toBe(1)
      expect(map.has(1)).toBe(true)
      map.set(2, 'b')
      expect(map.size).toBe(2)
      expect(map.has(2)).toBe(true)
      map.set(2, 'p')
      expect(map.size).toBe(2)
      const newMap = map.set(3, 'c')
      expect(newMap.size).toBe(3)
    })

    test('get', () => {
      expect(map.get(1)).toBe(undefined)
      map.set(1, 'a')
      expect(map.get(1)).toBe('a')
      map.set(2, 'b')
      expect(map.get(2)).toBe('b')
      map.set(2, 'p')
      expect(map.get(2)).toBe('p')
      map.clear()
      expect(map.get(2)).toBe(undefined)
    })

    test('delete', () => {
      expect(map.size).toBe(0)
      map.set(1, 'a')
      map.set(2, 'b')
      expect(map.size).toBe(2)
      expect(map.has(1)).toBe(true)
      map.delete(1)
      expect(map.size).toBe(1)
      expect(map.has(1)).toBe(false)
      expect(map.delete(2)).toBe(true)
      expect(map.size).toBe(0)
      expect(map.delete(3)).toBe(false)
    })

    test('has', () => {
      expect(map.has(1)).toBe(false)
      map.set(1, 'a')
      expect(map.has(1)).toBe(true)
      map.delete(1)
      expect(map.has(1)).toBe(false)
    })

    test('clear', () => {
      expect(map.has(1)).toBe(false)
      map.set(1, 'a')
      map.set(2, 'b')
      expect(map.has(1)).toBe(true)
      expect(map.has(2)).toBe(true)
      map.clear()
      expect(map.has(1)).toBe(false)
      expect(map.has(2)).toBe(false)
    })
  })
}

module.exports = testMapFn
