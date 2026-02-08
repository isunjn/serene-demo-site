+++
title = "Passive versus active voice in programming"
date = "2021-02-24"
draft = true

[taxonomies]
tags = []

[extra]
featured = false
toc = false
+++

I’ve been at my job approximately 10 months now. A lot of the time, I’ve spent reading documentation. I decided recently to start making notes on the computer. This is in contrast from before, where I would go slower and write notes on my notebook by hand.

Anyway, during this time, I’ve hit concept fatigue. Which is to say, a lot of time understanding new concepts. This makes me feel like I’m squeezing myself into the vessel of those concepts. I lose sight of what I’m trying to achieve.

I started writing down notes on a new app called Hemingway Editor. My intention was to shorten my rambles, and write more like Hemingway — short, simple, direct.

So, I was making notes on how to use the AWS SDK for Go, in particular the concepts of Sessions and Service Clients. They’re the first thing you’ll do when you’re trying to access AWS services from your application.

While doing so, I noticed this part highlighted:

> Service clients are created from session objects.

The app flagged this as use of passive voice. Passive voice is a situation where you don’t specify the actor, and leave it implied. Someone might ask, *by whom?* to a lot of these questions.

This callout makes sense in the way I’ve been programming of late. I’m still in service to what all can be `done by the framework` (note passive voice). I’m looking to cover everything in the hope to become fluent with it. It assumes that I won’t touch it all the time. This tries to avoid the back-and-forth that programming involves.

I want to flip this relationship. I want to go back to wanting to do something, and tools like AWS becoming a way to them. Using them because there’s a benefit to doing the task this way — not because “that’s the way it’s done”.
