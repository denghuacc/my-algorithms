/*
 * @lc app=leetcode.cn id=380 lang=typescript
 *
 * [380] 常数时间插入、删除和获取随机元素
 *
 * https://leetcode-cn.com/problems/insert-delete-getrandom-o1/description/
 *
 * algorithms
 * Medium (49.26%)
 * Likes:    222
 * Dislikes: 0
 * Total Accepted:    18.7K
 * Total Submissions: 38K
 * Testcase Example:  '["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]\n' +
  '[[],[1],[2],[2],[],[1],[2],[]]'
 *
 * 设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构。
 * 
 * 
 * insert(val)：当元素 val 不存在时，向集合中插入该项。
 * remove(val)：元素 val 存在时，从集合中移除该项。
 * getRandom：随机返回现有集合中的一项。每个元素应该有相同的概率被返回。
 * 
 * 
 * 示例 :
 * 
 * 
 * // 初始化一个空的集合。
 * RandomizedSet randomSet = new RandomizedSet();
 * 
 * // 向集合中插入 1 。返回 true 表示 1 被成功地插入。
 * randomSet.insert(1);
 * 
 * // 返回 false ，表示集合中不存在 2 。
 * randomSet.remove(2);
 * 
 * // 向集合中插入 2 。返回 true 。集合现在包含 [1,2] 。
 * randomSet.insert(2);
 * 
 * // getRandom 应随机返回 1 或 2 。
 * randomSet.getRandom();
 * 
 * // 从集合中移除 1 ，返回 true 。集合现在包含 [2] 。
 * randomSet.remove(1);
 * 
 * // 2 已在集合中，所以返回 false 。
 * randomSet.insert(2);
 * 
 * // 由于 2 是集合中唯一的数字，getRandom 总是返回 2 。
 * randomSet.getRandom();
 * 
 * 
 */

export {};

// @lc code=start
/**
 * 常数时间插入、删除和获取随机元素的数据结构
 * 核心思路：结合数组和哈希表，数组提供O(1)随机访问，哈希表提供O(1)查找和删除
 *
 * 设计思想：
 * - 用数组存储所有元素，支持O(1)随机访问
 * - 用哈希表存储元素到数组索引的映射，支持O(1)查找
 * - 删除时将要删除的元素与最后一个元素交换，然后删除最后一个元素
 *
 * 时间复杂度：所有操作都是O(1)
 * 空间复杂度：O(n)，n为元素数量
 */
class RandomizedSet {
  private values: number[]; // 存储所有元素的数组
  private valToIdx: Map<number, number>; // 元素值到数组索引的映射

  constructor() {
    this.values = [];
    this.valToIdx = new Map();
  }

  /**
   * 插入元素
   * @param val 要插入的值
   * @returns 如果元素不存在则插入并返回true，否则返回false
   */
  insert(val: number): boolean {
    // 如果元素已存在，返回false
    if (this.valToIdx.has(val)) {
      return false;
    }

    // 将元素添加到数组末尾
    this.values.push(val);
    // 在哈希表中记录元素的索引位置
    this.valToIdx.set(val, this.values.length - 1);
    return true;
  }

  /**
   * 删除元素
   * @param val 要删除的值
   * @returns 如果元素存在则删除并返回true，否则返回false
   */
  remove(val: number): boolean {
    if (!this.valToIdx.has(val)) {
      return false;
    }

    // 获取要删除元素的索引
    const targetIndex = this.valToIdx.get(val)!;
    const lastIndex = this.values.length - 1;
    const lastElement = this.values[lastIndex];

    // 核心技巧：将最后一个元素移动到要删除元素的位置
    // 这样避免了数组元素的移动，保持O(1)时间复杂度
    this.values[targetIndex] = lastElement;

    // 更新被移动元素在哈希表中的索引
    this.valToIdx.set(lastElement, targetIndex);

    // 删除目标元素的映射关系
    this.valToIdx.delete(val);
    // 删除数组最后一个元素
    this.values.pop();

    return true;
  }

  /**
   * 随机获取一个元素
   * @returns 随机返回集合中的一个元素
   */
  getRandom(): number {
    // 生成[0, length)范围内的随机索引
    const randomIndex = Math.floor(Math.random() * this.values.length);
    return this.values[randomIndex];
  }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 需要设计支持O(1)时间复杂度的插入、删除、随机获取的数据结构
   - 关键挑战是删除操作，普通数组删除中间元素需要O(n)时间

2. 算法分析：
   - 时间复杂度：所有操作都是O(1)
   - 空间复杂度：O(n)，需要数组和哈希表存储数据
   - 算法类型：哈希表 + 动态数组的组合设计

3. 实现要点：
   - 核心数据结构：数组 + 哈希表的组合
   - 数组作用：支持O(1)随机访问，通过索引快速获取元素
   - 哈希表作用：支持O(1)查找，快速定位元素在数组中的位置
   - 删除技巧：swap and pop，将要删除的元素与最后一个元素交换

4. 关键算法：
   - 插入：直接添加到数组末尾，更新哈希表映射
   - 删除：将目标元素与最后元素交换，更新映射，删除末尾元素
   - 随机获取：生成随机索引，直接访问数组元素

5. 优化思路：
   - 边界情况处理：空集合时的随机获取
   - 内存优化：删除元素较多时可以考虑数组收缩
   - 扩展性：可以支持泛型，不仅限于数字类型
   - 性能优化：预分配数组大小以减少扩容次数

6. 常见错误：
   - 忘记更新被移动元素的索引映射
   - 删除操作的顺序错误，可能导致索引混乱
   - 随机数生成范围错误
*/
