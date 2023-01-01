import { defaultCompare, Compare } from "../../util";

export function testSearchAlgorithm(
  searchAlgorithm: <T>(
    arr: T[],
    target: T,
    compareFn: <T>(a: T, b: T) => Compare
  ) => number,
  algorithmName: string
) {
  describe(algorithmName, () => {
    const SIZE = 10;

    function createSortedArray() {
      const array: number[] = [];
      for (let i = 1; i <= SIZE; i++) {
        array.push(i);
      }
      return array;
    }

    test("works with empty arrays", () => {
      expect(searchAlgorithm([], 1, defaultCompare)).toBe(-1);
    });

    test("finds value at the first position", () => {
      const array = createSortedArray();
      expect(searchAlgorithm(array, 1, defaultCompare)).toBe(0);
    });

    test("finds value at the last position", () => {
      const array = createSortedArray();
      expect(searchAlgorithm(array, SIZE, defaultCompare)).toBe(SIZE - 1);
    });

    test("finds value at different positions", () => {
      const array = createSortedArray();

      for (let value = 1; value <= SIZE; value++) {
        expect(searchAlgorithm(array, value, defaultCompare)).toBe(value - 1);
      }
    });
  });
}
