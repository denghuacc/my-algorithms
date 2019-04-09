/**
 * 使用广度优先搜索查找最短路径
 * 权限一样
 */
const Graph = require('./Graph')
const Stack = require('../Stack/Stack')

const graph = new Graph()

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// 使用改进的 BFS
const shortestPathA = graph.BFS(myVertices[0])
console.log(shortestPathA)

// 查找最短路径（权限一样）
const fromVertex = myVertices[0]

for (let i = 0; i < myVertices.length; i++) {
  const toVertex = myVertices[i]
  const path = new Stack()
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }
  path.push(fromVertex)
  let s = path.pop()
  while (!path.isEmpty()) {
    s += ' -> ' + path.pop()
  }
  console.log(s)
}
