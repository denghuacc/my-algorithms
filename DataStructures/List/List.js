/**
 * @name List
 * @description 列表基于数组
 * 其实这个列表已经不是传统意义上的列表了，主要用来学习 Array 的 API
 * 手动实现 Array 的很多 API
 * ! 注意：因为队列中可能存在重复元素，查找和删除元素都是从头部开始查找到的第一个
 */
class List {
  constructor() {
    this.array = []
    this.size = 0
    this.pos = 0
  }

  // 在第 index 位置插入元素
  add(index, element) {
    // this.array.splice(index, 0, element) // JS自带方法

    for (let i = this.size - 1; i > index; i--) {
      this.array[i + 1] = this.array[i] // 从数组末尾开始，往后挪一位
    }

    this.array[index] = element

    this.size++
  }

  // 在列表的末尾添加新元素
  addLast(element) {
    // this.array.push(element) // JS自带方法

    this.add(this.size, element)
  }

  // 在列表的最前面添加新元素
  addFirst(element) {
    // this.array.unshift(element) // JS自带方法

    this.add(0, element)
  }

  // 删除第 index 位置的元素，返回删除的元素
  remove(index) {
    // this.array.splice(index, 1) // JS自带方法

    if (index < 0 || index >= this.size) return

    const ret = this.array[index] // 存储要删除的元素

    for (let i = index + 1; i < this.size; i++) {
      this.array[i - 1] = this.array[i] // 从删除的元素后面开始，往前挪一位
    }

    this.array.length-- // 长度减一，删除最后一个值；JS最简单的方法，其他的方法最后一个值要么为 null，要么为 empty
    this.size--
    return ret
  }

  // 删除最后一个元素
  removeLast() {
    // this.array.pop() // JS自带方法

    this.remove(this.size - 1)
  }

  // 删除最前面的元素
  removeFirst() {
    // this.array.shift() // JS自带方法

    this.remove(0)
  }

  // 删除指定的元素，删除成功返回 true，删除失败返回 false
  removeElement(element) {
    const index = this.find(element)

    if (index > -1) {
      this.remove(index)
      return true
    }
    return false
  }

  // 列表长度
  getSize() {
    // return this.array.length

    return this.size
  }

  // 展示列表
  print() {
    console.log(this.array)
  }

  // 清空列表中所有的元素
  clear() {
    // this.array.length = 0 // JS自带方法
    // this.size = this.pos = 0

    delete this.array
    this.array = []
    this.size = this.pos = 0
  }

  // 查找元素，找到返回 true，元素不存在返回 false
  contains(element) {
    // return this.array.includes(element) // JS自带方法

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] === element) {
        return true
      }
    }
    return false
  }

  // 查找元素，返回元素的索引，元素不存在返回 -1
  find(element) {
    // return this.array.indexOf(element) // JS自带方法

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] === element) {
        return i
      }
    }
    return -1
  }

  // 返获取 index 索引位置的元素
  get(index) {
    if (index < 0 || index >= this.size) return
    return this.array[index]
  }

  // 设置 index 索引位置的元素
  set(index, element) {
    if (index < 0 || index >= this.size) return
    this.array[index] = element
  }

  // 将列表的当前位置设移动到第一个元素
  front() {
    this.pos = 0
  }

  // 将列表的当前位置移动到最后一个元素
  end() {
    this.pos = this.size - 1
  }

  // 将当前位置往前移动一位
  prev() {
    if (this.pos > 0 && this.pos < this.size) {
      this.pos--
    }
  }

  // 将当前位置往后移动一位
  next() {
    if (this.pos < this.size - 1) {
      this.pos++
    }
  }

  // 返回列表的当前位置
  currPos() {
    return this.pos
  }

  // 将当前位置移动到指定位置
  moveTo(position) {
    this.pos = position
  }

  // 返获当前位置的元素
  getCurElement() {
    return this.array[this.pos]
  }

  // 判断列表是否为空
  isEmpty() {
    return this.size === 0
  }
}

module.exports = List
