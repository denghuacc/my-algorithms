const AVLMap = require('./AVLMap')

const map = new AVLMap()

// 添加元素
map.add('Hale', 'hale@gmail.com')
map.add('Amy', 'amy@gmail.com')
map.add('Bill', 'bill@gmail.com')
map.add('Bill', 'bill@gmail123.com')

console.log(map.contains('Amy')) // true
console.log(map.getSize()) // 3
console.log(map.get('Bill')) // 'bill@gmail123.com'
console.log(map.remove('Hale')) // hale@gmail.com

map.set('Amy', 'amy123@gmail.com')
console.log(map.get('Amy')) // amy123@gmail.com

console.log(map.isEmpty()) // false

const testData = []
const n = 10000
for (let i = 0; i < n; i++) {
  testData.push(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
}

for (let i = 0; i < n; i++) {
  if (map.contains(testData[i])) {
    map.set(testData[i], map.get())
  } else {
    map.add(testData[i], 1)
  }
}

for (let item of testData) {
 if (map.contains(item)) {
   map.remove(item)
 }
}

console.log('Test Completed. No Error!')