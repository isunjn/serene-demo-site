+++
title = "What If AI Wins and That's the Problem?"
date = "2026-02-25"
description = "A technical retelling of the 2028 Global Intelligence Crisis scenario — translated from finance-speak into engineering analogies and grounded in current agentic AI capabilities."

[taxonomies]
tags = [ "ai" ]

[extra]
featured = true
toc = false
+++

*Adapted from [The 2028 Global Intelligence Crisis](https://open.substack.com/pub/alapshah1/p/the-global-intelligence-crisis) by Citrini Research and Alap Shah. Written by Claude Opus 4.6, edited by Bharat.*

This is a retelling of that scenario, adapted for software engineers. The original is written for a finance audience; this version preserves the causal logic while translating financial concepts into engineering analogies and grounding AI capability claims in the current state of the art.

**This is a scenario, not a prediction.** The value is in tracing the causal chain — understanding *how* AI-driven disruption could propagate through the economy — not in believing every link will hold. This retelling steel-mans that chain, then stress-tests it.

## Three Things to Understand First

**How SaaS companies are valued.** Enterprise software companies are valued as a multiple of their recurring revenue. A company with $100M in annual committed contract value might be valued at 10-20x that number. The entire model assumes the "recurring" part holds — customers keep renewing. When customers can replicate core functionality in-house, that assumption breaks, and with it the math justifying the company's stock price and its debt.

{{ figure(src="/img/ai-wins/saas-multiplier.svg", alt="The revenue multiplier — when the recurring assumption breaks, the valuation collapses", caption="The entire valuation tower rests on one assumption: customers keep renewing") }}

**How consumer spending drives the US economy.** ~70% of US GDP is consumer spending. The top 20% of earners drive ~65% of discretionary spending — the houses, cars, vacations, and restaurant meals. White-collar tech and finance workers are heavily concentrated in that top 20%. This is the load-bearing wall of the economy. The scenario's central argument is that AI hits this wall directly.

{{ figure(src="/img/ai-wins/load-bearing-wall.svg", alt="The load-bearing wall — top 20% of earners support 65% of discretionary spending", caption="The top 20% of earners are the load-bearing wall of the US economy") }}

**How debt works at scale.** Companies and households borrow against expected future income. A mortgage assumes 30 years of stable employment. A leveraged buyout assumes years of revenue growth. When those expectations break, the debt doesn't disappear — it becomes a liability with no backing. Like over-provisioned infrastructure on a long-term contract after your traffic drops to zero: the cost is locked in, the revenue that was supposed to cover it isn't coming.

{{ figure(src="/img/ai-wins/debt-overprovision.svg", alt="Debt as over-provisioned infrastructure — obligations stay flat while income drops", caption="The cost is locked in. The revenue that was supposed to cover it isn't coming.") }}

## The Causal Chain

The scenario traces six links from "AI gets better" to "systemic economic crisis." Each link includes what the scenario claims happened, why it's plausible given current agentic AI capabilities, and where the logic might not hold.

{{ figure(src="/img/ai-wins/causal-chain.svg", alt="The six-link causal chain from AI capability to systemic crisis", caption="The six-link causal chain — color shifts from grounded (blue) to speculative (orange)") }}

---

### Link 1: Capability Leap → SaaS Disruption

**The claim.** By mid-2026, agentic coding tools were good enough that enterprises questioned whether they needed their mid-market SaaS vendors at all. Internal teams could replicate core functionality of six-figure annual contracts in weeks. Renewal negotiations shifted from "how much more will you pay" to "convince me not to build this myself." SaaS revenue growth decelerated, stock prices fell 40-60%, and companies responded by cutting headcount and investing the savings into more AI — accelerating the very disruption hitting them.

**Why it's plausible.** This is the link most grounded in current reality. As of early 2026, agentic coding tools represent a genuine step function:

- **Claude Code** operates as an autonomous coding agent in the terminal — reading codebases, making multi-file edits, running tests, and iterating on failures in a loop. It uses tool-calling (bash, file system, search) combined with extended thinking for multi-step reasoning. It can scaffold a working application, write tests, and debug without human intervention for stretches of 10-30 minutes.

- **Cursor** and similar IDE-integrated tools provide agent modes that plan and execute multi-step code changes with human review checkpoints.

- **Codex** and **Devin** push further toward autonomous software development, handling issue-to-PR workflows with varying degrees of human oversight.

The underlying architecture is converging: a foundation model with tool-use capabilities (function calling), operating in a planning-execution loop — reason about the task, take an action, observe the result, plan the next step. MCP (Model Context Protocol) is standardizing how agents connect to external tools and data sources, making integrations composable rather than bespoke.

For well-scoped tasks with clear success criteria — CRUD apps, internal dashboards, data pipelines, integration glue — these tools are already remarkably effective. A competent engineer paired with an agentic coding tool can produce in days what a small team needed weeks for.

The scenario's claim that a CIO starts asking "what if we just built this ourselves?" when reviewing a $500K SaaS renewal is not a stretch. It's already happening.

{{ figure(src="/img/ai-wins/build-vs-buy.svg", alt="The build-vs-buy tipping point", caption="The renewal conversation shifts from 'how much more' to 'convince me not to build this'") }}

**Where it might not hold.** Current tools excel at well-defined tasks with fast feedback loops (does it compile? do tests pass?). They struggle with large ambiguous codebases with implicit architectural constraints, cross-system integration where failure modes are subtle and slow to surface, and the organizational judgment calls that determine *what* to build. The gap between "replicate core functionality in a prototype" and "run it in production with the same reliability, security, and compliance as the vendor" is significant and often underestimated by non-practitioners. The scenario compresses this gap more aggressively than current evidence supports.

---

### Link 2: Intermediation Collapse

**The claim.** AI agents began handling consumer decisions autonomously — shopping, travel booking, insurance comparison, real estate. Businesses whose competitive advantage depended on human friction lost it. The specific frictions: habitual app loyalty, subscription inertia, information asymmetry, tolerance for bad prices to avoid more effort. Agents optimized for price and fit, ignoring brand and UX. Transaction fees became a target — agents routed payments through stablecoins to avoid the 2-3% card processing cut (a per-transaction platform tax, like an app store commission on every payment). Margins collapsed across travel, insurance, payments, food delivery, and real estate.

{{ figure(src="/img/ai-wins/friction-layers.svg", alt="Friction as a business model — agents bypass every layer", caption="Human friction is the business model. Agents don't have friction.") }}

**Why it's plausible.** The architectural pattern for agentic commerce already exists. Multi-step tool-use workflows are production-ready: an agent can search across providers, compare structured data, apply user preferences, and execute a transaction through the same planning-execution loop that drives coding agents — search, compare, evaluate constraints, act, verify.

MCP-style integrations make this composable. An agent doesn't need a custom integration with every provider; it needs a standardized interface to search, filter, and transact. The same pattern that lets a coding agent use bash, file I/O, and web search lets a commerce agent use price APIs, booking systems, and payment rails.

The compression of intermediation is already visible in narrow domains. Price comparison is trivial for machines. Subscription management tools that cancel unused services exist today. The scenario extrapolates these narrow capabilities to broad, autonomous, always-on consumer agency.

**Where it might not hold.** There's a large gap between "agent can compare prices" and "agent autonomously manages all your commerce 24/7." Trust is the bottleneck. Letting an agent transact with your money requires reliability that current systems don't provide — one hallucinated booking, one incorrect cancellation, and users revert to manual control. Error handling in agentic systems is unsolved at scale: when a multi-step transaction fails midway, recovery is non-trivial and often requires human judgment. The scenario's timeline (mainstream adoption by early 2027) is aggressive. The stablecoin payments claim is particularly speculative — regulatory friction, merchant adoption, and consumer trust barriers are substantial.

---

### Link 3: White-Collar Labor Displacement

**The claim.** Companies adopted AI not out of enthusiasm but survival. With revenues declining and boards demanding answers, they cut headcount and redeployed savings into AI tools to maintain output. Each company's individual response was rational; the collective result was a negative feedback loop: AI improves → companies cut workers → savings fund more AI → AI improves. Displaced white-collar workers downshifted to lower-paying service and gig economy jobs, compressing wages economy-wide. A senior product manager earning $180K becomes a rideshare driver earning $45K.

{{ figure(src="/img/ai-wins/feedback-loop.svg", alt="The displacement feedback loop", caption="The displacement feedback loop — each company's rational response collectively accelerates the cycle") }}

**Why it's plausible.** The pattern of using AI to maintain output with fewer people is already observable. Long-running research agents can synthesize documents, analyze data, and produce structured reports. Code review, test generation, and documentation are increasingly automated. The question isn't whether AI augments knowledge workers — it demonstrably does — but when augmentation tips into substitution.

Architecturally, the shift from "AI as autocomplete" to "AI as autonomous worker" is a shift from single-turn inference to multi-step agentic execution. A system that can plan, execute, observe, and iterate can handle tasks that previously required a human to coordinate the pieces. The underlying capabilities — tool use, extended context, multi-step reasoning — are improving on a curve that shows no sign of flattening.

The scenario's feedback loop logic is mechanically sound. It's OpEx substitution, not new CapEx. Companies don't need to spend more total; they reallocate existing spend from labor to compute. This means the loop can sustain itself even as the economy weakens — unlike a capital spending boom that depends on returns.

**Where it might not hold.** The scenario treats augmentation and substitution as points on a continuous curve. They may not be. There's a qualitative difference between a human directing an AI (augmentation) and an AI operating without a human (substitution). Current systems are firmly in augmentation territory. The jump to substitution requires not just better models but better reliability, better error recovery, and better judgment in ambiguous situations — capabilities that don't obviously follow from scaling current architectures alone. Enterprise adoption is also slower than the scenario implies: compliance reviews, security audits, integration testing, and institutional risk aversion create friction that technology alone doesn't resolve.

---

### Link 4: The Consumption Crash

**The claim.** High-earning white-collar workers — the top 20% who drive 65% of discretionary spending — lost jobs or took major pay cuts. Their savings buffers masked the damage for two to three quarters. By the time macro data confirmed the problem, it was deeply embedded. Discretionary spending collapsed in housing, dining, travel, and luxury goods.

**The mechanism.** A demand shock with an unusual shape. In a typical downturn, job losses are broad and show up quickly in spending data because lower-income workers spend most of what they earn. Here, losses are concentrated in higher earners who have savings buffers — they keep paying the mortgage for months after losing their job. The spending cut is lagged but deep.

{{ figure(src="/img/ai-wins/lagged-shock.svg", alt="The lagged demand shock", caption="Savings buffers mask the real damage — by the time data catches up, the hole is enormous") }}

The analogy: imagine your highest-value customers (driving 65% of revenue) silently churning, but their prepaid annual contracts mask the loss for two quarters. By the time your revenue metrics catch it, the hole is enormous and the pipeline to replace them doesn't exist.

---

### Link 5: Financial Contagion

**The claim.** Debt written against stable white-collar incomes began to crack. Private lenders had funded leveraged buyouts of SaaS companies at valuations that assumed perpetual revenue growth — those defaulted first. Then mortgage stress appeared in tech-heavy zip codes as displaced workers could no longer service loans. The $13 trillion US mortgage market was built on the assumption that a borrower with excellent credit and documented income would remain employed at roughly that income for 30 years. That assumption was structurally impaired.

**The mechanism.** These aren't bad loans in the 2008 sense — they weren't irresponsible when written. The underlying income that justified them eroded after origination. A capacity plan that was correct when designed but became over-provisioned after traffic patterns permanently changed. You're still paying for the capacity; the load that justified it isn't coming back.

The contagion path: SaaS company defaults hit private lenders → those lenders' losses hit the insurance companies funding them (asset managers had acquired life insurers and invested policyholder money into this private debt) → regulators forced capital raises → credit tightened across the system. The "permanent capital" that was supposed to absorb losses turned out to be backed by household savings. The sophisticated risk was sitting on Main Street's balance sheet.

{{ figure(src="/img/ai-wins/contagion-cascade.svg", alt="The contagion cascade", caption="Five dominoes that must all fall in sequence — question marks highlight the weak links") }}

---

### Link 6: Policy Failure

**The claim.** Government revenue depends on taxing human labor. AI shifted output from labor to capital. Tax receipts fell while demand for transfers (unemployment benefits, retraining programs, direct support) rose. The government needed to spend more at exactly the moment it was collecting less. The political system couldn't agree on a response fast enough.

**The mechanism.** A mismatch between the speed of technological change and the speed of institutional adaptation. The tax code, social safety net, and regulatory framework all assume that productivity gains flow through wages to households to spending to tax receipts. When gains flow through compute instead, that circular flow breaks.

The scenario raises a structural question: if labor's share of GDP drops sharply, the entire fiscal model needs restructuring — whether through deficit spending, AI compute taxes, or new redistribution mechanisms. All are politically contentious. In the scenario, none moved fast enough.

{{ figure(src="/img/ai-wins/circular-flow-break.svg", alt="The circular flow breaks — productivity gains route through compute instead of wages", caption="When productivity flows through compute instead of wages, the fiscal loop loses its funding source") }}

---

## Stress-Test

The scenario is a thought exercise. Here's where its load-bearing assumptions are most vulnerable.

**The substitution timeline is aggressive.** The scenario compresses the shift from "AI augments workers" to "AI replaces workers at scale" into roughly two years. Current agentic tools are powerful augmentation systems. The jump to autonomous substitution — where AI handles an entire role, not just tasks within it — requires advances in reliability, judgment, and error recovery that don't follow automatically from scaling current architectures. Two years is a very tight window.

**"No new jobs" is the strongest and weakest claim.** Every prior technology wave created jobs nobody predicted. The scenario argues this time is different because AI improves at the new tasks too — you can't redeploy to "AI management" if AI can do that. This is the crux of the entire argument. It may be right. It's also unfalsifiable until it happens, and every previous "this time is different" claim about technology and employment has been wrong.

**Enterprise adoption has more friction than the scenario allows.** Large organizations move slowly. Procurement cycles, compliance reviews, security requirements, integration costs, and institutional risk aversion create real barriers. The scenario assumes faster enterprise-wide adoption than most large organizations have demonstrated for any technology. COVID showed urgency can compress timelines, but that analogy is imperfect — COVID required using existing tools faster, not adopting fundamentally new workflows.

**The feedback loop may have natural brakes.** The displacement spiral is presented as self-reinforcing with no floor. But falling consumer demand eventually reduces the ROI of further AI investment. If nobody is buying your product, automating its production more efficiently doesn't help. The loop may decelerate before it becomes systemic.

**Policy response may be faster than assumed.** COVID demonstrated that governments can deploy trillions in weeks when forced to. The scenario's policy failure section may underweight this. Political gridlock is plausible but not inevitable.

**The financial contagion chain has several weak links.** The path from "some SaaS companies default" to "the mortgage market cracks" requires multiple dominoes to fall in sequence. Private credit losses need to be large enough to impair insurers. Insurer stress needs to tighten credit broadly. Mortgage delinquencies need to spread beyond tech-heavy zip codes to become systemic. Any one of these links breaking significantly weakens the cascade.

## So What?

The value of this scenario is not in its specific predictions but in making a causal chain explicit. If AI capability continues to accelerate (plausible), and if that acceleration displaces white-collar labor faster than the economy adapts (uncertain), then the financial system — built on assumptions about stable human employment — faces a structural repricing.

For engineers, Links 1-3 are what matter most. The capability trajectory is real. The build-vs-buy shift is already underway. The question of when augmentation becomes substitution is not academic — it's the variable that determines whether Links 4-6 ever fire.

