// 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，
// 请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。

// 例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。

const sortColor = (str, rule) => {
  const arr = str.split("");
  const obj = rule.split("").reduce((acc, item, id) => {
    acc[item] = id;
    return acc;
  }, {});
  return arr.sort((a, b) => obj[a] - obj[b]);
};

// test
const str = "红蓝蓝黄红黄蓝红红黄红";
const rule = "黄红蓝";
const ret = sortColor(str, rule);
console.log(ret);
