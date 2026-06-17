---
layout: post
title: "AgentDeck：一個純本機、資料不外傳的 AI Coding Agent Dashboard"
date: 2026-06-18 00:00:00 +0800
tags: [Claude Code, Codex, Vibe Coding]
---

最近我用 Claude Code vibe code 出了一個開源小專案：**AgentDeck**。

起因很單純。Claude Code 執行到一半想往回滾看歷史訊息，在終端機裡其實很難觀測；想接續舊對話，又得切到每個專案底下 `/resume`，有點麻煩，而且常常忘記自己現在到底是在哪個 project 下對話。VSCode extension 我自己用起來不太習慣，觀測上也不夠完整。但其實這些對話資料，CLI 早就默默寫在你電腦的 `~/.claude`、`~/.codex` 裡了，只是沒人把它好好視覺化出來。

所以我做了 AgentDeck，一個跑在本機、純讀硬碟既有檔案、資料完全不外傳的 dashboard。

以下是三個我自己最常用的亮點：

## 1. 看懂 agent 在做什麼

回放每段歷史對話，看得到這次跑了哪些 tool call、內建工具（Bash、Read、Edit…）各用了幾次，工具使用的多樣性一目了然；連 Claude Code 最近推出的 workflow 也能觀測，看底下灑出去的 agent 與各階段 subagent 在做什麼、跑到哪。

![monitor-work-flow](https://static.jimmyblog.site/2026-06-18-agentdeck/monitor-work-flow.webp)

## 2. 從瀏覽器接著聊，用 tmux 管多個 shell

直接接續任何一段歷史對話繼續聊，可以用內嵌終端機，也可以走原生 SDK；背後用 tmux 管理多個 shell，還能即時跳進正在運行的 tmux session；想裝 skill 也有一個方便的介面，直接 import 你要的。

![tmux-attach-session](https://static.jimmyblog.site/2026-06-18-agentdeck/tmux-attach-session.webp)

## 3. Token 監控

跨專案、跨 session，或直接看 total，掌握自己近期的 token 花費狀態。

![claude-states](https://static.jimmyblog.site/2026-06-18-agentdeck/claude-states.webp)

（順帶一提，Claude Code 跟 Codex 是同一套 UI，可以隨時切換。）

## 結語

如果你也每天跟 AI coding agent 一起工作、想真的看懂它們在做什麼，歡迎來玩、給個 star，也歡迎 PR 一起加新的 provider。

連結放這 → [github.com/Jimmy-web169/AgentDeck](https://github.com/Jimmy-web169/AgentDeck)
