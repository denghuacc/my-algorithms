export function testSortAlgorithmNoCompare(
  sortAlgorithm: (array: number[]) => number[],
  algorithmName: string
) {
  describe(algorithmName, () => {
    const SIZE = 100;

    function createNonSortedArray() {
      const array: number[] = [];
      for (let i = SIZE; i > 0; i--) {
        array.push(i);
      }
      return array;
    }

    function createSortedArray() {
      const array: number[] = [];
      for (let i = 1; i <= SIZE; i++) {
        array.push(i);
      }
      return array;
    }

    test("works with empty arrays", () => {
      expect(sortAlgorithm([])).toEqual([]);
    });

    test("works with sorted arrays", () => {
      let array = createSortedArray();
      const sortedArray = createSortedArray();
      array = sortAlgorithm(array);
      expect(array).toEqual(sortedArray);
    });

    test("works with non-sorted arrays", () => {
      let array = createNonSortedArray();
      const sortedArray = createSortedArray();
      array = sortAlgorithm(array);

      expect(array).toEqual(sortedArray);

      for (let i = 0; i < array.length - 1; i++) {
        expect(array[i] <= array[i + 1]).toBe(true);
      }
    });
  });
}
