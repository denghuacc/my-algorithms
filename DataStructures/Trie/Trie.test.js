const Trie = require('./Trie')

const trie = new Trie()

trie.add('cat')

console.log(trie.getSize());

console.log(trie.contains('cat'))
console.log(trie.isPrefix('ca'))
