+++
title = "Hello, Serene!"
date = 2021-10-28
updated = 2021-11-02
[taxonomies]
categories = ["Tech"]
tags = ["serene", "theme"]
[extra]
lang = "en"
toc = true
comment = true
math = true
mermaid = true
+++

This is an example post.

<!-- more -->

## Markdown

Lorem ipsum dolor sit, amet **consectetur** adipisicing elit. Praesentium, nisi saepe dolor unde iusto *dolore* nam, vero optio consequuntur repudiandae et! Atque `libero` expedita laudantium cupiditate, sit explicabo sequi ipsa!

> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero
[optioconsequuntur repudiandae](https://example.com) et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium [cupiditate](https://example.com), sit explicabo sequi ipsa!


Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

> Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
> > Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

Lorem ipsum dolor sit, amet [consectetur adipisicing elit](https://example.com). Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

Lorem ipsum:

- example 1
- example 2
- example 3

Lorem ipsum:

1. example 1
2. example 2
3. example 3


Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

![a pic](/img/img.webp)

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!


```rs
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!


| Syntax      | Description | Test Text     |
| ---         |    ----     |           --- |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!

---

## Math

When $ a \ne 0 $, there are two solutions to $ (ax^2 + bx + c = 0) $ and they are 
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**The Cauchy-Schwarz Inequality**

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$


## Chart

Mermaid chart:

{% mermaid() %}
sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?
{% end %}

## Callout

{% note() %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}

{% important() %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}

{% warning() %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}

{% alert() %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}

{% question() %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}

{% tip() %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}
