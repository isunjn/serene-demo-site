+++
title = "serene::collections"
description = "Demo collections page of zola-theme-serene"
template = "prose.html"
draft = true

[extra]
lang = "en"

title = "Collections"
subtitle = "Special blocks for showcasing your list"

+++

Special shortcodes for showcasing your collections, such as projects, publications, blogroll, bookmarks, etc.
Here are some examples:

## Experiences

{{ collection(file="experiences.toml") }}

## Projects (Simple)

{{ collection(file="projects_simple.toml") }}

## Experiences (Simple)

{{ collection(file="experiences_simple.toml") }}

## Bookmarks (Without icon)

{{ collection(file="bookmarks_simple.toml") }}

