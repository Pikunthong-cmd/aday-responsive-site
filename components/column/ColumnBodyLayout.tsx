"use client";

import { useEffect, useMemo, useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import "@/src/styles/wordpress-content.min.css";
import "@/src/styles/text-content.css";
import "@/src/styles/aday-article.css";

type Props = {
  content: string;
};

function sanitizeContent(html: string) {
  return (html || "")
    .replace(/&#8220;>/gi, "“")
    .replace(/&quot;>/gi, '"')
    .replace(/&gt;/gi, ">")
    .replace(/<strong>\s*<\/strong>/gi, "")
    .replace(/<p>\s*(?:&nbsp;|\u00A0)?\s*<\/p>/gi, "")
    .replace(/<blockquote>\s*<\/blockquote>/gi, "")
    .replace(/<p[^>]*>\s*>\s*<\/p>/gi, "")
    .replace(/<p[^>]*>\s*&gt;\s*<\/p>/gi, "")
    .replace(/<blockquote>\s*<p[^>]*>\s*>\s*<\/p>\s*<\/blockquote>/gi, "")
    .replace(/<blockquote>\s*<p[^>]*>\s*&gt;\s*<\/p>\s*<\/blockquote>/gi, "")
    .replace(/(<(p|strong|h2|h3|h4)[^>]*>\s*)>\s*/gi, "$1")
    .replace(/>\s*</g, "><")
    .trim();
}

export default function ColumnBodyLayout({ content }: Props) {
  const safe = useMemo(() => sanitizeContent(content), [content]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <SectionContainer className="py-8 lg:py-10 px-0">
      <div
        className={[
          "w-full max-w-[1280px] mx-auto",
          mounted ? "[animation:fadeUp_520ms_ease-out_both]" : "opacity-0",
        ].join(" ")}
      >
        <article
          className="wp-content aday-article-body text-black/85 px-0"
          dangerouslySetInnerHTML={{ __html: safe }}
        />
      </div>
    </SectionContainer>
  );
}