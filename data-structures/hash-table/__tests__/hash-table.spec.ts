import HashTable from '../hash-table'
import { MyObj } from '../../../utilities'

describe('HashTable', () => {
  test('starts empty', () => {
    const hashTable = new HashTable<number, number>()
    expect(hashTable.size()).toBe(0)
    expect(hashTable.isEmpty()).toBe(true)
  })

  test('generates hashCode', () => {
    // numbers
    let hashTable: any = new HashTable<number, number>()
    expect(hashTable.hashCode(1)).toBe(1)
    expect(hashTable.hashCode(10)).toBe(10)
    expect(hashTable.hashCode(100)).toBe(100)
    expect(hashTable.hashCode(1000)).toBe(1000)

    // strings
    hashTable = new HashTable<string, number>()
    expect(hashTable.hashCode('1')).toBe(12)
    expect(hashTable.hashCode('10')).toBe(23)
    expect(hashTable.hashCode('100')).toBe(34)
    expect(hashTable.hashCode('1000')).toBe(8)
    expect(hashTable.hashCode('a')).toBe(23)
    expect(hashTable.hashCode('A')).toBe(28)
    expect(hashTable.hashCode('Aba')).toBe(1)

    // objects
    hashTable = new HashTable<MyObj, MyObj>()
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
    const hashTable = new HashTable()

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

  test('puts values with number key', () => {
    const min = 1
    const max = 5
    const size = max - min + 1
    const hashTable = new HashTable<number, number>()

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

  test('puts values with string key', () => {
    const hashTable = new HashTable<string, number>()

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

  test('puts values with object key', () => {
    const hashTable = new HashTable<MyObj, MyObj>()

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

  test('does NOT handle collision, replaces values', () => {
    const hashTable = new HashTable<number, number>()

    for (let i = 0; i < 5; i++) {
      expect(hashTable.put(1, i)).toBe(true)
    }
    expect(hashTable.size()).toBe(1)
  })

  test('removes elements', () => {
    const min = 1
    const max = 5
    const size = max - min + 1
    const hashTable = new HashTable<number, number>()

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

  test('returns toString primitive types', () => {
    const hashTable = new HashTable<number, number>()

    expect(hashTable.toString()).toBe('')

    hashTable.put(1, 1)
    expect(hashTable.toString()).toBe('{1 => [#1: 1]}')

    hashTable.put(2, 2)
    expect(hashTable.toString()).toBe('{1 => [#1: 1]},{2 => [#2: 2]}')

    hashTable.clear()
    expect(hashTable.toString()).toBe('')
  })

  test('returns toString primitive types', () => {
    const hashTable = new HashTable<string, number>()

    hashTable.put('el1', 1)
    expect(hashTable.toString()).toBe('{36 => [#el1: 1]}')

    hashTable.put('el2', 2)
    expect(hashTable.toString()).toBe('{0 => [#el2: 2]},{36 => [#el1: 1]}')
  })

  test('returns toString objects', () => {
    const hashTable = new HashTable<MyObj, MyObj>()

    let myObj = new MyObj(1, 2)
    hashTable.put(myObj, myObj)
    expect(hashTable.toString()).toBe('{1 => [#1|2: 1|2]}')

    myObj = new MyObj(3, 4)
    hashTable.put(myObj, myObj)
    expect(hashTable.toString()).toBe('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}')
  })
})
