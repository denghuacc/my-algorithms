//  求并集、交集

// 并集
const union = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

// 交集
const intersection = (arr1, arr2) => {
  const intersectionSet = [];
  arr1.forEach((item) => {
    if (arr2.indexOf(item) > -1) {
      intersectionSet.push(item);
    }
  });
  return intersectionSet;
};

// test
const arr1 = [1, 2, 3];
const arr2 = [1, 4, 5];

const unionSet = union(arr1, arr2);
console.log(unionSet); // [ 1, 2, 3, 4, 5 ]

const intersectionSet = intersection(arr1, arr2);
console.log(intersectionSet); // [ 1 ]
