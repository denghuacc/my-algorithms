const LinkedListSet = require('./LinkedListSet')

const set = new LinkedListSet()

const testData = []
const n = 10000
for (let i = 0; i < n; i++) {
  testData.push(Math.min(Math.floor(Math.random() * n), Number.MAX_VALUE))
}

for (let item of testData) {
  set.add(item)
}

console.log(set.gitSize())
