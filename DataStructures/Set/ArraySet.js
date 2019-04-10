class ArraySet {
  constructor() {
    this.array = []
  }

  getSize() {
    return this.array.length
  }

  isEmpty() {
    return this.array.length === 0
  }

  contains(element) {
    return this.array.includes(element)
  }

  add(element) {
    if (!this.contains(element)) {
      this.array.push(element)
    }
  }

  remove(element) {
    const index = this.array.indexOf(element)
    if (index > -1) {
      this.array.splice(index, 1)
    }
  }
}
