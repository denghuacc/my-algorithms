const Dict = require('./Dictionary')

const msg = new Dict()

// 添加元素
msg.set('Hale', 'hale@gmail.com')
msg.set('Amy', 'amy@gmail.com')
msg.set('Bill', 'bill@gmail.com')

console.log(msg.has('Amy')) // true
console.log(msg.size()) // 3
console.log(msg.get('Bill')) // 'bill@gmail.com'
console.log(msg.getItems()) // [Hale: 'hale@gmail.com', Amy: 'amy@gmail.com', Bill: 'bill@gmail.com' ]
console.log(msg.keys()) // [ 'Hale', 'Amy', 'Bill' ]
console.log(msg.values()) // [ 'hale@gmail.com', 'amy@gmail.com', 'bill@gmail.com' ]

console.log(msg.remove('Hale')) // true
console.log(msg.values()) // [ 'amy@gmail.com', 'bill@gmail.com' ]

msg.clear()
console.log(msg.values()) // []
