import { countingSort } from "../counting-sort";
import { testSortAlgorithm } from "./test-sort-algorithm";

testSortAlgorithm(countingSort, "Counting Sort", { reverseCompare: false });
