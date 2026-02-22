import { Helmet } from "react-helmet-async";

const ENV_SITE_URL = import.meta.env.VITE_SITE_URL?.trim();
const SITE_URL = (ENV_SITE_URL || "https://nlbhattarai.com").replace(/\/+$/, "");
const SITE_NAME = "N.L. Bhattarai";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.ico`;

const BRAND_KEYWORD_LIST = [
  "N.L. Bhattarai",
  "NL Bhattarai",
  "Nim Lal Bhattarai",
  "Nim Bhattarai",
  "Bhattarai Nim",
  "Nim Lal",
  "NL",
  "digital systems engineer Nepal",
  "software developer Nepal",
  "SEO strategist Nepal",
  "cybersecurity consultant Nepal",
  "web development Nepal",
];

const normalizeKeyword = (keyword: string) => keyword.trim().toLowerCase();

export const mergeKeywords = (...keywordSets: Array<string | undefined>) => {
  const seen = new Set<string>();
  const merged: string[] = [];

  const pushKeyword = (value: string) => {
    const normalized = normalizeKeyword(value);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    merged.push(value.trim());
  };

  BRAND_KEYWORD_LIST.forEach(pushKeyword);

  keywordSets
    .filter(Boolean)
    .flatMap((value) => (value as string).split(","))
    .forEach(pushKeyword);

  return merged.join(", ");
};

export const toAbsoluteUrl = (value: string) => {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/")) return `${SITE_URL}${value}`;
  return `${SITE_URL}/${value}`;
};

const toFullTitle = (title: string) => {
  if (title.toLowerCase().includes(SITE_NAME.toLowerCase())) return title;
  return `${title} - ${SITE_NAME}`;
};

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: "website" | "article" | string;
  ogImage?: string;
  ogImageAlt?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = "website",
  ogImage,
  ogImageAlt,
  article,
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const fullTitle = toFullTitle(title);
  const canonicalUrl = canonical ? toAbsoluteUrl(canonical) : SITE_URL;
  const imageUrl = toAbsoluteUrl(ogImage || DEFAULT_IMAGE);
  const mergedKeywords = mergeKeywords(keywords);
  const robots = noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={mergedKeywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}

      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="og:updated_time" content={article.modifiedTime} />
      )}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {jsonLdArray.map((schema, index) => (
        <script type="application/ld+json" key={`schema-${index}`}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "N.L. Bhattarai",
  alternateName: [
    "NL Bhattarai",
    "Nim Lal Bhattarai",
    "Nim Bhattarai",
    "Bhattarai Nim",
    "Nim Lal",
    "NL",
  ],
  url: SITE_URL,
  jobTitle: "Digital Systems Engineer and SEO Strategist",
  description:
    "Builds secure websites, custom software, and SEO-safe digital systems for healthcare, education, and growing businesses.",
  sameAs: ["https://www.facebook.com/profile.php?id=61587263263713"],
  knowsAbout: [
    "SEO",
    "Cybersecurity",
    "Software Development",
    "System Architecture",
    "Workflow Automation",
    "Healthcare Digital Systems",
  ],
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Secure websites, custom software, and SEO-safe digital systems for healthcare professionals and growing businesses.",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  keywords: mergeKeywords(),
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const webpageSchema = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: toAbsoluteUrl(url),
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  about: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  inLanguage: "en",
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.url),
  })),
});

export const articleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  category,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  category?: string;
  keywords?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: toAbsoluteUrl(url),
  image: toAbsoluteUrl(image || DEFAULT_IMAGE),
  datePublished,
  dateModified: dateModified || datePublished,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": toAbsoluteUrl(url) },
  ...(category && { articleSection: category }),
  ...(keywords && { keywords: mergeKeywords(keywords) }),
});

export const caseStudySchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  clientName,
  category,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  clientName: string;
  category?: string;
  keywords?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: title,
  description,
  url: toAbsoluteUrl(url),
  image: toAbsoluteUrl(image || DEFAULT_IMAGE),
  datePublished,
  dateModified: dateModified || datePublished,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  about: { "@type": "Organization", name: clientName },
  ...(category && { genre: category }),
  ...(keywords && { keywords: mergeKeywords(keywords) }),
});

export const SITE_URL_CONST = SITE_URL;
