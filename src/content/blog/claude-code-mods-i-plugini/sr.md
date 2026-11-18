---
title: 'Claude Code mods i zvanični plugini: šta je novo i šta vredi koristiti'
description: 'Mods menjaju sam Claude Code, a zvanični marketplace ima preko 300 plugin-a. Koje plugine vredi instalirati kao frontend developer, kako rade mods i na šta da pazite.'
date: 2026-11-17
tags: ['Claude Code', 'AI', 'plugini', 'frontend']
---

Kratak odgovor: **plugin** je paket koji Claude Code-u dodaje skill-ove, agente, MCP servere ili jezički server, a **mod** je posebna vrsta plugin-a — JavaScript/TypeScript kod koji radi unutar samog Claude Code-a i može da menja interfejs, komande i pozive alata. Za frontend rad vrede tri-četiri plugin-a (TypeScript LSP, code review, browser alat, dokumentacija), a mods za sada imaju smisla samo ako vam treba nešto vrlo specifično — i samo iz izvora kojima verujete.

U [prošlom tekstu o mom workflow-u sa Claude Code-om](/sr/blog/kako-koristim-claude-code/) pisao sam o navikama: plan pre koda, build kao provera, kratka uputstva za projekat. Ovaj put je reč o alatima koji se na to nadograđuju.

## Šta su Claude Code mods?

Anthropic je mods predstavio [početkom oktobra 2026.](https://claude.com/resources/articles/claude-code-mods) Po [zvaničnoj dokumentaciji](https://code.claude.com/docs/en/plugins/mods/overview.md), mod je plugin čiji kod registruje funkcije za događaje: poziv alata, poslat prompt ili iscrtavanje dela interfejsa. Funkcija može da događaj samo posmatra, da ga izmeni ili da ga preuzme.

U praksi to znači da mod može da:

- doda panel pored razgovora ili traku iznad prompta, sa dugmićima i poljima;
- zadrži rizičnu komandu (npr. `rm -rf` ili force push) i prvo vas pita;
- doda `/komandu` koja odmah izvršava vaš kod, bez novog kruga sa modelom;
- promeni izgled delova Claude Code-a, npr. spinner-a.

Zanimljivo je da su i neke ugrađene funkcije sada mods — `/diff` pane, učitavanje `AGENTS.md` fajla i opcioni „You should know” agent koji vas upozori na nešto što ste možda prevideli. Mods rade u terminalu od verzije **2.1.287**, u Code tabu desktop aplikacije i u VS Code ekstenziji.

Najbrže je da vidite primer: Anthropic deli [probne mods](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods) kao što su `token-weather` (prognoza popunjenosti konteksta iznad prompta) i `blast-radius` (pokazuje šta bi rizična komanda promenila, uz dugmad za nastavak ili odustajanje).

## Po čemu se mod razlikuje od plugin-a, hook-a i skill-a?

Ovo je najčešća zabuna, pa evo kratkog pregleda na osnovu [tabele iz dokumentacije](https://code.claude.com/docs/en/plugins/mods/overview.md):

| | Šta je | Kada ga birate |
| --- | --- | --- |
| **Skill** | `SKILL.md` fajl sa uputstvima | stalno lepite ista uputstva u chat |
| **Settings hook** | skripta koja se pokreće na događaj | želite da blokirate ili logujete nešto postojećom skriptom |
| **MCP server** | spoljni servis koji daje alate | Claude treba da pristupi spoljnom sistemu (Figma, baza, deploy) |
| **Mod** | JS/TS funkcije unutar Claude Code-a | treba vam panel, nova komanda ili izmena događaja |
| **Plugin** | paket koji sve ovo isporučuje | instalirate jednom komandom i delite sa timom |

Dakle, plugin je „kutija”, a mod je samo jedna od stvari koje mogu da budu u njoj.

## Šta ima u zvaničnom marketplace-u?

Claude Code automatski dodaje Anthropic-ov marketplace `claude-plugins-official`. Sredinom novembra 2026. njegov [katalog na GitHub-u](https://github.com/anthropics/claude-plugins-official) ima **317 plugin-a**. Po [dokumentaciji](https://code.claude.com/docs/en/plugins/anthropic-marketplaces.md), većinu objavljuju partneri (Vercel, Netlify, Cloudflare, Figma, Sentry, Supabase…), a Anthropic održava manji skup, kao što su `commit-commands`, `code-review`, `feature-dev` i jezički serveri.

Instalacija je jedna komanda u sesiji:

```text
/plugin install typescript-lsp@claude-plugins-official
```

Za razliku od ranijih verzija, panel pre instalacije pokazuje šta plugin dodaje i, za zvanične plugine, **koliko tokena troši u svakoj poruci**. To je važno: svaki plugin koji stalno stoji u kontekstu jede deo limita na Pro planu.

## Koje plugine vredi instalirati kao frontend developer?

Ovo je moj predlog za React, Next.js i Astro projekte — kratka lista, ne „instaliraj sve”:

1. **`typescript-lsp`** — najveći dobitak za najmanje truda. Claude posle svake izmene dobija greške iz TypeScript jezičkog servera, pa sam vidi pogrešan tip ili import koji fali, pre nego što pokrenete build. Zahteva `npm install -g typescript-language-server typescript` ([uputstvo](https://code.claude.com/docs/en/plugins/code-intelligence.md)).
2. **`code-review`** ili **`pr-review-toolkit`** — više specijalizovanih agenata pregleda izmene pre nego što ih vi pregledate. Ne zamenjuje vaš review, ali hvata sitnice.
3. **`playwright`** ili **`chrome-devtools-mcp`** — Claude otvara stranicu u browser-u, pravi screenshot, čita konzolu i mrežne zahteve. Za frontend je to razlika između „trebalo bi da radi” i „proverio sam”.
4. **`context7`** — sveža dokumentacija biblioteka. Korisno kad radite sa Astro-om ili Next.js-om, gde se API menja brže nego što model „zna”.
5. **`frontend-design`** — skill za dizajn interfejsa koji izbegava generički „AI izgled”. Dobar za prvi nacrt landing stranice.

Ako deploy-ujete na Vercel, Netlify ili Cloudflare, njihovi plugini mogu da proveravaju build i logove direktno iz sesije. A `security-guidance` je razumna mreža za kod koji ide u produkciju.

## Da li su mods i plugini bezbedni?

Kratko: onoliko koliko verujete autoru. [Dokumentacija](https://code.claude.com/docs/en/plugins/mods/overview.md) je tu jasna — mod **nije u sandbox-u**, radi sa vašim dozvolama, može da čita fajlove i promenljive okruženja (uključujući API ključeve), vidi svaki prompt i može da odobri poziv alata umesto vas. Sandbox za Bash komande ne pokriva procese koje mod pokrene.

Nekoliko praktičnih pravila:

- Pre instalacije pokrenite `claude plugin validate ./putanja-do-plugina` — linije `hooks:` i `calls:` pokazuju šta mod radi, bez pokretanja.
- Instalirajte iz zvaničnog marketplace-a ili od autora koje poznajete. Anthropic ne pregleda marketplace-ove trećih strana.
- Za projekat koji deli tim koristite project scope, da svi imaju isti skup plugin-a.
- Ako nešto počne čudno da se ponaša, `claude --safe-mode` pokreće sesiju bez vaših mods i drugih prilagođavanja.

Anthropic ovo i sam pooštrava: od verzije 2.1.325 (sredina novembra) prozor za instalaciju upozorava da „plugini mogu da pokreću kod na vašem računaru”, a plugin može da navede za koje verzije Claude Code-a važi ([pregled izmena](https://releasebot.io/updates/anthropic/claude-code)).

## Da li treba da pravim svoj mod?

Najčešće ne. Ako vam treba samo da Claude prati pravila projekta, dovoljan je `CLAUDE.md` ili skill. Ako želite da blokirate neku komandu, dovoljan je settings hook. Mod ima smisla kada vam treba nešto što se vidi i koristi u interfejsu — npr. panel sa statusom CI-ja ili brojač potrošenih tokena.

Dobra vest je da ne morate da učite ceo API: opišete šta želite, Claude napiše mod, instalira ga i ponovo učita u istoj sesiji. U mom radu sa React/Astro projektima pravilo je isto kao za svaki generisani kod: pročitam ga pre nego što ga pustim da radi.

## Česta pitanja

**Da li su mods besplatni?**
Mods i plugini su deo Claude Code-a, koji zahteva plaćeni plan (Pro od 20 $ mesečno). Sami plugini se ne plaćaju posebno, ali neki povezuju plaćene servise.

**Da li plugini rade u cloud sesijama?**
Delimično. Cloud sesija ne učitava plugine instalirane na vašem računaru, a jezički serveri (LSP) se tamo ne pokreću. Mods se izvršavaju, ali ništa ne iscrtavaju.

**Koliko plugin-a je previše?**
Nema tačnog broja, ali svaki plugin koji stalno dodaje tekst u kontekst troši limit. `claude plugin details <ime>` pokazuje koliko tokena plugin dodaje svakoj sesiji, a `/plugin` izdvaja plugine koje dugo niste koristili.

**Mogu li da isključim mods?**
Da: pojedinačno u `/plugin`, za jednu sesiju sa `--safe-mode`, ili trajno sa `"disableAllHooks": true` u podešavanjima.

---

Svake nedelje pišem šta mi u radu sa AI alatima stvarno pomaže, a šta je samo buka. Pratite me na [LinkedIn-u](https://www.linkedin.com/in/kovar95/), a kod je na [GitHub-u](https://github.com/kovar95). Ako vam treba brz, moderan sajt za firmu, pogledajte [izradu sajta](/sr/izrada-sajta/).
