const SegmentTree = require('./SegmentTree')

const nums = [-2, 0, 3, -5, 2, -1]

const merge = (a, b) => a + b // 求和

const segmentTree = new SegmentTree(nums, merge)

console.log(segmentTree.data)
console.log(segmentTree.tree)

console.log(segmentTree.query(0, 2)) // 区间 [-2, 0, 3] 之和 注意 queryR 不是下标
console.log(segmentTree.query(2, 5)) // 区间 [3, -5, 2, -1] 之和
console.log(segmentTree.query(0, 5)) // 区间 [-2, 0, 3, -5, 2, -1] 之和

segmentTree.set(1, 10) // 修改索引为 1 的值为 10  => [-2, 10, 3, -5, 2, -1]

console.log(segmentTree.data)

console.log(segmentTree.query(0, 2)) // 区间 [-2, 10, 3] 之和
console.log(segmentTree.query(2, 5)) // 区间 [3, -5, 2, -1] 之和
console.log(segmentTree.query(0, 5)) // 区间 [-2, 10, 3, -5, 2, -1] 之和

const negTree = new SegmentTree([[-1]], merge)
console.log(negTree.query(0, 0))
