+++
title = "Python binarytree library for tree visualization"
date = 2025-08-18
+++

Working with binary trees has two major annoyances:

- building them
- printing them

I found this library, [binarytree](https://github.com/joowani/binarytree/tree/main) that maps pretty close to my definition of a node:

```python
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

but, it also lets me build trees, or represent existing trees.

#### Represent existing trees

For a typical sample tree, there's no more of a need to mess around with tabs and spaces, and labour to make this understandable.

```python
>>> from binarytree import Node
>>>
>>> root = Node(1,
...     Node(2,
...         Node(4,
...             None, Node(7)),
...         Node(5)
...     ),
...     Node(3,
...         Node(6,
...             Node(8), Node(9))
...     )
... )
>>>
>>> print(root)
```

```
      __1______
     /         \
  __2         __3
 /   \       /
4     5     6
 \         / \
  7       8   9
```

#### Creating a random tree

```python
>>> from binarytree import tree
>>>
>>> my_tree = tree(height=3)
>>> print(my_tree)
```

```
    ____14___
   /         \
  9          _3__
 / \        /    \
4   0      11     6
     \           / \
      5         7   8
```

Counterpoint: You're probably not going to be able to use it in interviews. Here's a [link to a video](https://www.loom.com/share/e6e80e87b1b44d50ace901f5484498ba) with pragmatic suggestions for that scenario.