---
layout: post
title: Summary:Two-pointer method in Leetcode Problems
---
Two-pointer is a quite common method used to solve Leetcode problems related to strings, arrays and linked lists. Usually, the problems related to strings and arrays can be solved by brute force, which basically means your code searches all the possible solutions and returns the correct ones. However, this means a huge time cost, usually $O(n^2)$, $O(n^3)$ or worse. Leetcode will return LTE (Limited Time Exceed). The two-pointer method is an alternative. Depending on whether the input string/array is sorted or not, the two-pointer method takes at $O(n*\log(n))$ time complexity or even better.

Based on my current knowledge, two-pointer mainly has two variants. One is that both pointers start on the same side of the input string/array, usually the left side. This method is also called a sliding window. Another is that two pointers start at a different position. One starts at left, indexed 0. Another starts at right, indexed n-1, where n is the length of the string/array. And there are more tricky and interesting cases of two-pointer in linked list problems. In this post, I am going to introduce some typical examples of two-pointer problems and explain how to solve them.

## two-pointer from the same side (sliding window).
3. longest substring without repeating characters

Given a string, find the length of the longest substring without repeating characters.

```python
    def lengthOfLongestSubstring(self, s: str) -> int:
        # corner case / misleading case might include 
        # 1. lower case / upper case string of one same characeter
        # 2. how to handle the symbols
        # 3. empty string (return 0)
        length = len(s)
        if length == 0:
            return 0
        # s = re.findall(r"[a-zA-Z]") for remove the symbols if necessary
        p1, p2, res = 0, 0, 0
        occurence_dict = {}
        while p1 < length and p2 < length:
            if s[p2] not in occurence_dict.keys():
                occurence_dict[s[p2]] = 1
                p2 += 1
                res = max(res, p2 - p1)
            else:
                del occurence_dict[s[p1]]
                p1 += 1
        return res
```        

When facing a problem related to counting the number of elements (characters/integers) in a string/list, think about the hash map! In the above problem, it is about distinct characters. We also need a hash map as a recorder to save the seen characters. 

Both two pointers start at the character indexed 0. The ending condition is both pointers are at the last element of the string. During the iteration, pointer two $p2$ moves and check whether the currently visiting character exists in the hash map `occurrence_dict`. The idea is that we make sure the characters in substring s[p1:p2] (recorded in the hash map) are always distinct and save the maximal difference between p2 and p1. Each time p2 moves forward, we check whether s[p2] exists in the hash map. If yes, we move p1 forward and remove the element s[p1] in the hash map. Finally, p1 will delete and pass the element that s[p2] is pointing to in s[p1:p2]. s[p2] doesn’t exist in the hash map again. s[p2] is added to hash map again. And p2 moves forward.

## two-pointer from different sides
167. Two sum II - input array is sorted

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2.

```python
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        left = 0
        right = len(numbers) - 1
        while left < right:
            if numbers[left] + numbers[right] > target:
                right -= 1
            elif numbers[left] + numbers[right] < target:
                left += 1
            else:
                return [left+1, right+1]
```                

Once the array is sorted, it provides us with extra information about the array. Namely, as the indexes grow, the corresponding value maintains or grows. Based on one pointer on the left, always pointing to the smallest value in the list and one pointer on the right, always pointing to the target's value in the list, we check the sum of these two values. If the sum is larger, the right pointer moves one position left. If smaller, the left pointer moves one position right. 

This method will definitely return one solution if it exists. If there is more than one solution (usually caused by duplicated values in the input array) and the problems requires returning all possible solutions, use hash map {value : [index1, index2, ...] } and try the two-pointer method on the hash map keys.

One similar but a bit more complicated example is 16. 3sum closest.

1. (repeatedly usage of elements allowed?) one tip for the k-sum problem is to pay attention whether the elements in the array can be repeatedly used. 

2. (reduce the searching space by indexing) another tip is to avoid duplicated results in 2 loops by using i in range(N), left = i + 1, right = N-1 is a nice indexing way. By doing so, result based on indices 1,2,4 won’t be calculated again by indices 2,1,4.

## two-pointer for linked list
141. linked list cycle
Given a linked list, determine if it has a cycle in it.

To represent a cycle in the given linked list, we use an integer pos which represents the position (0-indexed) in the linked list where the tail connects to. If pos is -1, then there is no cycle in the linked list.
```python
    def hasCycle(self, head):
        # corner case:
        # 1. head is none
        if not head or not head.next:
            return False
        slow = head
        fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False
```

the common corner case for linked-list is to consider the given head of the linked list is none or not. In this cycle detection, we need to check the head and its next. The solution of cyclic linked list problems is usually based on two-pointer. One is called fast. Another is called slow. In every iteration, the fast pointer moves every two-node-long step and the slow pointer moves every one-node-long step. If there exists a cycle in the linked list, then the slow and fast will arrive at the same node.

More problems solved by the two-pointer method will be updated in the summary part. Hope this post helps you. :)
