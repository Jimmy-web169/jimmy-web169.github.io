---
layout: post
title: "What Are Claude Code's Subagents and Skills?"
date: 2025-12-14 15:00:00 +0800
---

# The Breakneck Pace of AI Evolution

It's been nearly six months since I last wrote about Claude Code Hooks, and the progress in large language models during this period has been nothing short of staggering. We've seen Gemini 3.0, the new IDE tool [Antigravity](https://antigravity.google/), Claude Opus 4.5, and most recently GPT-5.2—all within just a few months. The sheer speed of iteration in the AI space is mind-blowing. It's got me thinking about whether I should invest more time into leveraging AI tools to streamline my workflow and automate more of my daily tasks.

# How Claude Code Has Evolved Over the Past Six Months

Claude Code has come a long way during this time. Starting from basic functionality, it can now orchestrate [Subagents](https://code.claude.com/docs/en/sub-agents) to tackle complex tasks collaboratively. The ecosystem has expanded with [plugins](https://code.claude.com/docs/en/plugins), a [marketplace](https://code.claude.com/docs/en/plugin-marketplaces), and other features that make extending functionality much more accessible. There's also the introduction of [Skills](https://code.claude.com/docs/en/skills), which let users define their own workflows and have Claude Code execute tasks according to these predefined procedures. These advancements have made Claude Code significantly more powerful and versatile across various use cases.

## What Are Subagents?

According to Claude Code's official documentation, Subagents are specialized agents designed to handle specific tasks. In my view, their primary purpose is to solve the problem of overly long context windows in a single conversation, which can hamper the model's effectiveness. By breaking down complex tasks into subtasks handled by different Subagents, you reduce the burden on any single conversation while allowing each Subagent to focus on its specific domain—ultimately improving both efficiency and accuracy.

## Use Cases for Subagents

I think this feature shines brightest when you need to orchestrate multiple MCP tools. If you've used VS Code Copilot extensively, you probably know that loading too many MCP tools in a single project can eat up a lot of context, making it harder for the model to effectively utilize them.

Defining a Subagent is straightforward—just create a `.md` file like this:

```markdown
---
name: your-sub-agent-name
description: Description of when this subagent should be invoked
tools: tool1, tool2, tool3  # Optional - inherits all tools if omitted
model: sonnet  # Optional - specify model alias or 'inherit'
---

Your subagent's system prompt goes here. This can be multiple paragraphs
and should clearly define the subagent's role, capabilities, and approach
to solving problems.

Include specific instructions, best practices, and any constraints
the subagent should follow.

---
```


## What Are Skills?

Here's how Anthropic officially defines Skills:

> Claude is powerful, but real work requires procedural knowledge and organizational context. Introducing Agent Skills, a new way to build specialized agents using files and folders.

Essentially, Skills help Claude Code better understand your workflows and organizational context, enabling it to complete tasks more effectively.

![Agent Skill](https://static.jimmyblog.site/2025-12-14-what-is-subagents-and-skills/agent_skill.webp)

Consider this scenario: you've connected multiple MCP tools to Claude Code, but you really only need it to complete a specific task. Let's say you want the agent to query data from a PostgreSQL database, format it into a report, and update it in Notion. Throughout this entire workflow, you might only use a handful of tools from a much larger toolkit. By defining the process steps through a Skill, you reduce the cognitive load on the LLM—it doesn't have to figure out which tools to use because you've already specified that, allowing it to focus on the task itself.

This is quite similar to what many people do during Vibe Coding, where they predefine certain workflows or steps for the agent to follow. The Skill concept works the same way, except it establishes a kind of "standardized workflow format" that's easier to extend or port to other CLI tools down the line.

> Codex CLI now supports Skills too: [Codex Agent Skills](https://developers.openai.com/codex/skills/)

# Don't Build Agents, Build Skills Instead

A few days ago, while browsing YouTube, I came across a video titled [Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog). It made some compelling points:

> Code is all you need.

And:

> Code is the universal interface

This got me thinking—could we treat CLI tools like Claude Code as general-purpose agents that help with generating reports and organizing data, rather than just writing code? Or maybe we should start viewing these procedural Skills as apps, with the Agent serving as the OS that helps us run them. After all, when it comes to integrating with third-party systems, any LLM web app—whether Gemini, ChatGPT, or others—just isn't as convenient as working in a CLI environment.

![Skill as an App](https://static.jimmyblog.site/2025-12-14-what-is-subagents-and-skills/Skill.webp)

# Final Thoughts

In summary, the introduction of Subagents and Skills opens up new possibilities for CLI tools and enables exploration of more real-world applications. That said, from a pure Vibe Coding tool perspective, I still prefer Cursor at the moment. Besides being significantly faster than VS Code Copilot, it offers a direct [browser element selection feature](https://cursor.com/docs/agent/browser) for frontend development that makes interaction much smoother. The pricing is also more flexible—unlike Claude Code Pro and Max, which lack a middle-ground option. When I get the chance, I'll share more thoughts on my experience with Vibe Coding tools.
