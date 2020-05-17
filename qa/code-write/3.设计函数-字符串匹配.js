var url1 =
  "https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33";
var url2 =
  "https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33";
var url3 =
  "https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33";

// 匹配 elective 后的数字输出（写出你认为的最优解法）

// 输出：[] || ["800"] || ["800", "700"]

{
  // 使用正则表达式
  const getUrlValue = (url) => {
    if (!url) return;
    let ret = url.match(/(?<=elective=)(\d+(,\d+)*)/);
    return ret ? ret[0].split(",") : [];
  };

  // test
  const ret1 = getUrlValue(url1);
  const ret2 = getUrlValue(url2);
  const ret3 = getUrlValue(url3);
  console.log(ret1, ret2, ret3);
}

{
  // 使用 API
  const getUrlValue = (url) => {
    const param = new URLSearchParams(url).get("elective");
    return param ? param.split(",") : [];
  };

  // test
  const ret1 = getUrlValue(url1);
  const ret2 = getUrlValue(url2);
  const ret3 = getUrlValue(url3);
  console.log(ret1, ret2, ret3);
}
