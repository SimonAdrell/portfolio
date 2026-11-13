---
description: Build several ready Notion tasks in parallel, one session and worktree per task.
argument-hint: [optional task IDs to limit the run to]
---

Scope: $ARGUMENTS, or else every ready task. Ready means: Notion database **Tasks** (see AGENTS.md), tag `Portfolio`, Status `Next` (fetch fresh at the start of every batch), the body doesn't start with `Stub`, its Open questions section says `None.`, it has a `## Planeringsunderlag` comment, no comment says it's blocked, and every `Blocked by: <ID>` in its body names a task at `Ready for prod` or `Done` (merged). List what you skipped and why.

e2e runs in CI on each PR, not locally: every worktree would serve on the same port (4173). If `.github/workflows/` on `origin/main` has no pull-request trigger, stop and tell me.

## 1. Plan (no side effects)

Run `git fetch origin` and `git merge --ff-only origin/main` in this checkout. If it can't fast-forward, stop and tell me: new worktrees are cut from local `main`.

Fetch the tasks and their Planeringsunderlag comments with the Notion MCP. For each one, read the relevant code and note:

- The Notion Size (`S`/`M`/`L`) and the `/start` kind (trivial, component or bug, new page).
- Files it touches, and the shared hotspots: the Hotspots line in `~/.claude/planning/portfolio.md`. `messages/*.json` overlaps in nearly every task; that's expected and solved by merge order.
- The `/start` plan: files, what changes, one line per AC with the test and its layer.

Group the tasks into batches that overlap as little as possible, at most 4 per batch. Give a merge order for tasks that share a hotspot: the one that moves shared code goes first.

Show the plan as one table per batch. Then ask with `AskUserQuestion`: one question per open decision, recommended option first, at most 4 per call. The last question is "Approve batch 1?" with Approve / Approve + plan review / Edit plan / Drop a task. On plan review, run the `plan-reviewer` agent with the plan and each task's acceptance criteria, show its findings, then ask again. **Wait for my approval.** It covers every task's `/start` plan, as long as the work stays inside it.

## 2. Build

Start one session per task with `start_session`: `initiation` user_asked, `context` fresh, `use_worktree` true, `source_branch` main, `name` `task-<ID>`, `wake_when_done` true, a `title`, and `background` = the task's goal and its approved plan. Never use the Agent tool for this: a subagent runs in your folder, without slash commands or the hooks. Give each session this brief, filled in:

> Build <ID> in this worktree. "The orchestrator" is the session that started you. Never use `AskUserQuestion`: send questions to the orchestrator with `SendMessage` to `parent` and end your turn. This brief overrides the approval waits in /start and /review. If you run a dev server, use `npm run dev -- --port <5180+n> --strictPort`: other worktrees run at the same time.
>
> 1. `git fetch origin main && git merge --ff-only origin/main`, then `npm install`. Follow `/start <ID>`. The orchestrator already approved this plan: <plan>. Skip that wait as long as the work matches it. Anything outside it: stop and ask the orchestrator.
> 2. Prove each new test can fail: break the code on purpose, see it go red, then undo.
> 3. Run `npm run verify`. Never run `npm run test:e2e` locally, including inside `/review`: CI runs it on the PR.
> 4. At most 3 fix rounds per red gate (verify or CI). Then stop and report the blocker. Never disable a rule, skip a test or add `any`.
> 5. Run `/review`, then `/ponytail:ponytail-review`. Fix Must fix and Should fix, and apply what shrinks the diff without changing behaviour or dropping an AC. Then run verify again.
> 6. All green: commit, push, and open a PR. Never `--no-verify`. The PR body has an "Acceptance criteria" table (one row per AC: test and layer, or UNVERIFIED and why) and every rejected Must or Should finding with its evidence. Only claim checks you actually ran. Then `gh pr checks <n> --watch`. Red CI counts as a fix round.
> 7. Post the Notion comment from `/review` without waiting: decisions and deviations from the story, plus screenshots at 375 and 1280 px in en and sv for UI changes (save them in `test-results/`, never commit them). Put the PR link in `MR/PR` and set Status `MR`.
> 8. Write nothing outside this worktree.
> 9. At the end: stop any dev server, and confirm the branch is pushed, the PR exists and CI is green. End the final report with "Compound candidates" (mistakes worth a check) instead of running /compound.

When a session asks something, answer it with `SendMessage` if this plan covers it. Otherwise ask me with `AskUserQuestion`, then pass on my answer.

After I say a PR is merged: set that task to `Ready for prod`, then message each unmerged session in this batch: "Merge `origin/main`, run `npm install` if `package.json` changed, run `npm run verify`, push, and wait for CI." Verify with `git merge-base --is-ancestor origin/main <branch>`. After a computer restart or a crashed session, check each worktree (`git status`, unpushed commits) and resend a resume instruction: messages to a restarting session can be lost.

## 3. Report

When every session in the batch has finished or is blocked, show one table: task, Notion size, branch, PR, verify, CI, fix rounds used, UNVERIFIED ACs, blockers. Then list:

- The merge order.
- Decisions that need me.
- After each merge: its manual checks on codebysimon.com. It's `Done` only after I verify it there.
- Compound candidates: mistake, the tasks it appeared in, and its strongest form per `/compound`. Search Notion for an existing `Check: <mistake>` stub. Found: add a comment and recommend `/compound` now. Not found: offer to create the stub (tag `Portfolio`, empty Status).
- Sessions to archive: merged tasks only, on my yes. Archiving deletes the worktree.

Then offer the next batch. Its worktrees come from `origin/main` after this batch is merged.
