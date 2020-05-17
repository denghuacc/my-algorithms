import { knapsackRecursive } from "../knapsack-recursive";

describe("Knapsack Dynamic Programming - Recursive", () => {
  it("works with recursive approach", () => {
    const values = [3, 4, 5];
    const weights = [2, 3, 4];
    const capacity = 5;
    const n = values.length;

    expect(knapsackRecursive(capacity, weights, values, n)).toBe(7);
  });
});
