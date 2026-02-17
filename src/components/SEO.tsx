import { Helmet } from "react-helmet-async";

const SITE_URL = "https://nlbhattarai.com";
const SITE_NAME = "N.L. Bhattarai";
const DEFAULT_IMAGE = `${SITE_URL}/og-default.png`;

const toAbsoluteUrl = (value: string) => {
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/")) return `${SITE_URL}${value}`;
  return `${SITE_URL}/${value}`;
};

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
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
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} — ${SITE_NAME}`;
  const url = canonical ? toAbsoluteUrl(canonical) : SITE_URL;
  const image = toAbsoluteUrl(ogImage || DEFAULT_IMAGE);

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={SITE_NAME} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {article?.tags?.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt} />}

      {/* JSON-LD */}
      {jsonLdArray.map((schema, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;

// ─── Reusable JSON-LD generators ───

export const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "N.L. Bhattarai",
  url: SITE_URL,
  jobTitle: "Digital Systems Engineer & SEO Strategist",
  description:
    "Builds secure websites, custom software, and SEO-safe digital systems for healthcare, education, and growing businesses.",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61587263263713",
  ],
  knowsAbout: [
    "SEO",
    "Cybersecurity",
    "Software Development",
    "System Architecture",
    "Workflow Automation",
    "Vibe Coding",
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
  author: { "@type": "Person", name: SITE_NAME },
});

export const breadcrumbSchema = (
  items: { name: string; url: string }[]
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
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
  ...(keywords && { keywords }),
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
  ...(keywords && { keywords }),
});

export const SITE_URL_CONST = SITE_URL;
