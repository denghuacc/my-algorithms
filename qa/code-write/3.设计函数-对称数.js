//  打印出 1 - 10000 之间的所有对称数

const getSymmetryNumber = (range) => {
  const arr = [...Array(range).keys()];
  const nums = arr.filter(
    (x) => x.toString().length > 1 && x === Number(reverse(x))
  );
  return nums;

  function reverse(x) {
    return x.toString().split("").reverse().join("");
  }
};

// test
console.log(getSymmetryNumber(10000));
