/**
 * Array 数组
 */
public class Array<E> {
	private E[] data; // 数组存储
	private int size; // 要插入的值的位置， 同时相当于数组的长度

	// 构造函数，传入数组的容量 capacity 构造 Array
	public Array(int capacity) {
		data = (E[]) new Object[capacity];
		size = 0;
	}

	// 无参数的构造函数，默认数组的容量 capacity = 10
	public Array() {
		this(10);
	}

	// 返回数组中元素的个数
	public int getSize() {
		return size;
	}

	// 返回数组的容量
	public int getCapacity() {
		return data.length;
	}

	// 返回数组是否为空
	public boolean isEmpty() {
		return size == 0;
	}

	// 从所有元素后添加一个新元素
	public void addLast(E e) {
		// if (size == data.length) {
		// throw new IllegalArgumentException("AddLast failed. Array is full.");
		// }

		// data[size] = e;
		// size++;

		add(size, e);
	}

	// 从所有元素前添加一个新元素
	public void addFirst(E e) {
		add(0, e);
	}

	// 在第 index 个位置插入一个新元素 e
	public void add(int index, E e) {
		if (index < 0 || index > size) {
			throw new IllegalArgumentException("AddLast failed. Require index >= 0 and index <= size.");
		}

		if (size == data.length) {
			resize(data.length * 2); // 扩容 2 倍
		}

		for (int i = size - 1; i >= index; i--) {
			data[i + 1] = data[i]; // 从数组末尾开始，往后挪一位
		}

		data[index] = e; // 设置新元素
		size++;
	}

	// 获取 index 索引位置的元素
	public E get(int index) {
		if (index < 0 || index >= size) {
			throw new IllegalArgumentException("Get failed. Index is illegal.");
		}

		return data[index];
	}

	// 获取数组最后一个元素
	public E getLast() {
		return get(size - 1);
	}

	// 获取数组第一个元素
	public E getFirst() {
		return get(0);
	}

	// 设置 index 索引位置的元素 e
	public void set(int index, E e) {
		if (index < 0 || index >= size) {
			throw new IllegalArgumentException("Get failed. Index is illegal.");
		}

		data[index] = e;
	}

	// 查找数组中是否有元素 e
	public boolean contains(E e) {
		for (int i = 0; i < size; i++) {
			if (data[i].equals(e)) {
				return true;
			}
		}

		return false;
	}

	// 查找数组中元素 e 的索引，如果不存在元素 e，则返回 -1
	// 注意，数组可能同时存在多个元素 e，返回的是顺序查找的第一个值的索引
	public int find(E e) {
		for (int i = 0; i < size; i++) {
			if (data[i].equals(e)) {
				return i;
			}
		}

		return -1;
	}

	// 查找数组中元素 e 的所有的索引
	// public int findAll(int e) {}

	// 从数组中删除第一个元素，返回删除的元素
	public E removeFirst() {
		return remove(0);
	}

	// 从数组中删除最后一个元素，返回删除的元素
	public E removeLast() {
		return remove(size - 1);
	}

	// 从数组中删除元素 e，删除成功返回 true，删除失败返回 false
	// 注意：只删除找到的第一个元素 e
	public boolean removeElement(E e) {
		int index = find(e); // 查找要删除元素的索引，只查找到第一个
		if (index != -1) {
			remove(index); // 删除元素
			return true;
		}
		return false;
	}

	// 从数组中删除找到的所有元素 e
	// public boolean removeAllElement(int e) {}

	// 从数组中删除 index 位置的元素， 返回删除的元素
	public E remove(int index) {

		if (index < 0 || index > size) {
			throw new IllegalArgumentException("AddLast failed. Require index >= 0 and index <= size.");
		}

		E ret = data[index]; // 存储删除的元素

		for (int i = index + 1; i < size; i++) {
			data[i - 1] = data[i];
		}

		size--;
		data[size] = null; // 之后会被后面的添加的元素覆盖，也可以设置为 null 释放内存

		// lazy 方案，在 1/4 的时候再缩容 而不是 1/2 , 防止复杂度震荡
		// 当 data.length == 1 时，可能出现小于 1 的缩容，设置条件 data.length / 2 != 0
		if (size == data.length / 4 && data.length / 2 != 0) {
			resize(data.length / 2); // 缩容 1/2
		}
		return ret;
	}

	@Override
	public String toString() {
		StringBuilder res = new StringBuilder();
		res.append(String.format("Array: size = %d , capacity = %d\n", size, data.length));
		res.append("[");
		for (int i = 0; i < size; i++) {
			res.append(data[i]);
			if (i != size - 1) {
				res.append(", ");
			}
		}
		res.append("]");
		return res.toString();
	}

	// 改变数组的容量
	private void resize(int newCapacity) {
		E[] newData = (E[]) new Object[newCapacity];
		for (int i = 0; i < size; i++) {
			newData[i] = data[i];
		}
		data = newData;

	}

}
