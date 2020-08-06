import { sum, sumMemo } from "../sum";

describe("Sum", () => {
  test("sum", () => {
    expect(sum([])).toBe(0);
    expect(sum([1, 2])).toBe(3);
    expect(sum([3, 4, 5])).toBe(12);
    expect(sum([1, 1, 2, 2])).toBe(6);
  });

  test("sumMemo", () => {
    expect(sumMemo([])).toBe(0);
    expect(sumMemo([1, 2])).toBe(3);
    expect(sumMemo([3, 4, 5])).toBe(12);
    expect(sumMemo([1, 1, 2, 2])).toBe(6);
  });
});
