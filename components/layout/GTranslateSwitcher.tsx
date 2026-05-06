"use client";

import { useEffect, useState } from "react";

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

const STORAGE_KEY = "site-lang";

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

function getRootDomain(hostname: string) {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;
  return parts.slice(-2).join(".");
}

function setCookie(name: string, value: string, domain?: string) {
  const domainPart = domain ? ` domain=${domain};` : "";
  document.cookie = `${name}=${value}; path=/;${domainPart}`;
}

function deleteCookie(name: string, domain?: string) {
  const domainPart = domain ? ` domain=${domain};` : "";
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;${domainPart}`;
}

function setGTranslateLanguage(lang: Lang) {
  const hostname = window.location.hostname;
  const rootDomain = getRootDomain(hostname);

  if (lang === "en") {
    const value = "/th/en";
    setCookie("googtrans", value);
    setCookie("googtrans", value, hostname);
    if (rootDomain !== hostname) setCookie("googtrans", value, `.${rootDomain}`);
    return;
  }

  deleteCookie("googtrans");
  deleteCookie("googtrans", hostname);
  if (rootDomain !== hostname) deleteCookie("googtrans", `.${rootDomain}`);
}

export default function GTranslateSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<Lang>("th");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? "th";
    setActiveLang(saved);

    window.gtranslateSettings = {
      default_language: "th",
      languages: ["th", "en"],
      wrapper_selector: ".gtranslate_wrapper",
      native_language_names: true,
      detect_browser_language: false,
    };

    const existed = document.getElementById("gtranslate-script");
    if (!existed) {
      const script = document.createElement("script");
      script.id = "gtranslate-script";
      script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeLang = (lang: Lang) => {
    setOpen(false);

    if (lang === activeLang) return;

    setGTranslateLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    setActiveLang(lang);

    window.location.reload();
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
        className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <div className="notranslate gtranslate_wrapper" />
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-center"
        aria-label="Change language"
      >
        <GlobeIcon size={30} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[120px] overflow-hidden rounded-lg bg-white shadow-lg">
          <button
            type="button"
            onClick={() => changeLang("th")}
            className={itemClass("th")}
          >
            ไทย
          </button>
          <button
            type="button"
            onClick={() => changeLang("en")}
            className={itemClass("en")}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}