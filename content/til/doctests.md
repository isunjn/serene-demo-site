+++
title = "Python doctests for inline testing"
date = 2025-08-18
+++

I've been going through [Composing Programs](https://www.composingprograms.com/) by John DeNero, and have been picking up little tricks of the trade when it comes to writing code in Python.

The `doctest` module allows you to write tests directly in docstrings by mimicking what you might see in the REPL. 

Simply write `>>>` followed by Python code and the expected output on the next line.

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

Run with 

```bash
python -m doctest filename.py
```

I've also noticed that docstrings in FastAPI automatically get converted into descriptions in the OpenAPI documentation. It seems there's more to docstrings than meets the eye. My initial impression was that this makes code hard to read.