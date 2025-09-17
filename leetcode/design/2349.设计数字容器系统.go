/*
 * @lc app=leetcode.cn id=2349 lang=golang
 *
 * [2349] 设计数字容器系统
 *
 * https://leetcode.cn/problems/design-a-number-container-system/description/
 *
 * algorithms
 * Medium (39.61%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    13.7K
 * Total Submissions: 30.3K
 * Testcase Example:  '["NumberContainers","find","change","change","change","change","find","change","find"]\n' +
  '[[],[10],[2,10],[1,10],[3,10],[5,10],[10],[1,20],[10]]'
 *
 * 设计一个数字容器系统，可以实现以下功能：
 *
 *
 * 在系统中给定下标处 插入 或者 替换 一个数字。
 * 返回 系统中给定数字的最小下标。
 *
 *
 * 请你实现一个 NumberContainers 类：
 *
 *
 * NumberContainers() 初始化数字容器系统。
 * void change(int index, int number) 在下标 index 处填入 number。如果该下标 index
 * 处已经有数字了，那么用 number 替换该数字。
 * int find(int number) 返回给定数字 number 在系统中的最小下标。如果系统中没有 number，那么返回 -1 。
 *
 *
 *
 *
 * 示例：
 *
 *
 * 输入：
 * ["NumberContainers", "find", "change", "change", "change", "change", "find",
 * "change", "find"]
 * [[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
 * 输出：
 * [null, -1, null, null, null, null, 1, null, 2]
 *
 * 解释：
 * NumberContainers nc = new NumberContainers();
 * nc.find(10); // 没有数字 10 ，所以返回 -1 。
 * nc.change(2, 10); // 容器中下标为 2 处填入数字 10 。
 * nc.change(1, 10); // 容器中下标为 1 处填入数字 10 。
 * nc.change(3, 10); // 容器中下标为 3 处填入数字 10 。
 * nc.change(5, 10); // 容器中下标为 5 处填入数字 10 。
 * nc.find(10); // 数字 10 所在的下标为 1 ，2 ，3 和 5 。因为最小下标为 1 ，所以返回 1 。
 * nc.change(1, 20); // 容器中下标为 1 处填入数字 20 。注意，下标 1 处之前为 10 ，现在被替换为 20 。
 * nc.find(10); // 数字 10 所在下标为 2 ，3 和 5 。最小下标为 2 ，所以返回 2 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= index, number <= 10^9
 * 调用 change 和 find 的 总次数 不超过 10^5 次。
 *
 *
*/

package leetcode

import "container/heap"

// @lc code=start
// NumberContainers 设计数字容器系统
//
// 支持在指定下标插入/替换数字，并能高效查询某数字的最小下标。
// 采用哈希表+最小堆实现，保证 find 操作高效。
type NumberContainers struct {
	nums  map[int]int      // 记录每个下标当前存储的数字
	heaps map[int]*MinHeap // 记录每个数字对应的所有下标的最小堆
}

// Constructor 初始化数字容器系统
func Constructor() NumberContainers {
	return NumberContainers{
		nums:  make(map[int]int),
		heaps: make(map[int]*MinHeap),
	}
}

// Change 在指定下标插入或替换数字
func (nc *NumberContainers) Change(index int, number int) {
	nc.nums[index] = number
	if _, ok := nc.heaps[number]; !ok {
		nc.heaps[number] = &MinHeap{}
		heap.Init(nc.heaps[number])
	}
	heap.Push(nc.heaps[number], index)
}

// Find 查询指定数字的最小下标，若不存在返回 -1
func (nc *NumberContainers) Find(number int) int {
	h, ok := nc.heaps[number]
	if !ok {
		return -1
	}
	// 懒删除：堆顶 index 可能已被覆盖为其他数字，弹出无效项
	for h.Len() > 0 && nc.nums[(*h)[0]] != number {
		heap.Pop(h)
	}
	if h.Len() == 0 {
		return -1
	}
	return (*h)[0]
}

// MinHeap 实现最小堆，用于维护每个数字的所有下标
type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any) {
	*h = append(*h, x.(int))
}
func (h *MinHeap) Pop() any {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 动态维护下标与数字的映射，支持高效插入/替换和查询某数字的最小下标
   - 需要频繁变更和查询，要求操作高效

2. 算法思路：
   - 利用哈希表记录 index -> number 的最新映射。
   - 同时为每个数字维护一个最小堆（min-heap）用于存放该数字出现过的所有 index。
   - change 操作：更新 index->number，同时把 index 推入该数字对应的堆。
   - find 操作：查看该数字对应的堆顶 index，但堆顶可能已经被其它数字覆盖（index 已被改为别的数字），
     所以需要不断弹出堆顶的无效 index 直到堆顶有效或堆空。

3. 复杂度分析：
   - change: O(log k) （将 index 推入堆，k 为该数字的堆大小）
   - find: 平均 O(1)，最坏 O(log k)（需要弹出若干无效下标）
   - 空间: O(n)（记录所有出现过的 index 和堆）

4. 关键实现细节：
   - 每次 change 都把 index 入堆，而不是在替换时从旧堆中删除 index，这是因为从堆中删除任意元素代价较高。
     采用懒删除（lazy deletion）策略：find 时清理无效堆顶。
   - 使用 map[int]*MinHeap 保存每个数字的最小堆；使用 map[int]int 保存 index->number 最新映射。

5. 示例说明：
   - 按照题目示例的操作序列，可以看到堆和映射如何协同以返回最小下标。

6. 边界和注意点：
   - index 和 number 的范围很大，但调用次数受限（<=1e5），因此使用映射结构能很好地解决稀疏索引问题。
   - 如果频繁对同一 index 做大量替换，会导致堆中留下许多无效元素，find 时需要将它们弹出；总体调用次数限制保证此方法可行。

7. 扩展思考：
   - 如果需要支持删除操作或更复杂的查询（例如返回小于某值的最小下标），需要更复杂的数据结构（如平衡树或跳表）。
   - 若追求更稳定的 worst-case find 时间，可以考虑为每个数字还维护一个辅助哈希集合来判断堆顶有效性，但该方案对内存开销更大。
*/
