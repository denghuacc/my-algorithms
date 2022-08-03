# Queue

- 入列的时间时间复杂度都为 O(1)
- 出列
  - ArrayQueue 出列的时间复杂度为 O(N)，因为数组结构的元素出列后，后面所有的元素都需要往前移动一个位置
  - ObjectQueue 和 LinkedListQueue 出列的时间复杂度为 O(1)，不需要移动元素
