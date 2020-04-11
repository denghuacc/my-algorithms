// 和 Prim 算法类似， Kruskal 算法也是一种求加权无向连通图的 MST 的贪心算法

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

Graph.prototype.kruskal = function () {}
