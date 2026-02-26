+++
title = "Call It Judgement"
date = "2026-02-26"
draft = true
description = "The AI discourse keeps reaching for 'taste' as the human differentiator. Bourdieu would recognise the move. What people actually mean is judgement — and judgement is earned, not innate."

[taxonomies]
tags = [ "ai" ]

[extra]
featured = true
toc = false
+++

I'm a software engineer with six years of experience. I recently read Steve Yegge's piece on [Zero Framework Cognition](https://steve-yegge.medium.com/zero-framework-cognition-a-way-to-build-resilient-ai-applications-56b090ed3e69) — a pattern for building AI applications where the orchestration layer stays dumb and all reasoning is delegated to models. Thin shell, smart endpoints. No heuristics, no regex-based decision-making in the client.

## Convergent architecture

I'd never heard of ZFC. But I'd already built it.

Over the past year, I've been building a personal learning system — going back through computer science coursework with Claude handling the busywork (fetching readings, converting formats, organizing content) while I focus on actual understanding. The system evolved a clear separation: mechanical work gets automated, decisions that involve real trade-offs get surfaced to me. Dumb pipes, smart endpoints.

I didn't read Martin Fowler's ["Smart Endpoints and Dumb Pipes."](https://martinfowler.com/articles/microservices.html#SmartEndpointsAndDumbPipes) I didn't consciously apply Unix's separation of mechanism and policy. I didn't know about Karpathy's [Software 2.0](https://karpathy.medium.com/software-2-0-a64152b37c35). I just had a problem — too much material, not enough time — and the architecture fell out naturally from working with AI as a collaborator rather than a framework component.

Yegge traces this pattern through 30 years of software architecture. What's interesting is that a relatively junior engineer arrived at the same place from a completely different starting point. That's not a coincidence — it's evidence that the pattern is fundamental.

## The "taste" discourse

When people in AI circles talk about what humans still contribute after AI handles execution, they keep reaching for the same word: **taste**.

- AI can write the code, but you need [taste to direct it](https://pakodas.substack.com/p/how-to-be-a-30x-ai-engineer-with-a-taste).
- The bottleneck is [taste, not skill](https://www.designative.info/2026/02/01/taste-is-the-new-bottleneck-design-strategy-and-judgement-in-the-age-of-agents-and-vibe-coding/).
- In a world of infinite generation, [taste is the differentiator](https://medium.com/%40thirugnanamk/taste-and-agency-the-human-edge-in-the-ai-era-44d49c3afd80).

I find this word deeply off-putting. And I think the discomfort is worth examining.

"Taste" implies an innate quality — you either have it or you don't. It frames the human contribution as a refined sensibility rather than a learnable skill. And conveniently, the people using the word always seem to already possess it.

## Bourdieu knew this move

There's a name for this move. Pierre Bourdieu spent his career studying it.

In [*Distinction*](https://en.wikipedia.org/wiki/Distinction_(book)) (1979), Bourdieu showed empirically that what we call "taste" — in art, food, music, culture — maps precisely onto class position.

It's not a personal quality. It's **cultural capital**: accumulated knowledge, behaviours, and preferences that signal class membership. And crucially, it operates on a separate axis from economic capital — you can have every material marker and still be sorted out if you haven't absorbed the culture.

![What "taste" actually maps to — two types of capital, two types of sorting](/img/stop-calling-it-taste/bourdieu-social-space.svg)

And the class most anxious about performing taste? The **petit bourgeoisie** — small property owners, professionals, freelancers. People who own enough to feel distinct from workers but not enough to feel secure. They use cultural signifiers to maintain distance from the class below while aspiring toward the class above.

I went to the same school across three parts of the NCR — North Delhi for the early years, South Delhi for middle school, Gurgaon for the last stretch. Same institution, same uniform, completely different social physics. In North Delhi I was on the inside without thinking about it. In South Delhi I spent three years not knowing what was cool — didn't have the lingo, didn't have the references, poor in the social capital the other kids seemed to breathe. My colony was fine. My accent was fine. The car was fine. But I didn't know the culture, and that's what the sorting ran on.

The school name sometimes broke through. Someone would learn which institution and the calculus would shift. But I always wondered why the trump card was needed — why belonging required proof.

By Gurgaon the air thinned out. People mostly let each other be.

Same kid. Same school. Three completely different positions in the hierarchy. What changed wasn't me — it was the audience and what they'd decided counted as "taste." And that's exactly Bourdieu's point: the sorting doesn't run on material markers. It runs on **cultural capital** — knowing the right things, saying the right things, caring about the right things. You can have every economic signal and still be on the wrong side of the gate if you haven't absorbed the culture.

The word for what that sorting mechanism produces isn't "taste." It's **gatekeeping**. And the word for what the people on the other side of that gate actually develop, through work and exposure and failure, is **judgement**.

Sound familiar? Senior engineers and tech influencers telling junior developers that the real skill is "taste" is the same move. It transforms earned judgement into an innate quality, making it simultaneously essential and unattainable.

Gramsci called this [**cultural hegemony**](https://plato.stanford.edu/entries/gramsci/) — the way a dominant class maintains power not through force but through controlling what counts as common sense, normal, or "good."

When "taste" becomes the accepted frame for human value in AI workflows, it naturalizes a hierarchy. Some people have taste. Most people don't. The ones who do get to direct the AI. Everyone else becomes redundant.

![The Taste Machine — a self-reinforcing cycle of gatekeeping](/img/stop-calling-it-taste/taste-machine.svg)

## Judgement, not taste

The word matters. "Taste" borrows its authority from aesthetics — a domain where the right answer is supposedly felt, not argued. "Judgement" borrows from law, from medicine, from craft — domains where the right answer is earned through exposure to consequences. You don't develop judgement by being born into the right postcode. You develop it by getting things wrong enough times that the patterns become legible.

Here's what's actually happening when someone "has taste" in an AI workflow:

**They know what they want because they've done the work.**

They've read enough real material to know when AI output is filler. They've built enough systems to recognize when an architecture is over-engineered. They've failed enough times to know which trade-offs matter. This isn't a refined sensibility.  It's **judgement built from experience**, and it's available to anyone willing to put in the reps.

![Craftsman's hands at a workbench — judgement is built, not bestowed](/img/stop-calling-it-taste/craftsman-hands.jpeg)

The distinction matters. "Taste" is a gate. "Judgement" is a ladder. One says you need to be a certain kind of person. The other says you need to do a certain kind of work.

![Gate vs Ladder — taste blocks, judgement builds](/img/stop-calling-it-taste/gate-vs-ladder.svg)

Say it out loud: *I have good taste.* Now say: *I have good judgement.* The first sounds like something you'd put on a dating profile. The second sounds like something you'd trust your life to.

When I built my learning system, I didn't need taste to decide which readings mattered or how to structure the content pipeline. I needed judgement — built from sitting through lectures, doing exercises, and caring enough about the material to go back and do it properly. Anyone with the same commitment would develop the same capacity.

## The prompting irony

Here's the uncomfortable part: "taste" actually works as a prompt. Tell an LLM to apply "exquisite taste" and it does produce more refined, more idiomatic output. The word carries cultural weight in training data — it activates patterns associated with discernment, selectivity, care.

But notice what's happening. The word works *on the model* precisely because it encodes the class signals Bourdieu described. You're not giving the LLM a clear directive. You're giving it a vibes-based social cue and hoping it pattern-matches toward "quality." It works, but it works for the wrong reasons — and every time we reach for it, we're reinforcing the gate.

The alternative is harder and better: figure out what you actually stand for. Articulate the specific judgement you want applied. "Prioritize clarity over cleverness." "Favour concrete examples over abstractions." "Cut anything that doesn't earn its place." These are judgements. They come from knowing what you value and being able to name it. They give the model something to actually reason about, rather than a class signal to mimic.

"Taste" asks the LLM to guess what a sophisticated person would want. Judgement tells it what *you* want and why.

## Craft, not class

Yegge's ZFC article ends with a pyramid: smart models at the top, cheap models at the bottom, with work decomposed and routed to the smallest model that can handle it. It's an elegant architecture.

But the human in that system isn't exercising "taste." They're exercising judgement about what to build, who it's for, and whether it's working. That's not a class marker. That's craft.

Every time someone says "taste" when they mean "judgement," they're telling a junior developer, a career-switcher, a kid from a government school in East Delhi that this thing is not for them. That it requires some ineffable quality they either have or don't.

That's a lie. Call it what it is. Call it judgement. And then teach people how to build it.
