import { shuffle } from "../fisher-yates";

describe("Fisher-Yates Shuffle", () => {
  const SIZE = 100;

  function createSortedArray() {
    const array: number[] = [];
    for (let i = 1; i <= SIZE; i++) {
      array.push(i);
    }
    return array;
  }

  it("works with empty arrays", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("works with arrays with a single value", () => {
    const array = [1];
    expect(shuffle(array)).toEqual(array);
  });

  it("works with sorted arrays", () => {
    let array = createSortedArray();
    const sortedArray = createSortedArray();
    array = shuffle(array);
    expect(array).not.toEqual(sortedArray);
  });
});
