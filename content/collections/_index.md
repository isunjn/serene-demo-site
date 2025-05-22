+++
title = "serene::collections"
description = "Demo collections page of zola-theme-serene"
template = "prose.html"

[extra]
lang = "en"

title = "Collections"
subtitle = "Special blocks for showcasing your list"

+++

Special shortcodes for showcasing your collections, such as projects, publications, blogroll, bookmarks, etc.
Here are some examples:

## Projects

{{ collection(file="projects.toml") }}

## Publications

{{ collection(file="publications.toml") }}

## Experiences

{{ collection(file="experiences.toml") }}

## Projects (Simple)

{{ collection(file="projects_simple.toml") }}

## Experiences (Simple)

{{ collection(file="experiences_simple.toml") }}

## Bookmarks

{{ collection(file="bookmarks.toml") }}

## Bookmarks (Without icon)

{{ collection(file="bookmarks_simple.toml") }}

## Games

{{ collection(file="games.toml") }}


## Blogroll

{{ collection(file="blogroll.toml") }}

## Books

{{ collection(file="books.toml") }}

## Movies

{{ collection(file="movies.toml") }}
