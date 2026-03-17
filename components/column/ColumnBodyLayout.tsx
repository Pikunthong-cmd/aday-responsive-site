"use client";

import { useEffect, useMemo, useState } from "react";
import SectionContainer from "../layout/SectionContainer";
import "@/src/styles/wordpress-content.min.css";
import "@/src/styles/text-content.css";


type Props = {
  content: string;
};

function sanitizeContent(html: string) {
  return (html || "")
    .replace(/<strong>\s*<\/strong>/gi, "")
    .replace(/<p>\s*(?:&nbsp;|\u00A0)?\s*<\/p>/gi, "")
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
    <SectionContainer className="py-8 lg:py-10">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className={[
          "mx-auto max-w-3xl",
          mounted ? "[animation:fadeUp_520ms_ease-out_both]" : "opacity-0",
        ].join(" ")}
      >
        <article
          className="wp-content text-black/85"
          dangerouslySetInnerHTML={{ __html: safe }}
        />
      </div>
    </SectionContainer>
  );
}