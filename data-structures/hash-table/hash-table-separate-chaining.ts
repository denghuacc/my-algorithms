import LinkedList from "../linked-list/linked-list";

class ValuePair<K, V> {
  key: K;
  val: V;

  constructor(key: K, val: V) {
    this.key = key;
    this.val = val;
  }

  toString() {
    return `[#${this.key}: ${this.val}]`;
  }
}

interface Table<K, V> {
  [key: string]: LinkedList<ValuePair<K, V>>;
}

/**
 * @name HashTableSeparateChaining 哈希表
 * @description 使用链表分离解决哈希冲突
 */
export default class HashTableSeparateChaining<K, V> {
  table: Table<K, V>;

  constructor() {
    this.table = {};
  }

  hashCode(key: K): number {
    return this.loseloseHashCode(key);
  }

  // 散列方法
  private loseloseHashCode(key: K): number {
    if (typeof key === "number") return key;
    const tableKey = `${key}`;
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37; // 取余，37 是随机素数
  }

  // 增加值
  put(key: K, val: V): boolean {
    if (key && val) {
      const position = this.hashCode(key);
      if (!this.table[position]) {
        this.table[position] = new LinkedList<ValuePair<K, V>>(); // 链表存储
      }
      this.table[position].addLast(new ValuePair(key, val));
      return true;
    }
    return false;
  }

  // 获取值
  get(key: K): V | undefined {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.head;
      while (current) {
        if (current.val.key === key) {
          return current.val.val;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  // 移除值
  remove(key: K): boolean {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.head;
      while (current) {
        if (current.val.key === key) {
          linkedList.removeKey(current.val);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  getTable(): Table<K, V> {
    return this.table;
  }

  get size(): number {
    let count = 0;
    Object.values(this.table).forEach(
      (linkedList) => (count += linkedList.size)
    );
    return count;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear(): void {
    this.table = {};
  }

  toString(): string {
    if (this.isEmpty()) return "";
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}
