const ObjectMap = require('./ObjectMap')

const map = new ObjectMap()

// 添加元素
map.add('Hale', 'hale@gmail.com')
map.add('Amy', 'amy@gmail.com')
map.add('Bill', 'bill@gmail.com')
map.add('Bill', 'bill@gmail123.com')

console.log(map.contains('Amy')) // true
console.log(map.getSize()) // 3
console.log(map.get('Bill')) // 'bill@gmail123.com'
console.log(map.remove('Hale')) // hale@gmail.com
