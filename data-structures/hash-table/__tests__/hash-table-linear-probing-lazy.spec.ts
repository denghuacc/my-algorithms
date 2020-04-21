import HashTableLinearProbingLazy from '../hash-table-linear-probing-lazy'
import { MyObj } from '../../util'

describe('HashTableLinearProbingLazy', () => {
  const A = 'Jonathan'
  const B = 'Jamie'
  const C = 'Sue'

  test('starts empty', () => {
    const hashTable = new HashTableLinearProbingLazy<number, number>()
    expect(hashTable.size()).toBe(0)
    expect(hashTable.isEmpty()).toBe(true)
  })

  test('generates hashcode', () => {
    // numbers
    let hashTable: any = new HashTableLinearProbingLazy<number, number>()
    expect(hashTable.hashCode(1)).toBe(1)
    expect(hashTable.hashCode(10)).toBe(10)
    expect(hashTable.hashCode(100)).toBe(100)
    expect(hashTable.hashCode(1000)).toBe(1000)

    // strings
    hashTable = new HashTableLinearProbingLazy<string, number>()
    expect(hashTable.hashCode('1')).toBe(12)
    expect(hashTable.hashCode('10')).toBe(23)
    expect(hashTable.hashCode('100')).toBe(34)
    expect(hashTable.hashCode('1000')).toBe(8)
    expect(hashTable.hashCode('a')).toBe(23)
    expect(hashTable.hashCode('A')).toBe(28)
    expect(hashTable.hashCode('Aba')).toBe(1)

    // objects
    hashTable = new HashTableLinearProbingLazy<MyObj, MyObj>()
    const myObjList = []
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1))
    }
    expect(hashTable.hashCode(myObjList[0])).toBe(1)
    expect(hashTable.hashCode(myObjList[1])).toBe(3)
    expect(hashTable.hashCode(myObjList[2])).toBe(5)
    expect(hashTable.hashCode(myObjList[3])).toBe(7)
    expect(hashTable.hashCode(myObjList[4])).toBe(9)
  })

  test('puts undefined and null keys and values', () => {
    const hashTable = new HashTableLinearProbingLazy()

    expect(hashTable.put('undefined', undefined)).toBe(false)
    expect(hashTable.get('undefined')).toBe(undefined)

    expect(hashTable.put('undefined', 1)).toBe(true)
    expect(hashTable.get('undefined')).toBe(1)

    expect(hashTable.put('null', null)).toBe(false)
    expect(hashTable.get('null')).toBe(undefined)

    expect(hashTable.put('null', 1)).toBe(true)
    expect(hashTable.get('null')).toBe(1)

    hashTable.clear()
    expect(hashTable.put(undefined, undefined)).toBe(false)
    expect(hashTable.get(undefined)).toBe(undefined)

    expect(hashTable.put(undefined, 1)).toBe(false)
    expect(hashTable.get(undefined)).toBe(undefined)

    expect(hashTable.put(null, null)).toBe(false)
    expect(hashTable.get(null)).toBe(undefined)

    expect(hashTable.put(null, 1)).toBe(false)
    expect(hashTable.get(null)).toBe(undefined)
  })

  test('puts values with number key without collisions', () => {
    const min = 1
    const max = 5
    const size = max - min + 1
    const hashTable = new HashTableLinearProbingLazy<number, number>()

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBe(true)
    }
    expect(hashTable.size()).toBe(size)

    const table = hashTable.getTable()
    for (let i = min; i <= max; i++) {
      expect(table[i].key).toBe(i)
      expect(table[i].val).toBe(i)
    }
  })

  test('puts values with string key without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy<string, number>()

    expect(hashTable.put('1', 1)).toBe(true)
    expect(hashTable.put('10', 10)).toBe(true)
    expect(hashTable.put('100', 100)).toBe(true)
    expect(hashTable.put('1000', 1000)).toBe(true)

    const table = hashTable.getTable()

    expect(table[12].key).toBe('1')
    expect(table[12].val).toBe(1)

    expect(table[23].key).toBe('10')
    expect(table[23].val).toBe(10)

    expect(table[34].key).toBe('100')
    expect(table[34].val).toBe(100)

    expect(table[8].key).toBe('1000')
    expect(table[8].val).toBe(1000)
  })

  test('puts values with object key without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy<MyObj, MyObj>()

    const myObjList = []
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1))
      expect(hashTable.put(myObjList[i - 1], myObjList[i - 1])).toBe(true)
    }

    const table = hashTable.getTable()

    expect(table[1].key).toBe(myObjList[0])
    expect(table[1].val).toBe(myObjList[0])

    expect(table[3].key).toBe(myObjList[1])
    expect(table[3].val).toBe(myObjList[1])

    expect(table[5].key).toBe(myObjList[2])
    expect(table[5].val).toBe(myObjList[2])

    expect(table[7].key).toBe(myObjList[3])
    expect(table[7].val).toBe(myObjList[3])

    expect(table[9].key).toBe(myObjList[4])
    expect(table[9].val).toBe(myObjList[4])
  })

  function addValuesCollision() {
    const hashTable = new HashTableLinearProbingLazy<string, string>()

    expect(hashTable.put(A, `${A}@email.com`)).toBe(true)
    expect(hashTable.put(B, `${B}@email.com`)).toBe(true)
    expect(hashTable.put(C, `${C}@email.com`)).toBe(true)
    expect(hashTable.size()).toBe(3)

    const expectedHash = 5
    expect(hashTable.hashCode(A)).toBe(expectedHash)
    expect(hashTable.hashCode(B)).toBe(expectedHash)
    expect(hashTable.hashCode(C)).toBe(expectedHash)

    expect(hashTable.size()).toBe(3)

    return hashTable
  }

  test('puts values with collisions', () => {
    const min = 1
    const max = 5
    const size = max - min + 1
    const hashTable = new HashTableLinearProbingLazy<number, number>()

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBe(true)
    }
    expect(hashTable.size()).toBe(size)

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 10)).toBe(true)
    }
    expect(hashTable.size()).toBe(size * 2)

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 100)).toBe(true)
    }
    expect(hashTable.size()).toBe(size * 3)

    const table = hashTable.getTable()
    for (let i = min; i <= max; i++) {
      expect(table[i].key).toBe(i)
      expect(table[i].val).toBe(i)

      expect(table[i + size].key).toBe(i)
      expect(table[i + size].val).toBe(i + 10)

      expect(table[i + size * 2].key).toBe(i)
      expect(table[i + size * 2].val).toBe(i + 100)
    }

    addValuesCollision()
  })

  test('removes elements without collisions', () => {
    const min = 1
    const max = 5
    const size = max - min + 1
    const hashTable = new HashTableLinearProbingLazy<number, number>()

    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).toBe(true)
    }
    expect(hashTable.size()).toBe(size)

    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBe(true)
    }

    // elements do not exist
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).toBe(false)
    }

    expect(hashTable.isEmpty()).toBe(true)
  })

  function removeWithCollision(a: string, b: string, c: string) {
    const hashTable = addValuesCollision()

    expect(hashTable.remove(a)).toBe(true)
    expect(hashTable.get(a)).toBe(undefined)
    expect(hashTable.get(b)).not.toBe(undefined)
    expect(hashTable.get(c)).not.toBe(undefined)

    expect(hashTable.remove(b)).toBe(true)
    expect(hashTable.get(a)).toBe(undefined)
    expect(hashTable.get(b)).toBe(undefined)
    expect(hashTable.get(c)).not.toBe(undefined)

    expect(hashTable.remove(c)).toBe(true)
    expect(hashTable.get(a)).toBe(undefined)
    expect(hashTable.get(b)).toBe(undefined)
    expect(hashTable.get(c)).toBe(undefined)

    expect(hashTable.isEmpty()).toBe(true)
  }

  test('removes elements with collisions: scenario 1', () => {
    // test all possibilities for removal
    removeWithCollision(A, B, C)
    removeWithCollision(A, C, B)
    removeWithCollision(B, A, C)
    removeWithCollision(B, C, A)
    removeWithCollision(C, A, B)
    removeWithCollision(C, B, A)
  })

  function addValuesCollision2() {
    const hashTable = new HashTableLinearProbingLazy<string, string>()

    expect(hashTable.put(')', `parenthesis@email.com`)).toBe(true)
    expect(hashTable.put(A, `${A}@email.com`)).toBe(true)
    expect(hashTable.put('+', `plus@email.com`)).toBe(true)
    expect(hashTable.put(B, `${B}@email.com`)).toBe(true)
    expect(hashTable.put(',', `comma@email.com`)).toBe(true)
    expect(hashTable.put(C, `${C}@email.com`)).toBe(true)
    expect(hashTable.put('-', `minus@email.com`)).toBe(true)
    expect(hashTable.put('0', `zero@email.com`)).toBe(true)

    const expectedHash = 5
    expect(hashTable.hashCode(A)).toBe(expectedHash)
    expect(hashTable.hashCode(B)).toBe(expectedHash)
    expect(hashTable.hashCode(C)).toBe(expectedHash)
    expect(hashTable.hashCode(')')).toBe(4)
    expect(hashTable.hashCode('+')).toBe(6)
    expect(hashTable.hashCode(',')).toBe(7)
    expect(hashTable.hashCode('-')).toBe(8)
    expect(hashTable.hashCode('0')).toBe(11)

    expect(hashTable.size()).toBe(8)

    const table = hashTable.getTable()
    expect(table[4].key).toBe(')')
    expect(table[5].key).toBe(A)
    expect(table[6].key).toBe('+')
    expect(table[7].key).toBe(B)
    expect(table[8].key).toBe(',')
    expect(table[9].key).toBe(C)
    expect(table[10].key).toBe('-')
    expect(table[11].key).toBe('0')

    return hashTable
  }

  function verifyOtherKeys(
    hashTable: HashTableLinearProbingLazy<string, string>
  ) {
    expect(hashTable.get(')')).not.toBe(undefined)
    expect(hashTable.get('+')).not.toBe(undefined)
    expect(hashTable.get(',')).not.toBe(undefined)
    expect(hashTable.get('-')).not.toBe(undefined)
    expect(hashTable.get('0')).not.toBe(undefined)
  }

  function removeWithCollision2(a: string, b: string, c: string) {
    const hashTable = addValuesCollision2()

    expect(hashTable.remove(a)).toBe(true)
    expect(hashTable.get(a)).toBe(undefined)
    expect(hashTable.get(b)).not.toBe(undefined)
    expect(hashTable.get(c)).not.toBe(undefined)
    verifyOtherKeys(hashTable)

    expect(hashTable.remove(b)).toBe(true)
    expect(hashTable.get(a)).toBe(undefined)
    expect(hashTable.get(b)).toBe(undefined)
    expect(hashTable.get(c)).not.toBe(undefined)
    verifyOtherKeys(hashTable)

    expect(hashTable.remove(c)).toBe(true)
    expect(hashTable.get(a)).toBe(undefined)
    expect(hashTable.get(b)).toBe(undefined)
    expect(hashTable.get(c)).toBe(undefined)
    verifyOtherKeys(hashTable)
  }

  test('removes elements with collisions: scenario 2', () => {
    // test all possibilities for removal
    removeWithCollision2(A, B, C)
    removeWithCollision2(A, C, B)
    removeWithCollision2(B, A, C)
    removeWithCollision2(B, C, A)
    removeWithCollision2(C, A, B)
    removeWithCollision2(C, B, A)
  })

  test('returns toString primitive types without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy<number, number>()

    expect(hashTable.toString()).toBe('')

    hashTable.put(1, 1)
    expect(hashTable.toString()).toBe('{1 => [#1: 1]}')

    hashTable.put(2, 2)
    expect(hashTable.toString()).toBe('{1 => [#1: 1]},{2 => [#2: 2]}')

    hashTable.clear()
    expect(hashTable.toString()).toBe('')
  })

  test('returns toString primitive types without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy<string, number>()

    hashTable.put('el1', 1)
    expect(hashTable.toString()).toBe('{36 => [#el1: 1]}')

    hashTable.put('el2', 2)
    expect(hashTable.toString()).toBe('{0 => [#el2: 2]},{36 => [#el1: 1]}')
  })

  test('returns toString objects without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy<MyObj, MyObj>()

    let myObj = new MyObj(1, 2)
    hashTable.put(myObj, myObj)
    expect(hashTable.toString()).toBe('{1 => [#1|2: 1|2]}')

    myObj = new MyObj(3, 4)
    hashTable.put(myObj, myObj)
    expect(hashTable.toString()).toBe('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}')
  })

  test('returns toString with collisions', () => {
    const hashTable = new HashTableLinearProbingLazy<number, number>()

    expect(hashTable.toString()).toBe('')

    hashTable.put(1, 1)
    expect(hashTable.toString()).toBe('{1 => [#1: 1]}')

    hashTable.put(2, 2)
    expect(hashTable.toString()).toBe('{1 => [#1: 1]},{2 => [#2: 2]}')

    hashTable.put(1, 10)
    expect(hashTable.toString()).toBe(
      '{1 => [#1: 1]},{2 => [#2: 2]},{3 => [#1: 10]}'
    )

    hashTable.clear()
    expect(hashTable.toString()).toBe('')
  })
})
