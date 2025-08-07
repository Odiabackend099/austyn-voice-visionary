import React, { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description?: string;
  type?: string; // website | article | course | etc
  image?: string;
  canonicalUrl?: string;
  jsonLd?: Record<string, any>;
  noIndex?: boolean;
}

const upsertTag = (selector: string, create: () => HTMLElement) => {
  const existing = document.head.querySelector(selector);
  if (existing) return existing as HTMLElement;
  const el = create();
  document.head.appendChild(el);
  return el;
};

const setMeta = (key: "name" | "property", id: string, content?: string) => {
  if (!content) return;
  const meta = upsertTag(`meta[${key}="${id}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(key, id);
    return m;
  });
  meta.setAttribute("content", content);
};

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  type = "website",
  image,
  canonicalUrl,
  jsonLd,
  noIndex,
}) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Basic meta
    if (description) setMeta("name", "description", description);
    if (noIndex) setMeta("name", "robots", "noindex, nofollow");

    // Canonical
    if (canonicalUrl) {
      const link = upsertTag('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      }) as HTMLLinkElement;
      link.href = canonicalUrl;
    }

    const url = canonicalUrl || window.location.href;

    // Open Graph
    setMeta("property", "og:title", title);
    if (description) setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    if (image) setMeta("property", "og:image", image);

    // Twitter
    setMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    if (description) setMeta("name", "twitter:description", description);
    if (image) setMeta("name", "twitter:image", image);

    // JSON-LD
    const existing = document.getElementById("structured-data");
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "structured-data";
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, type, image, canonicalUrl, JSON.stringify(jsonLd), noIndex]);

  return null;
};

export default SEOHead;
