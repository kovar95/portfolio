---
title: 'Kako koristim Claude Code kao frontend developer — realan workflow'
description: 'Claude Code u svakodnevnom frontend radu: plan pre koda, provera kroz build, skill-ovi za ponovljive zadatke i primer sa ovog sajta.'
date: 2026-10-27
tags: ['Claude Code', 'AI', 'frontend', 'workflow']
---

Kratak odgovor: Claude Code koristim kao mlađeg kolegu koji radi u terminalu. Ja odlučujem šta se pravi i kako treba da izgleda, a on istražuje kod, predlaže plan, piše izmene i sam proverava da li build prolazi. Ključ nije u pametnom promptu, već u tri navike: plan pre koda, provera koju agent može sam da pokrene i kratka uputstva za projekat.

Nisam jedini koji radi ovako. Po [Stack Overflow anketi za 2026.](https://stackoverflow.blog/2026/10/06/the-results-of-the-2026-developer-survey-are-here/), Claude Code koristi 66% developera koji rade sa AI agentima, ispred GitHub Copilot-a (59%), a 73% korisnika AI alata ih koristi svakog dana.

## Šta je Claude Code i po čemu se razlikuje od ChatGPT-a?

ChatGPT ili Claude u browser-u vam daju odgovor koji kopirate u editor. Claude Code radi direktno u vašem repo-u: čita fajlove, pokreće komande (`npm run build`, testove, linter), menja kod i ponavlja dok provera ne prođe. Radi u terminalu, u VS Code-u, u desktop aplikaciji i u cloud-u, gde zadatak može da nastavi da radi i kad zatvorite laptop.

Zato je i način rada drugačiji. Ne pitate „kako da napravim X”, nego kažete „napravi X u ovom projektu, po ovom obrascu, i dokaži da radi”.

## Koliko košta Claude Code?

Claude Code nije dostupan na besplatnom planu. Prema [zvaničnom cenovniku](https://claude.com/pricing):

| Plan | Cena | Claude Code |
|---|---|---|
| Free | 0 $ | ne |
| Pro | 20 $ mesečno (17 $ uz godišnju pretplatu) | da |
| Max | od 100 $ mesečno | da, sa većim limitima |

Pro je dobar početak da vidite da li vam ovakav način rada odgovara. Ako redovno udarate u limite, tada ima smisla preći na Max. Za frilensera u Srbiji, 20 $ mesečno je otprilike cena jednog sata rada, pa se isplati čim agent uštedi taj jedan sat.

## Kako izgleda moj workflow, korak po korak?

U radu sa React i Astro projektima ponavljam isti obrazac, koji se poklapa i sa [zvaničnim preporukama Anthropic-a](https://code.claude.com/docs/en/best-practices):

1. **Istraživanje.** Uključim plan mode (`Shift+Tab` dok ne vidim „plan mode on”). Agent tada samo čita kod i odgovara na pitanja, ništa ne menja. Pitam ga kako su organizovane komponente, gde su stilovi i kako radi rutiranje.
2. **Plan.** Tražim konkretan plan: koji fajlovi se menjaju, šta se dodaje, šta može da pukne. Plan mogu da otvorim u editoru (`Ctrl+G`) i ispravim ga pre nego što se napiše ijedna linija.
3. **Implementacija.** Odobrim plan i agent piše kod. Uvek tražim da na kraju pokrene build i popravi greške.
4. **Pregled i objava.** Pregledam diff kao da je tuđi pull request. Tek kad build prođe i diff izgleda dobro, ide commit i push.

Plan mode preskačem za sitnice. Ako izmenu mogu da opišem jednom rečenicom (promena teksta, boje, jednog prop-a), samo kažem šta treba.

## Kako to izgleda na pravom projektu?

Najbolji primer je sajt na kom čitate ovaj tekst. kovar95.dev je Astro sajt na srpskom i engleskom, sa deploy-em na Cloudflare Workers. Od 13 commit-ova u njegovoj git istoriji pre ovog posta, 12 nosi potpis `Co-Authored-By: Claude`.

Samo 21. oktobra su, uz Claude Code, commit-ovane tri veće izmene:

- **Dvojezični blog.** Svaki post je folder sa `en.md` i `sr.md`, uz RSS po jeziku, `hreflang` i BlogPosting schema-u.
- **Stranica sa uslugama.** Šta radim, cene i forma za upit, koju obrađuje Cloudflare Worker sa Turnstile zaštitom od spama. To je bio i prvi serverski kod u ovom repo-u.
- **Skill `/blog-post`.** Uputstvo kojim agent od mog teksta pravi obe jezičke verzije, proverava build i objavljuje post.

Najkorisniji detalj nije bio sam kod, već provera ugrađena u projekat. `src/lib/blog.ts` obara build ako nekom postu fali srpska ili engleska verzija, i u poruci kaže koji fajl nedostaje. Agent zato ne može da „završi” post na pola: build mu odmah kaže šta je propustio.

## Šta su skill-ovi i zašto ih koristim umesto dugačkog CLAUDE.md?

`CLAUDE.md` je fajl koji agent čita na početku svake sesije. Dobar je za kratka pravila koja važe uvek: komande za build i test, šta ne sme da se dira (konfiguracija deploy-a, `.env`). Najčešća greška je predugačak fajl, jer se pravila izgube u šumu i agent počne da ih preskače.

Za zadatke koji se ponavljaju bolji su [skill-ovi](https://code.claude.com/docs/en/skills): `SKILL.md` fajl u `.claude/skills/<ime>/`, koji agent učita tek kad zatreba. Moj `/blog-post` skill opisuje:

- kako je blog organizovan i zašto su obe jezičke verzije obavezne;
- stil sajta: latinica, ekavica, navodnici „…”, strani termini sa crticom („React-u”, „Gmail-u”);
- redosled: pripremi tekst, prevedi, proveri build, pokaži kratak rezime, pa tek posle potvrde commit i push na `main`.

Push na `main` pokreće Cloudflare build, pa je post na sajtu za minut-dva. Pravilo koje mora da se poštuje svaki put, bez izuzetka, bolje je pretvoriti u hook ili u proveru u samom build-u, kao gore.

## Kako da agent sam proveri da li frontend radi?

Ovo je deo koji najviše štedi vreme. Ako agent nema proveru koju može da pokrene, vi postajete ta provera i svaku grešku hvatate ručno.

Za frontend koristim tri nivoa provere:

- **Build i TypeScript.** `npm run build` mora da prođe. U Astro projektu to odmah hvata pogrešne importe i neispravan frontmatter, jer je šema sadržaja definisana u `content.config.ts`.
- **Testovi.** Za logiku (forme, validacija, formatiranje cena) tražim od agenta da prvo napiše test koji pada, pa tek onda popravku.
- **Screenshot.** Za izgled zalepim screenshot dizajna i tražim da napravi screenshot rezultata u browser-u, uporedi ih i ispravi razlike.

Dobar prompt izgleda ovako: „Dodaj formu za upit na stranicu sa uslugama, po uzoru na postojeću kontakt sekciju. Pokreni build i pokaži mi izlaz.”

## Gde Claude Code štedi vreme, a gde ne?

| Zadatak | Koliko pomaže |
|---|---|
| Nova stranica ili komponenta po postojećem obrascu | mnogo |
| Izmena kroz više fajlova (nova ruta na oba jezika, novi prop) | mnogo, uz pažljiv pregled diff-a |
| Ponovljivi zadaci opisani skill-om (novi blog post) | mnogo |
| Upoznavanje sa tuđim projektom | dosta: „objasni kako radi rutiranje” štedi sate čitanja |
| Fini vizuelni detalji, animacije, „osećaj” dizajna | malo: često je brže uraditi ručno |
| Odluke o arhitekturi i UX-u | odluka ostaje moja, od agenta tražim opcije |

Pravilo koje se pokazalo korisnim: ako agenta ispravim dva puta oko iste stvari, ne nastavljam. Pokrenem `/clear` i napišem bolji početni prompt. Čista sesija sa jasnim zadatkom skoro uvek je bolja od duge sesije pune neuspelih pokušaja.

## Šta je novo u Claude Code-u ove jeseni?

Alat se brzo menja. U oktobru 2026. verzija 2.1.302 je donela [zvanični katalog plugin-ova i „mods” sistem](https://tech-insider.org/claude-code-plugins-official-mods-cloud-sessions-2026/), kojim se interfejs i ponašanje agenta proširuju sopstvenim JavaScript ili TypeScript kodom, kao i cloud sesije koje nastavljaju da rade kada zatvorite laptop. Od verzije 2.1.283, „auto” režim je podrazumevani: poseban model pregleda akcije i blokira samo rizične, umesto da vi odobravate svaku komandu. O plugin-ovima pišem detaljnije u jednom od narednih postova.

## Česta pitanja

**Da li Claude Code zamenjuje frontend developera?**
Ne. Brže piše kod, ali neko mora da zna šta treba napraviti, da pregleda diff i da odgovara za rezultat. Najviše dobija developer koji već zna da proceni dobar kod.

**Da li mogu da ga koristim na postojećem projektu?**
Da, i tu je možda najkorisniji. Pokrenite `/init`, pa ga pitajte kako je projekat organizovan pre nego što bilo šta menjate.

**Da li je bezbedno pustiti AI agenta da pokreće komande?**
Uz razuman oprez, da. Postoje režimi dozvola, sandbox i liste dozvoljenih komandi. Ključno je da se ništa ne objavljuje dok build ne prođe i dok neko ne pregleda izmene.

**Da li radi i za sajtove malih firmi, ne samo za aplikacije?**
Da. Brz, statičan sajt sa dobrim SEO-om idealan je teren za ovakav rad. Ako vas zanima koliko takav sajt košta, pogledajte [Koliko košta izrada sajta u Srbiji 2026](/sr/blog/koliko-kosta-izrada-sajta/).

## Pratite dalje

Svake nedelje delim šta mi radi, a šta ne, u radu sa AI alatima i modernim frontend-om. Pratite me na [LinkedIn-u](https://www.linkedin.com/in/kovar95/), a kod možete videti na [GitHub-u](https://github.com/kovar95). Ako vam treba brz i moderan sajt za firmu, pogledajte [izradu sajta](/sr/izrada-sajta/).
