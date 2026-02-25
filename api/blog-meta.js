import { resolveSeoImageUrl } from "./seo-utils.js";

const SITE_NAME = "N.L. Bhattarai";
const SITE_URL = (
  process.env.VITE_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  "https://www.nlbhattarai.com.np"
).replace(/\/+$/, "");
const SOCIAL_IMAGE_VERSION = "20260223a";
const DEFAULT_IMAGE = `${SITE_URL}/og/hero-share-1200x630.jpg?v=${SOCIAL_IMAGE_VERSION}`;

const envSupabaseUrl = process.env.VITE_SUPABASE_URL?.trim();
const envSupabaseProjectId = process.env.VITE_SUPABASE_PROJECT_ID?.trim();
const SUPABASE_URL =
  envSupabaseUrl ||
  (envSupabaseProjectId ? `https://${envSupabaseProjectId}.supabase.co` : "");
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || "";
const HAS_SUPABASE_SEO_ENV = Boolean(SUPABASE_URL && SUPABASE_KEY);

const BRAND_KEYWORDS = [
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

const normalizeKeyword = (value) => value.trim().toLowerCase();

const mergeKeywords = (...keywordSets) => {
  const seen = new Set();
  const merged = [];

  const pushKeyword = (keyword) => {
    const normalized = normalizeKeyword(keyword);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    merged.push(keyword.trim());
  };

  BRAND_KEYWORDS.forEach(pushKeyword);
  keywordSets
    .filter(Boolean)
    .flatMap((value) => value.split(","))
    .forEach(pushKeyword);

  return merged.join(", ");
};

const toAbsoluteUrl = (value) => {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/")) return `${SITE_URL}${value}`;
  return `${SITE_URL}/${value}`;
};

const appendImageVersion = (url, version) => {
  if (!url || !version) return url;
  const cleanVersion = String(version).slice(0, 10);
  if (!cleanVersion || /[?&]v=/i.test(url)) return url;
  return `${url}${url.includes("?") ? "&" : "?"}v=${encodeURIComponent(cleanVersion)}`;
};

const getImageMimeType = (url) => {
  const pathOnly = String(url).split("?")[0].toLowerCase();
  if (pathOnly.endsWith(".jpg") || pathOnly.endsWith(".jpeg")) return "image/jpeg";
  if (pathOnly.endsWith(".png")) return "image/png";
  if (pathOnly.endsWith(".webp")) return "image/webp";
  if (pathOnly.endsWith(".gif")) return "image/gif";
  return "";
};

const toTitle = (title) =>
  title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? title : `${title} - ${SITE_NAME}`;

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeAttr = (value) => escapeHtml(value).replace(/\n/g, " ");
const safeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const splitKeywords = (value) =>
  String(value || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

const webpageSchema = ({ title, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: toAbsoluteUrl(url),
  inLanguage: "en",
  about: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
});

const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.url),
  })),
});

const articleSchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  category,
  keywords,
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  url: toAbsoluteUrl(url),
  image: resolveSeoImageUrl(image, DEFAULT_IMAGE) || DEFAULT_IMAGE,
  datePublished,
  dateModified: dateModified || datePublished,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": toAbsoluteUrl(url) },
  ...(category ? { articleSection: category } : {}),
  ...(keywords ? { keywords: mergeKeywords(keywords) } : {}),
});

const buildBlogIndexFallbackPage = () => ({
  title: "Blog - Cybersecurity, Software and SEO Insights",
  description:
    "Articles on cybersecurity, software architecture, workflow design, and SEO-safe digital systems from N.L. Bhattarai.",
  keywords:
    "cybersecurity blog Nepal, software architecture blog, SEO articles, digital systems blog, N.L. Bhattarai blog",
  canonicalPath: "/blog",
  ogType: "website",
  ogImage: DEFAULT_IMAGE,
  ogImageAlt: "N.L. Bhattarai blog",
  jsonLd: [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Blog",
      description:
        "Articles on cybersecurity, software architecture, and SEO-safe digital systems.",
      url: `${SITE_URL}/blog`,
    },
  ],
});

const buildBlogDetailPage = (blog) => {
  const seoTitle = blog.seo_title?.trim() || blog.title;
  const seoDescription =
    blog.seo_description?.trim() ||
    blog.description ||
    `Read "${blog.title}" on ${SITE_NAME}'s blog.`;
  const seoKeywords = blog.seo_keywords?.trim() || `${blog.category}, blog, ${blog.title}`;
  const route = `/blog/${blog.slug}`;
  const canonicalUrl = toAbsoluteUrl(route);
  const ogImage =
    resolveSeoImageUrl(blog.og_image_url, blog.cover_image_url, DEFAULT_IMAGE) || DEFAULT_IMAGE;
  const keywordTags = splitKeywords(seoKeywords);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    canonicalPath: route,
    ogType: "article",
    ogImage,
    ogImageAlt: blog.og_image_alt || blog.title,
    article: {
      publishedTime: blog.created_at,
      modifiedTime: blog.updated_at || blog.created_at,
      author: SITE_NAME,
      section: blog.category,
      tags: keywordTags.length > 0 ? keywordTags : [blog.category],
    },
    jsonLd: [
      articleSchema({
        title: seoTitle,
        description: seoDescription,
        url: canonicalUrl,
        image: ogImage,
        datePublished: blog.created_at,
        dateModified: blog.updated_at || blog.created_at,
        category: blog.category,
        keywords: seoKeywords,
      }),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: blog.title, url: route },
      ]),
    ],
    lastModified: blog.updated_at || blog.created_at,
  };
};

const buildSeoTags = (page) => {
  const title = toTitle(page.title);
  const canonicalUrl = toAbsoluteUrl(page.canonicalPath || "/blog");
  const normalizedOgImage = resolveSeoImageUrl(page.ogImage, DEFAULT_IMAGE) || DEFAULT_IMAGE;
  const versionedImage = appendImageVersion(
    normalizedOgImage,
    page.article?.modifiedTime || page.article?.publishedTime || page.lastModified
  );
  const ogImage = resolveSeoImageUrl(versionedImage, DEFAULT_IMAGE) || DEFAULT_IMAGE;
  const ogImageMime = getImageMimeType(ogImage);
  const hasDefaultImageDimensions = ogImage.includes("/og/hero-share-1200x630.jpg");
  const keywords = mergeKeywords(page.keywords);
  const robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const schemas = [
    webpageSchema({
      title,
      description: page.description,
      url: canonicalUrl,
    }),
    ...(page.jsonLd || []),
  ];

  const jsonLdMarkup = schemas
    .map((schema) => `<script type="application/ld+json">${safeJson(schema)}</script>`)
    .join("\n      ");

  return `
      <title>${escapeHtml(title)}</title>
      <meta name="description" content="${escapeAttr(page.description)}" />
      <meta name="keywords" content="${escapeAttr(keywords)}" />
      <meta name="author" content="${escapeAttr(SITE_NAME)}" />
      <meta name="robots" content="${escapeAttr(robots)}" />
      <link rel="canonical" href="${escapeAttr(canonicalUrl)}" />

      <meta property="og:title" content="${escapeAttr(title)}" />
      <meta property="og:description" content="${escapeAttr(page.description)}" />
      <meta property="og:type" content="${escapeAttr(page.ogType || "website")}" />
      <meta property="og:url" content="${escapeAttr(canonicalUrl)}" />
      <meta property="og:image" content="${escapeAttr(ogImage)}" />
      <meta property="og:image:url" content="${escapeAttr(ogImage)}" />
      <meta property="og:image:secure_url" content="${escapeAttr(ogImage)}" />
      ${ogImageMime ? `<meta property="og:image:type" content="${escapeAttr(ogImageMime)}" />` : ""}
      ${hasDefaultImageDimensions ? '<meta property="og:image:width" content="1200" />' : ""}
      ${hasDefaultImageDimensions ? '<meta property="og:image:height" content="630" />' : ""}
      <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />
      <meta property="og:locale" content="en_US" />
      ${page.ogImageAlt ? `<meta property="og:image:alt" content="${escapeAttr(page.ogImageAlt)}" />` : ""}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escapeAttr(title)}" />
      <meta name="twitter:description" content="${escapeAttr(page.description)}" />
      <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
      <meta name="twitter:image:src" content="${escapeAttr(ogImage)}" />
      ${page.ogImageAlt ? `<meta name="twitter:image:alt" content="${escapeAttr(page.ogImageAlt)}" />` : ""}

      ${page.article?.publishedTime ? `<meta property="article:published_time" content="${escapeAttr(page.article.publishedTime)}" />` : ""}
      ${page.article?.modifiedTime ? `<meta property="article:modified_time" content="${escapeAttr(page.article.modifiedTime)}" />` : ""}
      ${page.article?.modifiedTime ? `<meta property="og:updated_time" content="${escapeAttr(page.article.modifiedTime)}" />` : ""}
      ${page.article?.author ? `<meta property="article:author" content="${escapeAttr(page.article.author)}" />` : ""}
      ${page.article?.section ? `<meta property="article:section" content="${escapeAttr(page.article.section)}" />` : ""}
      ${(page.article?.tags || []).map((tag) => `<meta property="article:tag" content="${escapeAttr(tag)}" />`).join("\n      ")}

      ${jsonLdMarkup}
  `;
};

const injectSeo = (baseHtml, page) => {
  let html = baseHtml;
  const stripPatterns = [
    /<title>[\s\S]*?<\/title>/gi,
    /<meta[^>]+name=["']description["'][^>]*>/gi,
    /<meta[^>]+name=["']keywords["'][^>]*>/gi,
    /<meta[^>]+name=["']author["'][^>]*>/gi,
    /<meta[^>]+name=["']robots["'][^>]*>/gi,
    /<link[^>]+rel=["']canonical["'][^>]*>/gi,
    /<meta[^>]+property=["']og:[^"']+["'][^>]*>/gi,
    /<meta[^>]+name=["']twitter:[^"']+["'][^>]*>/gi,
    /<script[^>]+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi,
  ];

  stripPatterns.forEach((pattern) => {
    html = html.replace(pattern, "");
  });

  const seoTags = buildSeoTags(page);
  if (html.includes("</head>")) {
    return html.replace("</head>", `${seoTags}\n  </head>`);
  }
  return `${seoTags}\n${html}`;
};

const getOrigin = (req) => {
  const proto = String(req.headers["x-forwarded-proto"] || "https").split(",")[0].trim();
  const host = String(req.headers["x-forwarded-host"] || req.headers.host || "").split(",")[0].trim();
  if (!host) return SITE_URL;
  return `${proto}://${host}`;
};

const fallbackShell = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

const indexHtmlCache = new Map();

const fetchBaseHtml = async (origin) => {
  if (indexHtmlCache.has(origin)) return indexHtmlCache.get(origin);

  try {
    const response = await fetch(`${origin}/index.html`, {
      headers: { Accept: "text/html" },
    });
    if (response.ok) {
      const html = await response.text();
      indexHtmlCache.set(origin, html);
      return html;
    }
  } catch (error) {
    console.warn(`[blog-meta] Unable to fetch base shell: ${error.message}`);
  }

  return fallbackShell;
};

const readSlug = (req) => {
  const querySlug = Array.isArray(req.query?.slug) ? req.query.slug[0] : req.query?.slug;
  const rawSlug = String(querySlug || "").trim();
  if (!rawSlug) return "";

  try {
    return decodeURIComponent(rawSlug);
  } catch {
    return rawSlug;
  }
};

const fetchPublishedBlog = async (slug) => {
  if (!HAS_SUPABASE_SEO_ENV || !slug) return null;

  const url = new URL("/rest/v1/blogs", SUPABASE_URL);
  url.searchParams.set(
    "select",
    "slug,title,description,seo_title,seo_description,seo_keywords,og_image_url,og_image_alt,cover_image_url,category,created_at,updated_at,published"
  );
  url.searchParams.set("slug", `eq.${slug}`);
  url.searchParams.set("published", "eq.true");
  url.searchParams.set("limit", "1");

  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const rows = await response.json();
  return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
};

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).send("Method Not Allowed");
    return;
  }

  const slug = readSlug(req);
  let page = buildBlogIndexFallbackPage();

  if (slug) {
    try {
      const blog = await fetchPublishedBlog(slug);
      if (blog) page = buildBlogDetailPage(blog);
    } catch (error) {
      console.warn(`[blog-meta] Falling back to blog index metadata: ${error.message}`);
    }
  }

  const origin = getOrigin(req);
  const baseHtml = await fetchBaseHtml(origin);
  const html = injectSeo(baseHtml, page);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");

  if (req.method === "HEAD") {
    res.status(200).end();
    return;
  }

  res.status(200).send(html);
}
