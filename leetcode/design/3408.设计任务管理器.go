/*
 * @lc app=leetcode.cn id=3408 lang=golang
 *
 * [3408] 设计任务管理器
 *
 * https://leetcode.cn/problems/design-task-manager/description/
 *
 * algorithms
 * Medium (27.57%)
 * Likes:    20
 * Dislikes: 0
 * Total Accepted:    8K
 * Total Submissions: 18.7K
 * Testcase Example:  '["TaskManager","add","edit","execTop","rmv","add","execTop"]\n' +
  '[[[[1,101,10],[2,102,20],[3,103,15]]],[4,104,5],[102,8],[],[101],[5,105,15],[]]'
 *
 * 一个任务管理器系统可以让用户管理他们的任务，每个任务有一个优先级。这个系统需要高效地处理添加、修改、执行和删除任务的操作。
 *
 * 请你设计一个 TaskManager 类：
 *
 *
 *
 * TaskManager(vector<vector<int>>& tasks) 初始化任务管理器，初始化的数组格式为 [userId, taskId,
 * priority] ，表示给 userId 添加一个优先级为 priority 的任务 taskId 。
 *
 *
 * void add(int userId, int taskId, int priority) 表示给用户 userId 添加一个优先级为
 * priority 的任务 taskId ，输入 保证 taskId 不在系统中。
 *
 *
 * void edit(int taskId, int newPriority) 更新已经存在的任务 taskId 的优先级为 newPriority
 * 。输入 保证 taskId 存在于系统中。
 *
 *
 * void rmv(int taskId) 从系统中删除任务 taskId 。输入 保证 taskId 存在于系统中。
 *
 *
 * int execTop() 执行所有用户的任务中优先级 最高 的任务，如果有多个任务优先级相同且都为 最高 ，执行 taskId
 * 最大的一个任务。执行完任务后，taskId 从系统中 删除 。同时请你返回这个任务所属的用户 userId 。如果不存在任何任务，返回 -1
 * 。
 *
 *
 *
 * 注意 ，一个用户可能被安排多个任务。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：
 * ["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
 * [[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [],
 * [101], [5, 105, 15], []]
 *
 * 输出：
 * [null, null, null, 3, null, null, 5]
 *
 * 解释：
 * TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3,
 * 103, 15]]); // 分别给用户 1 ，2 和 3 初始化一个任务。
 * taskManager.add(4, 104, 5); // 给用户 4 添加优先级为 5 的任务 104 。
 * taskManager.edit(102, 8); // 更新任务 102 的优先级为 8 。
 * taskManager.execTop(); // 返回 3 。执行用户 3 的任务 103 。
 * taskManager.rmv(101); // 将系统中的任务 101 删除。
 * taskManager.add(5, 105, 15); // 给用户 5 添加优先级为 15 的任务 105 。
 * taskManager.execTop(); // 返回 5 。执行用户 5 的任务 105 。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= tasks.length <= 10^5
 * 0 <= userId <= 10^5
 * 0 <= taskId <= 10^5
 * 0 <= priority <= 10^9
 * 0 <= newPriority <= 10^9
 * add ，edit ，rmv 和 execTop 的总操作次数 加起来 不超过 2 * 10^5 次。
 * 输入保证 taskId 是合法的。
 *
 *
*/

package leetcode

// @lc code=start
import "container/heap"

type TaskManager struct {
	taskInfo map[int][2]int
	heap     *MyHeap
}

func Constructor(tasks [][]int) TaskManager {
	tm := TaskManager{
		taskInfo: make(map[int][2]int),
		heap:     &MyHeap{},
	}
	heap.Init(tm.heap)

	for _, task := range tasks {
		userId, taskId, priority := task[0], task[1], task[2]
		tm.taskInfo[taskId] = [2]int{priority, userId}
		heap.Push(tm.heap, Task{priority: priority, taskId: taskId})
	}
	return tm
}

func (this *TaskManager) Add(userId int, taskId int, priority int) {
	this.taskInfo[taskId] = [2]int{priority, userId}
	heap.Push(this.heap, Task{priority: priority, taskId: taskId})
}

func (this *TaskManager) Edit(taskId int, newPriority int) {
	if info, ok := this.taskInfo[taskId]; ok {
		info[0] = newPriority
		this.taskInfo[taskId] = info
		heap.Push(this.heap, Task{priority: newPriority, taskId: taskId})
	}
}

func (this *TaskManager) Rmv(taskId int) {
	delete(this.taskInfo, taskId)
}

func (this *TaskManager) ExecTop() int {
	for this.heap.Len() > 0 {
		task := heap.Pop(this.heap).(Task)
		priority, taskId := task.priority, task.taskId
		if info, ok := this.taskInfo[taskId]; ok && info[0] == priority {
			userId := info[1]
			delete(this.taskInfo, taskId)
			return userId
		}
	}
	return -1
}

type Task struct {
	priority int
	taskId   int
}

type MyHeap []Task

func (pq MyHeap) Len() int {
	return len(pq)
}

func (pq MyHeap) Less(i, j int) bool {
	if pq[i].priority != pq[j].priority {
		return pq[i].priority > pq[j].priority
	}
	return pq[i].taskId > pq[j].taskId
}

func (pq MyHeap) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
}

func (pq *MyHeap) Push(x interface{}) {
	*pq = append(*pq, x.(Task))
}

func (pq *MyHeap) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[0 : n-1]
	return item
}

/**
 * Your TaskManager object will be instantiated and called as such:
 * obj := Constructor(tasks);
 * obj.Add(userId,taskId,priority);
 * obj.Edit(taskId,newPriority);
 * obj.Rmv(taskId);
 * param_4 := obj.ExecTop();
 */
// @lc code=end
