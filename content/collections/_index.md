+++
title = "serene::collections"
description = "Demo collections page of zola-theme-serene"
template = "prose.html"

[extra]
lang = "en"

title = "Collections"
subtitle = "Special blocks for showcasing your list"

+++

Special components for showcasing your collections, such as projects, publications, blogroll, bookmarks, etc.
Here are some examples:

## Projects

{{ <collection file="projects.toml" section /> }}

## Publications

{{ <collection file="publications.toml" section /> }}

## Experiences

{{ <collection file="experiences.toml" section /> }}

## Projects (Simple)

{{ <collection file="projects_simple.toml" section /> }}

## Experiences (Simple)

{{ <collection file="experiences_simple.toml" section /> }}

## Bookmarks

{{ <collection file="bookmarks.toml" section /> }}

## Bookmarks (Without icon)

{{ <collection file="bookmarks_simple.toml" section /> }}

## Games

{{ <collection file="games.toml" section /> }}


## Blogroll

{{ <collection file="blogroll.toml" section /> }}

## Books

{{ <collection file="books.toml" section /> }}

## Movies

{{ <collection file="movies.toml" section /> }}
