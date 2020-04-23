import { radixSort } from '../radix-sort'
import { testSortAlgorithm } from './test-sort-algorithm'

testSortAlgorithm(radixSort, 'Radix Sort', {reverseCompare: false})