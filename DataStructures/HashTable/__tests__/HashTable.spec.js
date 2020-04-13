const HashTable = require('../HashTable')
let ht

describe('HashTable', () => {
  beforeEach(() => {
    ht = new HashTable()
    ht.add('Gandalf', 'gandalf@email.com')
    ht.add('John', 'johnsnow@email.com')
    ht.add('Tyrian', 'tyrian@email.com')
    ht.add('Aaron', 'aaron@email.com')
    ht.add('Donnie', 'donnie@email.com')
    ht.add('Ana', 'ana@email.com')
    ht.add('Jonathan', 'jonathan@email.com')
    ht.add('Jamie', 'jamie@email.com')
    ht.add('Sue', 'sue@email.com')
    ht.add('Mindy', 'mindy@email.com')
    ht.add('Paul', 'paul@email.com')
    ht.add('Nathan', 'nathan@email.com')
  })

  test('getSize', () => {
    expect(ht.getSize()).toBe(12)
    ht.add('Hale', 'hale@email.com')
    expect(ht.getSize()).toBe(13)
    ht.remove('Ana')
    expect(ht.getSize()).toBe(12)
  })

  test('add', () => {
    expect(ht.getSize()).toBe(12)
    ht.add('Hale', 'hale@email.com')
    expect(ht.getSize()).toBe(13)
    expect(ht.get('Hale')).toBe('hale@email.com')
    ht.add('Hale', 'hale@email.com')
    expect(ht.getSize()).toBe(13)
    expect(ht.get('Hale')).toBe('hale@email.com')
    ht.add('Amy', 'amy@email.com')
    expect(ht.getSize()).toBe(14)
    expect(ht.get('Amy')).toBe('amy@email.com')
  })

  test('set', () => {
    expect(ht.getSize()).toBe(12)
    ht.add('Hale', 'hale@email.com')
    expect(ht.getSize()).toBe(13)
    expect(ht.get('Hale')).toBe('hale@email.com')
    expect(ht.contains('Hale')).toBe(true)
    ht.set('Hale', 'haledeng@email.com')
    expect(ht.getSize()).toBe(13)
    expect(ht.get('Hale')).toBe('haledeng@email.com')
    expect(ht.contains('Hale')).toBe(true)
  })

  test('get', () => {
    expect(ht.get('Hale')).toBe(undefined)
    ht.add('Hale', 'hale@email.com')
    expect(ht.get('Hale')).toBe('hale@email.com')
    ht.set('Hale', 'haledeng@email.com')
    expect(ht.get('Hale')).toBe('haledeng@email.com')
    ht.remove('Hale')
    expect(ht.get('Hale')).toBe(null)
  })

  test('contains', () => {
    expect(ht.contains('Hale')).toBe(false)
    ht.add('Hale', 'hale@email.com')
    expect(ht.contains('Hale')).toBe(true)
    ht.set('Hale', 'haledeng@email.com')
    expect(ht.contains('Hale')).toBe(true)
    ht.remove('Hale')
    expect(ht.contains('Hale')).toBe(false)
  })

  test('remove', () => {
    expect(ht.getSize()).toBe(12)
    expect(ht.contains('Hale')).toBe(false)
    ht.add('Hale', 'hale@email.com')
    expect(ht.getSize()).toBe(13)
    expect(ht.contains('Hale')).toBe(true)
    ht.remove('Hale')
    expect(ht.getSize()).toBe(12)
    expect(ht.contains('Hale')).toBe(false)
  })

  test('print', () => {
    expect(ht.getSize()).toBe(12)
    expect(ht.print().length).toEqual(ht.getSize())
    expect(ht.print()).toEqual([
      110,
      135,
      175,
      402,
      424,
      444,
      631,
      647,
      661,
      713,
      897,
      948
    ])
    ht.add('Hale', 'hale@email.com')
    expect(ht.getSize()).toBe(13)
    expect(ht.print().length).toEqual(ht.getSize())
    expect(ht.print()).toEqual([
      110,
      135,
      175,
      402,
      424,
      444,
      631,
      647,
      661,
      713,
      897,
      948,
      959
    ])
  })
})
