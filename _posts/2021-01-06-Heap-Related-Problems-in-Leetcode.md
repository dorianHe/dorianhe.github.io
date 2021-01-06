---
layout: post
title: Heap related problems in Leetcode
card-image: /assets/images/heap_summary/heap_summary.png
abstract: A summary of heap related problems in Leetcode.
category: Algorithm
---

Why we need a heap? When we use it? Or let's say in which scenarios trying a heap can help you to solve the problem?

To answer that question we need to know the features of a heap. A heap (using min heap here) is a complete binary tree. The value of the parent node is always smaller than its children's value, which means the root contains the minimum. After pushing a new node to the heap or popping the top node from it, the features above remains. This pushing and popping only take `O(log(n))` time complexity. (`n` is the number of nodes in heap).

1. when you need the min or max value consistently, try the min or max heap.
2. when the problem needs the k-th largest / smallest value or k largest / smallest values.

Heap helps us to get min/max values easily. From an algorithmic perspective, this can be helpful for the greedy algorithm.

## Using heap to store final results

k largest element or k-th smallest element from data stream requires you to maintain a fixed k-size heap and the final results are stored. One thing that needs mentioning here is that when we look for k largest elements, we need to use min-heap. The top of the heap is a sentinel that keeps small values away from interfering with the heap. 

A special example of this kind of problem is meeting rooms II. The top of the heap indeed severs as a sentinel but it is not fixed size. The size of the heap suggests the number of meeting rooms needed.

Other similar problems: Top K Frequent Words

## Using heap to get largest / smallest consistently

In this problem, the size of the heap is problem-dependent. Some need fixed size, some don't. For example, merge k sorted linked list requires to have a heap. it looks like to have a fixed size heap but not. 

Other similar problems: Find K Pairs with Smallest Sums, Employee Free Time

When using heap to solve these Top k problems. One corner case is that the number of elements is fewer than k. Using `k = min(k, num of elements)` should be fine.

Leetcode 759. Employee Free Time. It looks like a merge interval problem, (actually, it can be solved by sorting + merge interval), but the optimal solution is to use a heap. The key is to understand that any free time interval consists of the previous max working end time and current minimal working start time (under the assumption that end time < start time).

After finishing this problem, I even have a feeling that when the problem mentions data are sorted, not only binary search, two-pointer but also heap can be considered.

Another important point is that for this kind of problem, a heap not only stores the values like start time, the value of the current node but also stores the index value. This index value helps us to push the next values to the heap. And of course, before accessing the next value, we must check whether the current value is already the last element.