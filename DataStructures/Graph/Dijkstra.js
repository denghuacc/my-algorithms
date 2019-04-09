/**
 * Dijkstra
 * Dijkstra算法是一种计算从单个源到所有其他源的最短路径的贪心算法
 */

const Graph = require('./Graph')

const INF = Number.MAX_SAFE_INTEGER

Graph.prototype.graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]

Graph.prototype.dijkstra = function(src) {
  const dist = [],
    visited = [],
    length = this.graph.length

  for (let i = 0; i < length; i++) {
    dist[i] = INF
    visited[i] = false
  }

  dist[src] = 0

  for (let i = 0; i < length - 1; i++) {
    const u = this._minDistance(dist, visited)
    visited[u] = true
    for (let v = 0; v < length; v++) {
      if (
        !visited[v] &&
        this.graph[u][v] !== 0 &&
        dist[u] !== INF &&
        dist[u] + this.graph[u][v] < dist[v]
      ) {
        dist[v] = dist[u] + this.graph[u][v]
      }
    }
  }

  return dist
}

Graph.prototype._minDistance = function(dist, visited) {
  let min = INF,
    minIndex = -1

  for (let v = 0; v < dist.length; v++) {
    if (visited[v] === false && dist[v] <= min) {
      min = dist[v]
      minIndex = v
    }
  }

  return minIndex
}

const g = new Graph()

console.log(g.dijkstra())
// 无法实现
