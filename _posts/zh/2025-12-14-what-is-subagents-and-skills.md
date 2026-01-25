---
layout: post
title: "什麼是 Claude Code 的 Subagents 與 Skills？"
date: 2025-12-14 15:00:00 +0800
---

# AI 迭代神速

距離上一次介紹 Claude Code Hooks 已經過了將近半年時間，這段期間內無論是大型語言模型的進步，包含 Gemini 3.0，新的IDE工具 [Antigravity](https://antigravity.google/)、Claude Opus 4.5 或是最近出來的 GPT-5.2，時間也才短短經歷了幾個月而已。這些模型的進步速度之快，讓人不禁感嘆 AI 領域的迭代速度真是神速。也開始讓我思考，是不是要投入更多時間來研究如何讓 AI 工具更有效率地協助我的工作，或是自動化更多我的日常任務。

# Claude Code 在這半年的進化
在這段期間內，Claude Code 也有了不少進化。從最初的基本功能，到目前可以規劃 [Subagents](https://code.claude.com/docs/zh-TW/sub-agents)，共同處理複雜任務，也延伸了 [plugin](https://code.claude.com/docs/zh-TW/plugins) 的概念、[marketplace](https://code.claude.com/docs/zh-TW/plugin-marketplaces) 等生態系，讓使用者可以更方便地擴展功能。另外還有引入 [Skill](https://code.claude.com/docs/zh-TW/skills) 的概念，讓使用者可以定義自己的 workflow，並讓 Claude Code 根據這些技能來執行任務。這些進化讓 Claude Code 變得更加強大，也更適合用於各種不同的應用場景。

## 什麼是 Subagents？

Subagents 在 Claude Code 官方的 Docs 中被定義為專門處理特定任務的 Agents，我覺得主要目的就是解決單一對話的 Context 過長導致模型無法有效處理的問題。透過 Subagents，可以將複雜任務拆解成多個子任務，並由不同的 Subagents 來處理，這樣不僅可以減少單一對話的負擔，也能讓每個 Subagent 專注於特定的任務，提高整體的效率和準確性。

## Subagents 的應用場景

這個功能我認為最適合運用在需要調度 MCP 工具的情境，常使用 VS Code Copilot 的人應該會知道，當同一專案調度過多的 MCP 工具時，可能會占用過多的 context，導致模型無法有效利用這些工具來完成任務。

撰寫方式也很容易，只需要透過撰寫一份 `.md` 檔案如下，就可以定義一個 Subagent，包含可用的工具及模型等資訊：

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


## 什麼是 Skill？

從 Anthropic 官方對於 Skill 的定義來看：

> Claude is powerful, but real work requires procedural knowledge and organizational context. Introducing Agent Skills, a new way to build specialized agents using files and folders.

其實可以理解，Skill 就是為了幫助 Claude Code 更好地理解使用者的工作流程和組織背景，從而更有效地完成任務。

![Agent Skill](https://static.jimmyblog.site/2025-12-14-what-is-subagents-and-skills/agent_skill.webp)

可以想像情境，假設我們在 Claude Code 同時串接了多項 MCP 工具，但是其實只是想要讓 Claude Code 幫忙完成特定的任務。隨機的舉例，假設是希望 Agent 到 PostgreSQL 資料庫中查詢特定的資料，並將資料整理成報表，更新到 Notion 中。在這整個流程中，可能只會調動到龐大工具中的幾項工具，透過 Skill 定義好步驟流程，可以減少讓 LLM 去思考到底要調用哪些工具，反而可以專注在任務本身。

其實就滿類似很多人在 Vibe Coding 時會預先定義一些流程或是步驟，來讓 Agent 遵守步驟完成任務，Skill 的概念也是類似的。只是像是更早提出這個概念，有點像是提出一個「流程化的標準」，方便日後擴展，或是沿用到其他CLI工具中。

> 現在 Codex CLI 也支援Skills：[Codex Agent Skills](https://developers.openai.com/codex/skills/)

# Don't Build Agents, Build Skills Instead

前幾天在瀏覽 YouTube 時，看到一支影片，標題是 [Don't Build Agents, Build Skills Instead](https://www.youtube.com/watch?v=CEvIs9y1uog)，其中提到：

> Code is all you need.

以及

> Code is the universal interface

其實也讓我思考，我們是否也可以把 Claude Code 這類 CLI 工具，也當作 General Purpose Agent，他可以幫忙產報表、整理資料，而不是僅限於程式碼生成。又或是開始把這些流程化的 Skill，視為一種 APP，而 Agent 只是 OS，來協助我們執行這些 APP。因為其實對於使用任何一項LLM Web App，無論是Gemini，ChatGPT...，在串接第三方的系統時，其實都不如在CLI環境中來得方便。

![Skill as an App](https://static.jimmyblog.site/2025-12-14-what-is-subagents-and-skills/Skill.webp)

# 結語
總結來說，Subagents 與 Skills 的引入，讓CLI工具有更多的可能性，也探索更多可能的生活場景，但如果以Vibe Coding工具的角度來看，我目前還是比較喜歡使用Cursor，除了運行時間上遠快於VS Code Copilot以外，在前端開發上，也提供直接[點選網頁元素的方式來完成任務交互](https://cursor.com/docs/agent/browser)，在價錢上面也有比較多種選擇，不像是 Claude Code Pro 以及 Max 之間沒有可選的中間方案。之後有時間的話，也會再來分享更多關於VibeCoding工具的使用心得。
