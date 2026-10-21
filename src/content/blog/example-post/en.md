---
title: 'Example post'
description: 'A template showing how a post is put together. It is a draft, so it only appears in npm run dev.'
date: 2026-10-21
tags: ['meta']
draft: true
---

Copy this folder, rename it to your post's URL (for example `my-first-post`), and replace the text in **both** `en.md` and `sr.md`. When `draft: true` is removed, the post goes live with the next push.

## Frontmatter

- `title` and `description` show up in the post list, the browser tab and link previews.
- `date` sets the order — newest first.
- `tags` are optional.
- `draft: true` keeps a post out of the live site.

## Formatting

Regular Markdown works: **bold**, _italic_, [links](https://kovar95.dev) and `inline code`.

> Blockquotes are good for a key takeaway.

### Code

```ts
const greet = (name: string) => `Hello, ${name}!`;
```

### Images

Put the image next to the post and reference it relatively: `![Description](./screenshot.png)`. Astro optimises it at build time.
