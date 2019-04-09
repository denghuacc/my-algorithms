/**
 * floydWarshall
 * Floyd-Warshall算法是一种计算图中所有最短路径的动态规划算法
 */
const Graph = require('./Graph')

Graph.prototype.graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

Graph.prototype.floydWarshall = function() {
  const dist = [],
    length = this.graph.length

  for (let i = 0; i < length; i++) {
    dist[i] = []
    for (let j = 0; j < length; j++) {
      dist[i][j] = this.graph[i][j]
    }
  }

  for (let k = 0; k < length; k++) {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
        }
      }
    }
  }

  return dist
}

const g = new Graph()
console.log(g.floydWarshall())
