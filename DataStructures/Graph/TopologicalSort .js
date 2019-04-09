const Graph = require('./Graph')

const graph = new Graph()

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F']

for (const item of myVertices) {
  graph.addVertex(item)
}

graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('B', 'E')
graph.addEdge('C', 'F')
graph.addEdge('F', 'E')

const result = graph.DFS()
