+++
title = "The Orchestration Leap: A Gas Town Overview"
date = 2026-02-22
description = "Synthesized from Steve Yegge's Gas Town series on multi-agent orchestration"
slug = "gas-town-overview"

[taxonomies]
tags = ["ai-written", "ai-agents"]

[extra]
featured = false
toc = false
+++

# The Orchestration Leap

*Synthesized from Steve Yegge's Gas Town series, January 2026. Written by Claude Opus 4.6.*

Everyone is chasing the coding agent. Every major tech company has shipped one — Claude Code, Codex, Gemini CLI, Amp, Q Developer — and they all look the same: a CLI that reads files, writes code, runs tests, and dies when its context fills up. The industry is, as Yegge puts it, "an embarrassing little kid's soccer team chasing the 2025 CLI form factor," all converging on the same single-agent paradigm.

But the single agent is a dead end. Not because it's bad — it's astonishingly good — but because one agent, no matter how smart, hits a ceiling that no amount of model intelligence will lift. The real frontier isn't a better agent. It's what happens when you lash thirty of them together and teach them to work as a factory.

This is the story of Gas Town: a system that took four failed attempts, 75,000 lines of Go, and seventeen days of feverish vibe coding to reach liftoff — and that represents, if Yegge is right, the shape of software development for the next several years. What follows synthesizes three blog posts published in the first two weeks of January 2026, removing the repetition and tightening the argument while preserving the hard-won architectural insight: that orchestrating many mediocre sessions beats perfecting one.

## The Single-Agent Ceiling

The fundamental constraint is familiar to anyone who's spent serious time with coding agents: they die. Context windows fill up in five to ten minutes of hard work. The agent ages from newborn to geriatric in that span, and then it's gone. You pull a fresh clone, explain the situation again, and repeat.

This is manageable when you're working on a single task. But real software projects have dozens of things happening at once — features being built, bugs being filed, tests breaking, code reviews landing, releases going out. A single agent can only do one of these at a time, and each context reset costs minutes of ramp-up. The human becomes the bottleneck, not because they're slow at coding, but because they're slow at *babysitting*. As Yegge describes it, ninety-five to ninety-nine percent of interactions with coding agents are mundane: "Now fix the broken tests." "No, I don't care which of those two you do first." "Yes, I'd like you to continue." His LinkedIn title had been "AI Babysitter" for six months. He wanted his evenings back.

{{ figure(src="/img/orchestration-leap/single-agent-ceiling.svg", alt="The single-agent ceiling", caption="The single-agent ceiling") }}

The insight that unlocked everything was a shift in strategy. Stop trying to make one agent better. Start making *more* of them. If a single agent can move a small mountain in ten minutes, thirty agents can reshape a landscape in an afternoon — if you can keep them coordinated. That coordination problem is the orchestration problem, and it turns out to be genuinely hard.

## Three Orchestrators and a Funeral

Gas Town was not Yegge's first attempt. It was his fourth complete, functioning orchestrator of 2025, and the failures are as instructive as the success.

**Orchestrator v1: `vibecoder` (TypeScript, August 2025).** Built atop Temporal.io, the gold standard for workflow orchestration. Yegge pushed hard for forty days — coding on the beach at a company offsite in Cabo, coding by voice while driving 60 mph, coding at the mall while his wife hid behind the laptop. The agents produced 350,000 lines of TypeScript. It was a working system. And then two fatal design decisions revealed themselves. Temporal was too heavy for a desktop developer tool — powerful enough for distributed cloud services but overkill here, and by the time Yegge realized this, it was load-bearing throughout the entire architecture. Worse, plan-based orchestration didn't work. Seventy thousand lines of plan-management code produced nothing but confusion. Agents dropped into the hierarchical master plan like paratroopers into a jungle and got lost every time.

**Orchestrator v2: `vc` (Go).** The lesson from v1 should have been "make more agents, not better ones." Instead, Yegge tried again to make agents better — a more monolithic approach that wound up bloated and wrong-headed. Abandoned.

**Orchestrator v3: PGT / Python Gas Town (November 2025).** This was the pivot. Yegge gave up on quality and switched focus to quantity. He moved all his ad-hoc named agents under a single directory tree, organized them with `git worktree`, and started trying to coordinate swarms. PGT eagerly adopted a discovery by Jeffrey Emanuel, author of MCP Agent Mail: combining mail with Beads led to an ad-hoc "agent village" where agents naturally collaborated, divided work, and farmed it out. PGT grew quickly and carried Yegge for several weeks. Most of its roles evolved here. But something about it felt right enough to warrant one more rewrite.

{{ figure(src="/img/orchestration-leap/orchestrator-evolution.svg", alt="The four orchestrators", caption="The four orchestrators") }}

**Orchestrator v4: Gas Town (Go, December 15 onward).** The last two weeks of December were the fertile innovation period. Yegge had promised to launch by Christmas or New Year's. He wound up redesigning and rewriting the whole thing in Go — 75,000 lines, 2,000 commits in seventeen days. Ninety percent of Gas Town's design emerged during this sprint. It finally achieved liftoff at 8pm on December 29th. Yegge had been talking to the Mayor, complaining about things, and then the fixes started landing around him, and he realized he was just shaping the whole thing by talking. The convoys were flowing and landing, the work was being filed and reviewed. He'd been aiming for this for months.

The Go rewrite was deliberate. Across his four orchestrators (TypeScript, Go, Python, Go), Yegge found Go to be far and away the best language for vibe coding. Go's compilation errors are "the closest thing we have to formal verification of vibe-coded work." TypeScript has too many red herrings. Python's type system does nothing for correctness. But Go says "you have an error on line 47" and it's a real error — you fix it and the code works.

## Welcome to Gas Town

Gas Town is an opinionated orchestration system for running twenty to thirty Claude Code instances simultaneously. Yegge compares it to both Kubernetes and Temporal, though the resemblance only emerges if you squint. Like K8s, it coordinates unreliable workers toward a goal using a control plane watching over execution nodes. Like Temporal, it guarantees workflow completion through persistent state. But the destination is different. Kubernetes asks "is it running?" Gas Town asks "is it done?"

The system is built on seven worker roles, all prompted into standard Claude Code instances, plus the human operator.

{{ figure(src="/img/orchestration-leap/gas-town-architecture.svg", alt="Gas Town's architecture", caption="Gas Town's architecture") }}

**The Mayor** is the primary agent the human talks to — a concierge and chief-of-staff that kicks off most work and receives notifications when it finishes. **Polecats** are ephemeral per-project workers that spin up on demand, swarm tasks, produce Merge Requests, and are fully decommissioned after the merge. **The Refinery** is the engineer agent responsible for the Merge Queue, intelligently merging all changes one at a time to main — because once you start swarming workers, they get into what Yegge calls "a monkey knife fight over rebasing." **The Witness** watches over polecats and the Refinery, helping stuck workers get unstuck. **The Deacon** — named for a Dennis Hopper character from Waterworld, making it a Mad Max crossover — is a patrol agent that runs a heartbeat loop, propagating "Do Your F-ing Job" signals downward to keep the system moving. **Dogs** are the Deacon's personal helpers for maintenance and handyman work. And **the Crew** are long-lived, named per-project agents that the human works with directly for design, debugging, and back-and-forth collaboration.

Everything in Gas Town runs on Beads — the lightweight Git-backed issue tracker that Yegge created two months earlier. Beads serves as both the data plane and control plane: all work, all identities, all mail, and all orchestration are expressed as Beads issues in a JSONL file checked into Git. This is not an accident. Beads was the breakthrough from the failed `vibecoder` project that made everything else possible.

### GUPP: The Propulsion Principle

The biggest problem with coding agents is that they stop. The context window fills, the agent runs out of steam, and it sits there waiting for human input. GUPP — the Gastown Universal Propulsion Principle — is Yegge's solution.

GUPP states simply: **if there is work on your hook, YOU MUST RUN IT.**

Every Gas Town worker has a persistent identity expressed as a Bead, and every identity has a "hook" — a special pinned Bead where work gets hung. The fundamental primitive is `gt sling`: you sling work to a worker, it goes on their hook, and the worker executes it. If the session crashes or context fills up, the hook persists in Git. When a new session starts for that worker role, GUPP kicks in: the agent finds work on its hook and continues without waiting for permission.

In practice, Claude Code is "so miserably polite" that GUPP doesn't always fire automatically. Agents sometimes sit there waiting for input even when their hook is loaded. So Gas Town has a workaround — the GUPP Nudge — where patrol agents send a tmux notification to wake up stalled workers within thirty to sixty seconds. With the nudge hack in place and the hierarchical heartbeat from the Deacon downward, GUPP generally keeps Gas Town humming for as long as there's work available.

### MEOW: The Work Stack

Gas Town operates on a layered stack of work abstractions that Yegge calls MEOW — the Molecular Expression of Work.

{{ figure(src="/img/orchestration-leap/meow-stack.svg", alt="The MEOW stack", caption="The MEOW stack") }}

At the base are **Beads**: atomic work units, individual issues with status, priority, type, and assignee. Above them are **Epics**: Beads with children, which can themselves be epics, giving you flexible top-down plans where children are parallel by default but can be explicitly sequenced with dependencies.

Then come **Molecules**: workflows chained with Beads. Unlike epics, molecules can have arbitrary shapes — loops, gates, branching paths — and they're Turing-complete. Each step of the workflow is executed by a superintelligent AI that's reliable at following TODO lists and acceptance criteria. If the workflow is captured as a molecule, it survives agent crashes, compactions, restarts, and interruptions. Just start the agent up in the same sandbox, have it find its place in the molecule, and pick up where it left off.

**Protomolecules** are templates — entire graphs of template issues with instructions and dependencies set up in advance, which you instantiate into molecules via variable substitution. Yegge has a 20-step release process for Beads encoded as a protomolecule. **Formulas**, written in TOML, are the source form for workflows, "cooked" into protomolecules and then instantiated. And **Guzzoline** is the term for the entire sea of molecularized work — all the work in the world, composed together, ready for Gas Town to swarm.

## Nondeterministic Idempotence

At the heart of Gas Town's reliability guarantee is a principle Yegge calls Nondeterministic Idempotence, or NDI. It is superficially similar to Temporal's deterministic durable replay, but achieves its durability through completely different machinery.

{{ figure(src="/img/orchestration-leap/session-lifecycle.svg", alt="The session lifecycle", caption="The session lifecycle") }}

In Gas Town, an agent is not a session. Sessions are ephemeral — the "cattle" in the Kubernetes "pets vs cattle" metaphor. Claude Code sessions are the cattle that Gas Town throws at persistent work. The work lives in Beads (persistent, in Git). The hook is a Bead (persistent, in Git). The agent identity is a Bead (persistent, in Git). Sessions come and go; agents stay.

So it doesn't matter if Claude Code crashes or runs out of context. As soon as another session starts up for that agent role, it picks up the molecule where the last session left off. If it finds that the previous session crashed mid-step, it figures out the right fix, performs it, and moves on. The agent may even make mistakes along the way, but can self-correct, because the molecule's acceptance criteria are presumably well-specified.

The path is fully nondeterministic — there's no replay log, no event sourcing, no deterministic re-execution. But the *outcome* is idempotent: the workflow eventually finishes, "guaranteed," as long as you keep throwing agents at it. It's guaranteed in the same way that a roomful of chimps at typewriters will eventually produce Shakespeare — except these chimps are superintelligent and working from a TODO list, so "eventually" means "pretty quickly."

### Wisps and Patrols

Two refinements complete the execution model. **Wisps** are ephemeral Beads — they exist in the database and get hash IDs, but are never written to the JSONL file or persisted to Git. At the end of their run, wisps are "burned" (destroyed). They're the vapor phase of Gas Town's work matter, used for high-velocity orchestration workflows that need transactional guarantees without polluting Git history.

**Patrols** are ephemeral wisp workflows that run in loops for the system's supervisory roles. The Refinery's patrol processes the Merge Queue until it's empty. The Witness's patrol checks on polecats and refineries. The Deacon's patrol runs town-level plugins and ensures workers are properly maintained. Patrols have exponential backoff — the agent gradually goes to sleep if it finds no work, then wakes when any mutating command signals new activity.

The most surprising feature to emerge from the session lifecycle is `gt seance` — a command that lets workers communicate with their predecessors by resuming old Claude Code sessions. When a worker hands off and the successor can't find the handoff notes, the new session can literally revive the previous one with Claude Code's `/resume` feature and ask: "Where the hell is my stuff you left for me?"

## The Invisible Garden

Gas Town has been running in production since January 1, 2026. In the first twelve days, Yegge merged over 100 pull requests from nearly 50 contributors, adding 44,000 lines of code that no human has looked at. This grew Gas Town to 189,000 lines of Go code across 2,684 commits since its first commit on December 15th.

It has not been smooth.

### The Serial Killer Mystery

The most dramatic failure was a week-long murder mystery. Workers were dying mid-task — entire crews vanishing without explanation. The investigation went on like a game of Clue. Spoiler: the Deacon did it. It was cleaning up "stale" workers that weren't actually stale, murdering them during active tasks. The bug was subtle enough to resist diagnosis for close to a week.

### Heresies

A more insidious problem is what Yegge calls "heresies": compelling but wrong beliefs about the architecture that spread invisibly through the codebase. Agents are approximate workers and they like to guess. For instance, "idle polecats" is a persistent heresy — there is no such thing as an idle polecat; it's not a state in the system. But agents love to invent concepts that sound plausible, and once a heresy gets committed to code, future agents read it and assume it's real.

{{ figure(src="/img/orchestration-leap/three-loops.svg", alt="The three developer loops", caption="The three developer loops") }}

You're tending an invisible garden of code you never directly inspect. The garden gets diseases. The treatment is regular code review sweeps followed by bug-fix sweeps — a PR Sheriff maintaining a permanent standing order to review and quality-gate pull requests. Core principles captured in code help stamp out heresies: Zero Framework Cognition, GUPP, MEOW, Discovery over Tracking, Beads as the Universal Data Plane.

The practical maintenance cadence follows the three developer loops from the Vibe Coding book (co-authored with Gene Kim): an **outer loop** (days to weeks) for strategic planning and architecture, a **middle loop** (hours to days) for feature development and convoy management, and an **inner loop** (seconds to minutes) for individual agent interactions and handoffs. Gas Town adds new steps to each loop, but the structure holds.

## What Changes

Gas Town is expensive, chaotic, and occasionally terrifying. Early adopters report it "drained their bank account and did 10 projects overnight." It requires multiple Claude Code subscription accounts, a commitment to tmux as your primary interface, and the emotional fortitude to watch superintelligent agents wreck each other's work and then recover. As Yegge warns: "Gas Town is an industrialized coding factory manned by superintelligent robot chimps, and when they feel like it, they can wreck your shit in an instant."

But for those at what Yegge calls Stage 7 or above of the developer evolution — people already juggling five or more agents daily and pushing the limits of hand management — Gas Town represents a genuine phase transition.

{{ figure(src="/img/orchestration-leap/factory-vs-workbench.svg", alt="Factory vs. workbench", caption="Factory vs. workbench") }}

### Factory, Not Workbench

The deepest implication is architectural. IDEs are workbenches — visual environments optimized for a human writing code by hand. Agents don't need any of that. They read files, write code, run tests, look at errors. The IDE was always for humans, and humans are increasingly not the ones writing the code.

Yegge's framing: "You don't put the factory inside the workbench. You put the workbench inside the factory." Cursor, Windsurf, and others saw the agent wave coming and tried to jam agents into the IDE. But that's backwards. Gas Town is a factory. IDEs are workbenches. The future is factories.

In this model, the human becomes a Product Manager and Gas Town is an Idea Compiler. You design features, file implementation plans, sling work to polecats and crew, and watch convoys land. The focus shifts from writing code to making decisions — which is, as Yegge points out, what was always the actual bottleneck at big companies, hidden behind the illusion that code-writing was the slow part.

### Four Free Upgrades

Gas Town will improve dramatically through 2026 without Yegge lifting a finger. First, models will get smarter — he aimed high, and the current "oozing swamp monster" will become a "shiny, well-run agent factory" as model cognition improves. Second, Gas Town and Beads will enter the training corpus, so agents will know about them natively by summer. Third, agent platforms will compete on how well they support factory-worker automation hooks — turning their "beloved pets into cattle." Fourth, the community is already going nuts, with over 50 PRs and double that in issues and feature requests in the first weekend alone.

### Honest Caveats

Gas Town is seventeen days old. It's 100% vibe coded — Yegge has never seen the code. It needs multiple expensive API subscriptions. It can murder your workers mid-task. Its heresies spread like disease through invisible code. The tmux interface is functional but primitive. The plugin system is barely sketched. Federation — linking multiple Gas Towns across machines — isn't built yet.

And yet people are already using it despite every warning not to, because the promise is extraordinary: a system where you describe what you want and agents build it, autonomously, through the night, coordinated by persistent work molecules that survive any individual session's death.

The question Gas Town poses isn't whether it works perfectly — it doesn't. The question is whether the orchestration paradigm is right. Whether the future belongs to factories rather than workbenches. Whether the leap from one agent to thirty is as transformative as the leap from hand-coding to agents.

Yegge is betting his career on yes. Seventeen days, 75,000 lines of code, four failed predecessors, and one nondeterministically idempotent coding factory later, the bet is starting to look reasonable.
