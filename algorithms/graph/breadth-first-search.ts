import Graph from "@/data-structures/graph/graph";
import Queue from "@/data-structures/queue/linked-list-queue";

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

function initializeColor<T>(vertices: T[]): Map<T, Colors> {
  const color: Map<T, Colors> = new Map();
  for (let i = 0; i < vertices.length; i++) {
    color.set(vertices[i], Colors.WHITE);
  }
  return color;
}

export function breadthFirstSearch<T>(
  graph: Graph<T>,
  startVertex: T,
  callback: Function
): void {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue<T>();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    const neighbors = adjList.get(u)!;

    color.set(u, Colors.GREY);

    for (let i = 0; i < neighbors!.length; i++) {
      const w = neighbors[i];
      if (color.get(w) === Colors.WHITE) {
        color.set(w, Colors.GREY);
        queue.enqueue(w);
      }
    }

    color.set(u, Colors.BLACK);
    if (callback) callback(u);
  }
}

interface ReturnObj<T> {
  distances: Map<T, number>;
  predecessors: Map<T, T | null>;
}

// 改进的 bfs
export function bfs<T>(graph: Graph<T>, startVertex: T): ReturnObj<T> {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue<T>();
  const distances: Map<T, number> = new Map();
  const predecessors: Map<T, T | null> = new Map();

  queue.enqueue(startVertex);

  for (let i = 0; i < vertices.length; i++) {
    distances.set(vertices[i], 0);
    predecessors.set(vertices[i], null);
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    const neighbors = adjList.get(u)!;

    color.set(u, Colors.GREY);

    for (let i = 0; i < neighbors!.length; i++) {
      const w = neighbors[i];
      if (color.get(w) === Colors.WHITE) {
        color.set(w, Colors.GREY);
        distances.set(w, distances.get(u)! + 1);
        predecessors.set(w, u);
        queue.enqueue(w);
      }
    }

    color.set(u, Colors.BLACK);
  }

  return {
    distances,
    predecessors,
  };
}
