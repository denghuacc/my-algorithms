// 数组结构转换
// 如何将`[{id: 1}, {id: 2, pId: 1}, ...]` 的重复数组（有重复数据）
// 转成树形结构的数组 `[{id: 1, children: [{id: 2, pId: 1}]}, ...]` （需要去重）

const reverseArr = (arr) => {
  const res = [];
  const map = arr.reduce((acc, item) => ((acc[item.id] = item), acc), {});
  for (const item of Object.values(map)) {
    if (!item.pId) {
      res.push(item);
    } else {
      const parent = map[item.pId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
};

// test
const arr = [{ id: 1 }, { id: 2, pId: 1 }];
const ret = reverseArr(arr);
console.log(ret);
console.log(ret[0].children);
