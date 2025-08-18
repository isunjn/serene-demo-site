+++
title = "Python binarytree library for tree visualization"
date = 2025-08-18
+++

The `binarytree` library provides an easy way to generate, visualize, and manipulate binary trees in Python. Install with `pip install binarytree`.

```python
from binarytree import Node, tree

# Create a tree manually
root = Node(1)
root.left = Node(2)
root.right = Node(3)
print(root)

# Generate random trees
my_tree = tree(height=3)
print(my_tree)
```

Perfect for algorithm practice, education, or debugging tree-based code. The ASCII visualization makes it easy to understand tree structure at a glance.