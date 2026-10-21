---
name: blog-post
description: Publish a new post on the kovar95.dev blog from text the user provides, in one go — prepares the English and Serbian versions (translating whichever is missing), writes src/content/blog/<slug>/en.md and sr.md with frontmatter, checks the build, confirms, then commits and pushes to main so Cloudflare deploys it. Use this whenever the user pastes or sends text for the blog, says things like "novi post", "objavi na blogu", "dodaj ovo na blog", "blog post", or invokes /blog-post — even when the text is only in one language, typed without diacritics, or arrives as a file. Also use it to fix or update an existing blog post.
---

# Publish a blog post on kovar95.dev

The user writes the post; you do everything else. Turn the text into the two language files, make sure the site builds, show a short summary, and publish once the user confirms.

## How the blog works

- Each post is a folder `src/content/blog/<slug>/` with `en.md` and `sr.md`. Both are required: `src/lib/blog.ts` fails the build when one is missing, because every page on the site exists in both languages.
- The frontmatter schema is in `src/content.config.ts`. If it has changed since this skill was written, follow the file.
- The post page already renders `title` as the `<h1>` and `description` as the lede directly under it. The body therefore starts with the first paragraph, and its headings start at `##`.
- `src/content/blog/example-post/` is a draft template that shows the supported Markdown. Leave it alone.
- The "blog" link in the site menu only appears once at least one post is published.
- A push to `main` deploys https://kovar95.dev through Cloudflare Workers Builds in a minute or two.

## 1. Read the input

The text comes as the skill argument, pasted in the message, or as a file path. Work out:

- **Source language**: Serbian or English. If the user gives both versions, use both and skip translation.
- **Finished post or notes**: this skill publishes the author's own writing. If what arrived is bullet points or rough notes, ask whether they want you to write it up into prose before doing so. Inventing content under the author's name is the part that is hard to take back once it is live. A short but complete text is a post, not notes; publish it as it is.
- **Images**: any image paths the user mentions.
- **Draft or publish**: whether the user asked for a draft ("kao draft", "ne objavljuj još").

## 2. Prepare the source-language version

Keep the author's voice, content and length.

- Fix typos, grammar and punctuation. Serbian is often typed without diacritics ("zeleo", "placam"). Restore č, ć, š, ž and đ throughout. Where a word could go either way and context does not settle it (sto/što, kuca/kuća), pick the likely reading and list it in the summary.
- Add the Markdown structure the text clearly implies: paragraph breaks, `##` headings for sections, lists, and fenced code blocks with a language tag. Short texts of a few paragraphs usually need no headings.
- Do not add claims, examples or conclusions the author did not write. If a technical detail looks wrong, keep it as written and mention it in the summary; the author decides.
- If the text opens with its own title line, move it into `title` and drop it from the body.

Then apply the house style below to this version as well. The site's conventions win over the author's spelling of loanwords, so "Gmailu" becomes "Gmail-u". This keeps the two files and the rest of the site consistent.

## 3. Translate into the other language

The translation should read as if it were written in that language, faithful to the meaning rather than word for word. Code blocks, URLs, file names and identifiers stay identical in both files. Comments inside code may be translated.

## House style (both files)

**Serbian**, matching `src/i18n/content.ts`:
- Latin script and ekavian forms ("razvoj", "primer", "vreme").
- Established English tech terms stay in English (React, frontend, build, deploy, PWA). Decline them with a hyphen: "React-u", "Astro-a", "Gmail-u", "email-ove".
- Quotation marks „…”, typed as those exact characters.

**English**: plain and conversational, with British spelling ("personalised", "travellers", "optimise"). Use curly apostrophes and quotes (’ “ ”), typed as those characters.

Type quotation marks literally in both languages. Astro converts straight `"` into English curly quotes, which is wrong in Serbian text.

**Inline formatting, both languages**:
- Values a reader would type or copy go in `inline code`: hostnames, ports, email addresses, file names, commands, settings values. Code formatting also stops an email address turning into a `mailto:` link.
- Names of buttons and settings in someone else's UI go in quotation marks: „Send mail as”, “DNS only”.

## 4. Frontmatter

```yaml
---
title: 'Short, specific title'
description: 'One sentence on what the reader gets from the post.'
date: 2026-10-28
tags: ['astro', 'css']
---
```

- **title**: taken from the text, or proposed if it has none. Each language gets its own.
- **description**: one sentence of at most ~155 characters, since search snippets cut off around there. It sits right under the title on the page, so don't repeat the title's wording or the first paragraph; say what the reader will get. Each language gets its own.
- **date**: today (`date +%F`), unless the user gives a date. If publishing happens on a later day than drafting, update it.
- **tags**: 1–4 lowercase English labels, the same in both files. Reuse tags from published posts when they fit; list them with `grep -h '^tags:' src/content/blog/*/en.md | grep -v example-post`.
- **draft**: add `draft: true` only when the user asked for a draft.
- Wrap strings in single quotes. Curly apostrophes need no escaping; a straight `'` inside the string is doubled (`'Don''t panic'`). Titles often contain colons, which break unquoted YAML.

## 5. Slug and files

- **Slug**: built from the English title. Use lowercase ASCII words joined by hyphens, short enough to read at a glance (about 3–7 words). Keep small words when dropping them would make the slug unclear. For a title of the form "Main idea: details", base the slug on the main idea, e.g. `why-i-moved-to-astro`. The slug becomes the URL in both languages (`/blog/<slug>/`, `/sr/blog/<slug>/`), so it must not already exist in `src/content/blog/`.
- **Files**: write `src/content/blog/<slug>/en.md` and `src/content/blog/<slug>/sr.md`.
- **Images**: copy them into the post folder under short kebab-case names. Reference them relatively in both files (`![alt text](./diagram.png)`) and translate the alt text. Astro optimises them at build time.

## 6. Validate

Run `npx astro check`, then `npm run build`. Both must exit successfully. Don't rely on the pages merely existing in `dist/`: a failed build leaves the previous output there.

Unless the post is a draft, confirm that the build log lists `/blog/<slug>/` and `/sr/blog/<slug>/`. Drafts are not built in production. Read the reading time ("min read" / "min čitanja") from the built page rather than calculating it yourself.

Fix any errors before going on. The usual culprit is YAML quoting.

## 7. Confirm with the user

Write the summary in the language the user writes in, usually Serbian:

- the slug and both live URLs
- title and description in each language
- tags, date and reading time
- **what you wrote yourself**: the description and tags always, plus the title if the text had none
- what you changed in the original beyond typo and diacritic fixes, any ambiguous words you resolved, and any technical detail that looked off
- translation choices worth a second look
- if this is the first published post (every other folder in `src/content/blog/` is a draft): that publishing it also adds the "blog" link to the site menu

Offer to show the full text of either version. Then ask whether to publish. Publishing puts the post on the live site, so wait for a yes. The exception is a request that already said to publish without review, such as "objavi odmah".

## 8. Publish

1. Run `git status`. If you are not on `main` and the working tree has other uncommitted changes, stop and ask the user instead of switching branches.
2. Switch to `main` and pull: `git switch main && git pull --ff-only`. If the pull fails, stop and tell the user rather than merging or rebasing on your own.
3. Stage only the post: `git add src/content/blog/<slug>/`. Never use `git add -A` or `.`, because the user may have unrelated work in progress, including `.claude/` files.
4. Commit with the message `Add blog post: <English title>`, followed by the session's usual commit attribution lines.
5. Push with `git push origin main`.
6. Check that the post is actually live. Don't assume the push deployed it: on 2026-10-21 pushes had silently stopped deploying for weeks. Request `https://kovar95.dev/blog/<slug>/` with a cache-busting query (`?v=$RANDOM`) and expect a 200. Workers Builds normally takes a minute or two, so retry for up to ~5 minutes.
7. If it is still 404 after that, deploy by hand from the clean `main` checkout: `rm -rf dist && npm run deploy`. Then check again, and tell the user the automatic deploy did not run so they can look at Workers & Pages → portfolio → Settings → Builds.
8. Report the live URLs only after they return 200.

**Drafts**: write and validate the files, but do not commit unless the user asks. To publish a draft later, remove the `draft: true` line from both files, refresh `date`, then repeat steps 6–8.

## Editing an existing post

When the user wants to fix or extend a published post:

- Change both language files in the same way.
- Keep the slug, because it is the URL and links to it already exist.
- Leave `date` unchanged.
- Validate, confirm and publish as above, with the commit message `Update blog post: <English title>`.
