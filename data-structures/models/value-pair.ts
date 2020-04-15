export class ValuePair<K, V> {
  constructor(public key: K, public val: V) {}

  toString() {
    return `[#${this.key}: ${this.val}]`
  }
}
