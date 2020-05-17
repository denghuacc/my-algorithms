import { lcs } from "../longest-common-subsequence";

describe("LCS Greedy", () => {
  test("works with greedy approach", () => {
    const wordX = "acbaed";
    const wordY = "abcadf";

    expect(lcs(wordX, wordY)).toBe(4);
  });
});
