+++
title = "Assertions for quick input validation"
date = 2025-08-20
+++

In an interview setting, the `assert` statement provides a quick way to validate input without messing around with `throw`/`raise` syntax. I have a tendency of mix up the error handling syntax of different languages.


Instead of this verbose approach:
```python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

you can do something as simple as 

```python
def divide(a, b):
    assert b != 0, "Cannot divide by zero"
    return a / b
```

It's a one-liner, the messages are right there, and you're already dipping your toes into testing rather than punting validation to a later point you might never have time for.