const Sets = require('./Sets')

// 实例化
const set1 = new Sets()

// 添加元素
set1.add(1)
set1.add(2)
set1.add(3)
set1.add(100)

// 删除元素
console.log(set1.remove(100)) // true

console.log(set1.values()) // [ 1, 2, 3 ]

const set2 = new Sets()
set2.add(1)
set2.add(4)
set2.add(5)

console.log(set2.values()) // [ 1, 4, 5 ]

// 并集
const set3 = set1.union(set2)
console.log(set3.values()) // [ 1, 2, 3, 4, 5 ]

// 交集
const set4 = set1.intersection(set2)
console.log(set4.values()) // [ 1 ]

// 差集
const set5 = set1.difference(set2)
console.log(set5.values()) // [ 2, 3 ]

// 子集
const set6 = new Sets()
set6.add(1)
set6.add(2)
set6.add(3)
set6.add(5)

const set7 = new Sets()
set6.add(1)
set6.add(2)
set6.add(4)
set6.add(5)

console.log(set1.subset(set6)) // true
console.log(set1.subset(set7)) // false
