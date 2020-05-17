import { shellSort, shellSort2 } from "../shell-sort";
import { testSortAlgorithm } from "./test-sort-algorithm";

testSortAlgorithm(shellSort, "Shell Sort");
testSortAlgorithm(shellSort2, "Shell Sort - method2");
