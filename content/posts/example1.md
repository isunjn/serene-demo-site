+++
title = "Gas Town for Normies"
date = "2026-02-24"

[taxonomies]
tags = []

[extra]
featured = false
toc = false
+++
*An experiment in coaching software with the playbooks of sports coaches Bill Belichick and Vince Lombardi. The former emphasizes standards and role clarity; the latter, the importance of strong fundamentals.*

*This is how I’ve been doing work distribution within my team, and I have been surprisingly impressed with the results I’m getting.*

---

## Foreword: The Playbook and The Visual Model

In complex software engineering, chaos is the default state. Unmanaged dependencies, untracked changes, and idle workers are how projects lose.

Gas Town is our countermeasure. It is an orchestration layer for artificial intelligence coding agents. We treat agent work as structured data. We operate on accountability, precise routing, and strict measurement.

The architects of this system used the cinematic universe of *Mad Max: Fury Road* as their mental model. That wasn’t a joke; it was a structural decision to describe exact behaviors. You cannot execute the play if you do not understand the terminology on the whiteboard.

Corporate environments try to mask operational realities behind passive enterprise jargon. We do not. We use the visual model of the wasteland because it perfectly describes the required behavior of the architecture.

Below is the visual model, paired with its technical reality and the structural diagrams that dictate execution. Bridge the gap in your mind. Execute the system as designed.

Do your job.

---

## Chapter 1: The Field of Play (The Environment)

You cannot execute if you don’t know where the boundaries are. Gas Town organizes your codebase into a strict hierarchy. If you don’t know where you are standing, your work will be misrouted.

### The Town

**The Reality:** Your Organizational Workspace. The macro-environment encompassing all your overarching projects.

**The Visual:** Gas Town itself. The massive, smoke-belching industrial settlement that produces fuel for the entire wasteland.

**The Execution:** You operate inside the Town, but project work does not happen at the Town level. It is purely structural.

> `[ 📸 FILM PLACEHOLDER: Wide cinematic shot of Gas Town from the movie Furiosa, showing the massive industrial smokestacks, fire, and gates. ]`

### The Rig

**The Reality:** The Repository or Project Environment.

**The Visual:** The War Rig. The massive, heavily armed 18-wheeler driven by Furiosa. It is a self-contained, mobile fortress.

**The Execution:** A Rig (e.g., “Greenplace”) is a specific micro-environment.

**All actual project code is written strictly inside a Rig.** Rigs compartmentalize context so AI agents do not hallucinate across different codebases.

Gas Town reads your current working directory to know which Rig you are in.

> `[ 📸 FILM PLACEHOLDER: A wide, dusty shot of the armored War Rig tearing across the desert wasteland in Fury Road. ]`

> `[ 📐 DIAGRAM 1: THE BOUNDARY MAP ]`
> ****What to illustrate:** A large outer container representing "The Town". Outside of the sub-containers, place the Mayor and the Deacon. Inside the Town, draw distinct, isolated inner containers representing specific "Rigs" (Rig A, Rig B). Inside each Rig container, place its local managers (Witness, Refinery) at the top, and its laborers (Crew, Polecats) at the bottom. 
> ****The Objective:** Visually prove that infrastructure daemons manage the Town, but workers live, execute, and die strictly inside a designated Rig container. Cross-contamination is structurally impossible.

---

## Chapter 2: The Coaching Staff (Infrastructure)

We maintain a strict separation between infrastructure and labor. Blurring these lines leads to systemic breakdown. The coaching staff manages the environment. They do not put on pads, and they do not write your feature code.

### The Mayor

**The Reality:** The Global Dispatcher and Master Router.

**The Visual:** The People Eater. The grotesque, suit-wearing leader of Gas Town who manages the logistics and fuel trades.

**The Execution:** There is only one Mayor per Town. It routes high-level traffic, coordinates cross-rig operations, and manages global state.

> `[ 📸 FILM PLACEHOLDER: The People Eater from Fury Road, wearing his chaotic business suit and counting his ledgers. ]`

### The Deacon

**The Reality:** The Health Monitor Daemon.

**The Visual:** A mechanic-priest from the Cult of the V8, obsessively maintaining the machines.

**The Execution:** The Deacon operates quietly in the background, maintaining system health across the entire Town through a relentless watchdog chain.

> `[ 📸 FILM PLACEHOLDER: A War Boy mechanic making the V8 hand sign in reverence to a massive, exposed car engine. ]`

### The Witness

**The Reality:** The Task Supervisor / Agent Lifecycle Manager.

**The Visual:** A War Boy screaming “Witness me!” and spraying chrome on his teeth before executing a glorious, suicidal mission.

**The Execution:** The Witness is the lifecycle manager for a single Rig. It monitors the ephemeral workers on the floor, nudges them when they stall, and verifies their cleanup.

When a temporary worker finishes its job, it essentially asks to be “witnessed” before it terminates.

> `[ 📸 FILM PLACEHOLDER: Nux (or another War Boy) with chrome spray paint on his mouth, screaming "Witness me!" with a fanatic look in his eyes. ]`

### The Refinery

**The Reality:** The Merge Queue Manager.

**The Visual:** The literal industrial machinery inside Gas Town that processes raw crude into usable guzzoline.

**The Execution:** The Refinery operates per-Rig. Once the Witness verifies a worker’s code, the Refinery handles the strict integration of that work into the Rig’s main branch.

> `[ 📸 FILM PLACEHOLDER: Close-up of the fiery, grinding industrial refining machines inside Gas Town. ]`

---

## Chapter 3: The Players on the Field (Execution)

These roles perform the actual project work. You must assign the right player to the right task, or you are wasting resources.

### The Polecat

**The Reality:** The Serverless Ephemeral Agent.

**The Visual:** Insane wasteland warriors swinging through the air on giant, bending metronomic poles attached to speeding vehicles. They drop in, do a single explosive job, and vanish.

**The Execution:** Polecats are transient AI workers managed by the Witness. **There is no such thing as an idle polecat.**

They are assigned a discrete task within a Rig, they spawn into an isolated workspace, execute the code, and systematically dismantle themselves upon completion.

> `[ 📸 FILM PLACEHOLDER: A War Boy polecat swinging down on a massive, bending pendulum pole during the high-speed chase scene in Fury Road. ]`

### The Crew

**The Reality:** The Persistent Workspace / Stateful Session.

**The Visual:** Furiosa, Max, and the gang operating the War Rig together over a long journey.

**The Execution:** These are long-lived workspaces managed by human operators or stateful agents. Use a Crew for exploratory work, architectural planning, and tasks requiring sustained context and judgment.

> `[ 📸 FILM PLACEHOLDER: Max and Furiosa working together intensely inside the cramped, gritty cab of the War Rig. ]`

### The Dog

**The Reality:** The Infrastructure Probe.

**The Visual:** Max Rockatansky’s loyal, highly trained Blue Heeler that scouts and guards his vehicle.

**The Execution:** Dogs are short-lived background scripts used *exclusively* by the Deacon to check system health.

**They are not project workers.** Do not assign a Dog to write feature code.

> `[ 📸 FILM PLACEHOLDER: Max's Blue Heeler dog sitting alert and guarding the V8 Interceptor in the wasteland. ]`

---

## Chapter 4: Managing the Workload

If you cannot measure it, you cannot manage it. We track work systematically.

### The Bead & The Hook

**The Reality:** The Issue/Ticket (Bead) and the Assignment Queue (Hook).

**The Visual:** Scavenged items used for tracking, or a heavy grappling hook slamming into a moving vehicle to initiate a boarding action.

**The Execution:** The atomic unit of work is a Bead. Every Bead belongs strictly to one Rig (e.g., `gp-123` belongs to the Greenplace rig). When a Bead is placed on an agent’s Hook, it is assigned.

> `[ 📸 FILM PLACEHOLDER: A heavy, rusted grappling hook slamming into the metal side of a speeding wasteland vehicle. ]`

### The Convoy

**The Reality:** A Batch Job or Epic spanning multiple tasks.

**The Visual:** A massive fleet of post-apocalyptic vehicles traveling together for defense.

**The Execution:** When you initiate batched work (`gt convoy create`), you create a Convoy. It acts as your dashboard, eliminating blind spots and notifying you when the entire batch lands.

> `[ 📸 FILM PLACEHOLDER: Immortan Joe's massive armada of heavily modified vehicles tearing across the desert in a wide formation, kicking up dust. ]`

> `[ 📐 DIAGRAM 2: THE ROUTING MATRIX ]`
> ****What to illustrate:** A top-down flow. Start with a single "Convoy" block at the top. Show it breaking apart into three individual "Bead" blocks. Draw hard routing arrows from the Beads to specific Rigs based on a data prefix: e.g., Bead `gp-123` routes directly to the Greenplace Rig's Hook; Bead `hq-456` routes to the Town HQ Hook.
> ****The Objective:** Show exactly how a batch job distributes work across the architecture automatically without losing track of a single ticket.

---

## Chapter 5: The Propulsion Principle

This is the core operational philosophy of Gas Town. Memorize it.

> **If you find something on your hook, you run it.**

We do not deal in hesitation. We do not wait for secondary authorization. The presence of work on an agent’s hook is the absolute authorization to execute.

Gas Town operates like a steam engine; the agents are the pistons. When pressure is applied via a work assignment, the piston fires. Execution must be immediate.

---

## Chapter 6: The Polecat Lifecycle

Understand the standard of execution for your transient labor.

1. **Birth:** Work is placed on the hook. A Polecat is spawned in the designated Rig.
2. **Execution:** The Polecat operates in a completely isolated version control worktree.
3. **Verification (The Witness):** When finished, the Polecat signals completion (`gt done`). The Witness steps in. It verifies the directory is clean, the branch is pushed, and CI checks pass. **A Polecat is not permitted to terminate if the build is failing.**
4. **Termination & Integration:** Once witnessed and verified, the Refinery merges the code, and the Polecat self-destructs.
   - *Failure state 1:* If it fails to clean up, it becomes a **Zombie** (Orphaned Process).
   - *Failure state 2:* If it stops working entirely, it is **Stalled**. Both are operational failures that the Witness will flag.

> `[ 📐 DIAGRAM 3: THE SNAP-TO-MERGE PIPELINE ]`
> ****What to illustrate:** A strict, linear state-machine flowchart. Sequence: Bead placed on Hook $\\rightarrow$ Polecat Spawns $\\rightarrow$ Code Executed $\\rightarrow$ Witness Verifies (Decision gate: CI/CD must be clean) $\\rightarrow$ Hand-off to Refinery $\\rightarrow$ Code Merged into Main $\\rightarrow$ Polecat Terminates. Add branch paths for "Zombie" and "Stalled" if verification or cleanup fails. 
> ****The Objective:** Prove to the operator that unverified work goes nowhere. The worker's job ends at the Witness; the codebase does not update until the Refinery merges it. Do not bypass the queue.

---

## Chapter 7: Cross-Rig Execution

Attribution is non-negotiable. If you are a Crew member in Rig A and need to fix an issue in Rig B, do not improvise. Choose one of two disciplined options:

- **Option 1: Worktrees (The Standard):** Create a temporary worktree in the target Rig (`gt worktree <target>`). Execute locally. Your identity and track record are preserved.
- **Option 2: Dispatch (The Sling):** If the target Rig’s native team should own the work, sling the work directly to their queue (`gt sling <bead-id> <target-rig>`).

**Crucial Warning:** Gas Town uses your current working directory to detect identity. Execute commands from the wrong directory, and you break the identity chain. Stay disciplined with your pathing.

> `[ 📐 DIAGRAM 4: THE IDENTITY FORK ]`
> ****What to illustrate:** A fork in the road originating from an operator in "Rig A". Path 1 (Top): Operator runs `gt worktree target` $\\rightarrow$ Works in local workspace $\\rightarrow$ Commit retains Original Operator Identity. Path 2 (Bottom): Operator runs `gt sling target` $\\rightarrow$ Bead moves to remote Rig's Hook $\\rightarrow$ Target Rig's agent executes $\\rightarrow$ Commit takes Target Rig Identity. 
> ****The Objective:** Solve the number one cause of attribution failure. Show that you either travel to the work properly, or you delegate the work properly.

---

## Chapter 8: Systemic Failures

The system does not fail; operators fail the system. Eliminate these operational breakdowns immediately:

1. **Operating blind to your Rig.** If you do not know what directory you are in, you do not know what Rig you are affecting.
2. **Using Dogs for user work.** Dogs belong to the Deacon. Use Crew or Polecats for projects.
3. **Believing Polecats sit idle.** They do not wait. They execute, or they are dismantled.
4. **Waiting for permission.** If it is on the hook, execute the Propulsion Principle.
5. **Bypassing pre-flight checks.** Unverified work is incomplete work. The Witness must verify before termination.

Know your environment. Know your role. Follow the principles. Execute.
