export const LANGS = ['en', 'sr'] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = { en: 'EN', sr: 'SR' };

/** Root-relative path for a locale (default locale is unprefixed). */
export const localePath = (lang: Lang, path = '') =>
  lang === 'en' ? `/${path}` : `/sr/${path}`;

/** The same page in every locale — each page exists in both. */
export const localizedPaths = (pathname: string): Record<Lang, string> => {
  const path = pathname.replace(/^\/sr(?=\/|$)/, '').replace(/^\//, '');
  return { en: localePath('en', path), sr: localePath('sr', path) };
};

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

export type Project = {
  /** Also the screenshot file name: src/assets/projects/<id>.png (or .jpg/.webp/.avif). */
  id: string;
  name: string;
  kind: string;
  description: string;
  stack: string[];
  url?: string;
};

type ProjectBase = Pick<Project, 'name' | 'stack' | 'url'>;
type ProjectCopy = Pick<Project, 'kind' | 'description'>;

export const PROFILE = {
  name: 'Stefan Kovarbašić',
  initials: 'SK',
  email: 'support@kovar95.dev',
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

/** Shared project data — only `kind` and `description` get translated. */
const WORK_PROJECTS = {
  guestfriend: {
    name: 'Guestfriend',
    url: 'https://gastfreund.net',
    stack: ['React', 'MaterialUI', 'URQL', 'Redux', 'Nanostore'],
  },
  folddy: {
    name: 'Folddy',
    url: 'https://folddy.com',
    stack: ['React', 'MaterialUI', 'TanStack', 'Astro.js'],
  },
  mailmergic: {
    name: 'Mailmergic',
    url: 'https://mailmergic.com',
    stack: ['Node.js', 'React', 'MaterialUI', 'GCP', 'Electron'],
  },
  clariness: {
    name: 'Clariness',
    url: 'https://clariness.com',
    stack: ['Next.js', 'React', 'TanStack Query', 'DynamoDB', 'AWS'],
  },
  kiwi: {
    name: 'Kiwi.com',
    url: 'https://www.kiwi.com',
    stack: ['React', 'TypeScript', 'Redux', 'GraphQL', 'Relay'],
  },
} satisfies Record<string, ProjectBase>;

const PERSONAL_PROJECTS = {
  mileniumvet: {
    name: 'Milenium Vet',
    url: 'https://www.mileniumvet.rs',
    stack: ['React', 'Supabase'],
  },
  nutrifit: {
    name: 'NutriFit',
    url: 'https://nutrifitnatasa.com',
    stack: ['Astro.js'],
  },
  timenest: {
    name: 'Time Nest',
    url: 'https://timenestapp.com',
    stack: ['Next.js', 'Supabase', 'Resend', 'Vercel', 'PWA'],
  },
} satisfies Record<string, ProjectBase>;

/** Joins shared project data with one locale's copy; every project needs copy. */
const projects = <Id extends string>(
  base: Record<Id, ProjectBase>,
  copy: Record<Id, ProjectCopy>,
): Project[] => (Object.keys(base) as Id[]).map((id) => ({ id, ...base[id], ...copy[id] }));

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
      projects: 'projects',
      services: 'services',
      stack: 'stack',
      education: 'education',
      contact: 'contact',
      blog: 'blog',
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
      status: 'available for new projects',
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
          status: 'available for new projects',
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
    projects: {
      index: '03',
      heading: 'projects',
      subtitle: 'Products I have helped build at work, and sites I have made on my own.',
      workHeading: 'at work',
      personalHeading: 'some of my side projects',
      shotAlt: 'Screenshot of',
      work: projects(WORK_PROJECTS, {
        guestfriend: {
          kind: 'Hotel operations platform',
          description:
            'Jira meets Slack, built for hotels — tasks, chat and guest requests for staff and guests in one place. I work on the frontend of the newest product.',
        },
        folddy: {
          kind: 'Document management system',
          description: 'A document management app and its landing page — I build the frontend of both.',
        },
        mailmergic: {
          kind: 'Document automation platform',
          description:
            'Turns Excel tables into personalised emails and PDF documents, saving companies hours of manual work. Full-stack, from Node.js on GCP to the React UI.',
        },
        clariness: {
          kind: 'Clinical trial sponsor portal',
          description:
            'Connects pharmaceutical sponsors with Clariness, a patient recruitment company for medical trials. Full-stack, from the Next.js frontend to AWS.',
        },
        kiwi: {
          kind: 'Customer support platform',
          description:
            'The internal tool that brings Kiwi.com’s support services into one place, helping millions of travellers. I owned its information domain.',
        },
      }),
      personal: projects(PERSONAL_PROJECTS, {
        mileniumvet: {
          kind: 'Veterinary clinic website',
          description:
            'Website for a 24/7 veterinary clinic in Novi Sad — services, pet shop, promotions and a blog. React on the front, Supabase behind it.',
        },
        nutrifit: {
          kind: 'Nutritionist website',
          description:
            'Site for a Belgrade nutritionist — personalised meal plans, client stories, e-books and a blog, with a free first consultation one click away.',
        },
        timenest: {
          kind: 'Family memories platform & PWA',
          description:
            'A private time capsule for a child: parents, grandparents and godparents add letters, stories and voice messages that open on their 18th birthday. Full-stack, with paid plans and three languages.',
        },
      }),
    },
    services: {
      index: '04',
      heading: 'services',
      path: 'website-development/',
      teaserTitle: 'Need a website?',
      teaserBody:
        'I build business websites, landing pages, web apps and online stores for companies, local businesses and personal brands.',
      teaserCta: 'Services & prices',
      metaTitle: 'Website development — from €50 | Stefan Kovarbašić',
      metaDescription:
        'Websites, landing pages, web apps and online stores built to fit your business, by a Belgrade frontend developer with 6+ years of experience. Prices from €50.',
      title: 'Website development',
      intro:
        'From a one-page site to a full web application — built fast, easy to use on a phone and ready for Google. Tell me what you need and you’ll get a quote.',
      priceLabel: 'prices from',
      price: '€50',
      priceNote: 'The final price depends on what the project needs.',
      inquiryCta: 'Send an inquiry',
      workCta: 'See my work',
      offerHeading: 'what I build',
      items: [
        {
          title: 'Business website',
          description:
            'A site for your company, shop, practice or personal brand — pages about you, your services and how to reach you, built for phones first.',
        },
        {
          title: 'Landing page',
          description:
            'A single page for a product, campaign or event, built to turn visitors into calls and inquiries.',
        },
        {
          title: 'Web application',
          description:
            'Apps with user accounts, a database and payments — from booking systems to platforms like Time Nest.',
        },
        {
          title: 'Online store',
          description:
            'A store on Shopify or built from scratch, with a product catalogue, cart and checkout.',
        },
        {
          title: 'Redesign',
          description:
            'A refresh for an existing site: a modern look, faster loading and easier upkeep.',
        },
        {
          title: 'Maintenance',
          description: 'Content changes, updates and fixes after launch, whenever you need them.',
        },
      ],
      includedHeading: 'every site comes with',
      included: [
        'Works on phones and tablets',
        'Fast loading',
        'Basic setup for Google search',
        'Help with your domain, hosting and business email',
      ],
      processHeading: 'how it works',
      steps: [
        { title: 'Send an inquiry', description: 'Tell me what you need — no commitment.' },
        { title: 'Get a quote', description: 'I get back to you with a plan, a price and a timeline.' },
        {
          title: 'Build and launch',
          description: 'I build it, you follow along, and we launch when you’re happy.',
        },
      ],
      form: {
        heading: 'send an inquiry',
        intro: 'Describe the project in a few sentences and I’ll get back to you with a quote.',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        optional: 'optional',
        service: 'Service',
        servicePlaceholder: 'Choose…',
        serviceOther: 'Something else',
        message: 'Message',
        messagePlaceholder: 'E.g. a five-page site for a dental practice with online booking…',
        submit: 'Send inquiry',
        sending: 'Sending…',
        success: 'Thanks! Your inquiry is on its way — I’ll be in touch soon.',
        errorVerification: 'The bot check didn’t pass. Please try again.',
        errorGeneric: 'Something went wrong. Please try again, or email me at',
        privacy: 'I only use what you send here to reply to your inquiry.',
      },
    },
    skills: {
      index: '05',
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
      index: '06',
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
      index: '07',
      heading: 'contact',
      title: 'Let’s build something.',
      body:
        'Need a website, a web app or another frontend developer on your team? Tell me what you’re building — email is the fastest way to reach me.',
      emailLabel: 'email',
      phoneLabel: 'phone',
      githubLabel: 'github',
      linkedinLabel: 'linkedin',
      cta: 'Say hello',
      cvCta: 'Download CV',
    },
    blog: {
      title: 'Blog',
      heading: 'blog',
      subtitle: 'Notes on frontend development, tooling and the things I build.',
      empty: 'No posts yet.',
      allPosts: 'all posts',
      readingTime: (minutes: number) => `${minutes} min read`,
      rss: 'RSS feed',
      tagsLabel: 'tags',
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
      projects: 'projekti',
      services: 'usluge',
      stack: 'tehnologije',
      education: 'obrazovanje',
      contact: 'kontakt',
      blog: 'blog',
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
      status: 'dostupan za nove projekte',
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
          status: 'dostupan za nove projekte',
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
    projects: {
      index: '03',
      heading: 'projekti',
      subtitle: 'Proizvodi na kojima sam radio u kompanijama i sajtovi koje sam napravio samostalno.',
      workHeading: 'poslovni projekti',
      personalHeading: 'neki od privatnih projekata',
      shotAlt: 'Snimak ekrana:',
      work: projects(WORK_PROJECTS, {
        guestfriend: {
          kind: 'Platforma za rad hotela',
          description:
            'Spoj Jire i Slack-a, napravljen za hotele — zadaci, poruke i zahtevi gostiju za osoblje i goste na jednom mestu. Radim na frontendu najnovijeg proizvoda.',
        },
        folddy: {
          kind: 'Sistem za upravljanje dokumentima',
          description: 'Aplikacija za upravljanje dokumentima i njena landing stranica — radim frontend za oba.',
        },
        mailmergic: {
          kind: 'Platforma za automatizaciju dokumenata',
          description:
            'Pretvara Excel tabele u personalizovane email-ove i PDF dokumente i štedi kompanijama sate ručnog rada. Full-stack, od Node.js-a na GCP-u do React interfejsa.',
        },
        clariness: {
          kind: 'Portal za sponzore kliničkih studija',
          description:
            'Povezuje farmaceutske sponzore sa Clariness-om, kompanijom za regrutaciju pacijenata u medicinskim studijama. Full-stack, od Next.js frontenda do AWS-a.',
        },
        kiwi: {
          kind: 'Platforma za korisničku podršku',
          description:
            'Interni alat koji objedinjuje servise korisničke podrške Kiwi.com-a i pomaže milionima putnika. Bio sam glavni zadužen za njen informacioni domen.',
        },
      }),
      personal: projects(PERSONAL_PROJECTS, {
        mileniumvet: {
          kind: 'Sajt veterinarske ambulante',
          description:
            'Sajt veterinarske ambulante u Novom Sadu koja radi 24/7 — usluge, pet shop, akcije i blog. React na frontendu, Supabase u pozadini.',
        },
        nutrifit: {
          kind: 'Sajt za nutricionistu',
          description:
            'Sajt nutricionistkinje iz Beograda — individualni planovi ishrane, iskustva klijenata, e-knjige i blog, uz besplatan uvodni razgovor na jedan klik.',
        },
        timenest: {
          kind: 'Platforma i PWA za porodične uspomene',
          description:
            'Privatna vremenska kapsula za dete: roditelji, bake, deke i kumovi upisuju pisma, priče i glasovne poruke koje se otvaraju na 18. rođendan. Full-stack, sa planovima pretplate i na tri jezika.',
        },
      }),
    },
    services: {
      index: '04',
      heading: 'usluge',
      path: 'izrada-sajta/',
      teaserTitle: 'Treba vam sajt?',
      teaserBody:
        'Pravim prezentacione sajtove, landing stranice, web aplikacije i online prodavnice — za firme, lokale i lične brendove.',
      teaserCta: 'Usluge i cene',
      metaTitle: 'Izrada sajta — od 50 € | Stefan Kovarbašić',
      metaDescription:
        'Izrada sajtova, landing stranica, web aplikacija i online prodavnica po meri. Frontend developer iz Beograda sa više od 6 godina iskustva. Cene od 50 €.',
      title: 'Izrada sajta',
      intro:
        'Od sajta na jednoj stranici do kompletne web aplikacije — brzo, pregledno na telefonu i spremno za Google. Opišite šta vam treba i dobićete ponudu.',
      priceLabel: 'cene od',
      price: '50 €',
      priceNote: 'Konačna cena zavisi od potreba projekta.',
      inquiryCta: 'Pošaljite upit',
      workCta: 'Pogledajte radove',
      offerHeading: 'šta pravim',
      items: [
        {
          title: 'Prezentacioni sajt',
          description:
            'Sajt za firmu, lokal, ordinaciju ili lični brend — stranice o vama, uslugama i kontaktu, prilagođen pre svega telefonima.',
        },
        {
          title: 'Landing stranica',
          description:
            'Jedna stranica za proizvod, kampanju ili događaj, napravljena da posetioce pretvori u pozive i upite.',
        },
        {
          title: 'Web aplikacija',
          description:
            'Aplikacije sa korisničkim nalozima, bazom podataka i plaćanjem — od sistema za rezervacije do platformi poput Time Nest-a.',
        },
        {
          title: 'Online prodavnica',
          description:
            'Prodavnica na Shopify-ju ili po meri, sa katalogom proizvoda, korpom i plaćanjem.',
        },
        {
          title: 'Redizajn',
          description:
            'Osveženje postojećeg sajta: moderniji izgled, brže učitavanje i lakše održavanje.',
        },
        {
          title: 'Održavanje',
          description: 'Izmene sadržaja, ažuriranja i popravke posle objave, kad god zatreba.',
        },
      ],
      includedHeading: 'svaki sajt dobija',
      included: [
        'Prilagođen telefonima i tabletima',
        'Brzo učitavanje',
        'Osnovna podešavanja za Google pretragu',
        'Pomoć oko domena, hostinga i poslovnog mejla',
      ],
      processHeading: 'kako radimo',
      steps: [
        { title: 'Pošaljete upit', description: 'Opišite šta vam treba, bez obaveze.' },
        { title: 'Dobijete ponudu', description: 'Javljam se sa predlogom, cenom i rokom.' },
        {
          title: 'Izrada i objava',
          description: 'Pravim sajt, vi pratite napredak, a objavljujemo ga kad ste zadovoljni.',
        },
      ],
      form: {
        heading: 'pošaljite upit',
        intro: 'Opišite projekat u par rečenica i javiću vam se sa ponudom.',
        name: 'Ime i prezime',
        email: 'Email',
        phone: 'Telefon',
        optional: 'opciono',
        service: 'Usluga',
        servicePlaceholder: 'Izaberite…',
        serviceOther: 'Nešto drugo',
        message: 'Poruka',
        messagePlaceholder: 'Npr. sajt za stomatološku ordinaciju sa pet stranica i online zakazivanjem…',
        submit: 'Pošalji upit',
        sending: 'Šaljem…',
        success: 'Hvala! Upit je poslat — javiću vam se uskoro.',
        errorVerification: 'Provera da niste robot nije uspela. Pokušajte ponovo.',
        errorGeneric: 'Slanje nije uspelo. Pokušajte ponovo ili pišite direktno na',
        privacy: 'Podatke iz forme koristim samo da bih vam odgovorio na upit.',
      },
    },
    skills: {
      index: '05',
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
      index: '06',
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
      index: '07',
      heading: 'kontakt',
      title: 'Da napravimo nešto.',
      body:
        'Treba vam sajt, web aplikacija ili još jedan frontend developer u timu? Pišite mi šta pravite — najbrže me dobijate na email.',
      emailLabel: 'email',
      phoneLabel: 'telefon',
      githubLabel: 'github',
      linkedinLabel: 'linkedin',
      cta: 'Pozdravi me',
      cvCta: 'Preuzmi CV',
    },
    blog: {
      title: 'Blog',
      heading: 'blog',
      subtitle: 'Beleške o frontend razvoju, alatima i stvarima koje pravim.',
      empty: 'Još nema objava.',
      allPosts: 'sve objave',
      readingTime: (minutes: number) => `${minutes} min čitanja`,
      rss: 'RSS feed',
      tagsLabel: 'tagovi',
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
