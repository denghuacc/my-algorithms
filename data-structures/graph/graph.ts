/**
 * @name Graph 图
 * @description 使用邻接表表示图
 */
export default class Graph {
  private vertices: (string | number)[] = [];
  private adjList: Map<string | number, (string | number)[]> = new Map(); // vertex -> vertex[]

  constructor(private isDirected = false) {}

  // 添加顶点
  addVertex(v: string | number): void {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 添加边
  addEdge(a: string | number, b: string | number): void {
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
  getVertices(): (string | number)[] {
    return this.vertices;
  }

  // 获取邻接表： 点 -> 和该点连接的点的集合
  getAdjList(): Map<string | number, (string | number)[]> {
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
