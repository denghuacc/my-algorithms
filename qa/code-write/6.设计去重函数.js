// 根据以下要求，写一个数组去重函数(蘑菇街)

// 如传入的数组元素为`[123, "meili", "123", "mogu", 123]`，
// 则输出：`[123, "meili", "123", "mogu"]`
// 如传入的数组元素为`[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]`，
// 则输出：`[123, [1, 2, 3], [1, "2", 3], "meili"]`
// 如传入的数组元素为`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]`，
// 则输出：`[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]`

const removeRepeat = (arr) => {
  return [
    ...new Set(
      arr.map((item) =>
        isObj(item)
          ? JSON.stringify(parseObj(item))
          : !item
          ? item
          : JSON.stringify(item)
      )
    ),
  ].map((item) => (!item ? item : JSON.parse(item)));

  // 对象重整 对 key 进行排序
  function parseObj(obj) {
    let keys = Object.keys(obj).sort();
    let newObj = {};
    for (let key of keys) {
      obj[key] = isObj(obj[key]) ? parseObj(obj[key]) : obj[key];
      newObj[key] = obj[key];
    }
    return newObj;
  }

  function isObj(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  }
};

// test
const arr1 = [123, "meili", "123", "mogu", 123];
const arr2 = [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"];
const arr3 = [
  123,
  { a: 1 },
  { a: { b: 1 } },
  { a: "1" },
  { a: { b: 1 } },
  "meili",
];

const ret1 = removeRepeat(arr1);
const ret2 = removeRepeat(arr2);
const ret3 = removeRepeat(arr3);

console.log(ret1);
console.log(ret2);
console.log(ret3);
