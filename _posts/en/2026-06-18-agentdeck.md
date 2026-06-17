---
layout: post
title: "AgentDeck: A Local-First, Data-Never-Leaves Dashboard for AI Coding Agents"
date: 2026-06-18 00:00:00 +0800
tags: [Claude Code, Codex, Vibe Coding]
---

I recently vibe coded a little open-source project end-to-end with Claude Code: **AgentDeck**.

It started from a simple itch. Scrolling back through history mid-run in Claude Code is hard to follow in a terminal. Resuming an old conversation means `cd`-ing into each project and running `/resume`, and I'd constantly lose track of which project I was even chatting under. The VSCode extension never quite clicked for me, and it doesn't show the full picture either. But all this conversation data already lives on your machine, quietly written by each CLI into `~/.claude` and `~/.codex` — nobody had bothered to visualize it.

So I built AgentDeck: a local dashboard that reads the files your CLIs already write, runs entirely on your machine, and never sends your data anywhere.

Here are the three things I reach for most:

## 1. See what your agent is actually doing

Replay any past conversation, see which tool calls ran and how often each built-in tool (Bash, Read, Edit…) was used — the diversity of tool usage at a glance. You can even observe Claude Code's recently launched workflow feature: the agents it fans out, and what each stage's subagents are doing and where they're at.

![monitor-work-flow](https://static.jimmyblog.site/2026-06-18-agentdeck/monitor-work-flow.webp)

## 2. Continue from the browser, manage shells with tmux

Pick up any past session and keep chatting — via the embedded terminal or the native SDK; it's backed by tmux to manage multiple shells, and you can jump straight into a running tmux session. Want a skill? There's a clean UI to import the ones you want.

![tmux-attach-session](https://static.jimmyblog.site/2026-06-18-agentdeck/tmux-attach-session.webp)

## 3. Token monitoring

Across projects, across sessions, or just the total — so you understand where your recent token spend is going.

![claude-states](https://static.jimmyblog.site/2026-06-18-agentdeck/claude-states.webp)

(Side note: Claude Code and Codex share one UI, switchable anytime.)

## Wrapping up

If you also work with AI coding agents every day and want to actually understand what they're doing, come try it, drop a star, or send a PR to add a new provider.

Link here → [github.com/Jimmy-web169/AgentDeck](https://github.com/Jimmy-web169/AgentDeck)
