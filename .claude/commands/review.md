---
description: Fresh-eyes review of the current changes by a separate reviewer agent.
argument-hint: [optional focus, e.g. "accessibility"]
---

Use the `reviewer` subagent to review the current changes (committed on this branch and uncommitted). Extra focus: $ARGUMENTS

If the branch belongs to a Notion task (its `Branch` property matches, or the branch name holds its ID), fetch the task page with the Notion MCP and give the reviewer its Acceptance criteria and Scope boundary verbatim. The reviewer has no Notion access.

If the diff touches `src/hooks*.ts`, `.github/`, cookies or env vars, also run the `agent-skills:security-auditor` subagent on it, in parallel. Tell it not to edit files. Merge its findings into the same sections.

When the reviewer reports back:

1. Show me the findings as Must fix / Should fix / Nice to have.
2. Fix the Must fix items. Ask me before fixing anything else.
3. Run `npm run verify` and, if pages changed, `npm run test:e2e`.
4. If a finding is something a lint rule or test could catch next time, suggest `/compound`.
5. For a Notion task: draft one comment with the decisions made during the build. Show it, and post it on the page after I say yes.
