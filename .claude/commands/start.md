---
description: Start any task. Sizes it, then runs the right workflow.
argument-hint: <Notion task ID or URL, or a trivial task>
---

Task: $ARGUMENTS

## 1. Task, branch and size

Anything bigger than trivial needs a Notion task (see AGENTS.md). If the input isn't a task ID/URL and isn't trivial, stop and tell me to run `/ready-story` first.

For a Notion task:

1. Fetch the page and its `Planeringsunderlag` comment with the Notion MCP. The page is the task; the comment is a head start, not a plan.
2. Branch: if you're on `main`, stop and tell me to start a new session. If the branch is the app's own (`claude/…`) with no upstream, rename it to `task-<ID>-<short-slug>`. Write the branch name to the page's `Branch` property and set Status `In progress`.

Read the relevant code first. Then state the size in one line, with one reason:

- **Trivial**: fits in one sentence (copy, spacing, a color, a one-file fix).
- **Component or bug**: several files.
- **New page**: a new route.

## 2. Trivial

Make the change. The hooks check it. Show the diff summary in two lines.

## 3. Component, bug or new page

1. Write a short plan: files, what changes, how you'll verify it. Max 10 lines. One line per acceptance criterion: the test that proves it and its layer (Vitest, Playwright, or manual).
2. **Wait for my approval.** If I ask for a plan review, run the `plan-reviewer` agent with the plan and the criteria, show its findings, then ask again.
3. For a bug: first write a test that fails because of the bug. Show me it fails.
4. New page: write the acceptance tests first; they must fail for the right reason. Don't change an acceptance test to make it pass.
5. Implement in small steps. One step = one thing that compiles and passes.
6. For UI changes: screenshot the page at 375 and 1280 px in both locales and check it yourself.
7. Finish with: what changed, how it was verified, and "Run /review next".

After the PR opens: put its link in `MR/PR` and set Status `MR`.

Follow AGENTS.md. If a check fails, fix the cause; never disable a rule or skip a test.
