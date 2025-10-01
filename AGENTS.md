# GitHub Copilot AI Agent Instructions

## 项目概述

这是一个算法学习项目，包含数据结构实现、算法练习和 LeetCode 题目解答。项目的核心目标是通过高质量的代码注释和详细的解题思路来帮助学习和理解算法。

## 适用范围

本指导文档适用于以下文件和目录：

- `algorithms/**/*.ts` - 算法实现文件
- `data-structures/**/*.ts` - 数据结构实现文件
- `leetcode/**/*.ts` - LeetCode 题目解答
- `leetcode-pick/**/*.ts` - 精选 LeetCode 题目
- `cracking-the-coding-interview/**/*.ts` - 程序员面试金典题目

## 代码注释规范

### 1. 文件头部注释

对于算法实现文件，应包含：

````typescript
/**
 * 算法名称 - 简短描述
 *
 * @description 详细描述算法的用途和特点
 * @timeComplexity O(?) - 时间复杂度
 * @spaceComplexity O(?) - 空间复杂度
 * @category 算法分类（如：排序、搜索、动态规划等）
 *
 * @example
 * ```typescript
 * const result = algorithmName(input);
 * console.log(result); // 预期输出
 * ```
 */
````

### 2. 函数注释规范

每个函数都应该有清晰的 JSDoc 注释：

````typescript
/**
 * 函数功能描述
 *
 * @param paramName - 参数描述，包括类型和约束
 * @returns 返回值描述
 * @throws 可能抛出的异常描述
 *
 * @example
 * ```typescript
 * const result = functionName(param);
 * ```
 */
````

### 3. 行内注释规范

- **关键步骤注释**：解释算法的核心步骤
- **复杂逻辑注释**：说明不直观的代码逻辑
- **优化点注释**：解释为什么这样实现（性能、空间等考虑）
- **边界条件注释**：说明特殊情况的处理

```typescript
// 初始化双指针，left 指向数组开始，right 指向数组结尾
let left = 0;
let right = nums.length - 1;

// 使用二分查找思想，每次排除一半的搜索空间
while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  // 找到目标值，直接返回索引
  if (nums[mid] === target) {
    return mid;
  }

  // 目标值在左半部分，缩小搜索范围
  if (nums[mid] > target) {
    right = mid - 1;
  } else {
    // 目标值在右半部分，缩小搜索范围
    left = mid + 1;
  }
}
```

## LeetCode 题目解答规范

### 文件结构要求

**严格按照三段式结构组织代码，绝对不能打乱顺序：**

1. **题目描述部分**（顶部）- 来自 LeetCode 插件，**禁止修改**
2. **算法实现部分**（中间）- 在 `@lc code=start` 和 `@lc code=end` 之间
3. **解题思路部分**（底部）- 详细的思路分析和总结
4. **函数签名** - 必须保留 LeetCode 提供的函数签名，禁止修改。有的时候 TypeScript 会有多个解法，此时可能会使用了 var 声明多个函数，禁止修改函数式子。

### 解题思路注释模板

```typescript
/*
解题思路详解：

1. 问题本质：
   - 用1-2句话概括问题的核心
   - 识别问题的关键特征和约束条件

2. 算法分析：
   - 时间复杂度：O(?) - 详细解释为什么是这个复杂度
   - 空间复杂度：O(?) - 说明额外空间的使用
   - 算法类型：动态规划/贪心/双指针/滑动窗口/回溯等

3. 解题思路：
   - 核心思想：说明采用的主要解题策略
   - 关键观察：导致选择这种方法的关键洞察
   - 算法步骤：按顺序列出具体步骤

4. 实现要点：
   - 数据结构选择：为什么选择这些数据结构
   - 边界条件处理：如何处理特殊情况
   - 优化技巧：提高性能的关键点

5. 示例分析：
   - 通过具体例子展示算法执行过程
   - 关键步骤的状态变化
   - 边界情况的处理方式

6. 常见陷阱：
   - 容易出错的地方
   - 如何避免这些错误
   - 调试技巧

7. 扩展思考：
   - 类似问题的解法
   - 算法的变种和优化
   - 实际应用场景
*/
```

## 代码质量要求

### 1. 变量命名规范

```typescript
// ✅ 好的命名：具有语义性
const leftPointer = 0;
const rightPointer = nums.length - 1;
const maxProfit = 0;
const currentSum = 0;

// ❌ 避免的命名：无意义的单字母
const a = 0;
const x = nums.length - 1;
```

### 2. 代码结构清晰

```typescript
// ✅ 清晰的函数结构
function twoSum(nums: number[], target: number): number[] {
  // 1. 初始化哈希表，用于存储数值和索引的映射
  const numMap = new Map<number, number>();

  // 2. 遍历数组，查找目标值
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    // 3. 检查哈希表中是否存在complement
    if (numMap.has(complement)) {
      return [numMap.get(complement)!, i];
    }

    // 4. 将当前数值和索引存入哈希表
    numMap.set(nums[i], i);
  }

  // 5. 未找到解，返回空数组（根据题意，必有解）
  return [];
}
```

### 3. 类型安全

```typescript
// ✅ 明确的类型声明
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// ✅ 使用类型守卫
function isValidNode(node: TreeNode | null): node is TreeNode {
  return node !== null;
}

// ✅ 恰当的类型断言
const result = someFunction() as number[];
```

## 算法分类指导

### 动态规划

- **识别特征**：最优子结构、重叠子问题
- **注释重点**：状态定义、状态转移方程、初始化条件
- **代码模式**：一维/二维DP数组、状态转移、边界处理

### 回溯算法

- **识别特征**：需要遍历所有可能的解
- **注释重点**：递归树结构、剪枝条件、回溯操作
- **代码模式**：递归函数、选择列表、路径记录

### 贪心算法

- **识别特征**：局部最优导致全局最优
- **注释重点**：贪心策略的正确性证明、选择标准
- **代码模式**：排序、优先队列、局部决策

### 双指针技术

- **识别特征**：数组/链表的对撞或快慢指针
- **注释重点**：指针移动的条件、终止条件
- **代码模式**：while循环、指针更新逻辑

### 滑动窗口

- **识别特征**：子数组/子字符串问题
- **注释重点**：窗口扩展/收缩的条件、窗口状态维护
- **代码模式**：双指针、哈希表/计数器

## 性能优化指导

### 时间复杂度优化

```typescript
// ✅ 优化前：O(n²) 暴力解法
// 说明为什么这个复杂度不够好
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    // 暴力搜索
  }
}

// ✅ 优化后：O(n) 哈希表解法
// 说明如何通过数据结构优化时间复杂度
const map = new Map();
for (let i = 0; i < n; i++) {
  // 利用哈希表的O(1)查找特性
}
```

### 空间复杂度优化

```typescript
// ✅ 空间优化：将二维DP压缩为一维
// 说明为什么可以这样优化，以及如何保证正确性
const dp = new Array(n).fill(0);
for (let i = 0; i < m; i++) {
  // 从后往前更新，避免覆盖还需要使用的值
  for (let j = n - 1; j >= 0; j--) {
    dp[j] = Math.max(dp[j], dp[j - 1] + nums[i]);
  }
}
```

## 调试和测试指导

### 1. 边界条件测试

```typescript
// 在解题思路中说明需要测试的边界条件：
// - 空数组/空字符串
// - 单元素数组
// - 最大/最小值边界
// - 重复元素
// - 负数/零值
```

### 2. 示例追踪

```typescript
// 在注释中提供具体的执行追踪：
/*
示例追踪：nums = [2,7,11,15], target = 9

第1轮：i=0, nums[0]=2
- complement = 9-2 = 7
- map中无7，将(2,0)存入map
- map: {2: 0}

第2轮：i=1, nums[1]=7  
- complement = 9-7 = 2
- map中有2，索引为0
- 返回[0, 1]
*/
```

## 编写风格偏好

### 1. 注释密度

- 每个关键步骤都要有注释
- 复杂的一行代码要有解释
- 不明显的优化技巧要说明原因

### 2. 代码可读性

- 使用有意义的变量名
- 适当的空行分隔逻辑块
- 一致的缩进和格式

### 3. 教学性质

- 优先考虑代码的可理解性
- 在注释中解释"为什么"而不仅是"做什么"
- 提供多种解法的对比

## AI Agent 工作指南

作为 GitHub Copilot，在处理这个项目时请：

1. **严格遵循文件结构**：特别是 LeetCode 文件的三段式结构
2. **提供教学性注释**：不仅要有代码实现，更要有思路解释
3. **注重算法分析**：每个解法都要有时间和空间复杂度分析
4. **包含示例追踪**：通过具体例子展示算法执行过程
5. **考虑多种解法**：在可能的情况下提供不同的解题思路
6. **优化意识**：说明代码的优化点和改进空间
7. **实践导向**：注释要有助于读者理解和学习算法思想

记住：这个项目的价值在于学习过程，而不仅仅是解决问题。好的注释和思路分析比完美的代码更重要。
