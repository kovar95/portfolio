---
title: 'Next.js vs Astro for small business websites in 2026'
description: 'For a brochure site, a blog or a clinic website I pick Astro: faster on mobile, cheaper to host and easier to maintain. Next.js wins once the site becomes an app. A practical comparison.'
date: 2026-11-10
tags: ['Astro', 'Next.js', 'web development', 'frontend']
---

Short answer: for a typical small business website — a dental practice, a restaurant, a consultant, a local trade business with a blog — I reach for **Astro**. These sites are mostly content that rarely changes, and Astro ships them as plain HTML with no unnecessary JavaScript, so they load fast on phones and can run on free or near-free hosting. I reach for **Next.js** when the "website" is really an application: user accounts, live booking, dashboards, lots of server-side logic.

Both frameworks are mature and actively developed in November 2026. The real question isn't which one is better, it's which one fits the job. Here's how I make that call.

## What are Next.js and Astro, in one paragraph each?

**Next.js** is Vercel's React framework. The current line is 16.4 (released 6 October 2026), with [16.4.5 shipped on 3 November](https://endoflife.date/nextjs); 15.x stays on security support until 31 January 2027. It's built for applications: server rendering, caching, Server Actions and API routes in one codebase. Version 16.4 also brought lazy compilation, smaller production bundles and React 19.3 support.

**Astro** is a framework for content-driven sites. [Astro 7](https://astro.build/blog/astro-7/) landed on 22 June 2026 with a compiler rewritten in Rust and a move to Vite 8 (Rolldown); the team reports builds 15–61% faster. In January 2026, [the Astro team joined Cloudflare](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/), with a public commitment that Astro stays open source and deployment-agnostic.

The architectural difference that matters most: Astro ships **zero JavaScript by default** and hydrates only the interactive "islands" you mark — a gallery, a form, a price calculator. Next.js ships the React runtime on every page because it assumes you're building an app.

## Next.js vs Astro: side-by-side for a small business site

| | Astro | Next.js |
| --- | --- | --- |
| Sweet spot | brochure sites, blogs, landing pages, catalogues | web apps, accounts, dashboards |
| Client-side JS | only where you opt in | React runtime on every page |
| Mobile performance | excellent by default | excellent with deliberate effort |
| Hosting | static files on Cloudflare, Netlify, any host — often free | smoothest on Vercel; otherwise a Node server or adapter |
| Maintenance | few dependencies, no runtime server code for static builds | frequent updates, including security patches |
| Markdown blog | built in (content collections) | doable, more setup |

## Why is Astro faster for content sites?

Most visitors to a small business site arrive on a phone, often on a patchy mobile connection. Every kilobyte of JavaScript has to be downloaded, parsed and executed before the page feels ready, and Core Web Vitals such as INP feed into how Google evaluates page experience. An Astro page with text, images and a contact form arrives as finished HTML. There's nothing to boot.

A Next.js site can be just as fast, but you have to earn it: deciding what renders on the server versus the client, managing caching, keeping client components small. With Astro, fast is the default state rather than an optimisation project.

One data point: restaurant platform Owner [rebuilt its restaurant sites on Astro](https://astro.build/blog/whats-new-october-2026/) and reported 83% faster menu pages and a per-restaurant revenue lift of more than 4%. That's their own reporting in their own context, but it shows why speed is a business metric, not just a Lighthouse score.

## What does hosting cost for each?

This one surprises clients. Vercel's free Hobby plan is, per [Vercel's own docs](https://vercel.com/docs/plans/hobby), restricted to **non-commercial, personal use**. A business website is commercial use, so you're on Pro: **$20 per developer seat per month**, plus usage beyond the included credits. You can self-host Next.js or use adapters for other platforms, but then someone is running and patching a Node server.

A static Astro build is just files. Cloudflare, Netlify or practically any host will serve it, usually free or for a few euros a month at small business traffic levels. For a café in Lisbon or an accountant in Vienna whose site is a digital business card, that's a couple of hundred euros a year saved, every year. For the full picture of what a site costs to build and run, see [How much does a small business website cost in 2026?](/blog/koliko-kosta-izrada-sajta/)

## What about security and maintenance?

Next.js is hugely popular and well maintained, which is exactly why patches keep coming. This autumn alone, per the [release history](https://releasebot.io/updates/vercel/next-js): the 30 September security release fixed seven vulnerabilities, 16.4.1 (15 October) fixed two critical remote-code-execution issues, and 16.4.5 (3 November) fixed seven more moderate ones, including cache poisoning in `use cache`. Fast fixes are a good sign. But each one is a dependency bump, a rebuild and a redeploy that someone has to own.

A statically built Astro site has no server code running in production. Visitors get files, and there's very little attack surface left. A small business owner doesn't want to hear about Server Actions advisories; they want a site that still works a year after handover.

## When do I still choose Next.js?

When the site does things rather than shows things:

- **Authentication and user accounts** — client portals, member areas.
- **Real-time booking, payments and order status** with server-side logic.
- **Dashboards and internal tools** — CRMs, reporting, admin panels.
- **A team already deep in React** that shares components between the marketing site and the product.

The line is blurry on purpose. Astro supports server rendering and can use React, Vue or Svelte components as islands. A blog plus one interactive quote calculator is still an Astro site. And for a classic online shop, neither is usually the first pick — Shopify or WooCommerce give you payments, inventory and admin out of the box.

## What do I use myself?

My rule of thumb across React, Next.js and Astro projects: **content first → Astro; user interaction first → Next.js.** Two projects from my portfolio show the split:

- **[NutriFit](https://nutrifitnatasa.com)** — a site for a Belgrade nutritionist with meal plans, client stories, e-books and a blog. It's content, so it's built with **Astro**.
- **[Milenium Vet](https://www.mileniumvet.rs)** — a site for a 24/7 veterinary clinic in Novi Sad with services, a pet shop, promotions and a blog. More moving parts and frequently changing data, so it's **React** on the front with Supabase behind it.

This site, kovar95.dev, is Astro too: posts in English and Serbian are plain Markdown files in content collections, deployed on Cloudflare. Real numbers from the build that produced this post: all 19 pages in two languages build in about 12 seconds, and this article ships roughly **1.9 KB of inline JavaScript** (mobile menu and scroll animations) with no JS bundle at all. The whole HTML page is about 13 KB gzipped.

That simple structure also plays well with AI coding agents. When I add a post or a section with Claude Code, the agent understands the project layout immediately and the build catches mistakes before anything ships. I wrote up that workflow in [How I use Claude Code as a frontend developer](/blog/kako-koristim-claude-code/).

## FAQ

**Is Astro good for SEO?**
Yes. Pages are served as complete HTML, they're fast, and sitemaps and meta tags are straightforward to set up. Being recommended by AI search also depends on reviews and your Google profile — see [How to get your small business recommended by ChatGPT and Google AI](/blog/preporuka-chatgpt-google-ai/).

**Can a non-technical owner edit an Astro site?**
Yes, if you connect a headless CMS with a visual editor. Otherwise content lives in Markdown files, which works well when a developer handles updates.

**Is WordPress a better choice than both?**
If you need hundreds of ready-made plugins and edit the site yourself every week, WordPress makes sense. The trade-off is a slower site and ongoing plugin maintenance. For a 5–10 page site, a modern static build is faster and cheaper to keep alive.

**Can I move from Astro to Next.js later?**
Yes. Markdown content and React components carry over with little friction, so starting with Astro doesn't close the door on an app later.

---

You can browse my code on [GitHub](https://github.com/kovar95) or connect on [LinkedIn](https://www.linkedin.com/in/kovar95/). Need a fast website for your business and not sure which stack fits? See [website development](/website-development/) and send me a message — I'll recommend what suits your business, with a price and timeline.
