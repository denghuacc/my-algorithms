/*
 * @lc app=leetcode.cn id=966 lang=typescript
 *
 * [966] 元音拼写检查器
 *
 * https://leetcode.cn/problems/vowel-spellchecker/description/
 *
 * algorithms
 * Medium (45.96%)
 * Likes:    61
 * Dislikes: 0
 * Total Accepted:    10.4K
 * Total Submissions: 19.9K
 * Testcase Example:  '["KiTe","kite","hare","Hare"]\n' +
  '["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]'
 *
 * 在给定单词列表 wordlist 的情况下，我们希望实现一个拼写检查器，将查询单词转换为正确的单词。
 * 
 * 对于给定的查询单词 query，拼写检查器将会处理两类拼写错误：
 * 
 * 
 * 大小写：如果查询匹配单词列表中的某个单词（不区分大小写），则返回的正确单词与单词列表中的大小写相同。
 * 
 * 
 * 例如：wordlist = ["yellow"], query = "YellOw": correct = "yellow"
 * 例如：wordlist = ["Yellow"], query = "yellow": correct = "Yellow"
 * 例如：wordlist = ["yellow"], query = "yellow": correct = "yellow"
 * 
 * 
 * 元音错误：如果在将查询单词中的元音 ('a', 'e', 'i', 'o', 'u')
 * 分别替换为任何元音后，能与单词列表中的单词匹配（不区分大小写），则返回的正确单词与单词列表中的匹配项大小写相同。
 * 
 * 例如：wordlist = ["YellOw"], query = "yollow": correct = "YellOw"
 * 例如：wordlist = ["YellOw"], query = "yeellow": correct = "" （无匹配项）
 * 例如：wordlist = ["YellOw"], query = "yllw": correct = "" （无匹配项）
 * 
 * 
 * 
 * 
 * 此外，拼写检查器还按照以下优先级规则操作：
 * 
 * 
 * 当查询完全匹配单词列表中的某个单词（区分大小写）时，应返回相同的单词。
 * 当查询匹配到大小写问题的单词时，您应该返回单词列表中的第一个这样的匹配项。
 * 当查询匹配到元音错误的单词时，您应该返回单词列表中的第一个这样的匹配项。
 * 如果该查询在单词列表中没有匹配项，则应返回空字符串。
 * 
 * 
 * 给出一些查询 queries，返回一个单词列表 answer，其中 answer[i] 是由查询 query = queries[i]
 * 得到的正确单词。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：wordlist = ["KiTe","kite","hare","Hare"], queries =
 * ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
 * 输出：["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]
 * 
 * 示例 2:
 * 
 * 
 * 输入：wordlist = ["yellow"], queries = ["YellOw"]
 * 输出：["yellow"]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= wordlist.length, queries.length <= 5000
 * 1 <= wordlist[i].length, queries[i].length <= 7
 * wordlist[i] 和 queries[i] 只包含英文字母
 * 
 * 
 */

// @lc code=start

/**
 * 元音拼写检查器
 *
 * 按优先级处理三种类型的匹配：
 * 1. 精确匹配（区分大小写）
 * 2. 大小写不敏感匹配
 * 3. 元音错误匹配（将元音视为可互换）
 *
 * @param wordlist - 词典中的单词列表
 * @param queries - 需要检查的查询词列表
 * @returns 对应的正确单词列表，无匹配时返回空字符串
 */
function spellchecker(wordlist: string[], queries: string[]): string[] {
  // 定义元音字母集合
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  // 1. 精确匹配：存储所有原始单词
  const exactWords = new Set(wordlist);

  // 2. 大小写不敏感匹配：小写形式 -> 第一个出现的原始单词
  const caseInsensitiveMap = new Map<string, string>();

  // 3. 元音错误匹配：去元音模式 -> 第一个出现的原始单词
  const vowelErrorMap = new Map<string, string>();

  // 预处理词典，构建三种类型的查找表
  for (const word of wordlist) {
    exactWords.add(word);

    // 构建大小写不敏感映射（只保留第一个出现的单词）
    const lowerWord = word.toLowerCase();
    if (!caseInsensitiveMap.has(lowerWord)) {
      caseInsensitiveMap.set(lowerWord, word);
    }

    // 构建元音错误映射：将元音替换为 "*" 后的模式 -> 原单词
    const devoweledWord = devowelString(lowerWord, vowels);
    if (!vowelErrorMap.has(devoweledWord)) {
      vowelErrorMap.set(devoweledWord, word);
    }
  }

  // 处理每个查询，按优先级进行匹配
  const result: string[] = [];
  for (const query of queries) {
    // 优先级1：精确匹配（区分大小写）
    if (exactWords.has(query)) {
      result.push(query);
      continue;
    }

    // 优先级2：大小写不敏感匹配
    const lowerQuery = query.toLowerCase();
    if (caseInsensitiveMap.has(lowerQuery)) {
      result.push(caseInsensitiveMap.get(lowerQuery)!);
      continue;
    }

    // 优先级3：元音错误匹配
    const devoweledQuery = devowelString(lowerQuery, vowels);
    if (vowelErrorMap.has(devoweledQuery)) {
      result.push(vowelErrorMap.get(devoweledQuery)!);
      continue;
    }

    // 无匹配项
    result.push("");
  }

  return result;

  // 将字符串中的元音字母替换为通配符 "*"
  // 用于生成元音错误匹配的模式字符串
  function devowelString(str: string, vowels: Set<string>): string {
    return str
      .split("")
      .map((c) => (vowels.has(c) ? "*" : c))
      .join("");
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 实现一个拼写检查器，处理三种类型的匹配（按优先级）：
     1. 精确匹配（区分大小写）
     2. 大小写不敏感匹配
     3. 元音错误匹配（元音可互换）
   - 对于每种匹配类型，返回词典中第一个符合条件的单词

2. 算法分析：
   - 时间复杂度：O(W*L + Q*L)，W是词典大小，Q是查询数量，L是平均单词长度
     * 预处理：O(W*L)
     * 查询处理：O(Q*L)
   - 空间复杂度：O(W*L)，存储三种类型的映射表
   - 算法类型：哈希表 + 字符串处理

3. 核心数据结构：
   - exactWords: Set<string> - 存储精确匹配
   - caseInsensitiveMap: Map<string, string> - 小写形式 -> 原单词
   - vowelErrorMap: Map<string, string> - 去元音模式 -> 原单词

4. 关键技术：
   - 元音替换：将所有元音字母替换为统一的通配符 "*"
   - 优先级匹配：按照题目要求的优先级顺序进行查找
   - 首次出现原则：对于同一模式，只保留第一次出现的单词

5. 示例分析：
   wordlist = ["KiTe","kite","hare","Hare"]
   queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
   
   预处理阶段：
   - exactWords: {"KiTe", "kite", "hare", "Hare"}
   - caseInsensitiveMap: {"kite":"KiTe", "hare":"hare"}
   - vowelErrorMap: {"k*t*":"KiTe", "h*r*":"hare"}
   
   查询处理：
   - "kite": 精确匹配 -> "kite"
   - "Kite": 大小写匹配("kite") -> "KiTe"
   - "KiTe": 精确匹配 -> "KiTe"
   - "Hare": 精确匹配 -> "Hare"
   - "HARE": 大小写匹配("hare") -> "hare"
   - "Hear": 无精确匹配，无大小写匹配，无元音匹配 -> ""
   - "hear": 大小写匹配("hare") -> "hare"
   - "keti": 元音匹配("k*t*") -> "KiTe"
   - "keet": 无匹配 -> ""
   - "keto": 元音匹配("k*t*") -> "KiTe"

6. 边界情况：
   - 空词典：所有查询返回空字符串
   - 单词完全相同：按首次出现原则
   - 查询词不在任何匹配范围内：返回空字符串

7. 常见错误：
   - 优先级处理错误：必须严格按照精确->大小写->元音的顺序
   - 首次出现处理错误：同一模式应该映射到第一个出现的单词
   - 元音替换逻辑错误：必须将所有元音统一替换为同一字符

8. 优化要点：
   - 代码重构：提取 devowelString 函数避免重复代码
   - 预处理优化：一次遍历构建所有映射表
   - 查询优化：使用 continue 避免嵌套 if-else

9. 扩展思考：
   - 如果需要支持更复杂的拼写错误（如字符插入、删除），可以使用编辑距离
   - 如果词典很大，可以考虑使用 Trie 树优化前缀匹配
   - 对于实时查询场景，可以将预处理结果持久化存储

10. 类似问题：
    - 模糊匹配和近似字符串搜索
    - 拼写纠错和自动补全系统
    - 字符串相似度计算问题
*/
