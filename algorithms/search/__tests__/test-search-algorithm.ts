import { IEqualsFunction } from "../../util";

interface CustomObject {
  key: number;
}

const customEquals: IEqualsFunction<CustomObject> = (
  a: CustomObject,
  b: CustomObject
) => a.key === b.key;

export function testSearchAlgorithm(
  searchAlgorithm: Function,
  algorithmName: string,
  config = { customEquals: true }
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
      expect(searchAlgorithm([], 1)).toBe(-1);
    });

    test("finds value at the first position", () => {
      const array = createSortedArray();
      expect(searchAlgorithm(array, 1)).toBe(0);
    });

    test("finds value at the last position", () => {
      const array = createSortedArray();
      expect(searchAlgorithm(array, SIZE)).toBe(SIZE - 1);
    });

    test("finds value at different positions", () => {
      const array = createSortedArray();

      for (let value = 1; value <= SIZE; value++) {
        expect(searchAlgorithm(array, value)).toBe(value - 1);
      }
    });

    if (config.customEquals) {
      test("finds value with custom equals function", () => {
        const array = [{ key: 1 }, { key: 2 }, { key: 3 }];
        expect(searchAlgorithm(array, { key: 2 }, customEquals)).toBe(1);
      });
    }
  });
}
