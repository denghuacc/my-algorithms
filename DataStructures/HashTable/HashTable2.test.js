const HashTable2 = require('./HashTable2')

// 实例化
const ht = new HashTable2()

// add
ht.add('Gandalf', 'gandalf@email.com')
ht.add('John', 'johnsnow@email.com')
ht.add('Tyrion', 'tyrion@email.com')
ht.add('Aaron', 'aaron@email.com')
ht.add('Donnie', 'donnie@email.com')
ht.add('Ana', 'ana@email.com')
ht.add('Jonathan', 'jonathan@email.com')
ht.add('Jamie', 'jamie@email.com')
ht.add('Sue', 'sue@email.com')
ht.add('Mindy', 'mindy@email.com')
ht.add('Paul', 'paul@email.com')
ht.add('Nathan', 'nathan@email.com')

// print
console.log('-----------')
console.log(ht.toString())

console.log(ht.toString())

ht.remove('Aaron')

console.log('-----------')
console.log(ht.toString())

console.log(ht.get('Paul'))