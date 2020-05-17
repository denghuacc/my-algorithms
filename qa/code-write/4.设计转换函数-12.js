// 将 '10000000000' 形式的字符串，以每 3 位进行分隔展示 '10.000.000.000'

{
  // 正则寻找字符空隙加 .
  const reverseStr = (str) => str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // test
  const str = "10000000000";
  const ret = reverseStr(str);
  console.log(ret);
}

{
  // 寻找数字并在其后面加 .
  const reverseStr = (str) => str.replace(/(\d)(?=(\d{3})+\b)/g, "$1.");

  // test
  const str = "10000000000";
  const ret = reverseStr(str);
  console.log(ret);
}
