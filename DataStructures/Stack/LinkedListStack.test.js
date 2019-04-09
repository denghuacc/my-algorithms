const LinkedListStack = require('./LinkedListStack')

const stack = new LinkedListStack()

for (let i = 0; i < 5; i++) {
  stack.push(i)
  console.log(stack.toString())
}

stack.pop()
console.log(stack.toString())

console.log('Peek:', stack.peek())
