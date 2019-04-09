const Graph = require('./Graph')

const graph = new Graph()
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

// addVertex
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

// addEdge
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

// toString
console.log(graph.toString())

// 广度优先搜索
function printNode(value) {
  console.log(`Visited vertex: ${value}`)
}
graph.bfs(myVertices[0], printNode)

// 深度优先搜索
graph.dfs(printNode)
