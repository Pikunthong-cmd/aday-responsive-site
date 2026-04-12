"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      languages: string[];
      wrapper_selector: string;
      native_language_names?: boolean;
      detect_browser_language?: boolean;
    };
  }
}

type Lang = "th" | "en";

function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2Z"
        stroke="white"
        strokeWidth="1.5"
      />
      <path d="M2 12H22" stroke="white" strokeWidth="1.5" />
      <path
        d="M12 2C15 5 15 19 12 22C9 19 9 5 12 2Z"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const STORAGE_KEY = "site-lang";

export default function GTranslateSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<Lang>("th");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pendingLangRef = useRef<Lang | null>(null);
  const retryTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "th";
    setActiveLang(saved);

    if (saved === "en") {
      pendingLangRef.current = "en";
      loadGTranslateScript();
    }

    return () => {
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;
    if (pendingLangRef.current !== "en") return;

    applyEnglishWithRetry();
  }, [scriptLoaded]);

  const loadGTranslateScript = () => {
    if (typeof window === "undefined") return;

    window.gtranslateSettings = {
      default_language: "th",
      languages: ["th", "en"],
      wrapper_selector: ".gtranslate_wrapper",
      native_language_names: true,
      detect_browser_language: false,
    };

    const existed = document.getElementById("gtranslate-script");
    if (existed) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "gtranslate-script";
    script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
  };

  const applyEnglishWithRetry = (attempt = 0) => {
    const root = wrapperRef.current;
    const select = root?.querySelector("select") as HTMLSelectElement | null;

    if (!select) {
      if (attempt < 20) {
        retryTimerRef.current = window.setTimeout(() => {
          applyEnglishWithRetry(attempt + 1);
        }, 300);
      }
      return;
    }

    select.value = "en";
    select.dispatchEvent(new Event("change", { bubbles: true }));
    pendingLangRef.current = null;
  };

  const changeLang = (lang: Lang) => {
    setOpen(false);

    if (lang === activeLang) return;

    if (lang === "th") {
      localStorage.setItem(STORAGE_KEY, "th");
      setActiveLang("th");
      window.location.reload();
      return;
    }

    localStorage.setItem(STORAGE_KEY, "en");
    setActiveLang("en");
    pendingLangRef.current = "en";

    if (!scriptLoaded) {
      loadGTranslateScript();
      return;
    }

    applyEnglishWithRetry();
  };

  const itemClass = (lang: Lang) =>
    `block w-full px-4 py-2 text-left text-sm transition ${
      activeLang === lang
        ? "bg-[#FE552C]/10 text-[#FE552C] font-medium"
        : "text-black hover:bg-gray-100"
    }`;

  return (
    <div className="relative">
      <div
        ref={wrapperRef}
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <div className="notranslate gtranslate_wrapper" />
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center cursor-pointer"
        aria-label="Change language"
      >
        <GlobeIcon size={30} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[120px] overflow-hidden rounded-lg bg-white shadow-lg ">
          <button type="button" onClick={() => changeLang("th")} className={itemClass("th")}>
            ไทย
          </button>
          <button type="button" onClick={() => changeLang("en")} className={itemClass("en")}>
            English
          </button>
        </div>
      )}
    </div>
  );
}