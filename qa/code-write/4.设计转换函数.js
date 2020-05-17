// 写个程序把 entry 转换成如下对象

var entry = {
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

// 要求转换成如下对象
var output = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

{
  function flatObj(obj, parentKey = "", result = {}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        let keyName = `${parentKey}${key}`;
        if (typeof obj[key] === "object") {
          flatObj(obj[key], keyName + ".", result);
        } else {
          result[keyName] = obj[key];
        }
      }
    }
    return result;
  }

  // test
  const ret = flatObj(entry);
  console.log(ret);
}
