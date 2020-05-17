import {
  fibonacci,
  fibonacciIterative,
  fibonacciMemoization,
} from "../fibonacci";

describe("Fibonacci", () => {
  test("Fibonacci Recursive", () => {
    expect(fibonacci(-1)).toBe(0);
    expect(fibonacci(0)).toBe(0);
    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(2)).toBe(1);
    expect(fibonacci(3)).toBe(2);
    expect(fibonacci(4)).toBe(3);
  });

  test("Fibonacci Iterative", () => {
    expect(fibonacciIterative(-1)).toBe(0);
    expect(fibonacciIterative(0)).toBe(0);
    expect(fibonacciIterative(1)).toBe(1);
    expect(fibonacciIterative(2)).toBe(1);
    expect(fibonacciIterative(3)).toBe(2);
    expect(fibonacciIterative(4)).toBe(3);
  });

  test("Fibonacci with Memoization", () => {
    expect(fibonacciMemoization(-1)).toBe(0);
    expect(fibonacciMemoization(0)).toBe(0);
    expect(fibonacciMemoization(1)).toBe(1);
    expect(fibonacciMemoization(2)).toBe(1);
    expect(fibonacciMemoization(3)).toBe(2);
    expect(fibonacciMemoization(4)).toBe(3);
  });
});
