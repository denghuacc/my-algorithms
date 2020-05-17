// 写个程序把 entry 转换成如下对象

var entry = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

// 要求转换成如下对象
var output = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
};

{
  const transformObj = (entry) => {
    const ret = {};
    const keys = Object.keys(entry);
    for (const key of keys) {
      const everyKey = key.split(".");
      everyKey.reduce((acc, cur, index, arr) => {
        if (index === arr.length - 1) {
          acc[cur] = entry[key];
          return;
        }
        acc[cur] = acc[cur] || {};
        return acc[cur];
      }, ret);
    }
    return ret;
  };

  // test
  const ret = transformObj(entry);
  console.log(ret);
  console.log(ret.a.b.c);
}
