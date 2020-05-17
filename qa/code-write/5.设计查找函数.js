// 已知数据格式，实现一个函数 find 找出链条中所有的父级 id

var value = "112";
var find = (value) => {
  // ...
};
find("data", value); // 输出 [1， 11]
var data = [
  {
    id: "1",
    name: "广东省",
    children: [
      {
        id: "11",
        name: "深圳市",
        children: [
          {
            id: "111",
            name: "南山区",
          },
          {
            id: "112",
            name: "福田区",
          },
        ],
      },
    ],
  },
];

{
  const find = (data, value) => {
    let ret = [];
    dfs(data);
    return ret;

    function dfs(arr, temp = []) {
      for (const node of arr) {
        if (node.id === value) {
          ret = temp;
          return;
        } else {
          if (node.children) dfs(node.children, temp.concat(node.id));
        }
      }
    }
  };

  const res = find(data, "112");
  console.log(res); // ['1', '11']
}
