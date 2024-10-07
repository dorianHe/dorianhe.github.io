---
layout: post
title: Heap related problems in Leetcode
card-image: /assets/images/heap_summary/heap_summary.png
abstract: A summary of heap related problems in Leetcode.
category: Data Structure & Algorithm
---

Why we need a heap? When we use it? Or let's say in which scenarios trying a heap can help you to solve the problem?

To answer those questions we need to know the features of a heap. A heap (using min heap here) is a complete binary tree. The value of the parent node is always smaller than its children's value, which means the root contains the minimum. After adding a new node to the heap or removing a node from it, the features above remains. This kind of pushing and popping only takes `log(n)` time complexity. (`n` is the number of nodes in heap).

1. when you need the min or max value consistently, try the min or max heap.
2. when the problem needs the k-th largest / smallest value or k largest / smallest values.

Heap helps us to get min/max values easily. From an algorithmic perspective, this can be helpful for the greedy algorithm.

## Using heap to store final results

k largest element or k-th smallest element from data stream requires you to maintain a fixed k-size heap and the final results are stored. One thing that needs mentioning here is that when we look for k largest elements, we need to use min-heap. The top element of the heap is a sentinel that keeps small values away from interfering with the heap.

A special example of this kind of problem is meeting rooms II. The top of the heap indeed severs as a sentinel but it is not fixed size. The size of the heap suggests the number of meeting rooms needed.

LC. 253 Meeting Rooms

```python
class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x:x[0])
        min_end_time_heap = []
        for interval in intervals:
            if len(min_end_time_heap) == 0:
                heapq.heappush(min_end_time_heap, interval[1])
                continue
            if interval[0] < min_end_time_heap[0]:
                heapq.heappush(min_end_time_heap, interval[1])
            else:
                heapq.heappop(min_end_time_heap)
                heapq.heappush(min_end_time_heap, interval[1])
        return len(min_end_time_heap)

# Time complexity: O(nlog(n)) (sorting) 
# The for loop and each push/pop operation in worst case takes O(nlog(n))
# Spcae complexity: O(n)
# The worst case is that every meeting needs a new room so O(n) space complexity
```

Other similar problems: Top K Frequent Words

```python
class WordCount:
    def __init__(self, word, count):
        self.word = word
        self.count = count
        
    def __lt__(self, other):
        if self.count < other.count:
            return True
        if self.count == other.count:
            if self.word <= other.word:
                return False
            return True
        return False
    
class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        counter = collections.Counter(words)
        min_heap = []
        for word in counter:
            if len(min_heap) < k:
                heapq.heappush(min_heap, WordCount(word, counter[word]))
                continue
            if min_heap[0] < WordCount(word, counter[word]):
                heapq.heappop(min_heap)
                heapq.heappush(min_heap, WordCount(word, counter[word]))
        res_lst = []
        while min_heap:
            res_lst = [heapq.heappop(min_heap).word] + res_lst
        return res_lst

# Time complexity: O(nlog(k))
# counting the frequency for each word takes only O(n). The heap remains a size of 
# k as for loop runs.
# Space complexity: O(m) + O(k) (linear complexity)
# m is the number of unique words in List words
# k is input also the size of the heap
```

## Using heap to get largest / smallest consistently

In this problem, the size of the heap is problem-dependent. Some need fixed size, some don't. For example, merge k sorted linked list requires to have a heap. it looks like to have a fixed size heap but not.

Other similar problems: Find K Pairs with Smallest Sums, Employee Free Time

LC. 373 Find K Pairs with Smallest Sums

```python
class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        if len(nums1) == 0 or len(nums2) == 0:
            return
        if len(nums1) * len(nums2) < k:
            k = len(nums1) * len(nums2)
        heap = [(nums1[0] + nums2[i], 0, i) for i in range(len(nums2))]
        heapq.heapify(heap)
        res_lst = []
        while len(res_lst) < k:
            n_sum, i, j = heapq.heappop(heap)
            res_lst.append([nums1[i], nums2[j]])
            if i + 1 < len(nums1):
                heapq.heappush(heap, (nums1[i+1] + nums2[j], i+1, j))
        return res_lst

# Time complexity: O(n) + O(klog(n))
# m is the length of nums1, n is the length of nums2
# Space complexity: O(k) + O(n)
```

When using heap to solve these Top k problems. One corner case is that the number of elements is fewer than k. Using `k = min(k, num of elements)` should be fine.

Leetcode 759. Employee Free Time. It looks like a merge interval problem, (actually, it can be solved by sorting + merge interval), but the optimal solution is to use a heap. The key is to understand that any free time interval consists of the previous max working end time and current minimal working start time (under the assumption that end time < start time). **Key points in one sentence: Find every maximal end time and minimal start time pairs.**

After finishing this problem, I even have a feeling that when the problem mentions data are sorted, not only binary search, two-pointer but also heap can be considered.

```python
"""
# Definition for an Interval.
class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end
"""

class Solution:
    def employeeFreeTime(self, schedule: '[[Interval]]') -> '[Interval]':
        prev_end_time = None
        heap = [(schedule[employee_index][0].start, employee_index, 0) for employee_index in range(len(schedule))]
        heapq.heapify(heap)
        res_lst = []
        while heap:
            start_time, employee_index, interval_index = heapq.heappop(heap)
            if prev_end_time is not None and prev_end_time < start_time:
                res_lst.append(Interval(prev_end_time, start_time))
            if prev_end_time is None:
                prev_end_time = schedule[employee_index][interval_index].end
            if interval_index + 1 < len(schedule[employee_index]):
                heapq.heappush(heap, (schedule[employee_index][interval_index+1].start, employee_index, interval_index+1))
            prev_end_time = max(prev_end_time, schedule[employee_index][interval_index].end)
        return res_lst

# Time complexity: O(nklog(n))
# n is the length of the List schedule, namely the number of employees
# k is the number of intervals for each employee
# Space complexity: O(n) (heap usage)
```

Another important point is that for this kind of problem, a heap not only stores the values like start time, the value of the current node but also stores the index value. This index value helps us to push the next values to the heap. And of course, before accessing the next value, we must check whether the current value is already the last element.
