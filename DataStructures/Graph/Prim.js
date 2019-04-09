/**
 * Prim 算法是一种求解加权无向连通图的 MST 问题的贪心算法
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

Graph.prototype.prim = function() {
  const parent = [],
    key = []
  visited = []
  length = this.graph.length

  for (let i = 0; i < length; i++) {
    key[i] = INF
    visited[i] = false
  }

  key[0] = 0
  parent[0] = -1

  for (let i = 0; i < length - 1; i++) {
    const u = this.minKey(key, visited)
    visited[u] = true

    for (let v = 0; v < length; v++) {
      if (
        this.graph[u][v] &&
        visited[v] === false &&
        this.graph[u][v] < key[v]
      ) {
        parent[v] = u
        key[v] = this.graph[u][v]
      }
    }
  }

  return parent
}

Graph.prototype.minKey = function(key, visited) {
  let min = INF,
    minIndex = -1

  for (let v = 0; v < key.length; v++) {
    if (visited[v] === false && key[v] <= min) {
      min = key[v]
      minIndex = v
    }
  }

  return minIndex
}

// test
const g = new Graph()
console.log(g.prim())
