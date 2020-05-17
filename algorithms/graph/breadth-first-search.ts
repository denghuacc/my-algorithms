import Graph from "../../data-structures/graph/graph";
import Queue from "../../data-structures/queue/linked-list-queue";

enum Colors {
  WHITE = 0,
  GREY = 1,
  BLACK = 2,
}

const initializeColor = (vertices: (string | number)[]) => {
  const color: Record<string | number, Colors> = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

export const breadthFirstSearch = (
  graph: Graph,
  startVertex: string | number,
  callback: Function
) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue<string | number>();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    const neighbors = adjList.get(u)!;

    color[u] = Colors.GREY;

    for (let i = 0; i < neighbors!.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        queue.enqueue(w);
      }
    }

    color[u] = Colors.BLACK;
    if (callback) callback(u);
  }
};

// 改进的 bfs
export const bfs = (graph: Graph, startVertex: string | number) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue<string | number>();
  const distances: Record<string | number, number> = {};
  const predecessors: Record<string | number, string | number | null> = {};

  queue.enqueue(startVertex);

  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  while (!queue.isEmpty()) {
    const u = queue.dequeue()!;
    const neighbors = adjList.get(u)!;

    color[u] = Colors.GREY;

    for (let i = 0; i < neighbors!.length; i++) {
      const w = neighbors[i];
      if (color[w] === Colors.WHITE) {
        color[w] = Colors.GREY;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }

    color[u] = Colors.BLACK;
  }

  return {
    distances,
    predecessors,
  };
};
