---
layout: post
title: "什麼是 AI Agents？"
date: 2026-04-25 15:00:00 +0800
tags: [AI Agents]
---

最近在和不同的公司交流，聊到 AI 應用時，話題常常圍繞著如何為公司或客戶設計一套屬於他們的 Agent Flow，或者說 Agent Design Pattern——可能是 ReAct pattern、Parallel pattern……

但每次聊到這裡，我心裡都會浮現一個疑問：**任務的複雜度，真的需要設計出這麼複雜的流程嗎？**

在早期，模型能力與 Context Window 還沒那麼強的時候，我常用 Parallel pattern 將不同子任務分配給預先設計好的 Agent，效果相當顯著——讓模型能更專注在特定任務上。記得有一次面試，我和面試官分享這段經驗，他反問我：「你認為什麼是 AI Agent？」

作為開發者，我當時的直覺是：Agent 就是一個 LLM，背後串接各種 API/MCP 工具存取外部資源，讓 LLM 根據任務需求調用不同工具來完成目標，這其中也包含Context的管理，任務的辨別能力等等...但簡化來說，就是呼叫一次 LLM provider 的 API、管理呼叫API時chat_history的刪減，優化System Prompt(意圖判斷的能力)，並且為工作流程進行設計。

但我漸漸發現，這樣的定義過於簡化，也容易產生認知上的落差。

## AI Agent 的定義

受益於 *Agentic Design Patterns*（Antonio Gulli 著），我認為這是我看過對 AI Agent 最清晰明瞭的定義，他說：

> AI agent is a system designed to perceive its environment and take actions to achieve a specific goal. It's an evolution from a standard Large Language Model (LLM), enhanced with the abilities to plan, use tools, and interact with its surroundings.

一個完整的 Agent System 包含以下幾個核心步驟：

1. **Get The Mission** — 接收任務
2. **Scan The Scene** — 感知環境
3. **Think it Through** — 規劃策略
4. **Take Action** — 執行行動
5. **Learn and Get Better** — 從結果中學習與優化

這五個步驟，構成了一個完整 Agent 的能力。

我覺得這也回答到，一個完整的Agent能力是複雜的，各式各樣的AGENT設計模式（ReAct、Parallel、Route）都是為了讓LLM疊加上這些能力。


## 我的場景，真的需要完整的 Agent 能力嗎？


有了清晰的定義之後，下一個問題就是：**使用場景是否需要這麼完整的能力？**

面對客戶需求，我通常會先問自己幾個問題：

1. 任務需要使用者主動提供，還是 Agent 必須能自主感知環境？
2. 情境是固定的，還是動態變化的？
3. 是否需要從錯誤中學習並持續優化？

以 **Parallel pattern** 為例，它適合在情境固定、任務較為複雜的場景下使用。在這種情況下，Agent 不需要太強的環境感知能力，因為任務已被預先分配好，Agent 只需專注完成各自的子任務，不需要思考整體流程或應對情境變化。

相反，若場景是**動態且不可預測的**，**ReAct pattern** 則更為適合。Agent 需要持續感知環境的變化，根據新的資訊調整行動策略，這對環境感知與迭代優化的能力要求都更高。

各種Pattern的設計沒有好壞，只有適不適合的問題，選擇前一定要先釐清可以接受哪些，以及不能接受哪些，這也帶到我認為在設計 Agent 的時候，無法避開的一個重要議題：**AI Agent 的 Iron Triangle**。


## AI Agent 的 Iron Triangle

設計 AI Agent 時，我認為同樣存在一個類似的 Iron Triangle，只是三個頂點換成了：**Accuracy（準確性）、Latency（延遲）、Cost（成本）**。

![AI_AGENT_IRON_TRIANGLE](https://static.jimmyblog.site/2026-04-26-what-is-ai-agents/AI_AGENT_IRON_TRIANGLE_2.webp)

三者無法兼得，設計前必須先釐清你最在乎哪個維度。

這也是我認為基於SLM（Single Large Model）Agent Flow 設計仍然具備研究價值的原因，因為在被各種強大的大型語言模型寵溺的當下，可能讓我們忽略了，**在某些場景下，簡單的 SLM Agent Flow 就足夠了**，不需要為了追求更高的準確性而投入更多成本。


## 爆紅的OpenClaw 

2026年初，OpenClaw 的爆紅，也讓我在和其他公司或客戶交流時，很常被問到，我怎麼看待 OpenClaw 的設計，以及它在 Agent 設計上的啟示。OpenClaw 的成功，主要在他在設計上直接讓 Agent 具備操作系統的能力，不再是單純的串接各種API，而是操作電腦去達成任務。但模型依舊是核心，如何使用SLM也達到不錯的效果，或許會是下一個Agent設計的挑戰。

我很喜歡 Andrej Karpathy 將 LLM 應用比擬為作業系統的說法。

![LLMOS](https://static.jimmyblog.site/2026-04-26-what-is-ai-agents/LLMOS.webp)

這也啟發我用這個框架去解釋LLM 和 AI Agent 的關係：

![AI_AGENT_COMPUTER_SYSTEM](https://static.jimmyblog.site/2026-04-26-what-is-ai-agents/AI_AGENT_COMPUTER_SYSTEM.webp)

| AI 概念 | 零件 | 原因 |
|---------|---------|------|
| LLM | CPU | 核心運算、推理、理解語言的地方 |
| Agent 框架 | 主機板 | 把所有零件串在一起，協調各種訊號流動 |
| Tools | 擴充插槽 / PCIe | 讓 Agent 能接上外部能力（搜尋、執行程式等）|
| Memory | RAM | 短期記憶，處理當前任務的上下文 |
| Vector DB / DB| 硬碟 | 長期記憶，需要時再讀取 |
| System Prompt | BIOS 設定 | 開機前就決定好行為模式 |

## 參考資料
- [Agentic Design Patterns — Antonio Gulli](https://irp.cdn-website.com/ca79032a/files/uploaded/Agentic-Design-Patterns.pdf)
- [Agentic Design Patterns](https://rlancemartin.github.io/2026/01/09/agent_design/)
- [Multi-agent — LangChain](https://docs.langchain.com/oss/python/langchain/multi-agent)
- [Choose a design pattern for your agentic AI system — Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system)
- [Andrej Karpathy: Software Is Changing (Again)](https://www.youtube.com/watch?v=LCEmiRjPEtQ&t=620s)
