import Graph from "../../data-structures/graph/graph";

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

export function depthFirstSearch<T>(graph: Graph<T>, callback: Function): void {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color.get(vertices[i]) === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
}

function initializeColor<T>(vertices: T[]): Map<T, Colors> {
  const color: Map<T, Colors> = new Map();
  for (let i = 0; i < vertices.length; i++) {
    color.set(vertices[i], Colors.WHITE);
  }
  return color;
}

function depthFirstSearchVisit<T>(
  u: T,
  color: Map<T, Colors>,
  adjList: Map<T, T[]>,
  callback: Function
): void {
  color.set(u, Colors.GREY);
  if (callback) callback(u);

  const neighbors = adjList.get(u)!;
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color.get(w) === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback);
    }
  }
}

interface ReturnObj<T> {
  discovery: Map<T, number>;
  finished: Map<T, number>;
  predecessors: Map<T, T | null>;
}

// 改进的 dfs
export function dfs<T>(graph: Graph<T>): ReturnObj<T> {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d: Map<T, number> = new Map();
  const f: Map<T, number> = new Map();
  const p: Map<T, T | null> = new Map();
  const time = { count: 0 };

  for (let i = 0; i < vertices.length; i++) {
    d.set(vertices[i], 0);
    f.set(vertices[i], 0);
    p.set(vertices[i], null);
  }

  for (let i = 0; i < vertices.length; i++) {
    if (color.get(vertices[i]) === Colors.WHITE) {
      dfsVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  return {
    discovery: d,
    finished: f,
    predecessors: p,
  };
}

function dfsVisit<T>(
  u: T,
  color: Map<T, Colors>,
  d: Map<T, number>,
  f: Map<T, number>,
  p: Map<T, T | null>,
  time: { count: number },
  adjList: Map<T, T[]>
): void {
  color.set(u, Colors.GREY);
  d.set(u, ++time.count);
  const neighbors = adjList.get(u)!;
  for (let i = 0; i < neighbors.length; i++) {
    const w = neighbors[i];
    if (color.get(w) === Colors.WHITE) {
      p.set(w, u);
      dfsVisit(w, color, d, f, p, time, adjList);
    }
  }
  color.set(u, Colors.BLACK);
  f.set(u, ++time.count);
}
