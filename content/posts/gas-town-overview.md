+++
title = "The Orchestration Leap: A Gas Town Overview"
date = "2026-02-22"
description = "Synthesized from Steve Yegge's Gas Town series on multi-agent orchestration"

[taxonomies]
tags = [ "ai-written", "ai-agents" ]

[extra]
featured = false
toc = false
+++
*Synthesized from Steve Yegge's Gas Town series, January 2026. Written by Claude Opus 4.6, edited by Bharat.*

Everyone is chasing the coding agent. Every major tech company has shipped one: Claude Code, Codex, Gemini CLI, Amp, Q Developer. They all look the same — a CLI that reads files, writes code, runs tests, and dies when its context fills up. As Yegge puts it, the industry is "an embarrassing little kid's soccer team chasing the 2025 CLI form factor," all converging on the same single-agent paradigm.

But the single agent is a dead end. Not because it's bad — it's astonishingly good — but because one agent, no matter how smart, hits a ceiling that no amount of model intelligence will lift. The real frontier isn't a better agent. It's what happens when you lash thirty of them together and teach them to work as a factory.

This is the story of Gas Town: a system that took three failed predecessors, 75,000 lines of Go, and seventeen days of feverish vibe coding to reach liftoff — and that represents, if Yegge is right, the shape of software development for the next several years. What follows synthesizes three blog posts published in the first two weeks of January 2026. The repetition is removed and the argument tightened, but the hard-won architectural insight is preserved: orchestrating many mediocre sessions beats perfecting one.

## The Single-Agent Ceiling

{{ figure(src="/img/orchestration-leap/single-agent-ceiling.svg", alt="The single-agent ceiling", caption="The single-agent ceiling") }}

The fundamental constraint is familiar to anyone who's spent serious time with coding agents: they die. Context windows fill up in five to ten minutes of hard work. The agent ages from newborn to geriatric in that span, and then it's gone. You pull a fresh clone, explain the situation again, and repeat.

This is manageable when you're working on a single task. But real software projects have dozens of things happening at once — features being built, bugs being filed, tests breaking, code reviews landing, releases going out. A single agent can only do one of these at a time, and each context reset costs minutes of ramp-up. The human becomes the bottleneck, not because they're slow at coding, but because they're slow at *babysitting*. As Yegge describes it, ninety-five to ninety-nine percent of interactions with coding agents are mundane: "Now fix the broken tests." "No, I don't care which of those two you do first." "Yes, I'd like you to continue." His LinkedIn title had been "AI Babysitter" for six months. He wanted his evenings back.

The insight that unlocked everything was a shift in strategy. Stop trying to make one agent better. Start making *more* of them. If a single agent can move a small mountain in ten minutes, thirty agents can reshape a landscape in an afternoon — if you can keep them coordinated. That coordination problem is the orchestration problem, and it turns out to be genuinely hard.

## Three Orchestrators and a Funeral

{{ figure(src="/img/orchestration-leap/orchestrator-evolution.svg", alt="The four orchestrators", caption="The four orchestrators") }}

Gas Town was not Yegge's first attempt. It was his fourth complete, functioning orchestrator of 2025, and the failures are as instructive as the success.

**Orchestrator v1:** `vibecoder` **(TypeScript, August 2025).** Built atop Temporal.io, the gold standard for workflow orchestration. It was a working system. But Temporal proved cumbersome for Yegge's needs — the workflows he was orchestrating turned out to be micro-workflows, since you have to severely decompose tasks for LLMs to reliably follow them. Temporal is powerful enough for distributed cloud services but overkill for a desktop developer tool. Yegge still believes Temporal will be a key piece of the puzzle for scaling AI workflows to enterprise level, but he needed something lighter.

**Orchestrator v2:** `vc` **(Go).** In hindsight, the lesson from v1 was "make more agents, not better ones." But Yegge tried again to make agents better — a more monolithic approach that wound up bloated and wrong-headed. The failure wasn't total: Beads, the lightweight Git-backed issue tracker that would become the foundation for everything that followed, was born during v2. Abandoned.

**Orchestrator v3: PGT / Python Gas Town (November 2025).** This was the pivot. Yegge gave up on quality and switched focus to quantity. He moved all his ad-hoc named agents under a single directory tree, organized them with `git worktree`, and started trying to coordinate swarms.

PGT eagerly adopted a discovery by Jeffrey Emanuel, author of MCP Agent Mail: combining mail with Beads led to an ad-hoc "agent village" where agents naturally collaborated, divided work, and farmed it out. PGT grew quickly and carried Yegge for several weeks. Most of its roles evolved here. But something about it felt right enough to warrant one more rewrite.

**Orchestrator v4: Gas Town (Go, December 15 onward).** The last two weeks of December were the fertile innovation period. Yegge had promised to launch by Christmas or New Year's. He wound up redesigning and rewriting the whole thing in Go — 75,000 lines, 2,000 commits in seventeen days. Ninety percent of Gas Town's design emerged during this sprint.

It finally achieved liftoff at 8pm on December 29th. Yegge had been talking to the Mayor, complaining about things, and then the fixes started landing around him. He realized he was just shaping the whole thing by talking. The convoys were flowing and landing, the work was being filed and reviewed. He'd been aiming for this for months.

The Go rewrite was deliberate. Across his four orchestrators (TypeScript, Go, Python, Go), Yegge found Go to be far and away the best language for vibe coding. Go's compilation errors are "the closest thing we have to formal verification of vibe-coded work." TypeScript has too many red herrings. Python's type system does nothing for correctness. But Go says "you have an error on line 47" and it's a real error — you fix it and the code works.

## Welcome to Gas Town

{{ figure(src="/img/orchestration-leap/gas-town-architecture.svg", alt="Gas Town's architecture", caption="Gas Town's architecture") }}

Gas Town is an opinionated orchestration system for running twenty to thirty Claude Code instances simultaneously. It draws comparison to both Kubernetes and Temporal, though neither analogy captures the full picture. Like K8s, it coordinates unreliable workers toward a goal using a control plane watching over execution nodes. Like Temporal, it guarantees workflow completion through persistent state. But the destination is different. Kubernetes asks "is it running?" Gas Town asks "is it done?"

One thing to know up front: Gas Town degrades gracefully. Every worker can do its job independently, or in small groups, and at any time you can choose which parts of Gas Town you want running. It even works in a "no-tmux" mode, limping along on naked Claude Code sessions without real-time messages. Slower, but still functional.

The system is built on seven worker roles, all prompted into standard Claude Code instances, plus the human operator (the **Overseer**, who has their own identity, inbox, and mail in the system).

The physical layout starts with the **Town** — your HQ directory (e.g. `~/gt`), managed by the `gt` binary. Each project (git repo) under Gas Town management is a **Rig**. Some roles are per-rig (Witness, Polecats, Refinery, Crew), while others are town-level (Mayor, Deacon, Dogs).

**The Mayor** is the primary agent the human talks to — a concierge and chief-of-staff that kicks off most work and receives notifications when it finishes.

**Polecats** are ephemeral per-rig workers that spin up on demand, swarm tasks, produce Merge Requests, and are fully decommissioned after the merge.

**The Refinery** is the engineer agent responsible for the Merge Queue, intelligently merging all changes one at a time to main — because once you start swarming workers, they get into "a monkey knife fight over rebasing."

**The Witness** watches over polecats and the Refinery, helping stuck workers get unstuck.

**The Deacon** is a patrol agent that runs a heartbeat loop, propagating "Do Your F-ing Job" signals downward to keep the system moving. (The name is a Dennis Hopper character from *Waterworld*, itself inspired by Lord Humungus from *Mad Max*.)

**Dogs** are the Deacon's personal helpers for maintenance and handyman work. A special Dog named **Boot** wakes every five minutes just to check on the Deacon, deciding whether it needs a heartbeat, a nudge, a restart, or simply to be left alone.

**The Crew** are long-lived, named per-rig agents that the human works with directly for design, debugging, and back-and-forth collaboration — the direct replacements for whatever workflow you used to be using.

Everything in Gas Town runs on Beads — the lightweight Git-backed issue tracker created two months earlier. Beads serves as both the data plane and control plane: all work, all identities, all mail, and all orchestration are expressed as Beads issues in a JSONL file checked into Git. This is not an accident. Beads was the breakthrough from the failed `vc` orchestrator (v2) that made everything else possible.

### GUPP: The Propulsion Principle

The biggest problem with coding agents is that they stop. The context window fills, the agent runs out of steam, and it sits there waiting for human input. GUPP — the Gastown Universal Propulsion Principle — is the solution.

GUPP states simply: **if there is work on your hook, YOU MUST RUN IT.**

Every Gas Town worker has a persistent identity expressed as a Bead, and every identity has a "hook" — a special pinned Bead where work gets hung. The fundamental primitive is `gt sling`: you sling work to a worker, it goes on their hook, and the worker executes it. If the session crashes or context fills up, the hook persists in Git. When a new session starts for that worker role, GUPP kicks in: the agent finds work on its hook and continues without waiting for permission.

In practice, Claude Code is "so miserably polite" that GUPP doesn't always fire automatically. Agents sometimes sit there waiting for input even when their hook is loaded. So Gas Town has a workaround — the GUPP Nudge — where patrol agents send a tmux notification to wake up stalled workers within thirty to sixty seconds. With the nudge hack in place and the hierarchical heartbeat from the Deacon downward, GUPP generally keeps Gas Town humming for as long as there's work available.

### MEOW: The Work Stack

Gas Town operates on a layered stack of work abstractions called MEOW — the Molecular Expression of Work.

{{ figure(src="/img/orchestration-leap/meow-stack.svg", alt="The MEOW stack", caption="The MEOW stack") }}

At the base are **Beads**: atomic work units, individual issues with status, priority, type, and assignee. Above them are **Epics**: Beads with children, which can themselves be epics, giving you flexible top-down plans where children are parallel by default but can be explicitly sequenced with dependencies.

Then come **Molecules**: workflows chained with Beads. Unlike epics, molecules can have arbitrary shapes — loops, gates, branching paths — and they're Turing-complete. Each step of the workflow is executed by a superintelligent AI that's reliable at following TODO lists and acceptance criteria. If the workflow is captured as a molecule, it survives agent crashes, compactions, restarts, and interruptions. Just start the agent up in the same sandbox, have it find its place in the molecule, and pick up where it left off.

The remaining layers build on molecules. **Protomolecules** are templates — entire graphs of template issues with instructions and dependencies set up in advance, which you instantiate into molecules via variable substitution. (Yegge has a 20-step release process for Beads encoded as a protomolecule.) **Formulas**, written in TOML, are the source form for workflows, "cooked" into protomolecules and then instantiated. And **Guzzoline** is the term for the entire sea of molecularized work — all the work in the world, composed together, ready for Gas Town to swarm.

## Nondeterministic Idempotence

{{ figure(src="/img/orchestration-leap/session-lifecycle.svg", alt="The session lifecycle", caption="The session lifecycle") }}

At the heart of Gas Town's reliability guarantee is a principle called Nondeterministic Idempotence, or NDI. It is superficially similar to Temporal's deterministic durable replay, but achieves its durability through completely different machinery.

In Gas Town, an agent is not a session. Sessions are ephemeral — the "cattle" in the Kubernetes "pets vs cattle" metaphor. Claude Code sessions are the cattle that Gas Town throws at persistent work. The work lives in Beads (persistent, in Git). The hook is a Bead (persistent, in Git). The agent identity is a Bead (persistent, in Git). Sessions come and go; agents stay.

So it doesn't matter if Claude Code crashes or runs out of context. As soon as another session starts up for that agent role, it picks up the molecule where the last session left off. If it finds that the previous session crashed mid-step, it figures out the right fix, performs it, and moves on.

The path is fully nondeterministic — there's no replay log, no event sourcing, no deterministic re-execution. But the *outcome* is idempotent: the workflow eventually finishes, "guaranteed," as long as you keep throwing agents at it. The agent may even make mistakes along the way, but can self-correct, because the molecule's acceptance criteria are presumably well-specified by whoever designed the molecule. This isn't a replacement for Temporal — but it provides workflow guarantees that are "plenty good enough for a developer tool."

### Wisps and Patrols

Two refinements complete the execution model. **Wisps** are ephemeral Beads — they exist in the database and get hash IDs, but Gas Town never writes them to the JSONL file or persists them to Git. At the end of their run, wisps are "burned" (destroyed). They're the vapor phase of Gas Town's work matter, used for high-velocity orchestration workflows that need transactional guarantees without polluting Git history.

**Patrols** are ephemeral wisp workflows that run in loops for the system's supervisory roles. The Refinery's patrol processes the Merge Queue until it's empty. The Witness's patrol checks on polecats and refineries. The Deacon's patrol runs town-level plugins and ensures workers are properly maintained. Patrols have exponential backoff — the agent gradually goes to sleep if it finds no work, then wakes when any mutating command signals new activity.

The most surprising feature to emerge from the session lifecycle is `gt seance` — a command that lets workers communicate with their predecessors by resuming old Claude Code sessions. When a worker hands off and the successor can't find the handoff notes, the new session can revive the previous one with Claude Code's `/resume` feature and ask: "Where the hell is my stuff you left for me?"

### Convoys

Everything in Gas Town rolls up into a **Convoy** — Gas Town's ticketing or work-order system. A Convoy is a special bead that wraps a bunch of work into a unit you track for delivery. It doesn't use the Epic structure, because the tracked issues in a Convoy mostly already have another parent.

The fundamental primitive for slinging work is `gt sling`. Tell the Mayor "our tmux sessions are showing the wrong rig count — file it and sling it," and the Mayor will file a bead for the problem and sling it to a polecat, which works on it immediately. Every unit of slung work, from a single polecat task to a large swarm, gets wrapped with a Convoy. Convoys show up in a dashboard with expanding trees for each convoy's tracked issues.

A Convoy can have multiple swarms attack it before it's finished. Swarms are ephemeral agent sessions taking on persistent work. Whoever is managing the Convoy keeps recycling polecats and pushing them on issues until everything lands. Convoys are basically features — whether a tech debt cleanup, a bug fix, or an actual feature, each one is a ticketing unit of Gas Town's work-order architecture.

## The Invisible Garden

{{ figure(src="/img/orchestration-leap/three-loops.svg", alt="The three developer loops", caption="The three developer loops") }}

Gas Town has been running in production since January 1, 2026. In the first twelve days, Yegge merged over 100 pull requests from nearly 50 contributors, adding 44,000 lines of code that no human has looked at. This grew Gas Town to 189,000 lines of Go code across 2,684 commits since its first commit on December 15th.

It has not been smooth.

### The Serial Killer Mystery

The most dramatic failure was a week-long murder mystery. Workers were dying mid-task — entire crews vanishing without explanation. The investigation went on like a game of Clue. Spoiler: the Deacon did it. It was cleaning up "stale" workers that weren't actually stale, murdering them during active tasks. The bug was subtle enough to resist diagnosis for close to a week.

### Heresies

A more insidious problem is "heresies": compelling but wrong beliefs about the architecture that spread invisibly through the codebase. Agents are approximate workers and they like to guess. For instance, "idle polecats" is a persistent heresy — there is no such thing as an idle polecat; it's not a state in the system. But agents love to invent concepts that sound plausible, and once an agent commits a heresy to code, future agents read it and assume it's real.

You're tending an invisible garden of code you never directly inspect. The garden gets diseases. The treatment is regular code review sweeps followed by bug-fix sweeps — a PR Sheriff maintaining a permanent standing order to review and quality-gate pull requests. Core principles captured in code help stamp out heresies: Zero Framework Cognition, GUPP, MEOW, Discovery over Tracking, Beads as the Universal Data Plane.

The practical maintenance cadence follows the three developer loops from the Vibe Coding book (co-authored with Gene Kim): an **outer loop** (days to weeks) for strategic planning and architecture, a **middle loop** (hours to days) for feature development and convoy management, and an **inner loop** (seconds to minutes) for individual agent interactions and handoffs. Gas Town adds new steps to each loop, but the structure holds.

## What Changes

Gas Town is expensive, chaotic, and occasionally terrifying. Early adopters report burning through their API budget while completing ten projects overnight. It requires multiple Claude Code subscription accounts, a commitment to tmux as your primary interface, and the emotional fortitude to watch superintelligent agents wreck each other's work and then recover. As Yegge warns: "Gas Town is an industrialized coding factory manned by superintelligent robot chimps, and when they feel like it, they can wreck your shit in an instant."

The series defines eight stages of developer evolution toward AI — a model that has since taken on a life of its own, with developers self-assessing on LinkedIn and in blog posts:

1. **Zero or near-zero AI.** Maybe code completions, sometimes asking chat questions.
2. **Coding agent in IDE, permissions on.** A narrow agent in a sidebar asks your permission to run tools.
3. **Agent in IDE, YOLO mode.** Trust goes up. You turn off permissions, the agent gets wider.
4. **In IDE, wide agent.** Your agent gradually grows to fill the screen. Code is just for diffs.
5. **CLI, single agent.** Full YOLO. Diffs scroll by. You may or may not look at them.
6. **CLI, multi-agent.** You regularly use 3-5 parallel instances. You are very fast.
7. **10+ agents, hand-managed.** You are starting to push the limits of hand-management.
8. **Building your own orchestrator.** You are on the frontier, automating your workflow.

If you're not at least Stage 7 — or maybe Stage 6 and very brave — Gas Town is not for you yet. It represents a genuine phase transition from hand-managing agents to industrial orchestration.

### Big Companies in Big Trouble

The prediction: big companies will face an existential crisis in 2026. The problem: big companies are slow, weighed down by processes, approvals, review cycles, and organizational inertia. All of that made sense when writing code was the bottleneck. But code is no longer the bottleneck — decision-making is. Meanwhile, small teams of two to five people armed with AI agents can now produce software at a rate that rivals teams of fifty to a hundred. A small team with $10K/month in API costs can outproduce a team with a $2M/month payroll. The entire world is going to explode into tiny companies, which will then aggregate and re-form into larger ones — a Cambrian explosion for software companies.

Agents themselves will specialize. Gas Town already shows this: the Deacon is a planner, polecats are workers, Dogs are reviewers. By end of 2026, expect purpose-built agents specifically trained for code review, test writing, database migration, security auditing, and performance optimization. General-purpose agents will still exist, but they'll be like general practitioners in medicine — you go to them first, and they refer you to specialists.

### Factory, Not Workbench

{{ figure(src="/img/orchestration-leap/factory-vs-workbench.svg", alt="Factory vs. workbench", caption="Factory vs. workbench") }}

The deepest implication is architectural. IDEs are workbenches — visual environments optimized for a human writing code by hand. Agents don't need any of that. They read files, write code, run tests, look at errors. The IDE was always for humans, and humans are increasingly not the ones writing the code.

The framing: "You don't put the factory inside the workbench. You put the workbench inside the factory." Cursor, Windsurf, and others saw the agent wave coming and tried to jam agents into the IDE. But that's backwards. Gas Town is a factory. IDEs are workbenches. The future is factories.

In this model, the human becomes a Product Manager and Gas Town is an Idea Compiler. You design features, file implementation plans, sling work to polecats and crew, and watch convoys land. The focus shifts from writing code to making decisions — which was always the actual bottleneck at big companies, hidden behind the illusion that code-writing was the slow part.

### Four Free Upgrades

Gas Town will improve dramatically through 2026 without anyone lifting a finger:

1. **Smarter models.** He aimed high, and the current "oozing swamp monster" will become a "shiny, well-run agent factory" as model cognition improves.
2. **Training-corpus absorption.** Gas Town and Beads will enter the training corpus, so agents will know about them natively by summer. Yegge has been curating Gas Town using what he calls the "Desire Paths" approach to agent UX: you tell the agent what you want, watch closely what they try, and then implement the thing they tried — make it real — over and over, until the tool works the way agents believe it should. Gas Town is already becoming agent-friendly, even without being in the training data.
3. **Platform competition.** Agent platforms will compete on how well they support factory-worker automation hooks — turning their "beloved pets into cattle."
4. **Community momentum.** Over 50 PRs and double that in issues and feature requests landed in the first weekend alone.

### Honest Caveats

Gas Town is seventeen days old. It's 100% vibe coded — Yegge has never seen the code. It needs multiple expensive API subscriptions. It can murder your workers mid-task. Its heresies spread like disease through invisible code. The tmux interface is functional but primitive. The plugin system is barely sketched. Federation — linking multiple Gas Towns across machines — isn't built yet.

And yet people are already using it despite every warning not to, because the promise is extraordinary: a system where you describe what you want and agents build it, autonomously, through the night, coordinated by persistent work molecules that survive any individual session's death.

The question Gas Town poses isn't whether it works perfectly — it doesn't. The question is whether the orchestration paradigm is right. Whether the future belongs to factories rather than workbenches. Whether the leap from one agent to thirty is as transformative as the leap from hand-coding to agents.

Yegge is betting his career on yes. Seventeen days, 75,000 lines of code, three failed predecessors, and one nondeterministically idempotent coding factory later, the bet is starting to look reasonable.
