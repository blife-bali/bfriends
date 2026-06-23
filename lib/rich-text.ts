import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "a"];
const ALLOWED_ATTR = ["href", "target", "rel"];

function looksLikeHtml(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.startsWith("<") && trimmed.includes(">");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function addLinkSafetyAttributes(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    let next = attrs;
    if (!/\btarget\s*=/i.test(next)) next += ' target="_blank"';
    if (!/\brel\s*=/i.test(next)) next += ' rel="noopener noreferrer"';
    return `<a${next}>`;
  });
}

export function sanitizeRichText(html: string): string {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });

  return addLinkSafetyAttributes(clean);
}

export function plainTextToHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";

  const paragraphs = trimmed.split(/\n{2,}/);
  return paragraphs
    .map((paragraph) => {
      const lines = escapeHtml(paragraph).split("\n");
      return `<p>${lines.join("<br>")}</p>`;
    })
    .join("");
}

export function normalizeAnswerForDisplay(answer: string): string {
  const trimmed = answer?.trim() ?? "";
  if (!trimmed) return "";

  if (looksLikeHtml(trimmed)) {
    return sanitizeRichText(trimmed);
  }

  return sanitizeRichText(plainTextToHtml(trimmed));
}

export function stripHtml(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] }).trim();
}
