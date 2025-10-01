---
applyTo: "**/leetcode/**,**/leetcode-pick/*.ts,**/algorithms/**,**/data-structures/**,**/cracking-the-coding-interview/**"
description: "算法学习与数据结构项目 - 提供高质量的代码注释和详细的解题思路"
---

# 算法学习与数据结构项目指南

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

### 文件头部注释

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

### 函数注释规范

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

### 行内注释规范

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

## LeetCode 题目解答规范

### 文件结构要求

**严格按照三段式结构组织代码，绝对不能打乱顺序：**

1. **题目描述部分**（顶部）- 来自 LeetCode 插件，**禁止修改**
2. **算法实现部分**（中间）- 在 `@lc code=start` 和 `@lc code=end` 之间
3. **解题思路部分**（底部）- 详细的思路分析和总结

### 解题思路注释模板

当解答算法题时，请按照以下结构提供详细的解答：

#### 1. 题目理解

- **问题本质**：用1-2句话概括问题的核心
- **关键特点**：列出题目的重要特征和约束条件
- **目标**：明确要优化的指标（时间、空间、最值等）

#### 2. 解题思路

##### 核心思想

- 说明采用的主要算法思路或数据结构
- 解释为什么选择这种方法

##### 算法步骤

按顺序列出具体的解题步骤：

1. **第一步**：数据预处理或初始化
2. **第二步**：核心算法逻辑
3. **第三步**：结果处理或优化

#### 3. 代码实现

##### 完整代码

```typescript
// 提供完整的、可运行的代码实现
// 包含详细的注释说明关键步骤
```

##### 关键函数说明

- 解释核心函数的作用和参数
- 说明重要的数据结构选择

#### 4. 复杂度分析

- **时间复杂度**：O(?) 并解释为什么
- **空间复杂度**：O(?) 并解释为什么
- **关键观察**：导致该复杂度的核心原因

#### 5. 示例分析

##### 图解过程

- 用具体示例展示算法执行过程
- 画出关键的数据结构变化
- 逐步展示算法的每个阶段

##### 边界情况

- 列出需要特别处理的边界情况
- 说明算法如何处理这些情况

#### 6. 算法要点总结

##### 核心技巧

- 总结解题中使用的关键技巧
- 说明可以应用到类似问题的通用方法

##### 优化要点

- 列出提高性能的优化策略
- 解释为什么这些优化有效

##### 类似问题

- 提及可以用相同思路解决的其他问题
- 说明算法的适用范围

#### 7. 常见错误

- 列出容易犯的错误
- 提供避免这些错误的建议

---

### 模板使用说明

1. **层次清晰**：从宏观到微观，从思路到实现
2. **图文并茂**：用示例和图解帮助理解
3. **注重细节**：包含复杂度分析和边界情况
4. **举一反三**：总结通用方法和类似问题
5. **实用性强**：提供完整可运行的代码

记住：好的算法解答不仅要正确，更要让读者理解思路、学会方法、触类旁通。

## 算法代码文件结构规范

### 文件结构说明

每个算法代码文件必须严格按照以下三个部分组织，**绝对不能打乱顺序**：

#### 1. 题目描述部分（顶部）

```typescript
/*
 * @lc app=leetcode.cn id=题目编号 lang=typescript
 *
 * [题目编号] 题目标题
 *
 * https://leetcode.cn/problems/问题链接/description/
 *
 * algorithms
 * 难度 (通过率%)
 * Likes:    点赞数
 * Dislikes: 点踩数
 * Total Accepted:    通过次数
 * Total Submissions: 提交次数
 * Testcase Example:  '测试用例'
 *
 * 题目详细描述...
 *
 * 示例：
 * 输入：...
 * 输出：...
 * 解释：...
 *
 * 提示：
 * - 约束条件1
 * - 约束条件2
 */

export {};
```

**重要规则：**

- 这部分内容来自 LeetCode 插件，**禁止修改或删除**
- 保持原有的注释格式和内容
- `lang=typescript` 等语言标识不可更改

#### 2. 算法实现部分（中间）

```typescript
// @lc code=start
function 函数名(参数列表): 返回类型 {
  // 在这里实现算法逻辑
  // 可以添加详细的实现注释
  // 解释关键步骤和数据结构选择
}
// @lc code=end
```

**编码规范：**

- 函数签名来自 LeetCode 插件，**不要修改函数名和参数**
- 在函数内部添加实现代码
- 可以添加辅助函数（在主函数前面）
- 注释要简洁明了，解释关键逻辑
- 使用有意义的变量名

备注：必须保留 LeetCode 提供的函数签名，禁止修改。有的时候 TypeScript 会有多个解法，此时可能会使用了 var 声明多个函数，禁止修改函数式子。

#### 3. 解题思路部分（底部）

```typescript
/*
解题思路详解：

1. 问题本质：
   - 核心问题描述
   - 关键特点分析

2. 算法分析：
   - 时间复杂度：O(?)
   - 空间复杂度：O(?)
   - 算法类型：(如：动态规划、贪心、图论等)

3. 实现要点：
   - 关键数据结构选择
   - 核心算法步骤
   - 边界情况处理

4. 优化思路：
   - 性能优化点
   - 代码简化技巧
   - 内存优化策略

5. 算法优势（可选）
   - 突出解法的优点

6. 核心算法步骤（可选）
   - 简单列出算法的每一步骤

7. 示例分析
   - 通过具体例子说明解法的有效性

8. 类似问题
   - 举一反三的扩展

9. 常见错误
   - 实用的避坑指南

10. 扩展思考
   - 深入的变种和优化思考
*/
```

### github copilot Agent 操作指南

#### ✅ 允许的操作

1. **在算法实现部分**：

   - 编写函数实现代码
   - 添加辅助函数
   - 添加实现注释
   - 优化算法逻辑

2. **在解题思路部分**：
   - 添加详细的思路分析
   - 解释算法原理
   - 分析复杂度
   - 提供优化建议

#### ❌ 禁止的操作

1. **不要修改题目描述部分**：

   - 不要删除或修改 LeetCode 插件生成的注释
   - 不要更改 `@lc` 标识
   - 不要修改题目链接和描述

2. **不要破坏文件结构**：

   - 不要在题目描述和代码之间插入解题思路
   - 不要将代码实现放在文件最后
   - 不要删除 `export {};` 语句

3. **不要修改函数签名**：
   - 函数名、参数名、返回类型保持不变，且禁止修改已有的类或者函数的结构
   - 不要更改 `// @lc code=start` 和 `// @lc code=end` 标记

### 代码风格要求

#### 注释规范

```typescript
// 单行注释：解释具体实现逻辑
/*
 * 多行注释：解释复杂算法思路
 * 或者重要的数据结构设计
 */
```

#### 变量命名

- 使用有意义的变量名：`left`, `right`, `maxValue`
- 避免单字母变量：除了循环变量 `i`, `j`, `k`
- 常量使用大写：`MAX_SIZE`, `DEFAULT_VALUE`

#### 函数组织

```typescript
// 辅助函数（如果需要）
function helper(params): type {
  // 实现
}

// @lc code=start
function 主函数(params): type {
  // 主要逻辑
}
// @lc code=end
```

### 示例文件结构

参考 `leetcode/2359.找到离给定两个节点最近的节点.ts` 的完整结构，确保新文件遵循相同的格式规范。

---

**记住：结构稳定性 > 代码完美性**
保持文件的三段式结构比任何代码优化都重要！

## TypeScript 代码规范

### 变量声明规范

1. 每个变量应该单独声明，避免在一行中声明多个变量

   ```typescript
   // ❌ 错误示例
   let a = 1,
     b = 2;

   // ✅ 正确示例
   let a = 1;
   let b = 2;
   ```

2. 变量命名应该使用驼峰命名法

   ```typescript
   // ❌ 错误示例
   let user_name = "John";

   // ✅ 正确示例
   let userName = "John";
   ```

3. 优先使用类型推断，只在必要时显式声明类型

   ```typescript
   // ✅ 推荐：让 TypeScript 推断类型
   const age = 25; // 自动推断为 number
   const users = ["Alice", "Bob"]; // 自动推断为 string[]

   // ✅ 必要时显式声明类型
   const userId: string | number = getUserId();
   const config: ApiConfig = loadConfig();

   // ❌ 不必要的类型声明
   const name: string = "John";
   const count: number = 0;
   ```

4. 优先使用 const，只在需要重新赋值时使用 let，避免使用 var

   ```typescript
   // ✅ 推荐
   const PI = 3.14;
   const users = ["Alice", "Bob"];
   let currentIndex = 0; // 需要重新赋值

   // ❌ 避免
   var globalVar = "avoid";
   let PI = 3.14; // 不会重新赋值，应该用 const
   ```

5. 使用 const assertions 保持字面量类型

   ```typescript
   // ✅ 使用 const assertion
   const themes = ["light", "dark"] as const;
   const config = {
     api: "https://api.example.com",
     timeout: 5000,
   } as const;

   // ❌ 失去精确类型信息
   const themes = ["light", "dark"]; // 类型为 string[]
   ```

### 接口和类型规范

1. 接口名称应该使用描述性的名称，不需要 I 前缀

   ```typescript
   // ❌ 错误示例（过时的约定）
   interface IUser {}
   interface IApiResponse {}

   // ✅ 正确示例（现代最佳实践）
   interface User {}
   interface ApiResponse {}
   ```

2. 类型名称应该使用描述性的名称，不需要 T 前缀

   ```typescript
   // ❌ 错误示例（过时的约定）
   type TStatus = "active" | "inactive";
   type TUserRole = "admin" | "user";

   // ✅ 正确示例（现代最佳实践）
   type Status = "active" | "inactive";
   type UserRole = "admin" | "user";
   ```

3. 当类型名称与值重名时，可以使用 Type 后缀区分

   ```typescript
   // 当需要区分类型和值时
   interface User {
     id: number;
     name: string;
   }

   type UserType = "admin" | "regular";

   // 或者使用更具描述性的名称
   type UserRole = "admin" | "regular";
   ```

4. 使用 union types 而不是枚举（除非必要）

   ```typescript
   // ✅ 推荐：使用 union types
   type Theme = "light" | "dark" | "auto";
   type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

   // ❌ 通常不推荐：枚举
   enum Theme {
     Light = "light",
     Dark = "dark",
     Auto = "auto",
   }

   // ✅ 枚举适用的场景：需要反向映射或复杂逻辑
   enum ErrorCode {
     NetworkError = 1000,
     ValidationError = 1001,
     AuthError = 1002,
   }
   ```

**注意：** 这里采用的是现代 TypeScript 社区的最佳实践，与 TypeScript 官方文档和主流开源项目保持一致。早期的 `I` 和 `T` 前缀约定已不再推荐使用。

### 函数规范

1. 优先使用箭头函数，特别是在回调和简短函数中

   ```typescript
   // ✅ 推荐：箭头函数
   const add = (a: number, b: number) => a + b;
   const users = data.map((item) => item.user);

   // ✅ 也可以：传统函数声明（特别是顶层函数）
   function calculateTotal(items: Item[]): number {
     return items.reduce((sum, item) => sum + item.price, 0);
   }

   // ❌ 避免：不必要的 function 关键字
   const add = function (a: number, b: number) {
     return a + b;
   };
   ```

2. 函数名称应该使用动词开头，清楚表达功能

   ```typescript
   // ✅ 推荐：清晰的函数命名
   const getUserById = (id: string) => users.find((user) => user.id === id);
   const validateEmail = (email: string) =>
     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   const transformUserData = (rawData: RawUser) => ({
     ...rawData,
     isActive: true,
   });

   // ❌ 避免：模糊的命名
   const getData = () => {}; // 获取什么数据？
   const process = () => {}; // 处理什么？
   const handle = () => {}; // 处理什么？
   ```

3. 异步函数应该使用描述性的名称，可以包含动作词

   ```typescript
   // ✅ 推荐示例
   const fetchUserData = async (id: string) => {
     const response = await fetch(`/api/users/${id}`);
     return response.json();
   };

   const saveUserProfile = async (user: User) => {
     await fetch("/api/users", {
       method: "POST",
       body: JSON.stringify(user),
     });
   };

   // ❌ 避免的示例
   const asyncGetData = async () => {}; // 不需要 async 前缀
   const getUserDataAsync = async () => {}; // 不需要 Async 后缀
   ```

4. 使用参数解构提高可读性

   ```typescript
   // ✅ 推荐：参数解构
   const createUser = ({
     name,
     email,
     age,
   }: {
     name: string;
     email: string;
     age: number;
   }) => ({
     id: generateId(),
     name,
     email,
     age,
     isActive: true,
   });

   // ✅ 或者使用接口
   interface CreateUserParams {
     name: string;
     email: string;
     age: number;
   }

   const createUser = ({ name, email, age }: CreateUserParams) => ({
     id: generateId(),
     name,
     email,
     age,
     isActive: true,
   });
   ```

### 代码组织规范

1. 导入语句应该按以下顺序排列，并使用分组

   ```typescript
   // 1. Node.js 内置模块
   import { readFile } from "fs/promises";
   import { join } from "path";

   // 2. 第三方库
   import React, { useState, useEffect } from "react";
   import axios from "axios";
   import { clsx } from "clsx";

   // 3. 内部模块（按层级排序）
   import { config } from "@/config";
   import { ApiService } from "@/services";
   import { Button, Modal } from "@/components";
   import { useAuth } from "@/hooks";

   // 4. 相对导入
   import { validateForm } from "../utils";
   import { UserCard } from "./UserCard";

   // 5. 类型导入（单独分组）
   import type { User, ApiResponse } from "@/types";
   import type { ComponentProps } from "react";
   ```

2. 使用命名导出而不是默认导出（除非确实需要）

   ```typescript
   // ✅ 推荐：命名导出
   export const UserService = {
     getUser: (id: string) => fetch(`/api/users/${id}`),
     createUser: (user: User) => fetch('/api/users', { method: 'POST', body: JSON.stringify(user) })
   };

   export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

   // ✅ 默认导出适用的场景
   export default function HomePage() {
     return <div>Home</div>;
   }
   ```

3. 代码分组和组织

   ```typescript
   // ✅ 良好的代码组织

   // 常量
   const API_BASE_URL = "https://api.example.com";
   const DEFAULT_TIMEOUT = 5000;

   // 类型定义
   interface User {
     id: string;
     name: string;
     email: string;
   }

   // 工具函数
   const formatDate = (date: Date) => date.toISOString().split("T")[0];
   const generateId = () => Math.random().toString(36).substr(2, 9);

   // 主要功能
   export const UserService = {
     async fetchUser(id: string): Promise<User> {
       const response = await fetch(`${API_BASE_URL}/users/${id}`);
       return response.json();
     },

     async createUser(userData: Omit<User, "id">): Promise<User> {
       const user = { ...userData, id: generateId() };
       const response = await fetch(`${API_BASE_URL}/users`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(user),
       });
       return response.json();
     },
   };
   ```

### 现代 TypeScript 特性

1. 使用可选链和空值合并

   ```typescript
   // ✅ 使用可选链
   const userName = user?.profile?.name ?? "Anonymous";
   const userEmail = user?.contact?.email;

   // ✅ 使用空值合并
   const timeout = config.timeout ?? DEFAULT_TIMEOUT;
   const theme = userPreferences.theme ?? "light";

   // ❌ 传统的检查方式
   const userName =
     user && user.profile && user.profile.name
       ? user.profile.name
       : "Anonymous";
   ```

2. 使用模板字面量类型

   ```typescript
   // ✅ 模板字面量类型
   type EventName = `on${Capitalize<string>}`;
   type Theme = "light" | "dark";
   type ThemeClass = `theme-${Theme}`;

   // 用法
   const className: ThemeClass = "theme-light";
   ```

3. 使用 satisfies 操作符

   ```typescript
   // ✅ 使用 satisfies 保持类型推断
   const config = {
     development: {
       apiUrl: "http://localhost:3000",
       debug: true,
     },
     production: {
       apiUrl: "https://api.example.com",
       debug: false,
     },
   } satisfies Record<string, { apiUrl: string; debug: boolean }>;

   // 现在可以安全地访问属性，同时保持精确的类型
   const devUrl = config.development.apiUrl; // 类型为 string
   ```

### 注释规范

1. 使用 TSDoc 格式编写函数注释

   ````typescript
   /**
    * 根据用户ID获取用户信息
    *
    * @param userId - 用户的唯一标识符
    * @returns Promise that resolves to user data
    * @throws {Error} 当用户不存在时抛出错误
    *
    * @example
    * ```typescript
    * const user = await getUserInfo('user-123');
    * console.log(user.name);
    * ```
    */
   const getUserInfo = async (userId: string): Promise<User> => {
     const response = await fetch(`/api/users/${userId}`);
     if (!response.ok) {
       throw new Error(`User not found: ${userId}`);
     }
     return response.json();
   };
   ````

2. 复杂逻辑使用清晰的注释说明

   ```typescript
   /**
    * 计算用户积分
    *
    * 积分计算规则：
    * - 基础积分：消费金额 × 1
    * - 会员加成：基础积分 × 会员等级系数
    * - 活动加成：满足条件时额外获得 20% 积分
    */
   const calculateUserPoints = (
     amount: number,
     memberLevel: number,
     hasPromotion = false
   ): number => {
     // 计算基础积分
     const basePoints = amount;

     // 应用会员等级加成
     const memberBonus = basePoints * (memberLevel * 0.1);

     // 应用活动加成
     const promotionBonus = hasPromotion ? basePoints * 0.2 : 0;

     return Math.floor(basePoints + memberBonus + promotionBonus);
   };
   ```

3. 对于复杂类型，添加说明注释

   ```typescript
   /**
    * 用户配置选项
    *
    * @property theme - 用户界面主题设置
    * @property notifications - 通知相关设置
    * @property privacy - 隐私相关设置
    */
   interface UserSettings {
     /** 界面主题，支持浅色、深色和自动模式 */
     theme: "light" | "dark" | "auto";

     /** 通知设置 */
     notifications: {
       /** 是否接收邮件通知 */
       email: boolean;
       /** 是否接收推送通知 */
       push: boolean;
       /** 通知频率 */
       frequency: "immediate" | "daily" | "weekly";
     };

     /** 隐私设置 */
     privacy: {
       /** 个人资料是否公开 */
       profileVisible: boolean;
       /** 是否允许搜索引擎索引 */
       searchable: boolean;
     };
   }
   ```

### 错误处理规范

1. 使用具体的错误类型

   ```typescript
   // ✅ 创建具体的错误类
   class ValidationError extends Error {
     constructor(
       message: string,
       public field: string,
       public code: string
     ) {
       super(message);
       this.name = "ValidationError";
     }
   }

   class ApiError extends Error {
     constructor(
       message: string,
       public status: number,
       public endpoint: string
     ) {
       super(message);
       this.name = "ApiError";
     }
   }

   // 使用
   const validateUser = (user: User) => {
     if (!user.email) {
       throw new ValidationError("Email is required", "email", "REQUIRED");
     }
   };
   ```

2. 使用 Result 类型模式处理可能失败的操作

   ```typescript
   // ✅ Result 类型模式
   type Result<T, E = Error> =
     | { success: true; data: T }
     | { success: false; error: E };

   const fetchUser = async (id: string): Promise<Result<User>> => {
     try {
       const response = await fetch(`/api/users/${id}`);
       if (!response.ok) {
         return { success: false, error: new Error("User not found") };
       }
       const user = await response.json();
       return { success: true, data: user };
     } catch (error) {
       return { success: false, error: error as Error };
     }
   };

   // 使用
   const result = await fetchUser("123");
   if (result.success) {
     console.log(result.data.name); // 类型安全
   } else {
     console.error(result.error.message);
   }
   ```

### 性能优化建议

1. 使用 readonly 修饰符防止意外修改

   ```typescript
   // ✅ 使用 readonly
   interface Config {
     readonly apiUrl: string;
     readonly timeout: number;
     readonly features: readonly string[];
   }

   const config: Config = {
     apiUrl: "https://api.example.com",
     timeout: 5000,
     features: ["auth", "analytics"] as const,
   };
   ```

2. 优化类型定义，避免过度计算

   ```typescript
   // ✅ 使用映射类型优化
   type ApiEndpoints = {
     users: "/api/users";
     posts: "/api/posts";
     comments: "/api/comments";
   };

   type ApiMethods<T> = {
     [K in keyof T]: {
       get: () => Promise<unknown>;
       post: (data: unknown) => Promise<unknown>;
     };
   };

   // 自动生成类型
   type Api = ApiMethods<ApiEndpoints>;
   ```

---

**本规范基于：**

- [TypeScript 官方文档](mdc:https:/www.typescriptlang.org/docs)
- [Google TypeScript 风格指南](mdc:https:/google.github.io/styleguide/tsguide.html)
- [Airbnb JavaScript/TypeScript 风格指南](mdc:https:/github.com/airbnb/javascript)
- 现代前端框架（React、Vue、Angular）的最佳实践
- 流行开源项目的代码风格

## AI Agent 工作指南

作为 GitHub Copilot，在处理这个项目时请：

1. **严格遵循文件结构**：特别是 LeetCode 文件的三段式结构
2. **提供教学性注释**：不仅要有代码实现，更要有思路解释
3. **注重算法分析**：每个解法都要有时间和空间复杂度分析
4. **包含示例追踪**：通过具体例子展示算法执行过程
5. **考虑多种解法**：在可能的情况下提供不同的解题思路
6. **优化意识**：说明代码的优化点和改进空间
7. **实践导向**：注释要有助于读者理解和学习算法思想

### 代码质量要求

#### 1. 变量命名规范

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

#### 2. 代码结构清晰

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

### 性能优化指导

#### 时间复杂度优化

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

#### 空间复杂度优化

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

### 调试和测试指导

#### 1. 边界条件测试

```typescript
// 在解题思路中说明需要测试的边界条件：
// - 空数组/空字符串
// - 单元素数组
// - 最大/最小值边界
// - 重复元素
// - 负数/零值
```

#### 2. 示例追踪

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

### 编写风格偏好

#### 1. 注释密度

- 每个关键步骤都要有注释
- 复杂的一行代码要有解释
- 不明显的优化技巧要说明原因

#### 2. 代码可读性

- 使用有意义的变量名
- 适当的空行分隔逻辑块
- 一致的缩进和格式

#### 3. 教学性质

- 优先考虑代码的可理解性
- 在注释中解释"为什么"而不仅是"做什么"
- 提供多种解法的对比

记住：这个项目的价值在于学习过程，而不仅仅是解决问题。好的注释和思路分析比完美的代码更重要。
