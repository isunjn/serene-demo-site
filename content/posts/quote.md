+++
title = "Special Quote"
date = 2024-08-16
discription = "Example post showing quote"
[taxonomies]
categories = ["Tech"]
tags = ["serene", "quote"]
[extra]
toc = false
+++

{% <quote> %}
*Lorem ipsum dolor sit, amet consectetur adipisicing elit.*
{% </quote> %}

{% <quote cite="*Lorem Ipsum*"> %}
*Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!*
{% </quote> %}

{% <quote cite="Lorem Ipsum"> %}
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!
{% </quote> %}

{% <quote cite="*Lorem Ipsum*"> %}
*Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!*

*Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, nisi saepe dolor unde iusto dolore nam, vero optio consequuntur repudiandae et! Atque libero expedita laudantium cupiditate, sit explicabo sequi ipsa!*
{% </quote> %}
