---
title: 'How I use Claude Code as a frontend developer: a real workflow'
description: 'A practical Claude Code workflow for frontend work: plan before code, let the build do the checking, use skills for repeat jobs, plus a real example from this site.'
date: 2026-10-27
tags: ['Claude Code', 'AI', 'frontend', 'workflow']
---

Short answer: I treat Claude Code like a junior teammate who lives in my terminal. I decide what gets built and how it should feel; it explores the codebase, proposes a plan, writes the changes and checks its own work against the build. What makes it useful isn’t clever prompting. It’s three habits: a plan before code, a check the agent can run by itself, and short, written-down project rules.

This is quickly becoming the default way of working. In the [2026 Stack Overflow Developer Survey](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/), 66% of developers who use AI agents use Claude Code, ahead of GitHub Copilot at 59%, and 73% of AI tool users rely on them daily.

## How is Claude Code different from a chat assistant?

A chat assistant gives you an answer to paste into your editor. Claude Code works inside your repo: it reads files, runs commands (`npm run build`, tests, the linter), edits code and loops until the check passes. It runs in the terminal, in VS Code, in the desktop app and in the cloud, where a task can keep going after you close your laptop.

That changes how you ask. Instead of “how do I build X?”, you say “build X in this project, following this pattern, and prove it works.”

## How much does Claude Code cost?

Claude Code isn’t included in the free tier. From the [official pricing page](https://claude.com/pricing):

| Plan | Price | Claude Code |
|---|---|---|
| Free | $0 | no |
| Pro | $20/month ($17/month billed annually) | yes |
| Max | from $100/month | yes, with higher usage limits |

Pro is enough to find out whether it fits the way you work. Move to Max once you regularly hit the limits. For a freelancer, it pays for itself the first time it saves an hour of billable time.

## What does the workflow look like, step by step?

Across React and Astro projects I follow the same loop, and it closely matches [Anthropic’s own best practices](https://code.claude.com/docs/en/best-practices):

1. **Explore.** Turn on plan mode (`Shift+Tab` until the status bar shows “plan mode on”). Claude only reads and answers: how components are organised, where styles live, how routing and i18n work.
2. **Plan.** Ask for a concrete plan: which files change, what gets added, what might break. Press `Ctrl+G` to edit the plan in your own editor before a single line is written.
3. **Implement.** Approve the plan and let it code, and always end the prompt with “run the build and fix any failures.”
4. **Review and ship.** Read the diff as if it were a colleague’s pull request. Only once the build passes and the diff looks right does it get committed and pushed.

Skip plan mode for small things. If you can describe the diff in one sentence (a copy change, a colour, one prop), just ask for it.

## What does this look like on a real project?

The best example is the site you’re reading. kovar95.dev is a bilingual Astro site (English and Serbian) deployed on Cloudflare Workers. Of the 13 commits in its history before this post, 12 carry a `Co-Authored-By: Claude` trailer.

On 21 October alone, three larger changes went in with Claude Code:

- **A bilingual blog.** Every post is a folder with `en.md` and `sr.md`, with an RSS feed per language, `hreflang` and BlogPosting structured data.
- **A services page.** What I build, prices, and an inquiry form handled by a Cloudflare Worker with Turnstile spam protection. It was also the first server-side code in the repo.
- **A `/blog-post` skill.** Instructions that let the agent turn my text into both language versions, check the build and publish the post.

The most valuable part wasn’t the code itself but a check built into the project. `src/lib/blog.ts` fails the build if a post is missing either its English or its Serbian file, and the error names the missing file. So the agent can’t “finish” half a post: the build tells it straight away what it skipped.

## What are skills, and why use them instead of a long CLAUDE.md?

`CLAUDE.md` is loaded at the start of every session. It’s good for short rules that always apply: build and test commands, what’s off-limits (deploy config, `.env` files). The most common mistake is a bloated file, where rules get lost in the noise and quietly ignored.

For jobs you repeat, [skills](https://code.claude.com/docs/en/skills) work better: a `SKILL.md` in `.claude/skills/<name>/` that the agent loads only when it’s needed. My `/blog-post` skill spells out:

- how the blog is structured and why both languages are mandatory;
- the house style: British spelling in English; Latin script, „…” quotes and hyphenated loanwords in Serbian;
- the order of work: prepare the text, translate, check the build, show a short summary, and only after I confirm, commit and push to `main`.

A push to `main` triggers a Cloudflare build, so the post is live in a minute or two. Anything that must happen every single time, with no exceptions, is better enforced by a hook or by the build itself, as above.

## How do you let the agent verify frontend work on its own?

This is where most of the time savings come from. Without a check the agent can run, “looks done” is its only signal, and you end up being the test suite.

For frontend work I use three layers:

- **Build and types.** `npm run build` has to pass. In Astro this immediately catches broken imports and invalid frontmatter, because the content schema lives in `content.config.ts`.
- **Tests.** For logic (form validation, price and date formatting), ask for a failing test first, then the fix.
- **Screenshots.** For UI, paste the design, have it screenshot the result in a browser, list the differences and fix them.

A prompt that works: “Add an inquiry form to the services page, following the existing contact section. Run the build and show me the output.”

## Where does Claude Code save time, and where doesn’t it?

| Task | Payoff |
|---|---|
| New page or component following an existing pattern | high |
| Changes across many files (a new route in both languages, a new prop) | high, with a careful diff review |
| Repeat jobs described in a skill (a new blog post) | high |
| Getting up to speed on an unfamiliar codebase | good: “explain how routing works” saves hours of reading |
| Fine visual polish, animation timing, design “feel” | low: often faster by hand |
| Architecture and UX decisions | the decision stays mine; I ask for options |

One rule that pays off: if I’ve corrected the agent twice on the same thing, I stop. `/clear`, then a better first prompt that includes what I learned. A clean session with a clear task almost always beats a long one full of failed attempts.

## What changed in Claude Code this autumn?

It moves fast. In October 2026, version 2.1.302 shipped an [official plugin directory and a “mods” system](https://tech-insider.org/claude-code-plugins-official-mods-cloud-sessions-2026/) for extending the interface and behaviour with your own JavaScript or TypeScript, plus cloud sessions that keep running after you close the lid. Since v2.1.283, auto mode is the default permission mode: a separate model reviews actions and blocks only the risky ones, so you’re not approving every `ls`. I’ll cover which plugins are worth installing in an upcoming post.

## FAQ

**Will Claude Code replace frontend developers?**
No. It writes code faster, but someone still has to know what to build, review the diff and own the result. The developers who gain the most are the ones who can already tell good code from plausible code.

**Can I use it on an existing project?**
Yes, and that’s often where it shines. Run `/init`, then ask how the project is structured before changing anything.

**Is it safe to let an AI agent run commands?**
With sensible guardrails, yes: permission modes, sandboxing and allowlists for specific commands. The key rule is that nothing ships until the build passes and someone has reviewed the changes.

**Does it work for small business websites, not just apps?**
Yes. A fast, static site with solid SEO is an ideal fit for this workflow. If you’re wondering what such a site costs, see [How much does a small business website cost in 2026?](/blog/koliko-kosta-izrada-sajta/).

## Follow along

Every week I share what works (and what doesn’t) when building for the web with AI tools. Follow me on [LinkedIn](https://www.linkedin.com/in/kovar95/) and see my code on [GitHub](https://github.com/kovar95). Need a fast, modern website for your business? See [website development](/website-development/).
