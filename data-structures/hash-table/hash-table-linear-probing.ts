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
  [key: string]: ValuePair<K, V>;
}

/**
 * @name HashTableLinearProbing 哈希表
 * @description 使用线性探测解决哈希冲突
 */
export default class HashTableLinearProbing<K, V> {
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
        this.table[position] = new ValuePair(key, val);
      } else {
        let index = position + 1;
        while (this.table[index]) {
          index++;
        }
        this.table[index] = new ValuePair(key, val);
      }
      return true;
    }
    return false;
  }

  // 获取值
  get(key: K): V | undefined {
    const position = this.hashCode(key);

    if (this.table[position]) {
      if (this.table[position].key === key) {
        return this.table[position].val;
      }
      let index = position + 1;
      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] && this.table[index].key === key) {
        return this.table[position].val;
      }
    }
    return undefined;
  }

  // 移除值
  remove(key: K): boolean {
    const position = this.hashCode(key);

    if (this.table[position]) {
      if (this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] && this.table[index].key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  // 重置删除后的哈希，删除其它相同哈希的值，防止哈希冲突
  private verifyRemoveSideEffect(key: K, removedPosition: number): void {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    while (this.table[index]) {
      const posHash = this.hashCode(this.table[index].key);
      if (posHash <= hash || posHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      index++;
    }
  }

  getTable(): Table<K, V> {
    return this.table;
  }

  get size(): number {
    return Object.keys(this.table).length;
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
