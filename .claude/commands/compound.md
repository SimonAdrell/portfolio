---
description: Turn a mistake from this task into a check, so it never happens again.
argument-hint: [optional: the mistake, e.g. "hard-coded text instead of a message key"]
---

Mistake to prevent: $ARGUMENTS
(If empty: look back at this session and list what I had to correct, or what /review found. Pick the most useful one.)

Encode it in the strongest form that fits, in this order:

1. A lint rule (`eslint.config.js`) or a TypeScript type: fails on every edit.
2. A test (`src/**/*.spec.ts` or `e2e/`): fails before finishing.
3. A hook (`.claude/hooks/`).
4. A command (`.claude/commands/`).
5. A line in AGENTS.md. Last resort, because the agent may ignore it.

Steps:

1. Propose the check in 3 lines: what, where, and the error message the next agent will see. The message must say how to fix it.
2. **Wait for my approval.**
3. Add it, then prove it works: show it fails on the bad code and passes on the good code.
4. Run `npm run verify`.
