/*
 * @lc app=leetcode.cn id=1865 lang=typescript
 *
 * [1865] 找出和为指定值的下标对
 *
 * https://leetcode.cn/problems/finding-pairs-with-a-certain-sum/description/
 *
 * algorithms
 * Medium (51.77%)
 * Likes:    39
 * Dislikes: 0
 * Total Accepted:    15.3K
 * Total Submissions: 26.7K
 * Testcase Example:  '["FindSumPairs","count","add","count","count","add","add","count"]\n' +
  '[[[1,1,2,2,2,3],[1,4,5,2,5,4]],[7],[3,2],[8],[4],[0,1],[1,1],[7]]'
 *
 * 给你两个整数数组 nums1 和 nums2 ，请你实现一个支持下述两类查询的数据结构：
 * 
 * 
 * 累加 ，将一个正整数加到 nums2 中指定下标对应元素上。
 * 计数 ，统计满足 nums1[i] + nums2[j] 等于指定值的下标对 (i, j) 数目（0  且 0 ）。
 * 
 * 
 * 实现 FindSumPairs 类：
 * 
 * 
 * FindSumPairs(int[] nums1, int[] nums2) 使用整数数组 nums1 和 nums2 初始化 FindSumPairs
 * 对象。
 * void add(int index, int val) 将 val 加到 nums2[index] 上，即，执行 nums2[index] +=
 * val 。
 * int count(int tot) 返回满足 nums1[i] + nums2[j] == tot 的下标对 (i, j) 数目。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
 * [[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1],
 * [1, 1], [7]]
 * 输出：
 * [null, 8, null, 2, 1, null, null, 11]
 * 
 * 解释：
 * FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5,
 * 2, 5, 4]);
 * findSumPairs.count(7);  // 返回 8 ; 下标对 (2,2), (3,2), (4,2), (2,4), (3,4),
 * (4,4) 满足 2 + 5 = 7 ，下标对 (5,1), (5,5) 满足 3 + 4 = 7
 * findSumPairs.add(3, 2); // 此时 nums2 = [1,4,5,4,5,4]
 * findSumPairs.count(8);  // 返回 2 ；下标对 (5,2), (5,4) 满足 3 + 5 = 8
 * findSumPairs.count(4);  // 返回 1 ；下标对 (5,0) 满足 3 + 1 = 4
 * findSumPairs.add(0, 1); // 此时 nums2 = [2,4,5,4,5,4]
 * findSumPairs.add(1, 1); // 此时 nums2 = [2,5,5,4,5,4]
 * findSumPairs.count(7);  // 返回 11 ；下标对 (2,1), (2,2), (2,4), (3,1), (3,2),
 * (3,4), (4,1), (4,2), (4,4) 满足 2 + 5 = 7 ，下标对 (5,3), (5,5) 满足 3 + 4 = 7
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 1 
 * 1 
 * 1 
 * 0 
 * 1 
 * 1 
 * 最多调用 add 和 count 函数各 1000 次
 * 
 * 
 */

export {};

// @lc code=start
class FindSumPairs {
    // 存储两个原始数组
    nums1: number[];
    nums2: number[];
    // 哈希表：记录 nums2 中每个数字出现的次数
    cnt: Map<number, number>;

    constructor(nums1: number[], nums2: number[]) {
        this.nums1 = nums1;
        this.nums2 = nums2;
        this.cnt = new Map();
        
        // 初始化哈希表，统计 nums2 中每个数字的出现次数
        for (const num of nums2) {
            this.cnt.set(num, (this.cnt.get(num) || 0) + 1);
        }
    }

    /**
     * 将 val 加到 nums2[index] 上
     * 同时更新哈希表中的计数
     */
    add(index: number, val: number): void {
        // 获取修改前的值
        const oldVal = this.nums2[index];
        // 减少旧值的计数
        this.cnt.set(oldVal, (this.cnt.get(oldVal) || 0) - 1);
        
        // 更新 nums2 中的值
        this.nums2[index] += val;
        
        // 获取修改后的新值
        const newVal = this.nums2[index];
        // 增加新值的计数
        this.cnt.set(newVal, (this.cnt.get(newVal) || 0) + 1);
    }

    /**
     * 统计满足 nums1[i] + nums2[j] == tot 的下标对数目
     */
    count(tot: number): number {
        let res = 0;
        
        // 遍历 nums1 中的每个数字
        for (const num of this.nums1) {
            // 计算需要在 nums2 中找到的补数
            const rest = tot - num;
            // 累加 nums2 中补数的出现次数
            res += this.cnt.get(rest) || 0;
        }
        
        return res;
    }
}

/**
 * Your FindSumPairs object will be instantiated and called as such:
 * var obj = new FindSumPairs(nums1, nums2)
 * obj.add(index,val)
 * var param_2 = obj.count(tot)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个数据结构，支持动态修改 nums2 中的元素，并快速统计满足 nums1[i] + nums2[j] = target 的下标对数量
   - 关键特点：nums1 不变，nums2 可以动态修改，需要高效的查询和更新操作

2. 算法分析：
   - 时间复杂度：
     * 构造函数：O(n)，其中 n 是 nums2 的长度
     * add 操作：O(1)，哈希表的增删操作
     * count 操作：O(m)，其中 m 是 nums1 的长度
   - 空间复杂度：O(n)，哈希表存储 nums2 中每个数字的出现次数
   - 算法类型：哈希表 + 计数

3. 实现要点：
   - 核心思想：使用哈希表维护 nums2 中每个数字的出现次数
   - 对于 count 操作：遍历 nums1，对每个数字 num，在哈希表中查找 (target - num) 的出现次数
   - 对于 add 操作：更新哈希表中对应数字的计数
   - 关键数据结构：Map<number, number> 用于 O(1) 时间复杂度的查找和更新

4. 优化思路：
   - 哈希表的使用避免了每次 count 时都要遍历 nums2
   - 维护计数而不是存储所有位置，减少了空间复杂度
   - add 操作只需要更新两个计数，而不是重新构建整个哈希表

5. 示例分析：
   初始状态：nums1 = [1,1,2,2,2,3], nums2 = [1,4,5,2,5,4]
   哈希表：{1:1, 4:2, 5:2, 2:1}
   
   count(7) 过程：
   - 遍历 nums1: [1,1,2,2,2,3]
   - 对于 1：查找 7-1=6，计数为 0
   - 对于 2：查找 7-2=5，计数为 2，贡献 2*3=6 个对
   - 对于 3：查找 7-3=4，计数为 2，贡献 2*1=2 个对
   - 总计：6+2=8 个对

6. 边界情况处理：
   - 哈希表中不存在的数字返回 0
   - add 操作时，如果某个数字的计数变为 0，仍然保留在哈希表中（不影响结果）

7. 类似问题：
   - 两数之和问题
   - 统计满足条件的数对数量
   - 动态数据结构设计问题
*/

