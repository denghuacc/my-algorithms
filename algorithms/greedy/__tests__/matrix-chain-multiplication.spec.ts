import { matrixChainMultiplication } from "../matrix-chain-multiplication";

describe("Matrix Chain Multiplication", () => {
  test("works with greedy approach", () => {
    const p = [10, 100, 5, 50, 1];

    expect(matrixChainMultiplication(p)).toBe(1750);
  });
});
