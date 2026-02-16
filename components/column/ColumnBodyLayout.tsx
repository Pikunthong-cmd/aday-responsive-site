"use client";

import { useEffect, useMemo, useState } from "react";
import SectionContainer from "../layout/SectionContainer";

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
          className={[
            "prose max-w-none",
            "prose-neutral",
            "text-black/85",
            "prose-p:leading-[1.95] prose-p:tracking-[0.01em] prose-p:font-light",
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-h2:text-[1.35rem] prose-h2:mt-12 prose-h2:mb-4",
            "prose-h3:mt-10 prose-h3:mb-3",
            "prose-hr:my-12",
            "prose-figure:my-8",
            "prose-img:my-0",
            "prose-figcaption:text-sm prose-figcaption:text-black/60",
            "prose-blockquote:border-l-black/15 prose-blockquote:text-black/70 prose-blockquote:pl-4 prose-blockquote:my-8",
            "[&>p]:my-5",
            "[&>figure]:my-10",
            "[&>figure>img]:w-full",
            "[&>figure>img]:h-auto",
            "[&_:where(img)]:[animation:imgFade_520ms_ease-out_both]",
            "[&_:where(a)]:text-black",
            "[&_:where(a)]:underline",
            "[&_:where(a)]:underline-offset-4",
            "[&_:where(a)]:decoration-black/25",
            "[&_:where(a)]:transition-colors",
            "hover:[&_:where(a)]:decoration-orange-500",
            "hover:[&_:where(a)]:text-orange-600",
            "hover:[&_:where(a)]:decoration-2",
            "focus-visible:[&_:where(a)]:outline-none",
            "focus-visible:[&_:where(a)]:ring-2",
            "focus-visible:[&_:where(a)]:ring-orange-400/60",
            "focus-visible:[&_:where(a)]:rounded-sm",
            "[&_:where(ul)]:my-6 [&_:where(ol)]:my-6",
            "[&_:where(li)]:my-2",
            "[&_:where(code)]:px-1 [&_:where(code)]:py-0.5 [&_:where(code)]:rounded-md [&_:where(code)]:bg-black/5 [&_:where(code)]:text-[0.95em]",
            "[&_:where(pre)]:rounded-2xl [&_:where(pre)]:bg-black [&_:where(pre)]:text-white [&_:where(pre)]:p-4 [&_:where(pre)]:overflow-x-auto",
            "[&_:where(strong)]:!font-semibold",
            "[&_:where(strong)]:!text-black",
            "[&_:where(p>strong:only-child)]:!block",
            "[&_:where(p>strong:only-child)]:!text-[1.2rem]",
            "[&_:where(p>strong:only-child)]:!leading-[1.35]",
            "[&_:where(p>strong:only-child)]:!my-8",
            "[&_:where(p>strong:only-child)]:!tracking-tight",
          ].join(" ")}
          dangerouslySetInnerHTML={{ __html: safe }}
        />
      </div>
    </SectionContainer>
  );
}
