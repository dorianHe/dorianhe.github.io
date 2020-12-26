---
layout: post
title: Linked List Problems in Leetcode
card-image: /assets/images/linked_list_leetcode/linked_list.png
abstract: A brief summary of linked list problems in Leetcode.
category: Algorithm
---

This summary bases on basic (easy / medium) linked-list problems in Leetcode. Those problems are listed below:
lc206. Reverse Linked List
lc19. Remove Nth Node From End of List
lc234. Palindrome linked list
lc24. Swap Nodes in Pairs
lc141  Linked List Cycle
lc142 Linked List Cycle II
Some of these problems have more than one solution that is brief and simple. But to achieve the optimal solution (time complexity of O(n) and space complexity of O(1)) can be tricky.

## Traversal and Update

The core concept of the optimal solution to the first four problems is the same, which is to use two or more than two pointers to traversal the linked list and update the nodes at the same time.

### Solution to lc206. Reverse Linked List

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        if head is None:
            return None
        # define two pointers pre (previous) and cur (current)
        pre, cur = None, head
        # update the node during the traversal (change the next pointer direction in node)
        while cur is not None:
            nxt = cur.next
            cur.next = pre
            pre = cur
            cur = nxt
        return pre

# One-pass traversal using two pointers during traversal
# Time complexity: O(n)
# Space complexity: O(1)
```

### Solution to lc19. Remove Nth Node From End of List

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        dummy_head = ListNode(-1)
        dummy_head.next = head
        # define two pointers, slow and fast.
        slow = fast = head
        # fast pointer starts to traversal the linked list n nodes before slow pointer.
        for _ in range(n):
            fast = fast.next
        if fast is None:
            dummy_head.next = head.next
            return dummy_head.next
        # when fast points to the last node, slow is one node before the nth node.
        while fast.next:
            slow = slow.next
            fast = fast.next
        # Remove the nth node
        slow.next = slow.next.next
        return dummy_head.next

# Time complexity: O(n)
# Space complexity: O(1)
```

### Solution to lc234. Palindrome linked list

The optimal solution bases on lc19 and lc206, which is to find the middle point of the linked list and reverse the second half.

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        if head is None:
            return True
        # part 1: make slow pointer pointing to the middle
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        # part 2: reverse the second half linked list
        prev = slow
        curr = slow.next
        prev.next = None
        while curr:
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        # part 3: check whether the linked list is a palindrome.
        while prev and head:
            if prev.val != head.val:
                return False
            prev = prev.next
            head = head.next
        return True

# Time complexity: O(n)
# Space complexity: O(1)
```

### Solution to lc24. Swap Nodes in Pairs

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        dummy_head = ListNode()
        dummy_head.next = head
        # prev pointer points to the last node of the previous pair
        prev = dummy_head
        while head and head.next:
            # Pointer first and second pointing to the first and last node in the pair
            first, second = head, head.next
            # previous last node point to the second (the first node after swap)
            prev.next = second
            # first node now points to the new pair
            first.next = second.next
            # second points to the first
            second.next = first
            # update pointer prev and head
            prev = first
            head = first.next
        return dummy_head.next

# Time complexity: O(n)
# Space complexity: O(1)
```

For cycle detection in linked list, just check my previous post (which was posted more than one year before).
