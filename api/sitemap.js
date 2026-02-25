import { resolveSeoImageUrl } from "./seo-utils.js";

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

const toAbsoluteUrl = (value) => {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/")) return `${SITE_URL}${value}`;
  return `${SITE_URL}/${value}`;
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const normalizeDateOnly = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const staticPages = () => {
  const today = normalizeDateOnly();
  return [
    {
      route: "/",
      canonicalPath: "/",
      ogImage: DEFAULT_IMAGE,
      lastModified: today,
      changefreq: "weekly",
      priority: "1.0",
    },
    {
      route: "/about",
      canonicalPath: "/about",
      ogImage: DEFAULT_IMAGE,
      lastModified: today,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      route: "/blog",
      canonicalPath: "/blog",
      ogImage: DEFAULT_IMAGE,
      lastModified: today,
      changefreq: "daily",
      priority: "0.9",
    },
    {
      route: "/case-studies",
      canonicalPath: "/case-studies",
      ogImage: DEFAULT_IMAGE,
      lastModified: today,
      changefreq: "weekly",
      priority: "0.9",
    },
    {
      route: "/case-studies/dr-parash-mani-shrestha",
      canonicalPath: "/case-studies/dr-parash-mani-shrestha",
      ogImage: DEFAULT_IMAGE,
      lastModified: today,
      changefreq: "monthly",
      priority: "0.8",
    },
    {
      route: "/contact",
      canonicalPath: "/contact",
      ogImage: DEFAULT_IMAGE,
      lastModified: today,
      changefreq: "monthly",
      priority: "0.8",
    },
  ];
};

const fetchPublishedRows = async (table, select) => {
  if (!HAS_SUPABASE_SEO_ENV) return [];

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
    console.warn(`[dynamic-sitemap] Unable to fetch ${table}: ${error.message}`);
    return [];
  }
};

const buildBlogPages = (blogs) =>
  blogs
    .filter((blog) => blog?.slug)
    .map((blog) => ({
      route: `/blog/${blog.slug}`,
      canonicalPath: `/blog/${blog.slug}`,
      ogImage:
        resolveSeoImageUrl(blog.og_image_url, blog.cover_image_url, DEFAULT_IMAGE) || DEFAULT_IMAGE,
      lastModified: normalizeDateOnly(blog.updated_at || blog.created_at),
      changefreq: "monthly",
      priority: "0.8",
    }));

const buildCaseStudyPages = (caseStudies) =>
  caseStudies
    .filter((caseStudy) => caseStudy?.slug)
    .map((caseStudy) => ({
      route: `/case-studies/${caseStudy.slug}`,
      canonicalPath: `/case-studies/${caseStudy.slug}`,
      ogImage:
        resolveSeoImageUrl(caseStudy.og_image_url, caseStudy.cover_image_url, DEFAULT_IMAGE) ||
        DEFAULT_IMAGE,
      lastModified: normalizeDateOnly(caseStudy.updated_at || caseStudy.created_at),
      changefreq: "monthly",
      priority: "0.8",
    }));

const normalizeRoute = (route) => route.replace(/\/+$/, "") || "/";

const dedupePages = (pages) => {
  const pageMap = new Map();
  pages.forEach((page) => {
    const route = normalizeRoute(page.route || "/");
    if (!pageMap.has(route)) {
      pageMap.set(route, { ...page, route });
    }
  });
  return Array.from(pageMap.values());
};

const buildSitemapXml = (pages) => {
  const urls = pages
    .map((page) => {
      const canonicalUrl = toAbsoluteUrl(page.canonicalPath || page.route || "/");
      const imageUrl =
        resolveSeoImageUrl(page.ogImage, DEFAULT_IMAGE) || DEFAULT_IMAGE;
      const lastModified = normalizeDateOnly(page.lastModified);
      const changefreq = page.changefreq || "weekly";
      const priority = page.priority || "0.7";

      return `  <url>\n    <loc>${escapeXml(canonicalUrl)}</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <image:image>\n      <image:loc>${escapeXml(imageUrl)}</image:loc>\n    </image:image>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
};

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    res.status(405).send("Method Not Allowed");
    return;
  }

  let pages = staticPages();

  try {
    const [blogs, caseStudies] = await Promise.all([
      fetchPublishedRows(
        "blogs",
        "slug,og_image_url,cover_image_url,created_at,updated_at"
      ),
      fetchPublishedRows(
        "case_studies",
        "slug,og_image_url,cover_image_url,created_at,updated_at"
      ),
    ]);

    const dynamicPages = [...buildBlogPages(blogs), ...buildCaseStudyPages(caseStudies)];
    pages = dedupePages([...pages, ...dynamicPages]);
  } catch (error) {
    console.warn(`[dynamic-sitemap] Falling back to static routes: ${error.message}`);
  }

  const xml = buildSitemapXml(pages);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=86400");

  if (req.method === "HEAD") {
    res.status(200).end();
    return;
  }

  res.status(200).send(xml);
}
