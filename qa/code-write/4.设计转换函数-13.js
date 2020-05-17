// 随机生成一个长度为 10 的整数类型的数组，例如 `[2, 10, 3, 4, 5, 11, 10, 11, 20]`，
// 将其排列成一个新数组，要求新数组形式如下，例如 `[[2, 3, 4, 5], [10, 11], [20]]`

const transformArr = (arr) => {
  const tempArr = arr
    .sort((a, b) => a - b) // 排序
    .reduce((acc, i) => (acc.includes(i) ? acc : acc.concat(i)), []); // 去重

  const map = new Map();

  // 分区
  for (let i of tempArr) {
    const key = Math.floor(i / 10);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.set(key, map.get(key).concat(i));
  }

  // 重组
  return [...map.values()];
};

// test
const arr = [2, 10, 3, 4, 5, 11, 10, 11, 20];
const ret = transformArr(arr);
console.log(ret);
