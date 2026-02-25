const ABSOLUTE_HTTP_URL_REGEX = /^https?:\/\/[^\s]+$/i;

export const sanitizeAbsoluteHttpUrl = (value) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || !ABSOLUTE_HTTP_URL_REGEX.test(trimmed)) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
};

export const isAbsoluteHttpUrl = (value) => sanitizeAbsoluteHttpUrl(value) !== null;

export const resolveSeoImageUrl = (...candidates) => {
  for (const candidate of candidates) {
    const sanitized = sanitizeAbsoluteHttpUrl(candidate);
    if (sanitized) return sanitized;
  }

  return undefined;
};
