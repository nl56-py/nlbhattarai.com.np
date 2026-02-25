# SEO Recovery Runbook (Blog Metadata + Social Previews)

Use this after deploying SEO metadata changes.

## 1. Validate server-rendered metadata

1. Run `npm run seo:validate`.
2. Spot-check key URLs in `view-source:`:
   - `<title>`
   - `<link rel="canonical">`
   - `og:title`
   - `og:image`
3. Confirm canonical for each post is exactly `/blog/<slug>`.

## 2. Re-submit sitemap

1. Google Search Console:
   - Open **Sitemaps**
   - Submit `https://www.nlbhattarai.com.np/sitemap.xml`
2. Bing Webmaster Tools:
   - Submit the same sitemap URL.

## 3. Request recrawl for priority URLs

In Google Search Console **URL Inspection**:

1. Inspect key blog URLs (newest + previously broken previews).
2. Click **Request Indexing**.

## 4. Refresh social preview caches

1. Facebook/Meta Sharing Debugger: scrape affected URLs.
2. LinkedIn Post Inspector: inspect affected URLs.
3. Re-test WhatsApp share card by sending URL in a chat after debugger refresh.

## 5. Monitor for 7 days

Track:

1. Blog URL impressions/clicks in Search Console.
2. Preview correctness in real social shares.
3. Any crawler errors or canonical mismatches.
