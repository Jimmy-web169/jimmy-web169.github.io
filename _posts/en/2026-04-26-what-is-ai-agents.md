---
layout: post
title: "What Are AI Agents?"
date: 2026-04-25 15:00:00 +0800
tags: [AI Agents]
---

Lately, whenever I talk with companies about AI adoption, the conversation almost always drifts toward designing an Agent Flow or Agent Design Pattern for their use case — ReAct pattern, Parallel pattern, you name it.

But every time we get there, the same question creeps into my head: **does the task actually need a flow this complex?**

Back when model capabilities and context windows weren't nearly as impressive, I used the Parallel pattern a lot — splitting subtasks across purpose-built agents to keep each one focused. It worked well. During one job interview, I was sharing this experience when the interviewer turned it around on me: "So what do *you* think an AI Agent actually is?"

As a developer, my gut answer was: an Agent is an LLM wired up to various APIs and MCP tools for external access, calling different tools based on the task at hand — plus context management, intent classification, system prompt tuning, and workflow design. But over time I realized that definition was too shallow, and it's the kind of gap that leads to real misunderstandings.

## Defining AI Agents

I came across a definition in *Agentic Design Patterns* by Antonio Gulli that I think is the clearest I've seen:

> AI agent is a system designed to perceive its environment and take actions to achieve a specific goal. It's an evolution from a standard Large Language Model (LLM), enhanced with the abilities to plan, use tools, and interact with its surroundings.

A complete Agent System runs through five core steps:

1. **Get The Mission** — receive the task
2. **Scan The Scene** — perceive the environment
3. **Think it Through** — plan the strategy
4. **Take Action** — execute
5. **Learn and Get Better** — improve from outcomes

These five steps are the capability framework of a fully realized Agent. It also explains why Agent design patterns — ReAct, Parallel, Route — exist in the first place: they're all attempts to layer these capabilities on top of an LLM.

## Does My Use Case Actually Need All of That?

Once you have a clear definition, the next question becomes: **does your scenario actually require the full stack?**

When I'm scoping a client project, I usually ask myself:

1. Does the task need to be user-initiated, or must the Agent sense its environment autonomously?
2. Is the context fixed, or does it change dynamically?
3. Does it need to learn from mistakes and improve over time?

Take the **Parallel pattern** — it shines in fixed-context, complex-task scenarios. The environment doesn't change, tasks are pre-assigned, and each Agent just needs to execute its piece without worrying about the bigger picture.

Flip to a **dynamic and unpredictable** scenario, and **ReAct pattern** is the better fit. The Agent needs to continuously read the environment and adjust its strategy as new information comes in — much higher demands on perception and iterative refinement.

No pattern is inherently better than another; it's all about fit. And figuring out fit means getting honest about what you can and can't tolerate — which brings me to what I think is unavoidable when designing any Agent: **the AI Agent Iron Triangle**.

## The AI Agent Iron Triangle

In Agent design, I think the same Iron Triangle applies, just with three different vertices: **Accuracy, Latency, and Cost**.

![AI_AGENT_IRON_TRIANGLE](https://static.jimmyblog.site/2026-04-26-what-is-ai-agents/AI_AGENT_IRON_TRIANGLE.webp)

| Trade-off | The Price |
|-----------|-----------|
| Fast + Accurate (low latency, high accuracy) | Expensive — stronger models, more compute |
| Fast + Cheap (low latency, low cost) | Inaccurate — smaller models, fewer reasoning steps |
| Accurate + Cheap (high accuracy, low cost) | Slow — multiple passes, repeated iteration |

You can't have all three. Know which dimension matters most before you start designing.

This is also why I think SLM (Small Language Model) based Agent Flow still has real research value. In an era where we're spoiled by powerful large models, it's easy to forget that **in some cases, a simple SLM Agent Flow is more than enough** — no need to throw money at a problem that doesn't require it.

## The Rise of OpenClaw

When OpenClaw blew up in early 2026, I got the same question over and over in client conversations: what do I make of its design, and what does it mean for Agent development?

OpenClaw's success comes down to one thing: it gave the Agent the ability to operate the OS directly — not just calling APIs, but actually using the computer to get things done. The model is still the core, but the interface to the world changed fundamentally. How to achieve similar results with an SLM might be the next real frontier in Agent design.

I love Andrej Karpathy's framing of LLM applications as an operating system.

![LLMOS](https://static.jimmyblog.site/2026-04-26-what-is-ai-agents/LLMOS.webp)

It inspired me to map the relationship between LLMs and AI Agents onto computer hardware:

![AI_AGENT_COMPUTER_SYSTEM](https://static.jimmyblog.site/2026-04-26-what-is-ai-agents/AI_AGENT_COMPUTER_SYSTEM.webp)

| AI Concept | Hardware | Why |
|------------|----------|-----|
| LLM | CPU | Core computation — reasoning, language understanding |
| Agent Framework | Motherboard | Ties everything together, coordinates signal flow |
| Tools | PCIe Slots | External capabilities (search, code execution, etc.) |
| Memory | RAM | Short-term memory, current task context |
| Vector DB / DB | Hard Drive | Long-term storage, retrieved when needed |
| System Prompt | BIOS Settings | Behavior defined before the system boots |

## Back to That Original Question

"So what do you think an AI Agent is?"

After all this, my answer is: an AI Agent is a system that can perceive its environment, form a plan, and take action. But more importantly — **it's not a universal solution**. Before designing one, getting clear on what your scenario actually needs matters far more than picking the right pattern.

---

## Reference

- [Agentic Design Patterns — Antonio Gulli](https://irp.cdn-website.com/ca79032a/files/uploaded/Agentic-Design-Patterns.pdf)
- [Agentic Design Patterns](https://rlancemartin.github.io/2026/01/09/agent_design/)
- [Multi-agent — LangChain](https://docs.langchain.com/oss/python/langchain/multi-agent)
- [Choose a design pattern for your agentic AI system — Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system)
- [Andrej Karpathy: Software Is Changing (Again)](https://www.youtube.com/watch?v=LCEmiRjPEtQ&t=620s)
