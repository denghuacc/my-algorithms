//  求两个日期中间的有效日期
// 如 '2015-2-8' 到 '2015-3-3'，返回 ['2015-2-8' '2015-2-9'...]

const getDays = (start, end) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const days = [];
  while (startTime <= endTime) {
    days.push(
      startTime.getFullYear() +
        "-" +
        (startTime.getMonth() + 1) +
        "-" +
        startTime.getDate()
    );
    startTime.setDate(startTime.getDate() + 1);
  }
  return days;
};

// test
const dayList = getDays("2015-2-8", "2015-3-3");
console.log(dayList);
