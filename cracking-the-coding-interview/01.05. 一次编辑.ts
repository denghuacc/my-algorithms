/**
 * 
字符串有三种编辑操作:插入一个英文字符、删除一个英文字符或者替换一个英文字符。 
给定两个字符串，编写一个函数判定它们是否只需要一次(或者零次)编辑。

示例 1:
输入: 
first = "pale"
second = "ple"
输出: True
 

示例 2:
输入: 
first = "pales"
second = "pal"
输出: False

难度：中等

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/one-away-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

// string
function oneEditAway(first: string, second: string): boolean {
  const m = first.length;
  const n = second.length;
  if (n - m === 1) {
    return oneInsert(first, second);
  } else if (m - n === 1) {
    return oneInsert(second, first);
  } else if (m === n) {
    let hasDiff = false;
    for (let i = 0; i < m; i++) {
      if (first[i] !== second[i]) {
        if (hasDiff) {
          return false;
        }
        hasDiff = true;
      }
    }
    return true;
  } else {
    return false;
  }

  function oneInsert(shorter: string, longer: string) {
    const l1 = shorter.length;
    const l2 = longer.length;
    let idx1 = 0;
    let idx2 = 0;
    while (idx1 < l1 && idx2 < l2) {
      if (shorter[idx1] === longer[idx2]) {
        idx1++;
      }
      idx2++;
      if (idx2 - idx1 > 1) {
        return false;
      }
    }
    return true;
  }
}
