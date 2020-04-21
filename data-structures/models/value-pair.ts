export class ValuePair<K, V> {
  constructor(public key: K, public val: V) {}

  toString() {
    return `[#${this.key}: ${this.val}]`
  }
}

export class ValuePairLazy<K, V> extends ValuePair<K, V> {
  constructor(public key: K, public val: V, public isDeleted = false) {
    super(key, val)
  }
}
