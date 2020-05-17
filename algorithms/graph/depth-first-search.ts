import Graph from "../../data-structures/graph/graph";

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

export function depthFirstSearch(graph: Graph, callback: Function) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
}

function initializeColor(vertices: (string | number)[]) {
  const color: Record<string | number, Colors> = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
}

function depthFirstSearchVisit(
  u: string | number,
  color: Record<string | number, Colors>,
  adjList: Map<string | number, (string | number)[]>,
  callback: Function
) {
  color[u] = Colors.GREY;
  if (callback) callback(u);

  const neighbors = adjList.get(u)!;
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
}

// 改进的 dfs
export function dfs(graph: Graph) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d: Record<string | number, number> = {};
  const f: Record<string | number, number> = {};
  const p: Record<string | number, string | number | null> = {};
  const time = { count: 0 };

  for (let i = 0; i < vertices.length; i++) {
    d[vertices[i]] = 0;
    f[vertices[i]] = 0;
    p[vertices[i]] = null;
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      dfsVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p,
  };
}

function dfsVisit(
  u: string | number,
  color: Record<string | number, Colors>,
  d: Record<string | number, number>,
  f: Record<string | number, number>,
  p: Record<string | number, string | number | null>,
  time: { count: number },
  adjList: Map<string | number, (string | number)[]>
) {
  color[u] = Colors.GREY;
  d[u] = ++time.count;
  const neighbors = adjList.get(u)!;
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color[w] === Colors.WHITE) {
      p[w] = u;
      dfsVisit(w, color, d, f, p, time, adjList);
    }
  }
  color[u] = Colors.BLACK;
  f[u] = ++time.count;
}
