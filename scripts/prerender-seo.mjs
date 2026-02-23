import { promises as fs } from "node:fs";
import path from "node:path";

const SITE_NAME = "N.L. Bhattarai";
const SITE_URL = (
  process.env.VITE_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  "https://www.nlbhattarai.com.np"
).replace(/\/+$/, "");
const DEFAULT_IMAGE = `${SITE_URL}/og/hero-profile.png`;

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

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, "dist");
const INDEX_HTML_PATH = path.join(DIST_DIR, "index.html");

const envSupabaseUrl = process.env.VITE_SUPABASE_URL?.trim();
const envSupabaseProjectId = process.env.VITE_SUPABASE_PROJECT_ID?.trim();
const SUPABASE_URL =
  envSupabaseUrl ||
  (envSupabaseProjectId ? `https://${envSupabaseProjectId}.supabase.co` : "");
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || "";
const HAS_SUPABASE_SEO_ENV = Boolean(SUPABASE_URL && SUPABASE_KEY);

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

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeAttr = (value) => escapeHtml(value).replace(/\n/g, " ");

const safeJson = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

const normalizeDateOnly = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const splitKeywords = (value) =>
  (value || "")
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

const personSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
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
});

const websiteSchema = () => ({
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

const webpageSchema = ({ title, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
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
  url,
  image,
  datePublished,
  dateModified,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  publisher: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  ...(category ? { articleSection: category } : {}),
  ...(keywords ? { keywords } : {}),
});

const caseStudySchema = ({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  clientName,
  category,
  keywords,
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  inLanguage: "en",
  author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  about: { "@type": "Organization", name: clientName },
  ...(category ? { genre: category } : {}),
  ...(keywords ? { keywords } : {}),
});

const toTitle = (title) =>
  title.toLowerCase().includes(SITE_NAME.toLowerCase()) ? title : `${title} - ${SITE_NAME}`;

const buildSeoTags = (page) => {
  const title = toTitle(page.title);
  const canonicalUrl = toAbsoluteUrl(page.canonicalPath || page.route || "/");
  const ogImage = toAbsoluteUrl(page.ogImage || DEFAULT_IMAGE);
  const keywords = mergeKeywords(page.keywords);
  const robots = page.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

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
      <meta property="og:image:secure_url" content="${escapeAttr(ogImage)}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />
      <meta property="og:locale" content="en_US" />
      ${page.ogImageAlt ? `<meta property="og:image:alt" content="${escapeAttr(page.ogImageAlt)}" />` : ""}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escapeAttr(title)}" />
      <meta name="twitter:description" content="${escapeAttr(page.description)}" />
      <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
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

const toRoutePath = (route) => route.replace(/\/+$/, "") || "/";

const routeToFilePath = (route) => {
  const cleanRoute = toRoutePath(route).replace(/^\//, "");
  if (!cleanRoute) return path.join(DIST_DIR, "index.html");
  return path.join(DIST_DIR, cleanRoute, "index.html");
};

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const fetchPublishedRows = async (table, select) => {
  if (!HAS_SUPABASE_SEO_ENV) {
    return [];
  }

  const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
  url.searchParams.set("select", select);
  url.searchParams.set("published", "eq.true");
  url.searchParams.set("order", "created_at.desc");

  try {
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

    const data = await response.json();
    return ensureArray(data);
  } catch (error) {
    console.warn(`[seo-prerender] Unable to fetch ${table}: ${error.message}`);
    return [];
  }
};

const buildStaticPages = () => [
  {
    route: "/",
    title: "N.L. Bhattarai - Websites, Software and Digital Systems",
    description:
      "I design secure websites, custom software, and SEO-safe digital systems that turn real expertise into scalable digital authority.",
    keywords:
      "websites, software development, digital systems, SEO strategy, workflow automation, cybersecurity, healthcare digital systems",
    canonicalPath: "/",
    ogType: "website",
    ogImageAlt: "N.L. Bhattarai digital systems engineer",
    jsonLd: [personSchema(), websiteSchema()],
    lastModified: normalizeDateOnly(),
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    route: "/about",
    title: "About N.L. Bhattarai - Digital Systems Engineer and SEO Strategist",
    description:
      "Learn about N.L. Bhattarai, a digital systems engineer focused on secure websites, software architecture, and long-term SEO-safe growth.",
    keywords:
      "about N.L. Bhattarai, digital systems engineer, SEO strategist, software developer Nepal, cybersecurity consultant",
    canonicalPath: "/about",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]),
    ],
    lastModified: normalizeDateOnly(),
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    route: "/blog",
    title: "Blog - Cybersecurity, Software and SEO Insights",
    description:
      "Articles on cybersecurity, software architecture, workflow design, and SEO-safe digital systems from N.L. Bhattarai.",
    keywords:
      "cybersecurity blog Nepal, software architecture blog, SEO articles, digital systems blog, N.L. Bhattarai blog",
    canonicalPath: "/blog",
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
    lastModified: normalizeDateOnly(),
    changefreq: "daily",
    priority: "0.9",
  },
  {
    route: "/case-studies",
    title: "Case Studies - Real Projects and Results",
    description:
      "Documented case studies across websites, software, and digital systems with measurable outcomes for healthcare and businesses.",
    keywords:
      "case studies Nepal, software project case studies, SEO results, digital systems portfolio, N.L. Bhattarai case studies",
    canonicalPath: "/case-studies",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Case Studies", url: "/case-studies" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Case Studies",
        description:
          "Portfolio of documented website, software, and digital systems projects.",
        url: `${SITE_URL}/case-studies`,
      },
    ],
    lastModified: normalizeDateOnly(),
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    route: "/case-studies/dr-parash-mani-shrestha",
    title: "Dr. Parash Mani Shrestha SEO Case Study",
    description:
      "How Dr. Parash Mani Shrestha grew from zero digital presence to strong Google visibility through a trust-first healthcare SEO system.",
    keywords:
      "Dr Parash Mani Shrestha case study, healthcare SEO Nepal, doctor website strategy, medical SEO case study",
    canonicalPath: "/case-studies/dr-parash-mani-shrestha",
    ogType: "article",
    ogImageAlt: "Dr. Parash Mani Shrestha SEO case study",
    article: {
      publishedTime: "2026-02-08",
      modifiedTime: "2026-02-08",
      author: SITE_NAME,
      section: "Healthcare",
      tags: ["healthcare SEO", "doctor website", "medical digital strategy"],
    },
    jsonLd: [
      caseStudySchema({
        title: "Dr. Parash Mani Shrestha SEO Case Study",
        description:
          "A healthcare SEO and web strategy case study for Dr. Parash Mani Shrestha in Nepal.",
        url: `${SITE_URL}/case-studies/dr-parash-mani-shrestha`,
        image: DEFAULT_IMAGE,
        datePublished: "2026-02-08",
        dateModified: "2026-02-08",
        clientName: "Dr. Parash Mani Shrestha",
        category: "Healthcare",
        keywords: mergeKeywords("healthcare SEO, doctor digital presence"),
      }),
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Case Studies", url: "/case-studies" },
        {
          name: "Dr. Parash Mani Shrestha Case Study",
          url: "/case-studies/dr-parash-mani-shrestha",
        },
      ]),
    ],
    lastModified: normalizeDateOnly(),
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    route: "/contact",
    title: "Contact N.L. Bhattarai",
    description:
      "Contact N.L. Bhattarai to discuss website development, custom software, automation, and SEO-safe digital system implementation.",
    keywords:
      "contact N.L. Bhattarai, software developer Nepal contact, SEO consultant Nepal contact, digital systems consultation",
    canonicalPath: "/contact",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact N.L. Bhattarai",
        url: `${SITE_URL}/contact`,
        description: "Contact page for project inquiries and consultations.",
      },
    ],
    lastModified: normalizeDateOnly(),
    changefreq: "monthly",
    priority: "0.8",
  },
];

const buildBlogPages = (blogs) =>
  blogs
    .filter((blog) => blog?.slug)
    .map((blog) => {
      const seoTitle = blog.seo_title?.trim() || blog.title;
      const seoDescription =
        blog.seo_description?.trim() ||
        blog.description ||
        `Read \"${blog.title}\" on ${SITE_NAME}'s blog.`;
      const seoKeywords =
        blog.seo_keywords?.trim() || `${blog.category}, blog, ${blog.title}`;
      const route = `/blog/${blog.slug}`;
      const canonicalUrl = toAbsoluteUrl(route);
      const ogImage = blog.og_image_url || blog.cover_image_url || DEFAULT_IMAGE;
      const keywordTags = splitKeywords(seoKeywords);

      return {
        route,
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
            image: toAbsoluteUrl(ogImage),
            datePublished: blog.created_at,
            dateModified: blog.updated_at || blog.created_at,
            category: blog.category,
            keywords: mergeKeywords(seoKeywords),
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: blog.title, url: route },
          ]),
        ],
        lastModified: normalizeDateOnly(blog.updated_at || blog.created_at),
        changefreq: "monthly",
        priority: "0.8",
      };
    });

const buildCaseStudyPages = (caseStudies) =>
  caseStudies
    .filter((caseStudy) => caseStudy?.slug)
    .map((caseStudy) => {
      const seoTitle = caseStudy.seo_title?.trim() || `${caseStudy.title} - Case Study`;
      const seoDescription =
        caseStudy.seo_description?.trim() ||
        caseStudy.description ||
        `Case study: ${caseStudy.title} for ${caseStudy.client_name}`;
      const seoKeywords =
        caseStudy.seo_keywords?.trim() ||
        `case study, ${caseStudy.category}, ${caseStudy.client_name}`;
      const route = `/case-studies/${caseStudy.slug}`;
      const canonicalUrl = toAbsoluteUrl(route);
      const ogImage = caseStudy.og_image_url || caseStudy.cover_image_url || DEFAULT_IMAGE;
      const keywordTags = splitKeywords(seoKeywords);
      const tagList = ensureArray(caseStudy.tags).filter(Boolean);

      return {
        route,
        title: seoTitle,
        description: seoDescription,
        keywords: seoKeywords,
        canonicalPath: route,
        ogType: "article",
        ogImage,
        ogImageAlt: caseStudy.og_image_alt || caseStudy.title,
        article: {
          publishedTime: caseStudy.created_at,
          modifiedTime: caseStudy.updated_at || caseStudy.created_at,
          author: SITE_NAME,
          section: caseStudy.category,
          tags: [...new Set([...tagList, ...keywordTags])],
        },
        jsonLd: [
          caseStudySchema({
            title: seoTitle,
            description: seoDescription,
            url: canonicalUrl,
            image: toAbsoluteUrl(ogImage),
            datePublished: caseStudy.created_at,
            dateModified: caseStudy.updated_at || caseStudy.created_at,
            clientName: caseStudy.client_name,
            category: caseStudy.category,
            keywords: mergeKeywords(seoKeywords),
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Case Studies", url: "/case-studies" },
            { name: caseStudy.title, url: route },
          ]),
        ],
        lastModified: normalizeDateOnly(caseStudy.updated_at || caseStudy.created_at),
        changefreq: "monthly",
        priority: "0.8",
      };
    });

const dedupePages = (pages) => {
  const pageMap = new Map();

  pages.forEach((page) => {
    const route = toRoutePath(page.route || "/");
    if (!pageMap.has(route)) {
      pageMap.set(route, { ...page, route });
    }
  });

  return Array.from(pageMap.values());
};

const writePageFile = async (baseHtml, page) => {
  const outputPath = routeToFilePath(page.route || "/");
  const html = injectSeo(baseHtml, page);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
};

const buildSitemapXml = (pages) => {
  const urls = pages
    .filter((page) => !page.noindex)
    .map((page) => {
      const canonicalUrl = toAbsoluteUrl(page.canonicalPath || page.route || "/");
      const ogImage = toAbsoluteUrl(page.ogImage || DEFAULT_IMAGE);
      const lastModified = normalizeDateOnly(page.lastModified);
      const changefreq = page.changefreq || "weekly";
      const priority = page.priority || "0.7";

      return `  <url>\n    <loc>${escapeHtml(canonicalUrl)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <image:image>\n      <image:loc>${escapeHtml(ogImage)}</image:loc>\n    </image:image>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
};

const writeSitemap = async (pages) => {
  const sitemapPath = path.join(DIST_DIR, "sitemap.xml");
  const sitemapXml = buildSitemapXml(pages);
  await fs.writeFile(sitemapPath, sitemapXml, "utf8");
};

const writeRobots = async () => {
  const robotsPath = path.join(DIST_DIR, "robots.txt");
  const robotsContent = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  await fs.writeFile(robotsPath, robotsContent, "utf8");
};

const main = async () => {
  let baseHtml;
  try {
    baseHtml = await fs.readFile(INDEX_HTML_PATH, "utf8");
  } catch {
    console.warn("[seo-prerender] dist/index.html not found. Skipping prerender.");
    return;
  }

  const staticPages = buildStaticPages();
  if (!HAS_SUPABASE_SEO_ENV) {
    console.warn(
      "[seo-prerender] Supabase env is missing. Dynamic blog/case-study meta pages and sitemap image URLs were skipped."
    );
  }
  const [blogs, caseStudies] = await Promise.all([
    fetchPublishedRows(
      "blogs",
      "slug,title,description,seo_title,seo_description,seo_keywords,og_image_url,og_image_alt,cover_image_url,category,created_at,updated_at"
    ),
    fetchPublishedRows(
      "case_studies",
      "slug,title,description,seo_title,seo_description,seo_keywords,og_image_url,og_image_alt,cover_image_url,category,client_name,tags,created_at,updated_at"
    ),
  ]);

  const dynamicPages = [
    ...buildBlogPages(blogs),
    ...buildCaseStudyPages(caseStudies),
  ];

  const allPages = dedupePages([...staticPages, ...dynamicPages]);

  await Promise.all(allPages.map((page) => writePageFile(baseHtml, page)));
  await writeSitemap(allPages);
  await writeRobots();

  console.log(
    `[seo-prerender] Generated ${allPages.length} route HTML files (${blogs.length} blogs, ${caseStudies.length} case studies).`
  );
};

main().catch((error) => {
  console.error(`[seo-prerender] Failed: ${error.message}`);
  process.exitCode = 1;
});

