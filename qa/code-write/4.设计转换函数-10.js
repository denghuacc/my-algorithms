// 扑克牌问题(头条)

// 有一堆扑克牌，将牌堆第一张放到桌子上，再将接下来的牌堆的第一张放到牌底，如此往复；
// 最后桌子上的牌顺序为： (牌底) 1,2,3,4,5,6,7,8,9,10,11,12,13 (牌顶)；
// 问：原来那堆牌的顺序，用函数实现。

const reverseArr = (arr) => {
  let i = 1;
  let out = [];
  while (arr.length) {
    if (i % 2) {
      out.unshift(arr.pop());
    } else {
      out.unshift(out.pop());
    }
    i++;
  }
  return out;
};

// test
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const ret = reverseArr(arr);
console.log(ret);
