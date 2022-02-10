export default class Deque<T> {
  items: Record<string, T>;
  count: number;
  lowestCount: number;

  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  get size(): number {
    return this.count - this.lowestCount;
  }

  pushFront(val: T) {
    this.lowestCount--;
    this.items[this.lowestCount] = val;
  }

  pushBack(val: T) {
    this.items[this.count] = val;
    this.count++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return res;
  }

  popBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const res = this.items[this.count];
    delete this.items[this.count];
    return res;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toArray(): T[] {
    return Object.values(this.items);
  }
}
