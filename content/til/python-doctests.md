+++
title = "Python doctests for inline testing"
date = 2025-08-18
+++

Python's `doctest` module allows you to write tests directly in docstrings by mimicking interactive Python sessions. Simply write `>>>` followed by Python code and the expected output on the next line.

```python
def add(a, b):
    """
    Add two numbers.
    
    >>> add(2, 3)
    5
    >>> add(-1, 1)
    0
    """
    return a + b
```

Run with `python -m doctest filename.py` or include `doctest.testmod()` in your script. Great for keeping examples and tests close to the code they document.