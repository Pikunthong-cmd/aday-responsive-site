import { UserCookiePreferences } from "../utils/cookie-consent";


const STORAGE_KEY = "aday_cookie_preferences";
const COOKIE_KEY = "aday_cookie_preferences";

export function getDefaultCookiePreferences(): UserCookiePreferences {
  return {
    necessary: true,
    analytics: true,
    updatedAt: new Date().toISOString(),
  };
}

export function saveCookiePreferences(preferences: UserCookiePreferences) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));

  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(
    JSON.stringify(preferences)
  )}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

export function getCookiePreferences(): UserCookiePreferences | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as UserCookiePreferences;
  } catch {
    return null;
  }
}

export function hasCookieConsent(): boolean {
  return !!getCookiePreferences();
}