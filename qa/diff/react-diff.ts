// React diff 算法简版

// 相同 key 节点 patch 和移位 -> 新增节点 -> 删除节点

// 缺点：节点都是玩后移的，如果原来在最后的节点变成在最前面了，它之前的节点都要忘后移一遍

// - 先遍历新的节点，然后再遍历旧的节点，查看是否找到旧的节点，
// 这里需要设置变量`lastIndex`为旧节点的最大索引值，初始值为 0。变量`canFind`表示是否找到对应的旧节点，默认值是`false`。
//   - 如果找到，先 patch。然后看下它的旧节点的索引是否比最大索引值小
//     - 如果是的话移动节点到新节点的前面
//     - 如果不是的话更新`lastIndex`的值
//   - 如果找不到，说明是新增的节点，把它插入到新节点前面节点的 DOM 的后面或者旧节点 DOM 的最前面
// - 然后再次遍历旧节点，然后在把每个旧的节点拿到新的节点中去查找 key 值
//   - 如果找不到，说明新的节点中没有这个值了，需要删除这个节点
//   - 如果找到不用处理

import { VNode } from "./types";

export function reactDiff(
  prevChildren: VNode[],
  nextChildren: VNode[],
  container: HTMLElement,
  mount: Function,
  patch: Function
) {
  let lastIndex = 0; // prevChildren 最大索引值，初始值是 0

  for (let i = 0; i < nextChildren.length; i++) {
    const nextVNode = nextChildren[i];
    let j = 0;
    let canFind = false;

    for (j; j < prevChildren.length; j++) {
      const prevVNode = prevChildren[j];
      if (nextVNode.key === prevVNode.key) {
        canFind = true;
        patch(prevVNode, nextVNode, container); // 复用旧节点 -> 更新值

        // 比当前的最大索引小时，需要移动真实节点
        if (j < lastIndex) {
          const refNode = nextChildren[i - 1].el.nextSibling; // 参考节点：前一个 VNode 的真实节点的下一个兄弟节点
          container.insertBefore(prevVNode.el, refNode); // 移动到参考节点的前面，即前一个真实节点的后面
        } else {
          lastIndex = j; // 更新 lastIndex 的值
        }
      }
    }

    // 新增节点，紧跟在前一个节点后面或者最前面
    if (!canFind) {
      const refNode =
        i - 1 < 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling;
      mount(nextVNode, container, false, refNode); // isSVG = false
    }
  }

  // 删除节点 -> nextChildren 的节点中不存在对应的 key 的节点
  for (let i = 0; i < prevChildren.length; i++) {
    const prevVNode = prevChildren[i];
    const has = nextChildren.find(
      (nextVnode) => nextVnode.key === prevVNode.key
    );
    if (!has) {
      container.removeChild(prevVNode.el);
    }
  }
}
