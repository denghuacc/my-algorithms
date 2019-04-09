const Stack = require('./Stack')

const stack = new Stack()

for (let i = 0; i < 5; i++) {
  stack.push(i)
  console.log(stack.toString())
}

stack.pop()
console.log(stack.toString())

console.log('Peek:', stack.peek())
