import { bfs, breadthFirstSearch } from "../breadth-first-search";
import Graph from "@/data-structures/graph/graph";

describe("Breadth First Search", () => {
  let count: number;
  const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  let graph: Graph<string>;

  beforeEach(() => {
    count = 0;
    graph = new Graph();

    for (let i = 0; i < vertices.length; i++) {
      graph.addVertex(vertices[i]);
    }

    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("A", "D");
    graph.addEdge("C", "D");
    graph.addEdge("C", "G");
    graph.addEdge("D", "G");
    graph.addEdge("D", "H");
    graph.addEdge("B", "E");
    graph.addEdge("B", "F");
    graph.addEdge("E", "I");
  });

  test("breadthFirstSearch", () => {
    breadthFirstSearch(graph, vertices[0], assertCallback);
  });

  function assertCallback(value: string) {
    expect(value).toBe(vertices[count]);
    count++;
  }

  test("shortest path - BFS", () => {
    const shortestPathA = bfs(graph, vertices[0]);

    expect(shortestPathA.distances).toEqual(
      new Map([
        ["A", 0],
        ["B", 1],
        ["C", 1],
        ["D", 1],
        ["E", 2],
        ["F", 2],
        ["G", 2],
        ["H", 2],
        ["I", 3],
      ])
    );
    expect(shortestPathA.predecessors).toEqual(
      new Map([
        ["A", null],
        ["B", "A"],
        ["C", "A"],
        ["D", "A"],
        ["E", "B"],
        ["F", "B"],
        ["G", "C"],
        ["H", "D"],
        ["I", "E"],
      ])
    );
  });
});
