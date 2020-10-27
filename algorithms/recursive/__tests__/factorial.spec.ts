import { factorialIterative, factorial } from "../factorial";

describe("Factorial", () => {
  test("Iterative Factorial", () => {
    expect(factorialIterative(-1)).toBe(undefined);
    expect(factorialIterative(0)).toBe(1);
    expect(factorialIterative(1)).toBe(1);
    expect(factorialIterative(2)).toBe(2);
    expect(factorialIterative(3)).toBe(6);
    expect(factorialIterative(4)).toBe(24);
    expect(factorialIterative(5)).toBe(120);
  });

  test("Recursive Factorial", () => {
    expect(factorial(-1)).toBe(undefined);
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(2)).toBe(2);
    expect(factorial(3)).toBe(6);
    expect(factorial(4)).toBe(24);
    expect(factorial(5)).toBe(120);
  });
});
