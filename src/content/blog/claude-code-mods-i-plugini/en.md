---
title: "Claude Code mods and official plugins: what's worth using"
description: 'Mods let you change Claude Code itself, and the official marketplace now lists 300+ plugins. Which ones a frontend developer should install, how mods work, and what to watch out for.'
date: 2026-11-17
tags: ['Claude Code', 'AI', 'plugins', 'frontend']
---

Short answer: a **plugin** is a package that adds skills, agents, MCP servers or a language server to Claude Code, and a **mod** is a kind of plugin — JavaScript or TypeScript that runs inside Claude Code and can change its interface, commands and tool calls. For frontend work, three or four plugins pay off (TypeScript LSP, a review agent, a browser tool, fresh docs). Mods are worth it when you need something specific, and only from authors you trust.

In my [post on how I use Claude Code day to day](/blog/kako-koristim-claude-code/) I covered the habits: plan before code, let the build do the checking, keep project instructions short. This one is about the tooling you can layer on top.

## What are Claude Code mods?

Anthropic [introduced mods in early October 2026](https://claude.com/resources/articles/claude-code-mods). According to the [official docs](https://code.claude.com/docs/en/plugins/mods/overview.md), a mod is a plugin whose code registers handlers for events — a tool call, a submitted prompt, part of the UI being drawn. A handler can observe the event, rewrite it, or answer it so the default behaviour never runs.

In practice a mod can:

- add a pane next to the transcript, or a band above the prompt, with buttons and inputs;
- hold a risky command (`rm -rf`, a force push) and ask you first;
- add a `/command` that runs your code instantly, without a model turn;
- restyle parts of Claude Code itself, like the spinner or a tool call row.

Some built-in features are now mods too: the `/diff` pane, `AGENTS.md` loading, and the opt-in "You should know" side agent that flags things you may have missed. Mods need Claude Code **v2.1.287** or later in the terminal, and also work in the desktop app's Code tab and the VS Code extension.

The quickest way to get it is to look at Anthropic's [sample mods](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods): `token-weather` draws a forecast of your context window above the prompt, and `blast-radius` shows what a destructive shell command would touch, with proceed and cancel buttons.

## Mod vs plugin vs hook vs skill: which one do you need?

This is where most people get confused. A condensed version of the [comparison in the docs](https://code.claude.com/docs/en/plugins/mods/overview.md):

| | What it is | Reach for it when |
| --- | --- | --- |
| **Skill** | A `SKILL.md` file of instructions | You keep pasting the same instructions into chat |
| **Settings hook** | A script that runs on a lifecycle event | You want to block, allow or log something with a script you already have |
| **MCP server** | An external process that gives Claude tools | Claude needs to reach Figma, a database, a deploy platform |
| **Mod** | JS/TS functions running inside Claude Code | You want a pane, a custom command, or to rewrite an event |
| **Plugin** | The package that ships any of the above | You want one-command install and to share it with a team |

So the plugin is the box; a mod is one thing you can put in it.

## What's in the official plugin marketplace?

Claude Code registers Anthropic's `claude-plugins-official` marketplace for you. As of mid-November 2026, its [catalogue on GitHub](https://github.com/anthropics/claude-plugins-official) lists **317 plugins**. Per the [docs](https://code.claude.com/docs/en/plugins/anthropic-marketplaces.md), most come from partners — Vercel, Netlify, Cloudflare, Figma, Sentry, Supabase and many more — while Anthropic maintains a smaller core such as `commit-commands`, `code-review`, `feature-dev` and the language-server plugins. There's also a separate community marketplace that you have to add yourself.

Installing is one line inside a session:

```text
/plugin install typescript-lsp@claude-plugins-official
```

The install pane now shows what the plugin adds and, for official plugins, a **context cost** estimate: tokens added to every turn, and tokens when its skills are invoked. Pay attention to that number. Everything that sits in context permanently eats into your plan's limits.

## Which plugins are worth installing for frontend work?

A short list for React, Next.js and Astro projects — not "install everything":

1. **`typescript-lsp`** — the best return for the least effort. After every edit, Claude gets diagnostics from the TypeScript language server, so it catches a wrong type or missing import before you run the build. Needs `npm install -g typescript-language-server typescript` ([setup guide](https://code.claude.com/docs/en/plugins/code-intelligence.md)).
2. **`code-review`** or **`pr-review-toolkit`** — several specialised agents review the diff before you do. Not a replacement for your own review, but good at catching the small stuff.
3. **`playwright`** or **`chrome-devtools-mcp`** — Claude opens the page in a real browser, takes screenshots, reads the console and network requests. For UI work this is the gap between "should work" and "checked".
4. **`context7`** — up-to-date library docs on demand. Handy with frameworks like Astro and Next.js, where APIs move faster than a model's training data.
5. **`frontend-design`** — a skill for interfaces that don't look like generic AI output. Useful for a first pass at a landing page.

If you deploy to Vercel, Netlify or Cloudflare, their plugins let Claude check builds and logs from the session. And `security-guidance` is a sensible safety net for code headed to production.

## Are mods and plugins safe?

As safe as the author is trustworthy. The [docs](https://code.claude.com/docs/en/plugins/mods/overview.md) don't sugar-coat it: mods **aren't sandboxed**. A mod runs with your permissions, can read files and environment variables (API keys included), sees every prompt, and can approve a tool call on your behalf. Claude Code's Bash sandbox doesn't cover processes a mod starts.

A few habits that help:

- Before installing, run `claude plugin validate ./some-plugin`. The `hooks:` and `calls:` lines show what a mod handles and what it asks Claude Code to do, without running it.
- Stick to the official marketplace and authors you know. Anthropic doesn't review third-party marketplaces.
- Use project scope for team repos, so everyone runs the same set.
- If a session starts acting odd, `claude --safe-mode` starts without your mods and other customisations.

Anthropic is tightening this as it goes. As of v2.1.325 (mid-November) the install prompt warns that "plugins can run code on your computer", and a plugin can now declare which Claude Code versions it supports ([release notes](https://releasebot.io/updates/anthropic/claude-code)).

## Should you build your own mod?

Usually not. If you just want Claude to follow project conventions, `CLAUDE.md` or a skill is enough. To block a command, a settings hook does the job. A mod makes sense when you want something you can see and click in the UI — a CI status pane, a token counter, a confirmation step before touching production config.

You don't have to learn the whole API first. Describe what you want, and Claude writes the mod, installs it and hot-reloads it in the same session. In my own React and Astro work the rule is the same as for any generated code: read it before you let it run.

## FAQ

**Are mods free?**
Mods and plugins are part of Claude Code, which needs a paid Claude plan (Pro starts at $20/month). Plugins themselves aren't sold separately, though some connect to paid services.

**Do plugins work in cloud sessions?**
Partly. A cloud session doesn't load plugins installed on your machine, and language servers don't start there. Mods' hooks run, but nothing they draw appears.

**How many plugins is too many?**
There's no magic number, but every plugin that adds always-on context costs you tokens. `claude plugin details <name>` shows a plugin's always-on token cost, and `/plugin` groups the ones you haven't used recently.

**Can I turn mods off?**
Yes: one at a time in `/plugin`, for a single session with `--safe-mode`, or everywhere with `"disableAllHooks": true` in your settings.

---

Every week I write about what actually helps when building for the web with AI tools, and what's just noise. Follow me on [LinkedIn](https://www.linkedin.com/in/kovar95/) and see my code on [GitHub](https://github.com/kovar95). Need a fast, modern website for your business? See [website development](/website-development/).
