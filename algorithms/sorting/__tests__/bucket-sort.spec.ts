import { bucketSort } from "../bucket-sort";
import { testSortAlgorithm } from "./test-sort-algorithm";

testSortAlgorithm(bucketSort, "Bucket Sort", { reverseCompare: false });
