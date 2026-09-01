export const LANGS = ['en', 'sr'] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = { en: 'EN', sr: 'SR' };

/** Root-relative path for a locale (default locale is unprefixed). */
export const localePath = (lang: Lang, path = '') =>
  lang === 'en' ? `/${path}` : `/sr/${path}`;

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  stack: string[];
  url?: string;
};

export type School = {
  institution: string;
  degree: string;
  period: string;
  location: string;
  description: string;
};

export type SkillGroup = { label: string; items: string[] };

export const PROFILE = {
  name: 'Stefan Kovarbašić',
  initials: 'SK',
  email: 'kovar.zmaj@gmail.com',
  phone: '+381 64 134 6483',
  phoneHref: '+381641346483',
  github: 'https://github.com/kovar95',
  githubHandle: 'kovar95',
  linkedin: 'https://www.linkedin.com/in/kovar95/',
  linkedinHandle: 'in/kovar95',
  cv: '/Stefan_Kovarbasic_CV.pdf',
  yearsExperience: '6+',
  sinceYear: 2018,
} as const;

/** Shared skill data — only the group labels get translated. */
const SKILL_ITEMS: string[][] = [
  ['JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'SASS', 'C'],
  ['React', 'React Native', 'Next.js', 'Astro.js', 'MaterialUI', 'CSS Modules', 'Shopify Liquid'],
  ['Redux', 'Redux Toolkit', 'React Context', 'Nanostore', 'Jotai'],
  ['GraphQL', 'Relay', 'URQL', 'TanStack Query', 'REST APIs'],
  ['Node.js', 'Express', 'AWS', 'DynamoDB', 'GCP', 'Firebase', 'Supabase', 'MongoDB', 'PostgreSQL', 'Electron'],
  ['Git', 'GitHub', 'GitLab', 'BitBucket', 'Puppeteer', 'Vite', 'Cross-browser testing'],
];

const groups = (labels: string[]): SkillGroup[] =>
  labels.map((label, i) => ({ label, items: SKILL_ITEMS[i] }));

export const content = {
  en: {
    meta: {
      title: 'Stefan Kovarbašić — Frontend Developer',
      description:
        'Frontend developer based in Belgrade, Serbia. 6+ years building React, TypeScript and Astro interfaces for products used by millions.',
      ogAlt: 'Stefan Kovarbašić — Frontend Developer portfolio',
    },
    nav: {
      about: 'about',
      experience: 'experience',
      stack: 'stack',
      education: 'education',
      contact: 'contact',
      menu: 'Menu',
      primary: 'Primary',
      langLabel: 'Switch language',
      skip: 'Skip to content',
    },
    hero: {
      greeting: 'stefan kovarbašić',
      role: 'Frontend Developer',
      tagline:
        'I build interfaces for products used by millions — from a hotel operations platform to a flight-booking giant.',
      status: 'open to opportunities',
      location: 'Belgrade, Serbia',
      primaryCta: 'Get in touch',
      secondaryCta: 'Download CV',
      scrollHint: 'scroll',
      code: {
        keys: {
          role: 'role',
          location: 'location',
          stack: 'stack',
          years: 'years',
          status: 'status',
        },
        values: {
          role: 'Frontend Developer',
          location: 'Belgrade, Serbia',
          status: 'open to opportunities',
        },
      },
    },
    about: {
      index: '01',
      heading: 'about',
      body: [
        'A passionate web technology researcher, currently working for Holycode / Guestfriend. Very motivated to learn new technologies and to master the ones I already know.',
        'I prefer working in a team environment where everybody can learn something from the others. I graduated with the highest marks. My specialties are Frontend and ReactJS, but I also use other JavaScript libraries on both the frontend and the backend.',
      ],
      stats: [
        { value: '6+', label: 'years of experience' },
        { value: '8', label: 'companies & products' },
        { value: 'millions', label: 'users reached' },
      ],
      asideHeading: 'beyond code',
      hobbies: ['chess', 'football', 'swimming', 'gymnastics', 'travelling', 'learning new things'],
      languagesHeading: 'languages',
      languages: [
        { name: 'Serbian', level: 'native', dots: 5 },
        { name: 'English', level: 'advanced', dots: 4 },
      ],
    },
    experience: {
      index: '02',
      heading: 'experience',
      subtitle: 'Where I have shipped, most recent first.',
      current: 'current',
      stackLabel: 'stack',
      jobs: [
        {
          company: 'Holycode (Guestfriend)',
          role: 'Frontend Developer',
          period: 'May 2024 — Current',
          location: 'Belgrade, Serbia',
          description:
            'Working on Guestfriend’s newest product — a mixture of Jira and Slack, but for hotels (staff and guests). Also developing a Patient Portal for a medical treatment system in Germany (internal product).',
          stack: ['React', 'MaterialUI', 'URQL', 'Redux', 'Astro.js', 'CSS Modules', 'Nanostore'],
        },
        {
          company: 'Folddy',
          role: 'Frontend Developer',
          period: 'Sep 2024 — Current',
          location: 'Remote',
          description:
            'Developing the frontend of a document management system and its landing page.',
          stack: ['React', 'MaterialUI', 'TanStack', 'Astro.js'],
        },
        {
          company: 'Mailmergic',
          role: 'Full Stack Engineer',
          period: 'Jan 2024 — Oct 2024',
          location: 'Remote',
          description:
            'Developing a platform that handles email templating — from Excel tables to PDF documents — saving companies precious time.',
          stack: ['Node.js', 'React', 'MaterialUI', 'GCP', 'Electron'],
        },
        {
          company: 'Clariness',
          role: 'Full Stack Engineer',
          period: 'Mar 2023 — May 2024',
          location: 'Belgrade, Serbia',
          description:
            'Developing a platform that connects sponsors in the pharmaceutical industry with Clariness — a company offering patient recruitment services and connecting sites with sponsors in medical trials.',
          stack: ['Next.js', 'React', 'MaterialUI', 'TanStack Query', 'DynamoDB', 'AWS'],
        },
        {
          company: 'Kiwi.com',
          role: 'JavaScript Engineer',
          period: 'Jun 2021 — Mar 2023',
          location: 'Belgrade, Serbia',
          description:
            'Kiwi.com is a platform used by millions of people all over the world. I was the most responsible person for the information domain of the customer support platform that gathers a lot of services in one place.',
          stack: ['React', 'TypeScript', 'Redux', 'Context', 'Node.js', 'GraphQL', 'Relay'],
        },
        {
          company: 'NDA Company',
          role: 'Indexing Specialist — Web Developer',
          period: 'Aug 2020 — Nov 2023',
          location: 'Remote',
          description:
            'Maintained a platform built for web scraping, writing scripts that search for metadata in scientific publishers’ journals.',
          stack: ['React', 'Node.js', 'Puppeteer'],
        },
        {
          company: 'Freelance (Upwork)',
          role: 'Web Developer',
          period: 'Jun 2018 — Aug 2020',
          location: 'Remote',
          description:
            'Creating websites of various scales, from local companies to enterprise projects. Website maintenance, enhancements, upgrades, troubleshooting and bug fixes.',
          stack: ['MERN', 'Next.js', 'GraphQL'],
        },
        {
          company: 'Ministry of Defense',
          role: 'Platoon Commander',
          period: 'Sep 2018 — Jul 2021',
          location: 'Belgrade, Serbia',
          description:
            'A role of great responsibility, discipline and rational thinking. Collaboration with people and a fair relationship within the collective. Maintaining a radar system for reconnaissance (hardware and software).',
          stack: ['Radar systems', 'Hardware', 'Leadership'],
        },
      ] as Job[],
    },
    skills: {
      index: '03',
      heading: 'stack',
      subtitle: 'Tools I reach for, grouped by what they do.',
      groups: groups([
        'languages & core',
        'frameworks & UI',
        'state management',
        'data & APIs',
        'backend & cloud',
        'tooling',
      ]),
    },
    education: {
      index: '04',
      heading: 'education',
      subtitle: 'Graduated with the highest marks.',
      schools: [
        {
          institution: 'Software Engineering',
          degree: 'Master of Software Engineering',
          period: '2021 — 2023',
          location: 'Niš, Serbia',
          description:
            'Master studies deepening knowledge in the field of software engineering.',
        },
        {
          institution: 'Military Academy',
          degree: 'BA of Management and Engineering',
          period: '2014 — 2018',
          location: 'Belgrade, Serbia',
          description:
            'Radar systems and Air Defense (GPA 8.92). Detailed study of electrical engineering and computing — from microprocessor programming and C to web development and JavaScript.',
        },
        {
          institution: 'Military Grammar School',
          degree: 'Military Non-Commissioned Officer',
          period: '2010 — 2014',
          location: 'Belgrade, Serbia',
          description:
            'Natural Sciences and Mathematics (GPA 5.00). “School for the brave”, as it was popularly known — discipline and hard work marked the schooling in this institution.',
        },
      ] as School[],
    },
    contact: {
      index: '05',
      heading: 'contact',
      title: 'Let’s build something.',
      body:
        'Open to frontend and full-stack roles, contract work and interesting side projects. The fastest way to reach me is email.',
      emailLabel: 'email',
      phoneLabel: 'phone',
      githubLabel: 'github',
      linkedinLabel: 'linkedin',
      cta: 'Say hello',
      cvCta: 'Download CV',
    },
    footer: {
      built: 'Built with Astro & CSS Modules',
      rights: 'All rights reserved.',
      top: 'Back to top',
    },
  },

  sr: {
    meta: {
      title: 'Stefan Kovarbašić — Frontend Developer',
      description:
        'Frontend developer iz Beograda. Više od 6 godina razvoja interfejsa u React-u, TypeScript-u i Astro-u za proizvode koje koriste milioni.',
      ogAlt: 'Stefan Kovarbašić — portfolio frontend developera',
    },
    nav: {
      about: 'o meni',
      experience: 'iskustvo',
      stack: 'tehnologije',
      education: 'obrazovanje',
      contact: 'kontakt',
      menu: 'Meni',
      primary: 'Glavna navigacija',
      langLabel: 'Promeni jezik',
      skip: 'Pređi na sadržaj',
    },
    hero: {
      greeting: 'stefan kovarbašić',
      role: 'Frontend Developer',
      tagline:
        'Gradim interfejse za proizvode koje koriste milioni — od platforme za upravljanje hotelima do giganta za rezervaciju letova.',
      status: 'otvoren za nove prilike',
      location: 'Beograd, Srbija',
      primaryCta: 'Kontaktiraj me',
      secondaryCta: 'Preuzmi CV',
      scrollHint: 'skroluj',
      code: {
        keys: {
          role: 'pozicija',
          location: 'lokacija',
          stack: 'tehnologije',
          years: 'godine',
          status: 'status',
        },
        values: {
          role: 'Frontend Developer',
          location: 'Beograd, Srbija',
          status: 'otvoren za nove prilike',
        },
      },
    },
    about: {
      index: '01',
      heading: 'o meni',
      body: [
        'Strastveni istraživač web tehnologija, trenutno zaposlen u Holycode / Guestfriend. Veoma motivisan da učim nove tehnologije i da usavršim one koje već poznajem.',
        'Najviše volim rad u timu u kojem svako može nešto da nauči od drugih. Diplomirao sam sa najvišim ocenama. Specijalnost mi je frontend i ReactJS, ali koristim i druge JavaScript biblioteke, kako na frontendu tako i na backendu.',
      ],
      stats: [
        { value: '6+', label: 'godina iskustva' },
        { value: '8', label: 'kompanija i proizvoda' },
        { value: 'milioni', label: 'korisnika' },
      ],
      asideHeading: 'van koda',
      hobbies: ['šah', 'fudbal', 'plivanje', 'gimnastika', 'putovanja', 'učenje novih stvari'],
      languagesHeading: 'jezici',
      languages: [
        { name: 'Srpski', level: 'maternji', dots: 5 },
        { name: 'Engleski', level: 'napredni', dots: 4 },
      ],
    },
    experience: {
      index: '02',
      heading: 'iskustvo',
      subtitle: 'Gde sam radio, počevši od najnovijeg.',
      current: 'trenutno',
      stackLabel: 'tehnologije',
      jobs: [
        {
          company: 'Holycode (Guestfriend)',
          role: 'Frontend Developer',
          period: 'maj 2024 — trenutno',
          location: 'Beograd, Srbija',
          description:
            'Radim na najnovijem proizvodu Guestfriend-a — spoju Jire i Slack-a, ali za hotele (osoblje i goste). Takođe razvijam Patient Portal za sistem medicinskog lečenja u Nemačkoj (interni proizvod).',
          stack: ['React', 'MaterialUI', 'URQL', 'Redux', 'Astro.js', 'CSS Modules', 'Nanostore'],
        },
        {
          company: 'Folddy',
          role: 'Frontend Developer',
          period: 'sep 2024 — trenutno',
          location: 'Remote',
          description:
            'Razvoj frontenda sistema za upravljanje dokumentima i prateće landing stranice.',
          stack: ['React', 'MaterialUI', 'TanStack', 'Astro.js'],
        },
        {
          company: 'Mailmergic',
          role: 'Full Stack Engineer',
          period: 'jan 2024 — okt 2024',
          location: 'Remote',
          description:
            'Razvoj platforme koja upravlja šablonima za email-ove — od Excel tabela do PDF dokumenata — i time kompanijama štedi dragoceno vreme.',
          stack: ['Node.js', 'React', 'MaterialUI', 'GCP', 'Electron'],
        },
        {
          company: 'Clariness',
          role: 'Full Stack Engineer',
          period: 'mar 2023 — maj 2024',
          location: 'Beograd, Srbija',
          description:
            'Razvoj platforme koja povezuje sponzore iz farmaceutske industrije sa Clariness-om — kompanijom koja pruža usluge rekrutacije pacijenata i povezuje istraživačke centre sa sponzorima u medicinskim studijama.',
          stack: ['Next.js', 'React', 'MaterialUI', 'TanStack Query', 'DynamoDB', 'AWS'],
        },
        {
          company: 'Kiwi.com',
          role: 'JavaScript Engineer',
          period: 'jun 2021 — mar 2023',
          location: 'Beograd, Srbija',
          description:
            'Kiwi.com je platforma koju koriste milioni ljudi širom sveta. Bio sam glavni zaduženi za informacioni domen platforme za korisničku podršku, koja objedinjuje veliki broj servisa na jednom mestu.',
          stack: ['React', 'TypeScript', 'Redux', 'Context', 'Node.js', 'GraphQL', 'Relay'],
        },
        {
          company: 'NDA kompanija',
          role: 'Indexing Specialist — Web Developer',
          period: 'avg 2020 — nov 2023',
          location: 'Remote',
          description:
            'Održavao sam platformu za web scraping i pisao skripte za pronalaženje metapodataka u časopisima naučnih izdavača.',
          stack: ['React', 'Node.js', 'Puppeteer'],
        },
        {
          company: 'Freelance (Upwork)',
          role: 'Web Developer',
          period: 'jun 2018 — avg 2020',
          location: 'Remote',
          description:
            'Izrada sajtova različitih razmera, od lokalnih firmi do enterprise projekata. Održavanje, unapređenja, nadogradnje i ispravljanje grešaka.',
          stack: ['MERN', 'Next.js', 'GraphQL'],
        },
        {
          company: 'Ministarstvo odbrane',
          role: 'Komandir voda',
          period: 'sep 2018 — jul 2021',
          location: 'Beograd, Srbija',
          description:
            'Posao velike odgovornosti, discipline i potrebe za racionalnim razmišljanjem. Rad sa ljudima i korektan odnos u kolektivu. Održavanje radarskog sistema za izviđanje (hardver i softver).',
          stack: ['Radarski sistemi', 'Hardver', 'Liderstvo'],
        },
      ] as Job[],
    },
    skills: {
      index: '03',
      heading: 'tehnologije',
      subtitle: 'Alati za kojima posežem, grupisani po nameni.',
      groups: groups([
        'jezici i osnove',
        'frameworks i UI',
        'upravljanje stanjem',
        'podaci i API-jevi',
        'backend i cloud',
        'alati',
      ]),
    },
    education: {
      index: '04',
      heading: 'obrazovanje',
      subtitle: 'Diplomirao sa najvišim ocenama.',
      schools: [
        {
          institution: 'Softversko inženjerstvo',
          degree: 'Master softverskog inženjerstva',
          period: '2021 — 2023',
          location: 'Niš, Srbija',
          description:
            'Master studije uz produbljivanje znanja u oblasti softverskog inženjerstva.',
        },
        {
          institution: 'Vojna akademija',
          degree: 'Menadžment i inženjerstvo (BA)',
          period: '2014 — 2018',
          location: 'Beograd, Srbija',
          description:
            'Radarski sistemi i protivvazduhoplovna odbrana (prosek 8.92). Detaljno izučavanje elektrotehnike i računarstva — od programiranja mikroprocesora i jezika C do web razvoja i JavaScript-a.',
        },
        {
          institution: 'Vojna gimnazija',
          degree: 'Vojni podoficir',
          period: '2010 — 2014',
          location: 'Beograd, Srbija',
          description:
            'Prirodno-matematički smer (prosek 5.00). „Škola za hrabre”, kako su je popularno zvali — disciplina i rad obeležili su školovanje u ovoj instituciji.',
        },
      ] as School[],
    },
    contact: {
      index: '05',
      heading: 'kontakt',
      title: 'Da napravimo nešto.',
      body:
        'Otvoren sam za frontend i full-stack pozicije, ugovorni rad i zanimljive projekte. Najbrže me dobijate na email.',
      emailLabel: 'email',
      phoneLabel: 'telefon',
      githubLabel: 'github',
      linkedinLabel: 'linkedin',
      cta: 'Pozdravi me',
      cvCta: 'Preuzmi CV',
    },
    footer: {
      built: 'Napravljeno u Astro-u i CSS modulima',
      rights: 'Sva prava zadržana.',
      top: 'Na vrh',
    },
  },
} as const;

export type Content = (typeof content)['en'];
export const useContent = (lang: Lang): Content => content[lang] as unknown as Content;
