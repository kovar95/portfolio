import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import { LANGS, PROFILE, localePath, useContent, type Lang } from '../i18n/content';

export type Post = {
  slug: string;
  lang: Lang;
  entry: CollectionEntry<'blog'>;
};

export const postPath = (lang: Lang, slug: string) => localePath(lang, `blog/${slug}/`);

/** Every published post, newest first, in both locales. */
async function allPosts(): Promise<Post[]> {
  const entries = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  const posts = entries.map((entry) => {
    const [slug, lang] = entry.id.split('/') as [string, Lang];
    return { slug, lang, entry };
  });

  /* The site is fully bilingual, so a post may only go out in both languages. */
  for (const slug of new Set(posts.map((post) => post.slug))) {
    for (const lang of LANGS) {
      if (!posts.some((post) => post.slug === slug && post.lang === lang)) {
        throw new Error(
          `Blog post "${slug}" has no published ${lang} version — add src/content/blog/${slug}/${lang}.md or make sure it is not a draft.`,
        );
      }
    }
  }

  return posts.sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}

export const getPosts = async (lang: Lang) => (await allPosts()).filter((post) => post.lang === lang);

export const hasPosts = async () => (await allPosts()).length > 0;

export const readingMinutes = (body = '') =>
  Math.max(1, Math.round(body.trim().split(/\s+/).length / 200));

/* Frontmatter dates parse as UTC midnight; formatting in UTC keeps the day from shifting. */
export const formatDate = (date: Date, lang: Lang) =>
  new Intl.DateTimeFormat(lang === 'sr' ? 'sr-Latn-RS' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);

export async function blogFeed(lang: Lang, site: URL | undefined) {
  if (!site) throw new Error('The RSS feed needs `site` set in astro.config.mjs.');
  const t = useContent(lang);

  return rss({
    title: `${PROFILE.name} — ${t.blog.heading}`,
    description: t.blog.subtitle,
    /* The channel links to the blog page; item links are root-relative, so they resolve the same. */
    site: new URL(localePath(lang, 'blog/'), site),
    items: (await getPosts(lang)).map(({ slug, entry }) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      categories: entry.data.tags,
      link: postPath(lang, slug),
    })),
    customData: `<language>${lang === 'sr' ? 'sr-RS' : 'en'}</language>`,
  });
}
