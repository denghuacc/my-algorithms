// 某公司 1 到 12 月份的销售额存在一个对象里面
// 如下：`{1:222, 2:123, 5:888}`，
// 请把数据处理为如下结构：`[222, 123, null, null, 888, null, null, null, null, null, null, null]`

{
  const reverseObj = (obj) => {
    const arr = [];
    for (let i = 1; i <= 12; i++) {
      if (obj[i.toString()]) {
        arr.push(obj[i.toString()]);
      } else {
        arr.push(null);
      }
    }
    return arr;
  };

  // test
  const obj = { 1: 222, 2: 123, 5: 888 };
  const ret = reverseObj(obj);
  console.log(ret);
}

{
  // 方法二
  const reverseObj = (obj) =>
    Array.from({ length: 12 }).map((acc, item) => obj[item + 1] || null);

  // test
  const obj = { 1: 222, 2: 123, 5: 888 };
  const ret = reverseObj(obj);
  console.log(ret);
}
