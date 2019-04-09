const List = require('./List')

// 实例化
const list = new List()

list.addLast('Hale')
list.addLast('Amy')
list.addLast('Bill')
list.addLast('Cat')
list.addLast('Dog')

list.print()

list.front()
console.log(list.getCurElement()) // Hale
list.end()
console.log(list.getCurElement()) // Dog
list.prev()
console.log(list.getCurElement()) // Cat
list.next()
console.log(list.getCurElement()) // Dog
console.log(list.currPos()) // 4

console.log(list.size) // 5

list.removeElement('Amy')
list.print()
console.log(list.size) // 4

const front = list.get(0)
console.log(front)

const tail = list.get(list.getSize() - 1)
console.log(tail)
