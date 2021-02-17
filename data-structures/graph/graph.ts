/**
 * @name Graph 图
 * @description 使用邻接表表示图
 */
export default class Graph<T> {
  private vertices: T[] = [];
  private adjList: Map<T, T[]> = new Map(); // vertex -> vertex[]

  constructor(private isDirected = false) {}

  // 添加顶点
  addVertex(v: T): void {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 添加边
  addEdge(a: T, b: T): void {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }
    this.adjList.get(a)?.push(b);
    if (this.isDirected !== true) {
      this.adjList.get(b)?.push(a);
    }
  }

  // 获取点的集合
  getVertices(): T[] {
    return this.vertices;
  }

  // 获取邻接表： 点 -> 和该点连接的点的集合
  getAdjList(): Map<T, T[]> {
    return this.adjList;
  }

  toString(): string {
    let s = "";
    for (let i = 0; i < this.vertices.length; i++) {
      s += this.vertices[i] + " -> ";
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors!.length; j++) {
        s += neighbors![j] + " ";
      }
      s += "\n";
    }
    return s;
  }
}
