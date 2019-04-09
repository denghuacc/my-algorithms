const HT = require('./HashTable')

// 实例化
const hash = new HT()

// put
hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'johnsnow@email.com')
hash.put('Tyrion', 'tyrion@email.com')
hash.put('Aaron', 'aaron@email.com')
hash.put('Donnie', 'donnie@email.com')
hash.put('Ana', 'ana@email.com')
hash.put('Jonathan', 'jonathan@email.com')
hash.put('Jamie', 'jamie@email.com')
hash.put('Sue', 'sue@email.com')
hash.put('Mindy', 'mindy@email.com')
hash.put('Paul', 'paul@email.com')
hash.put('Nathan', 'nathan@email.com')

// print
console.log('------------')
hash.print()

// // put 添加值
// hash.put('Hale', 'hale@gmail.com')
// hash.put('Amy', 'amy@gmail.com')
// hash.put('Bill', 'hale@gmail.com')

// // get 获取值
// console.log(hash.get('Hale')) // hale@gmail.com
// console.log(hash.get('Amy')) // amy@gmail.com

// // remove 删除值
// hash.remove('Bill')
// console.log(hash.get('Bill')) // undefined
