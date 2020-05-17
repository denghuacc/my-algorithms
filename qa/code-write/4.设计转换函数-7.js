// 请写一个函数，完成以下功能
// 输入 `1,2,3,5,7,8,10` 输出 `1~3,5,7~8,10`

const transformStr = (str) => {
  let arr = str.split(",").map((i) => i.trim());
  let i = 0;
  let ret = [];
  for (let j = 1; j <= arr.length; j++) {
    if (arr[j] - arr[j - 1] !== 1) {
      const item = j - i === 1 ? arr[i] : `${arr[i]}~${arr[j - 1]}`;
      ret.push(item);
      i = j;
    }
  }
  return ret.join(",");
};

// test
const str = "1, 2, 3, 5, 7, 8, 10";
const ret = transformStr(str);
console.log(ret);
