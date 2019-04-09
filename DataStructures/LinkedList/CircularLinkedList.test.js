const CLL = require('./CircularLinkedList')

// 实例化
const cities = new CLL()

// 检查是否为空
console.log(cities.isEmpty()) // true

// 添加元素
cities.append('Beijing')
cities.append('Shanghai')
cities.append('Shenzhen')

// 打印元素
console.log(cities.toString()) // Beijing, Shanghai, Shenzhen
console.log(cities.size()) // 3

// 插入元素
cities.insert(2, 'Guangzhou')
console.log(cities.toString()) // Beijing, Shanghai, Guangzhou, Shenzhen
console.log(cities.size()) // 4

// 查找元素索引
console.log(cities.indexOf('Shanghai')) // 1
console.log(cities.indexOf('Hangzhou')) // -1

// 删除元素
cities.remove('Shenzhen')
console.log(cities.toString()) // Beijing, Shanghai, Guangzhou

cities.removeAt(2)
console.log(cities.toString()) // Beijing, Shanghai

// 获取表头
console.log(cities.getHead())
// Node {
// element: 'Beijing',
//   next: Node { element: 'Shanghai', next: [Circular] }
// }
