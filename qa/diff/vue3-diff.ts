// Vue3 inferno Diff 算法简版

// 把相同顺序的 key 节点的前置和后置的相同的节点先全部去掉，然后再进行对比，可以显著提高效率
// 这里使用了最长增长子序列，在移动节点的时候使用他们

import { VNode } from "./types";

export function advancedDiff(
  prevChildren: VNode[],
  nextChildren: VNode[],
  container: HTMLElement,
  mount: Function,
  patch: Function
) {
  let j = 0;
  let prevVNode = prevChildren[j];
  let nextVNode = nextChildren[j];
  let prevEnd = prevChildren.length - 1;
  let nextEnd = nextChildren.length - 1;

  outer: {
    // 去相同前置 -> 向后遍历，直到 key 不同
    while (prevVNode.key === nextVNode.key) {
      patch(prevVNode, nextVNode, container);
      j++;
      if (j > prevEnd || j > nextEnd) break outer; // 性能优化
      prevVNode = prevChildren[j];
      nextVNode = nextChildren[j];
    }

    prevVNode = prevChildren[prevEnd];
    nextVNode = nextChildren[nextEnd];

    // 去相同后置 -> 向前遍历，直到 key 不同
    while (prevVNode.key === nextVNode.key) {
      patch(prevVNode, nextVNode, container);
      prevEnd--;
      nextEnd--;
      if (j > prevEnd || j > nextEnd) break outer; // 性能优化
      prevVNode = prevChildren[prevEnd];
      nextVNode = nextChildren[nextEnd];
    }
  }

  // 新增节点 -> j ~ nextEnd 之间的节点应该被添加
  if (j > prevEnd && j <= nextEnd) {
    const nextPos = nextEnd + 1;
    const refNode =
      nextPos < nextChildren.length ? nextChildren[nextPos].el : null;
    while (j <= nextEnd) {
      mount(nextChildren[j++], container, false, refNode);
    }
  }

  // 删除节点 -> j ~ prevEnd 之间的节点应该被删除
  else if (j > nextEnd) {
    while (j <= prevEnd) {
      container.removeChild(prevChildren[j++].el);
    }
  } else {
    const nextLeft = nextEnd - j + 1; // 新值未处理的节点数量
    const source = new Array(nextLeft).fill(-1); // 长度 nextLeft 填充 -1 的数组
    const prevStart = j;
    const nextStart = j;
    let moved = false;
    let lastIndex = 0; // 类似 react diff 的最大索引值

    let keyIndex: Record<string, number> = {}; // 新值 key 的索引映射表 key -> index

    for (let i = nextStart; i <= nextEnd; i++) {
      keyIndex[nextChildren[i].key] = i;
    }

    let patched = 0;

    // 遍历旧值
    for (let i = prevStart; i <= prevEnd; i++) {
      prevVNode = prevChildren[i];

      if (patched < nextLeft) {
        const k = keyIndex[prevVNode.key]; // 根据 key 查找它的索引
        if (typeof k !== "undefined") {
          nextVNode = nextChildren[k];
          patch(prevVNode, nextVNode, container);
          patched++;
          source[k - nextStart] = i; // 更新值，k - j 真正索引值
          if (k < lastIndex) {
            moved = true; // 需要移动节点
          } else {
            lastIndex = k;
          }
        } else {
          container.removeChild(prevVNode.el); // 没找到索引，删除节点
        }
      } else {
        container.removeChild(prevVNode.el); // 多余的节点，删除节点
      }
    }

    if (moved) {
      const seq = lis(source); // 最长增长子序列
      let l = seq.length - 1;

      // 从后面开始遍历
      for (let i = nextLeft - 1; i >= 0; i--) {
        // 新增节点，挂载到 nextPos 前面
        if (source[i] === -1) {
          const pos = i + nextStart;
          const nextVNode = nextChildren[pos];
          const nextPos = pos + 1;
          mount(
            nextVNode,
            container,
            false,
            nextPos < nextChildren.length ? nextChildren[nextPos].el : null
          );
        }

        // 移动节点，移动到 nextPos 前面（非递增子序列）
        else if (i !== seq[l]) {
          const pos = i + nextStart;
          const nextVNode = nextChildren[pos];
          const nextPos = pos + 1;
          container.insertBefore(
            nextVNode.el,
            nextPos < nextChildren.length ? nextChildren[nextPos].el : null
          );
        } else {
          l--;
        }
      }
    }
  }
}

// 最长增长子序列 longest increasing subsequence
// 函数返回其中一组子序列的索引
function lis(seq: number[]) {
  const valueToMax: Record<number, number> = {};
  let len = seq.length;
  for (let i = 0; i < len; i++) {
    valueToMax[seq[i]] = 1;
  }
  let i = len - 1;
  let last = seq[i];
  let prev = seq[i - 1];
  while (typeof prev !== "undefined") {
    let j = i;
    while (j < len) {
      last = seq[j];
      if (prev < last) {
        const currentMax = valueToMax[last] + 1;
        valueToMax[prev] =
          valueToMax[prev] !== 1
            ? valueToMax[prev] > currentMax
              ? valueToMax[prev]
              : currentMax
            : currentMax;
      }
      j++;
    }
    i--;
    last = seq[i];
    prev = seq[i - 1];
  }

  const lis = [];
  i = 1;
  while (--len >= 0) {
    const n = seq[len];
    if (valueToMax[n] === i) {
      i++;
      lis.unshift(len);
    }
  }

  return lis;
}
