import {
  bubbleSort,
  bubbleSortImproved,
  bubbleSortDoublePointer,
} from "../bubble-sort";
import { testSortAlgorithm } from "./test-sort-algorithm";

testSortAlgorithm(bubbleSort, "Bubble Sort");
testSortAlgorithm(bubbleSortImproved, "Bubble Sort - Improved");
testSortAlgorithm(bubbleSortDoublePointer, "Bubble Sort - Double Pointer");
