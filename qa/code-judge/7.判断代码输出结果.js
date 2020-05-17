//  下面的代码打印什么内容，为什么？

String("11") == new String("11"); // true
String("11") === new String("11"); // false

// `String()`返回的是`string`，`new String()` 返回的类型是 `object`，它们类型不同，无法全等。
// `==` 使用了隐式转换`toString()`，把 `new String()` 的类型转成 `string`，所以不是严格意义下时相等。
