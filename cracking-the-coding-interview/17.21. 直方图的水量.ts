/**
 * 
给定一个直方图(也称柱状图)，假设有人从上面源源不断地倒水，最后直方图能存多少水量?直方图的宽度为 1。

上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的直方图，在这种情况下，可以接 6 个单位的水（蓝色部分表示水）。 
感谢 Marcos 贡献此图。

示例:

输入: [0,1,0,2,1,0,1,3,2,1,2,1]
输出: 6

难度：困难

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/volume-of-histogram-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

// the same as leetcode42
// stack
function trap(height: number[]): number {
  let res = 0;
  let cur = 0;
  const stack: number[] = [];

  while (cur < height.length) {
    while (stack.length && height[cur] > height[stack[stack.length - 1]]) {
      const top = stack[stack.length - 1];
      stack.pop();
      if (!stack.length) break;
      const distance = cur - stack[stack.length - 1] - 1;
      const boundedHeight =
        Math.min(height[cur], height[stack[stack.length - 1]]) - height[top];
      res += distance * boundedHeight;
    }
    stack.push(cur);
    cur++;
  }

  return res;
}

export {};
