const SITE_URL = (
  process.env.VITE_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  "https://www.nlbhattarai.com.np"
).replace(/\/+$/, "");

const HOME_TITLE = "N.L. Bhattarai - Websites, Software and Digital Systems";

const getTagContent = (html, pattern) => {
  const match = html.match(pattern);
  return match?.[1]?.trim() || "";
};

const normalizeUrl = (value) => String(value || "").replace(/\/+$/, "");

const fetchHtml = async (url) => {
  const response = await fetch(url, { headers: { Accept: "text/html" } });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.text();
};

const fetchBlogUrlsFromSitemap = async () => {
  const response = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { Accept: "application/xml,text/xml" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
  }

  const xml = await response.text();
  const locMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());

  return locMatches.filter((url) => {
    const normalized = normalizeUrl(url);
    return normalized.startsWith(`${SITE_URL}/blog/`);
  });
};

const validateUrl = async (url) => {
  const html = await fetchHtml(url);
  const title = getTagContent(html, /<title>(.*?)<\/title>/i);
  const canonical = getTagContent(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i);
  const ogTitle = getTagContent(html, /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["'][^>]*>/i);
  const ogImage = getTagContent(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i);

  const failures = [];
  if (!title) failures.push("Missing <title>");
  if (title === HOME_TITLE) failures.push("Homepage title leaked into blog URL");
  if (!canonical) failures.push("Missing canonical");
  if (normalizeUrl(canonical) !== normalizeUrl(url)) failures.push("Canonical mismatch");
  if (!ogTitle) failures.push("Missing og:title");
  if (!ogImage) failures.push("Missing og:image");

  return { url, title, canonical, ogTitle, ogImage, failures };
};

const main = async () => {
  const urls = await fetchBlogUrlsFromSitemap();
  if (urls.length === 0) {
    console.log("[seo-validate] No blog detail URLs found in sitemap.");
    return;
  }

  console.log(`[seo-validate] Validating ${urls.length} blog URLs...`);
  const results = [];

  for (const url of urls) {
    try {
      const result = await validateUrl(url);
      results.push(result);
    } catch (error) {
      results.push({
        url,
        failures: [`Fetch failed: ${error.message}`],
      });
    }
  }

  const failed = results.filter((result) => result.failures.length > 0);
  if (failed.length > 0) {
    console.error(`[seo-validate] Failed ${failed.length}/${results.length} URL checks.`);
    failed.forEach((result) => {
      console.error(`- ${result.url}`);
      result.failures.forEach((failure) => console.error(`  - ${failure}`));
    });
    process.exitCode = 1;
    return;
  }

  console.log(`[seo-validate] All ${results.length} blog URLs passed metadata checks.`);
};

main().catch((error) => {
  console.error(`[seo-validate] Validation failed: ${error.message}`);
  process.exitCode = 1;
});
