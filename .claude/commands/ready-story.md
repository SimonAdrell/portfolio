---
description: Turn a discussion, a draft or a Notion task into a Notion task that is ready to build. Use when we've landed on something ("make this a story", "skapa en story", "vi har landat", "is this ready", "gör den redo"), and suggest it when a discussion converges on building something and no story exists yet.
argument-hint: [optional: Notion task ID or URL]
---

Input: $ARGUMENTS

Runs in the main thread: the raw material is this conversation. This command only writes to Notion. It changes no code and makes no branch.

## The rule: never invent requirements

A gap in what I've said becomes a question, never a guess. Mark both kinds everywhere:

- `FÖRSLAG:` a wording of something I've said or agreed to. I may edit it silently.
- `FRÅGA:` something I haven't decided. It needs an answer or a deliberate "leave open" (recorded under Open questions) before the story is created.

A proposal I never answered is not agreed. Harvest what was said; don't force the discussion into a template.

## 1. Input and size

- **Discussion**: the conversation is the raw material.
- **Draft or ticket**: fetch the task page with the Notion MCP. It's raw material, not a finished story. If it conflicts with the conversation, that's a `FRÅGA`.

If it fits in one sentence (copy, a color, a one-file fix), say so in one line and end with `DIREKT`. I run `/start <task>` without a story. When in doubt, it's a story.

## 2. Pick the core first

List the outcomes in the material. More than one: the first `FRÅGA` is which ONE this story is (skip if we already settled it). Every other confirmed decision goes to **Avläggare** ("valt, men inte nu"), never into the story.

Harvesting:

- Turn the solution into an outcome: "a dropdown in the panel" becomes "the editor can pick a category". The goal must survive a different implementation.
- What (goal, criteria, scope) goes in the story. How (files, approach) goes in Planeringsunderlag (step 6). Rejected alternatives with their reason go under Bortvalt.

## 3. Checklist (each item: OK / FRÅGA / BLOCKERAR START)

1. **Goal**: one line, an outcome, no "and". Says who (visitor) and what they can do when it's done.
2. **Acceptance criteria**: each one is written `Given …, when …, then …` and maps to a Vitest or Playwright test. Each vague word ("fast", "nice") is a `FRÅGA`.
3. **Edge cases for this repo**:
   - Empty data (no projects, no skills): what renders then? No empty headings or links.
   - Both locales: every new text has a message key in every language.
   - WCAG 2.2 AA: landmarks, focus ring, 44 px targets, screen-reader labels.
   - Layout at the design system breakpoints. Which design system component, if any.
4. **Size**: (a) does the goal need "and"? Then it's two stories. (b) Drop each criterion in turn: is the goal still fully delivered? Then that criterion goes to Avläggare. (c) Can the parts ship and be verified separately? Then split them. Split stories become Avläggare, never sub-tasks.
5. **Prerequisites**: new dependencies, new env vars, i18n setup. Read the Planeringsunderlag comments on the open Portfolio tasks: overlapping files → say so. A task that moves shared code goes first. Never build on another unmerged task.
6. **New page only**: the route, and the SEO title and description. Always include: "Given a URL that doesn't exist, when I open it, then I get the 404 page".
7. **Scope boundary**: what's not included. Missing → `FRÅGA`.
8. **Size**: `S`, `M` or `L` (the Size property). Unclear → `FRÅGA`.

`BLOCKERAR START` = the goal can't be stated, or a decision is genuinely unmade.

## 4. Discussion loop, then the gate

Show the draft story with `FÖRSLAG` inline. Collapse passed items into one line (`Checklistan: 8 punkter, 2 FRÅGA`). Ask each `FRÅGA` with `AskUserQuestion`: at most 2 concrete options, the recommended one first marked `(Rekommenderas)`, plus `Lämna öppen` and `Diskutera` (the tool allows 4 options per question). Max 4 questions per call. Repeat until the checklist passes.

A `BLOCKERAR START` that remains: say what blocks and end with `EJ REDO`. Nothing has been created.

**Gate**, in one message:

1. The complete story, not summarized: what you see is what gets created.
2. The Avläggare list, each item with a proposal (stub or drop).
3. One line: creates a new task or updates `<ID>`, its Status and Size (e.g. "Next, `M`"), and posts a Planeringsunderlag comment.
4. Last line: `STORY — INVÄNTAR GODKÄNNANDE`.

Then `AskUserQuestion`: one question per Avläggare item (`Stub` / `Släpp` / `Diskutera`), then approval last (`Godkänn (Rekommenderas)` / `Nej` / `Diskutera`). Only `Godkänn` approves. If an answer changes the story text, show it again and ask again.

**Never create or change anything in Notion before approval.**

## 5. Create

Database **Tasks** (see AGENTS.md), tag `Portfolio`, Status `Next`, Size from the gate.

- Input was an existing task: update its title and body in place. Never create a second page. Add the `Portfolio` tag, leave other tags alone. Set `Next` only if Status is empty; a later status stays.
- Title: the outcome, sentence case.
- Page body sections in this order: Goal, In plain words, Acceptance criteria (numbered, Given/When/Then), Edge cases, Scope boundary, Bortvalt, Prerequisites, Open questions (write "None." if empty), Design (if there's a design reference).
- In plain words: the story as I'd explain it to the customer. What changes for visitors and editors, today versus after, and what it doesn't do. No code terms, file names or criterion numbers. It only restates the story: it never adds a requirement, and it's part of what the gate shows.
- Avläggare marked stub: same database, tag `Portfolio`, empty Status. Body starts with `Stub, not checked against Definition of Ready.` and holds only what was said. Ready it later with `/ready-story <stub ID>`.

## 6. Planeringsunderlag

Post this in chat and as a comment on the task. If the task already has a Planeringsunderlag comment, update that one instead of adding another:

```
## Planeringsunderlag (för /start — ingår inte i storyn)
- Trolig ansats: <direction we landed on, or "inga kända">
- Troligt berörda filer: <best guess, not binding, or "inga kända">
- Förutsättningar/riskytor: <from checklist item 5, or "inga kända">
```

Then tell me: start a new session (the app gives it its own worktree) and run `/start <ID>`.

## 7. Last line, exactly one of

```
REDO ATT PLANERAS — <ID> — <page URL>
REDO MED ÖPPNA FRÅGOR — <ID> — <page URL>
EJ REDO
DIREKT
```
