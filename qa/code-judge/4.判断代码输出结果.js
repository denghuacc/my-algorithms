//  下面的代码打印什么内容，为什么？

function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com";

  // 变量 o 指向新的地址，以后的变动和旧地址无关
  o = new Object();
  o.siteUrl = "http://www.google.com";
}
const webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);

// 打印结果：'http://www.baidu.com'
// 原因：对象 o 被重新赋值后，指向了新的地址，以后的变动和旧地址无关
