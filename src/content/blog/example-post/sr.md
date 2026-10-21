---
title: 'Primer objave'
description: 'Šablon koji pokazuje kako se pravi objava. Ovo je draft, pa se vidi samo u npm run dev.'
date: 2026-10-21
tags: ['meta']
draft: true
---

Kopiraj ovaj folder, preimenuj ga u URL objave (na primer `moja-prva-objava`) i zameni tekst u **oba** fajla, `en.md` i `sr.md`. Kad ukloniš `draft: true`, objava ide uživo sa sledećim pushom.

## Frontmatter

- `title` i `description` se vide u listi objava, u tabu browsera i u pregledu linka.
- `date` određuje redosled — najnovije prvo.
- `tags` su opcioni.
- `draft: true` drži objavu van živog sajta.

## Formatiranje

Radi običan Markdown: **bold**, _italic_, [linkovi](https://kovar95.dev) i `inline kod`.

> Citat je dobar za glavnu poruku teksta.

### Kod

```ts
const greet = (name: string) => `Zdravo, ${name}!`;
```

### Slike

Stavi sliku pored objave i referenciraj je relativno: `![Opis](./screenshot.png)`. Astro je optimizuje pri buildu.
