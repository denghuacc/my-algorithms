/*
 * @lc app=leetcode id=3606 lang=typescript
 *
 * [3606] 优惠券校验器
 *
 * https://leetcode.cn/problems/coupon-code-validator/description/
 *
 * algorithms
 * Easy (53.67%)
 * Likes:    149
 * Dislikes: 52
 * Total Accepted:    60.7K
 * Total Submissions: 100.6K
 * Testcase Example:  '["SAVE20","","PHARMA5","SAVE@20"]\n' +
  '["restaurant","grocery","pharmacy","restaurant"]\n' +
  '[true,true,true,true]'
 *
 * 给你三个长度为 n 的数组 code、businessLine 和 isActive，描述 n 张优惠券的
 * 属性：
 *
 *
 * code[i]：字符串，表示优惠券编码。
 * businessLine[i]：字符串，表示优惠券所属业务线。
 * isActive[i]：布尔值，表示优惠券是否处于激活状态。
 *
 *
 * 当且仅当满足以下条件时，优惠券视为有效：
 *
 *
 * code[i] 非空，且仅包含字母、数字与下划线（a-z，A-Z，0-9，_）。
 * businessLine[i] 属于以下四类之一："electronics"、"grocery"、"pharmacy"、
 * "restaurant"。
 * isActive[i] 为 true。
 *
 *
 * 返回所有有效优惠券的编码，排序规则：
 * 先按业务线顺序 "electronics"、"grocery"、"pharmacy"、"restaurant" 排序，
 * 再在同一业务线内按编码字典序升序。
 *
 *
 * 示例 1：
 *
 *
 * 输入：code = ["SAVE20","","PHARMA5","SAVE@20"], businessLine =
 * ["restaurant","grocery","pharmacy","restaurant"], isActive =
 * [true,true,true,true]
 *
 * 输出：["PHARMA5","SAVE20"]
 *
 * 解释：
 *
 *
 * 第一张有效。
 * 第二张编码为空（无效）。
 * 第三张有效。
 * 第四张包含特殊字符 @（无效）。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：code = ["GROCERY15","ELECTRONICS_50","DISCOUNT10"], businessLine =
 * ["grocery","electronics","invalid"], isActive = [false,true,true]
 *
 * 输出：["ELECTRONICS_50"]
 *
 * 解释：
 *
 *
 * 第一张未激活（无效）。
 * 第二张有效。
 * 第三张业务线非法（无效）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == code.length == businessLine.length == isActive.length
 * 1 <= n <= 100
 * 0 <= code[i].length, businessLine[i].length <= 100
 * code[i] 和 businessLine[i] 由可打印 ASCII 字符组成。
 * isActive[i] 为 true 或 false。
 *
 *
 */

// @lc code=start
/**
 * 校验优惠券有效性，按业务线和编码排序后返回有效优惠券列表。
 * 顺序先按业务线优先级，再按编码字典序。
 *
 * @param code - 优惠券编码列表。
 * @param businessLine - 每个优惠券对应的业务线类别。
 * @param isActive - 是否处于激活状态。
 * @returns 按业务线顺序与编码字典序排序后的有效优惠券编码数组。
 */
function validateCoupons(
  code: string[],
  businessLine: string[],
  isActive: boolean[]
): string[] {
  const groups: string[][] = [[], [], [], []]; // 按业务线顺序分组存放有效编码
  const businessIndex: Record<string, number> = {
    electronics: 0,
    grocery: 1,
    pharmacy: 2,
    restaurant: 3,
  };
  const codePattern = /^[a-zA-Z0-9_]+$/; // 仅允许字母、数字和下划线
  const n = code.length;
  for (let i = 0; i < n; i++) {
    if (!isActive[i]) continue; // 未激活直接跳过
    if (!codePattern.test(code[i])) continue; // 编码不合法跳过
    const idx = businessIndex[businessLine[i]];
    if (idx === undefined) continue; // 业务线不在指定范围内
    groups[idx].push(code[i]); // 分配到对应业务线分组
  }

  const res: string[] = [];
  for (const group of groups) {
    group.sort(); // 组内按字典序升序
    res.push(...group);
  }
  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定优惠券的编码、业务线与激活状态，需要筛出有效优惠券。
   - 有效优惠券需要编码合法、业务线合法且处于激活状态。
   - 结果需要先按业务线固定顺序，再按编码字典序输出。

2. 算法分析：
   - 时间复杂度：O(n + k log k)，n 为优惠券数量，k 为有效券数量；
     排序是瓶颈。
   - 空间复杂度：O(k)，仅存储有效券分组。
   - 算法类型：哈希映射分类 + 分组排序。

3. 解题思路：
   - 核心思想：映射业务线到索引，将合法券放入对应数组，
     最后按组排序拼接。
   - 推导过程：分类顺序固定，可预先映射；编码合法性用正则一次判断。
   - 主要步骤概述：
     1) 预设业务线到分组索引的映射和合法编码正则。
     2) 单次遍历，按激活状态、编码、业务线依次过滤。
     3) 将合法券放入分组，组内排序后按分组顺序拼接输出。

4. 实现要点：
   - 业务线映射：`Record<string, number>` 便于 O(1) 查找并保持固定顺序。
   - 编码校验：正则 `^[a-zA-Z0-9_]+$` 同时保证非空与字符范围。
   - 边界情况处理：未激活、空编码、非法字符、非法业务线均直接跳过。

5. 算法优势：
   - 单次遍历过滤，时间开销主要在组内排序。
   - 使用分组避免排序时混淆业务线优先级，逻辑直观。

6. 核心算法步骤：
   - 建立业务线到索引的映射。
   - 遍历每个优惠券，按条件过滤并分组。
   - 对每个分组排序后按组顺序合并。

7. 示例分析：
   - 示例 1：`SAVE20` 和 `PHARMA5` 通过校验，按业务线和字典序输出
     `["PHARMA5","SAVE20"]`。
   - 示例 2：只有 `ELECTRONICS_50` 同时激活且业务线合法，输出
     `["ELECTRONICS_50"]`。
   - 额外示例：若输入 `code=["A_1","B@2"], businessLine=["grocery","grocery"],`
     `isActive=[true,true]`，只有 `A_1` 合法，结果为 `["A_1"]`。

8. 常见错误：
   - 遗漏非空校验：使用 `+` 保证至少一个字符。
   - 忘记业务线限定：需映射校验，否则非法业务线会被错误接受。
   - 排序顺序错误：必须先按业务线固定顺序，再组内字典序。

10. 扩展思考：
   - 可用计数排序替代组内排序（字符集有限时）以进一步加速。
   - 业务线动态扩展时，可维护顺序列表并生成映射以保持灵活性。
*/
