+++
title = "Markdown & Extended"
date = 2023-07-15
updated = 2023-08-30
[taxonomies]
categories = ["Tech"]
tags = ["serene", "markdown"]
[extra]
lang = "en"
toc = true
comment = true
math = true
mermaid = true
+++

This is a post showing all supported elements.

<!-- more -->

## Heading

As you can see in this post.

## Paragraph

Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa! 

Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa! 

## Emphasis

normal text, **bold text**, *ltalic text*, ***bold and ltalic text***

## Blockquotes

> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa! 

> Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
>> Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa! 

## List

unordered:

- First item

- Second item

- Third item

ordered:

1. First item

    1. Indented item

    2. Indented item

2. Second item

3. Third item


## Link

There is a [link](https://example.com) and [another link to example.com](https://example.com)

## Table

| Syntax      | Description | Test Text     |
| ---         |    ----     |           --- |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

with alignment:

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

## Footnote

Lorem ipsum dolor sit, amet[^1] words consectetur[^2] adipisicing elit.

## Strikethrough

~~The world is flat.~~ We now know that the world is round.

## Horizontal Rule

---

## Image

![img](/assets/typical-app.webp)

with caption:

{{ figure(src="/assets/typical-app.webp", alt="alt text", caption="typical app arch") }}

with a 'via' attribution:

{{ figure(src="/assets/typical-app.webp", alt="some alt text", via="https://github.com/tyrchen/rust-training") }}


## Code

inline `code` and more `inline code`

block level code:

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

with line number:

```rs,linenos
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

```rs,linenos,linenostart=93
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

with line number and highlight:

```rs,linenos,hl_lines=2-5 9
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

with filename:

{% codeblock(name="src/main.rs") %}
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
{% end %}

with filename, line number, highlight:

{% codeblock(name="src/main.rs") %}
```rs,linenos,hl_lines=3-4
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

wiht header:

{% note(header="Note") %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa! 
{% end %}

{% alert(header="BREAKING!") %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit.
{% end %}


## Math (KaTex)

$$
f(x) = \int_{-\infty}^\infin \hat f(\xi) e^{2 \pi i \xi x}\ d\xi
$$


When $ a \ne 0 $, there are two solutions to $ (ax^2 + bx + c = 0) $ and they are 
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

The Cauchy-Schwarz Inequality

$$\left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)$$


## Chart (Mermaid)

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

## Comment (Giscus)

As you can see in this post.

---

[^1]: First footnote.

[^2]: Here's the second footnote.
