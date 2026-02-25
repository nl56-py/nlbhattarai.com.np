const DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL?.trim() || "";
const SHARED_SECRET = process.env.SEO_REDEPLOY_SECRET?.trim() || "";

const SEO_IMPACT_FIELDS = [
  "published",
  "slug",
  "title",
  "description",
  "seo_title",
  "seo_description",
  "seo_keywords",
  "og_image_url",
  "og_image_alt",
  "cover_image_url",
  "updated_at",
];

const safeParseBody = (body) => {
  if (!body) return {};
  if (typeof body === "object") return body;
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return {};
};

const isSecretValid = (req) => {
  if (!SHARED_SECRET) return true;
  const headerSecret = req.headers["x-redeploy-secret"];
  const querySecret = req.query?.secret;
  return headerSecret === SHARED_SECRET || querySecret === SHARED_SECRET;
};

const hasFieldChanged = (before, after, key) => (before?.[key] ?? null) !== (after?.[key] ?? null);

const shouldTriggerRedeploy = (payload) => {
  const event =
    payload.type || payload.eventType || payload.event || payload.action || "unknown";
  const upperEvent = String(event).toUpperCase();

  if (upperEvent === "DELETE") return false;

  const record = payload.record || payload.new || payload.data || payload;
  const oldRecord = payload.old_record || payload.old || payload.previous_record || null;

  if (!record || typeof record !== "object") return false;

  const currentlyPublished = Boolean(record.published);
  const previouslyPublished = Boolean(oldRecord?.published);
  if (!currentlyPublished && !previouslyPublished) return false;

  if (!oldRecord || typeof oldRecord !== "object") return true;

  return SEO_IMPACT_FIELDS.some((field) => hasFieldChanged(oldRecord, record, field));
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (!isSecretValid(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (!DEPLOY_HOOK_URL) {
    res.status(500).json({ error: "Missing VERCEL_DEPLOY_HOOK_URL" });
    return;
  }

  const payload = safeParseBody(req.body);
  const force = req.query?.force === "1";
  const shouldRedeploy = force || shouldTriggerRedeploy(payload);

  if (!shouldRedeploy) {
    res.status(202).json({
      ok: true,
      triggered: false,
      reason: "No SEO-impacting change detected",
    });
    return;
  }

  const event =
    payload.type || payload.eventType || payload.event || payload.action || "unknown";
  const record = payload.record || payload.new || payload.data || payload;

  const deployResponse = await fetch(DEPLOY_HOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "supabase-webhook",
      reason: "seo-metadata-change",
      event,
      slug: record?.slug || null,
      triggeredAt: new Date().toISOString(),
    }),
  });

  if (!deployResponse.ok) {
    const errorText = await deployResponse.text();
    res.status(502).json({
      ok: false,
      triggered: false,
      error: "Deploy hook call failed",
      status: deployResponse.status,
      details: errorText.slice(0, 1000),
    });
    return;
  }

  res.status(200).json({
    ok: true,
    triggered: true,
    event,
    slug: record?.slug || null,
  });
}
