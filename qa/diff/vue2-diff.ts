// Vue2 snabbdom Diff 算法简版 -> 双端比较，普适性更强

// 相同 key 节点 patch 和移位 -> 新增节点 -> 删除节点

// - 首先定义新旧头尾的索引以及它的节点。
// - 然后进行循环比较，按照头比头、尾比尾、头比尾、尾比头的顺序比较 key 值，当 key 值相同时进行 patch，然后移位。
//   - 头比头：节点都向后更新为下一位，不需要移动 DOM。
//   - 尾比尾：节点都向前更新为下一位，不需要移动 DOM。
//   - 头比尾：头节点的 DOM 移到尾节点的 DOM 的后面，头节点都向后更新为下一位，尾节点都向前更新为上一位。
//   - 尾比头：尾节点的 DOM 移到头节点的 DOM 的前面，尾节点都向前更新为上一位，头节点都向后更新为下一位。
// - 如果上面的四种比较都没有找到，查找和新头节点相同 key 的旧节点。
//   - 如果没找到，说明是新增的节点，把他挂载到旧头的 DOM 前面（最前面）。
//   - 如果找到，先 patch，然后把这个节点移动到旧头的 DOM 前面（最前面），另外还要把这个节点旧值设为`undefined`。
//   - 新增条件，如果发现旧头的值`undefined`，节点更新为下一个，如果发现旧尾的值`undefined`，节点更新为上一个（条件放在最前面）
// - 循环结束后（结束条件是旧头索引大于旧尾索引 或者 新头索引大于新尾索引）
//   - 如果旧尾索引比旧头索引大，说明旧节点数量比新节点少，新增新头到新尾索引的节点的 DOM
//   - 如果新尾索引比新头索引大，说明新节点数量比旧节点少，删除旧头到旧尾索引的节点的 DOM

import { VNode } from "./types";

export function doubleSideDiff(
  prevChildren: VNode[],
  nextChildren: VNode[],
  container: HTMLElement,
  mount: Function,
  patch: Function
) {
  let oldStartIdx = 0;
  let oldEndIdx = prevChildren.length - 1;
  let newStartIdx = 0;
  let newEndIdx = nextChildren.length - 1;

  let oldStartVNode = prevChildren[oldStartIdx];
  let oldEndVNode = prevChildren[oldEndIdx];
  let newStartVNode = nextChildren[newStartIdx];
  let newEndVNode = nextChildren[newEndIdx];

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!oldStartVNode) {
      oldStartVNode = prevChildren[++oldStartIdx];
    } else if (!oldEndVNode) {
      oldEndVNode = prevChildren[--oldEndIdx];
    } else if (oldStartVNode.key === newStartVNode.key) {
      patch(oldStartVNode, newStartVNode, container);
      oldStartVNode = prevChildren[++oldStartIdx];
      newStartVNode = nextChildren[++newStartIdx];
    } else if (oldEndVNode.key === newEndVNode.key) {
      patch(oldEndVNode, newEndVNode, container);
      oldEndVNode = prevChildren[--oldEndIdx];
      newEndVNode = nextChildren[--newEndIdx];
    } else if (oldStartVNode.key === newEndVNode.key) {
      patch(oldStartVNode, newEndVNode, container);
      // 头节点的 DOM 移到尾节点的 DOM 的后面
      container.insertBefore(oldStartVNode.el, oldEndVNode.el.nextSibling);
      oldStartVNode = prevChildren[++oldStartIdx];
      newEndVNode = nextChildren[--newEndIdx];
    } else if (oldEndVNode.key === newStartVNode.key) {
      patch(oldEndVNode, newStartVNode, container);
      // 尾节点的 DOM 移到头节点的 DOM 前面
      container.insertBefore(oldEndVNode.el, oldStartVNode.el);
      oldEndVNode = prevChildren[--oldEndIdx];
      newStartVNode = nextChildren[++newStartIdx];
    }

    // 双端比较找不到相同的 key 时
    else {
      // 查找和新头节点相同 key 的旧节点
      const idxInOld = prevChildren.findIndex(
        (VNode) => VNode && VNode.key === newStartVNode.key
      );

      // 查找到，需要 patch 和把这个节点移动到旧头节点前面（最前面）
      // 最后把这个节点原来的位置的值设为 undefined -> 后面如果遍历到这个节点时需要移位
      if (idxInOld > -1) {
        const VNodeToMove = prevChildren[idxInOld];
        patch(VNodeToMove, newStartVNode, container);
        container.insertBefore(VNodeToMove.el, oldStartVNode.el);
        prevChildren[idxInOld] = undefined!;
      }

      // 查找不到，说明是新增的节点，直接挂载到旧头节点的 DOM 前面
      else {
        mount(newStartVNode, container, false, oldStartVNode.el);
      }

      newStartVNode = nextChildren[++newStartIdx]; // 更新新头节点
    }
  }

  // 循环结束后 -> 先增后减
  // 比较旧头尾和新头尾的索引大小，哪个大小相反了说明这个数量少
  // 然后根据情况是新增节点还是删除节点

  // 新增节点 -> 旧头索引大于旧头尾索引时（旧节点数量比新节点少）
  if (oldStartIdx > oldEndIdx) {
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      mount(nextChildren[i], container, false, oldStartVNode.el);
    }
  }

  // 删除节点 -> 新头索引大于新尾索引时（新节点数量比旧节点少）
  else if (newStartIdx > newEndIdx) {
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      container.removeChild(prevChildren[i].el);
    }
  }
}
