// 实现一个字符串匹配算法，从长度为 n 的字符串 S 中，
// 查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置

{
  const find = (S, T) => S.indexOf(T);
}

{
  const find = (S, T) => S.search(T);
}

{
  const find = (S, T) => {
    if (S.length < T.length) return -1;
    for (let i = 0; i < S.length - T.length + 1; i++) {
      if (S.substr(i, T.length) === T) return i;
    }
    return -1;
  };

  // test
  const S = "hello world";
  const T = "world";
  const ret = find(S, T);
  console.log(ret);
  console.log(S.indexOf(T));
  console.log(S.search(T));
}
