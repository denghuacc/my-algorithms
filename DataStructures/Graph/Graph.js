const Dictionary = require('../Dictionary/Dictionary')
const Queue = require('../Queue/Queue')

/**
 * @name Graph 图
 * @description
 * @property {} vertices 顶点
 * @method
 */
class Graph {
  constructor() {
    this.vertices = []
    this.adjList = new Dictionary()
    this.time = 0
  }

  // 增加顶点；把顶点存入顶点数组；
  // 顶点的边的字典，初始值为空数组
  addVertex(v) {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }

  // 增加顶点的边，接收 2 个顶点为参数
  // 连接点的其他点放入表示边的数组里
  addEdge(v, w) {
    this.adjList.get(v).push(w)
    this.adjList.get(w).push(v)
  }

  // 展示图
  toString() {
    let s = ''
    // 遍历顶点组
    for (let i = 0; i < this.vertices.length; i++) {
      s += this.vertices[i] + ' -> '
      // 获取顶点的边
      const neighbors = this.adjList.get(this.vertices[i])
      // 遍历顶点的边的数组
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' '
      }
      s += '\n'
    }
    return s
  }

  // 顶点颜色管理器；初始化顶点颜色
  _initializeColor() {
    const color = []
    for (let i = 0; i < this.vertices.length; i++) {
      color[this.vertices[i]] = 'white'
    }
    return color
  }

  // 广度优先搜索
  bfs(v, callback) {
    const color = this._initializeColor()
    const queue = new Queue()
    queue.enqueue(v)

    while (!queue.isEmpty()) {
      const u = queue.dequeue()
      const neighbors = this.adjList.get(u)
      color[u] = 'grey'
      for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
      if (callback) {
        callback(u)
      }
    }
  }

  // 改进的广度优先搜索
  BFS(v) {
    const color = this._initializeColor()
    const queue = new Queue()
    const d = [], // 表示距离
      pred = [] // 表示前溯点
    queue.enqueue(v)

    for (let i = 0; i < this.vertices.length; i++) {
      d[this.vertices[i]] = 0
      pred[this.vertices[i]] = null
    }

    while (!queue.isEmpty()) {
      const u = queue.dequeue()
      const neighbors = this.adjList.get(u)
      color[u] = 'grey'
      for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          d[w] = d[u] + 1
          pred[w] = u
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
    }

    return {
      distance: d,
      predecessors: pred
    }
  }

  // 深度优先搜索
  dfs(callback) {
    const color = this._initializeColor()
    for (let i = 0; i < this.vertices.length; i++) {
      if (color[this.vertices[i]] === 'white') {
        this._dfsVisit(this.vertices[i], color, callback)
      }
    }
  }

  _dfsVisit(u, color, callback) {
    color[u] = 'grey'
    if (callback) {
      callback(u)
    }
    const neighbors = this.adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === 'white') {
        this._dfsVisit(w, color, callback)
      }
    }
    color[u] = 'black'
  }

  // 改进的深度优先搜索
  DFS() {
    const color = this._initializeColor()
    const d = [],
      f = [],
      p = []
    this.time = 0

    for (let i = 0; i < this.vertices.length; i++) {
      d[this.vertices[i]] = 0
      f[this.vertices[i]] = 0
      p[this.vertices[i]] = null
    }

    for (let i = 0; i < this.vertices.length; i++) {
      if (color[this.vertices[i]] === 'white') {
        this._DFSVisit(this.vertices[i], color, d, f, p)
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }

  _DFSVisit(u, color, d, f, p) {
    console.log('discovered:', u)
    color[u] = 'grey'
    d[u] = ++this.time
    const neighbors = this.adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i]
      if (color[w] === 'white') {
        p[w] = u
        this._DFSVisit(w, color, d, f, p)
      }
    }
    color[u] = 'black'
    f[u] = ++this.time
    console.log('explored:', u)
  }
}

module.exports = Graph
