# AGENTS.md

## Stack

SvelteKit 2 + Svelte 5, Tailwind CSS 4, Paraglide i18n (`messages/`, `project.inlang/`). Static portfolio site, no backend.

## Commands

- `npm run verify`: svelte-check, prettier + ESLint, unit tests. The full gate: run it before you commit or open a PR. Runs automatically when you end a turn with changed code.
- `npm run test:e2e`: Playwright (builds the site first).
- `npm run dev`: dev server.

## Map

- `src/routes/`: pages (`about/`, `contact/`, `skills/`).
- `src/lib/`: shared code, `i18n.ts`, `nav/`, `assets/`.
- `messages/`: translations. Never hard-code visible text; add a message key.
- `e2e/`: Playwright page-level checks.

## Tasks live in Notion

Database **Tasks** (`collection://125a9276-a24b-81de-ad5b-000b7f7e3f8e`), filtered on tag `Portfolio`. Not Linear.

- ID: the `ID` property (auto-increment). Refer to a task by its ID or page URL.
- Status: empty = stub/backlog, `Next` = ready to build, `In progress`, `MR` = PR open, `Ready for prod` = merged, `Done` only on Simon's OK.
- Stub marker: page body starts with `Stub, not checked against Definition of Ready.`
- Size property: `S` / `M` / `L`. Branch name goes in `Branch`, PR link in `MR/PR`.
- Planeringsunderlag: a page comment that starts with `## Planeringsunderlag`.
- Use the Notion MCP. Never invent page IDs; search first.

## How we work

- Anything bigger than trivial starts as a Notion task: `/ready-story`, then `/start <ID>` in a new session.
- Bugs: write a failing test first, then fix.
- Keep changes small. One task, one PR.
- When a check fails, fix the cause. Don't disable rules, skip tests, or add `any`.
- Mistake you had to correct? `/compound`.
