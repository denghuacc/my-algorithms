// 手动实现工具函数 / API

{
  // 连字符转驼峰
  const camelizeRE = /-(\w)/g;
  const camelize = (str) => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
  };

  // 驼峰转连字符
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = (str) => {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
  };

  // test
  const str = "hale-deng";

  const str1 = camelize(str);
  console.log(str1); // haleDeng

  const str2 = hyphenate(str1);
  console.log(str2); // hale-deng
}

{
  // 只执行一次
  const once = (fn) => {
    let called = false;
    return function (...args) {
      if (called) return;
      called = true;
      return fn.apply(this, args);
    };
  };

  // test
  const fn = once((x) => x);
  console.log(fn(1));
  console.log(fn(1));
  console.log(fn(1));
}

{
  // 延迟执行
  const delay = (fn, wait, ...args) => setTimeout(fn, wait, ...args);

  // test
  delay(
    function (text) {
      console.log(text);
    },
    1000,
    "later"
  );
}

{
  // 手动实现 JSON.parse()
  // 方法一 new Function
  const jsonParse = (jsonStr) => new Function("return " + jsonStr)(); // 利用了 new Function 的特性 string => object

  // 方法二 eval
  const jsonParse2 = (jsonStr) => eval("(" + jsonStr + ")");

  // test
  const jsonStr = '{ "age": 20, "name": "jack" }';
  const newStr1 = JSON.parse(jsonStr);
  const newStr2 = jsonParse(jsonStr);
  const newStr3 = jsonParse2(jsonStr);
  console.log(newStr1);
  console.log(newStr2);
  console.log(newStr3);
}

{
  // 手动实现 object.create()
  const create = (proto) => {
    function F() {}
    F.prototype = proto;
    return new F();
  };

  // test
  const obj = { name: "hale" };
  const o1 = Object.create(obj);
  const o2 = create(obj);
  console.log(o1.name);
  console.log(o2.name);
}
