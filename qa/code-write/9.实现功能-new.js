// 手动实现 new

function selfNew(fn, ...args) {
  const obj = Object.create(fn.prototype) // 直接使用 Object.create 创建原型的方法创建对象
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}

// test
function Person(name, age) {
  this.name = name
  this.age = age
  this.sayHi = function () {
    console.log('hi')
  }
}

const p = selfNew(Person, 'hale', 30)
console.log(p)
p.sayHi()
