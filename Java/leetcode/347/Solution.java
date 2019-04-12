
// https://leetcode-cn.com/problems/top-k-frequent-elements/
// 347. 前 k 个高频元素 fail

import java.util.List;
import java.util.TreeMap;
import java.util.LinkedList;
import java.util.PriorityQueue; // 使用标准库的优先队列

/**
 * Solution
 */
public class Solution {

  private class Freq implements Comparable<Freq> {
    public int e, freq;

    public Freq(int e, int freq) {
      this.e = e;
      this.freq = freq;
    }

    // 重置比较方法 标准库的优先队列默认时使用最小堆
    @Override
    public int compareTo(Freq another) {
      // if (this.freq < another.freq) {
      // return -1;
      // } else if (this.freq > another.freq) {
      // return 1;
      // } else {
      // return 0;
      // }

      return this.freq - another.freq;
    }
  }

  public List<Integer> topKFrequent(int[] nums, int k) {

    TreeMap<Integer, Integer> map = new TreeMap<>();
    for (int num : nums) {
      if (map.containsKey(num)) {
        map.put(num, map.get(num) + 1);
      } else {
        map.put(num, 1);
      }
    }

    PriorityQueue<Freq> pq = new PriorityQueue<>();
    for (int key : map.keySet()) {
      if (pq.size() < k) {
        pq.add(new Freq(key, map.get(key)));
      } else if (map.get(key) > pq.peek().freq) {
        pq.remove();
        pq.add(new Freq(key, map.get(key)));
      }
    }

    LinkedList<Integer> res = new LinkedList<>();

    while (!pq.isEmpty()) {
      res.add(pq.remove().e);
    }
    return res;
  }

  private static void printList(List<Integer> nums) {
    for (Integer num : nums) {
      System.out.println(num + " ");
    }
    System.out.println();
  }

  public static void main(String[] args) {
    int[] nums = { 1, 1, 1, 2, 2, 3 };
    int k = 2;
    printList(new Solution().topKFrequent(nums, k));
  }
}