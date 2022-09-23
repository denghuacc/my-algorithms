/*
 * @lc app=leetcode.cn id=707 lang=golang
 *
 * [707] 设计链表
 *
 * https://leetcode.cn/problems/design-linked-list/description/
 *
 * algorithms
 * Medium (33.86%)
 * Likes:    585
 * Dislikes: 0
 * Total Accepted:    156K
 * Total Submissions: 457K
 * Testcase Example:  '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]\n' +
  '[[],[1],[3],[1,2],[1],[1],[1]]'
 *
 * 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next
 * 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
 *
 * 在链表类中实现这些功能：
 *
 *
 * get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
 * addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
 * addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
 * addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index
 * 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
 * deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 *
 *
 *
 *
 * 示例：
 *
 * MyLinkedList linkedList = new MyLinkedList();
 * linkedList.addAtHead(1);
 * linkedList.addAtTail(3);
 * linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
 * linkedList.get(1);            //返回2
 * linkedList.deleteAtIndex(1);  //现在链表是1-> 3
 * linkedList.get(1);            //返回3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 所有val值都在 [1, 1000] 之内。
 * 操作次数将在  [1, 1000] 之内。
 * 请不要使用内置的 LinkedList 库。
 *
 *
*/

package leetcode

// @lc code=start
type LinkedListNode struct {
	Val        int
	Next, Prev *LinkedListNode
}

type MyLinkedList struct {
	Head, Tail *LinkedListNode
	size       int
}

func Constructor() MyLinkedList {
	return MyLinkedList{}
}

func (l *MyLinkedList) Get(index int) int {
	if l.size == 0 || index < 0 || index >= l.size {
		return -1
	}
	cur := l.GetCurNode(index)
	return cur.Val
}

func (l *MyLinkedList) AddAtHead(val int) {
	node := &LinkedListNode{Val: val}
	if l.size == 0 {
		l.Head = node
		l.Tail = node
	} else {
		node.Next = l.Head
		l.Head.Prev = node
		l.Head = node
	}
	l.size++
}

func (l *MyLinkedList) AddAtTail(val int) {
	node := &LinkedListNode{Val: val}
	if l.size == 0 {
		l.Head = node
		l.Tail = node
	} else {
		node.Prev = l.Tail
		l.Tail.Next = node
		l.Tail = node
	}
	l.size++
}

func (l *MyLinkedList) AddAtIndex(index int, val int) {
	if index > l.size {
		return
	}
	if index <= 0 {
		l.AddAtHead(val)
		return
	}
	if index == l.size {
		l.AddAtTail(val)
		return
	}
	cur := l.GetCurNode(index)
	node := &LinkedListNode{Val: val}
	prev := cur.Prev
	node.Prev = prev
	prev.Next = node
	node.Next = cur
	cur.Prev = node
	l.size++
}

func (l *MyLinkedList) DeleteAtIndex(index int) {
	if l.size == 0 || index < 0 || index >= l.size {
		return
	}
	if index == 0 {
		l.Head = l.Head.Next
		l.size--
		return
	}
	if index == l.size-1 {
		l.Tail = l.Tail.Prev
		l.size--
		return
	}
	cur := l.GetCurNode(index)
	prev, next := cur.Prev, cur.Next
	prev.Next = next
	next.Prev = prev
	l.size--
}

func (l *MyLinkedList) GetCurNode(index int) *LinkedListNode {
	var cur *LinkedListNode
	if index < l.size-index {
		cur = l.Head
		for index > 0 {
			cur = cur.Next
			index--
		}
	} else {
		cur = l.Tail
		index = l.size - index - 1
		for index > 0 {
			cur = cur.Prev
			index--
		}
	}
	return cur
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * obj := Constructor();
 * param_1 := obj.Get(index);
 * obj.AddAtHead(val);
 * obj.AddAtTail(val);
 * obj.AddAtIndex(index,val);
 * obj.DeleteAtIndex(index);
 */
// @lc code=end
