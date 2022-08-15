export default class Deque<T> {
  items: Record<string, T>;
  frontPointer: number;
  rearPointer: number;

  constructor() {
    this.items = {};
    this.frontPointer = 0;
    this.rearPointer = 0;
  }

  get size(): number {
    return this.rearPointer - this.frontPointer;
  }

  pushFront(val: T) {
    this.frontPointer--;
    this.items[this.frontPointer] = val;
  }

  pushLast(val: T) {
    this.items[this.rearPointer] = val;
    this.rearPointer++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.frontPointer];
    delete this.items[this.frontPointer];
    this.frontPointer++;
    return res;
  }

  popLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.rearPointer--;
    const res = this.items[this.rearPointer];
    delete this.items[this.rearPointer];
    return res;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontPointer];
  }

  peekLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.rearPointer - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear() {
    this.items = {};
    this.rearPointer = 0;
    this.frontPointer = 0;
  }

  toArray(): T[] {
    return Object.values(this.items);
  }
}
