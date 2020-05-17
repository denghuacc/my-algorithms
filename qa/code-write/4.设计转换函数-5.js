// 请把两个数组 `['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']` 和 `['A', 'B', 'C', 'D']`，
// 合并为 `['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']`

const mergeArr = (arr1, arr2) => {
  const arr3 = arr2.map((i) => i + 3);
  const ret = arr1
    .concat(arr3) // 拼接
    .sort() // 正序排序
    .map((item) => {
      if (item.includes("3")) {
        return item.split("")[0]; // 把上面拼接的 3 去除掉
      }
      return item; // 返回新值
    });

  return ret;
};

// test
const arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
const arr2 = ["A", "B", "C", "D"];
const ret = mergeArr(arr1, arr2);
console.log(ret);
