const LinkedList = require('./LinkedList')

const linkedList = new LinkedList()

for (let i = 0; i < 5; i++) {
  linkedList.addFirst(i)
  console.log(linkedList.toString())
}

linkedList.add(3, 100)
console.log(linkedList.toString())

linkedList.remove(3)
console.log(linkedList.toString())

linkedList.removeFirst()
console.log(linkedList.toString())

linkedList.removeLast()
console.log(linkedList.toString())
