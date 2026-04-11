"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getCookiePreferences,
  getDefaultCookiePreferences,
  saveCookiePreferences,
} from "@/src/lib/cookie-consent";
import { CookieBlock, CookieConsentResponse } from "@/src/utils/cookie-consent";
import { CookieAPI } from "@/src/api/cookie";

type PreferencesState = {
  necessary: true;
  analytics: boolean;
};

export default function CookieConsent() {
  const [data, setData] = useState<CookieConsentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<PreferencesState>({
    necessary: true,
    analytics: true,
  });

  useEffect(() => {
    const init = async () => {
      try {
        const res = await CookieAPI.getCookieConsent(true);
        setData(res);

        const saved = getCookiePreferences();

        if (saved) {
          setPreferences({
            necessary: true,
            analytics: saved.analytics,
          });
          setShowBanner(false);
        } else {
          const analyticsBlock = res?.settings_modal?.blocks?.find(
            (block: CookieBlock) => block?.toggle?.value === "analytics"
          );

          setPreferences({
            necessary: true,
            analytics: analyticsBlock?.toggle?.enabled ?? true,
          });
          setShowBanner(true);
        }
      } catch (error) {
        console.error("Failed to load cookie consent config:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const headers = useMemo(() => {
    const mapped = data?.settings_modal?.cookie_table_headers ?? [];
    return {
      col1: mapped.find((item) => item.col1)?.col1 ?? "Name",
      col2: mapped.find((item) => item.col2)?.col2 ?? "Domain",
      col3: mapped.find((item) => item.col3)?.col3 ?? "Expiration",
      col4: mapped.find((item) => item.col4)?.col4 ?? "Description",
    };
  }, [data]);

  const acceptAll = () => {
    const next = {
      necessary: true as const,
      analytics: true,
      updatedAt: new Date().toISOString(),
    };

    saveCookiePreferences(next);
    setPreferences({
      necessary: true,
      analytics: true,
    });
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveSettings = () => {
    const next = {
      necessary: true as const,
      analytics: preferences.analytics,
      updatedAt: new Date().toISOString(),
    };

    saveCookiePreferences(next);
    setShowBanner(false);
    setShowSettings(false);
  };

  if (loading || !data) return null;

  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-black/10 bg-[#EFEEE7]/95 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur">
            <div className="flex flex-col gap-5 p-5 sm:p-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h3 className="text-xl font-semibold text-black sm:text-2xl">
                  {data.consent_modal.title}
                </h3>

                <div
                  className="mt-3 text-sm leading-6 text-black/70 sm:text-[15px]"
                  dangerouslySetInnerHTML={{
                    __html: data.consent_modal.description,
                  }}
                />
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="cursor-pointer rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-black/30 hover:bg-black/[0.03]"
                >
                  ตั้งค่า
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="cursor-pointer rounded-full bg-[#FE552C] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {data.consent_modal.primary_btn.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[30px] bg-[#EFEEE7] shadow-[0_25px_80px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-7">
              <div
                className="max-w-[80%] [&_svg]:h-auto [&_svg]:max-w-[155px]"
                dangerouslySetInnerHTML={{ __html: data.settings_modal.title }}
              />

              <button
                type="button"
                aria-label={data.settings_modal.close_btn_label}
                onClick={() => setShowSettings(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-lg text-black transition hover:bg-black/[0.04]"
              >
                ×
              </button>
            </div>

            <div className="max-h-[calc(90vh-96px)] overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              <div className="space-y-5">
                {data.settings_modal.blocks.map((block, index) => {
                  const isAnalytics = block.toggle?.value === "analytics";
                  const isNecessary = block.toggle?.value === "necessary";

                  return (
                    <section
                      key={`${block.title}-${index}`}
                      className="rounded-[24px] border border-black/10 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-2xl">
                          <h4 className="text-lg font-semibold text-black">
                            {block.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-black/65">
                            {block.description}
                          </p>
                        </div>

                        {block.toggle && (
                          <label className="inline-flex items-center gap-3 rounded-full bg-black/[0.04] px-3 py-2">
                            <span className="text-sm font-medium text-black">
                              {isNecessary
                                ? "จำเป็น"
                                : preferences.analytics
                                ? "เปิด"
                                : "ปิด"}
                            </span>

                            <button
                              type="button"
                              disabled={block.toggle.readonly}
                              onClick={() => {
                                if (block.toggle?.readonly) return;
                                if (isAnalytics) {
                                  setPreferences((prev) => ({
                                    ...prev,
                                    analytics: !prev.analytics,
                                  }));
                                }
                              }}
                              className={`relative h-7 w-12 rounded-full transition ${
                                (isNecessary || preferences.analytics)
                                  ? "bg-[#FE552C]"
                                  : "bg-black/15"
                              } ${
                                block.toggle.readonly
                                  ? "cursor-not-allowed opacity-80"
                                  : "cursor-pointer"
                              }`}
                            >
                              <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                                  (isNecessary || preferences.analytics)
                                    ? "left-6"
                                    : "left-1"
                                }`}
                              />
                            </button>
                          </label>
                        )}
                      </div>

                      {!!block.cookie_table?.length && (
                        <div className="mt-5 overflow-hidden rounded-2xl border border-black/10">
                          <div className="hidden grid-cols-4 gap-4 bg-black/[0.04] px-4 py-3 text-sm font-semibold text-black md:grid">
                            <div>{headers.col1}</div>
                            <div>{headers.col2}</div>
                            <div>{headers.col3}</div>
                            <div>{headers.col4}</div>
                          </div>

                          <div className="divide-y divide-black/10">
                            {block.cookie_table.map((row, rowIndex) => (
                              <div
                                key={`${row.col1}-${rowIndex}`}
                                className="grid gap-3 px-4 py-4 md:grid-cols-4"
                              >
                                <div>
                                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-black/40 md:hidden">
                                    {headers.col1}
                                  </div>
                                  <div className="text-sm font-medium text-black">
                                    {row.col1}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-black/40 md:hidden">
                                    {headers.col2}
                                  </div>
                                  <div className="text-sm text-black/75">
                                    {row.col2}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-black/40 md:hidden">
                                    {headers.col3}
                                  </div>
                                  <div className="text-sm text-black/75">
                                    {row.col3}
                                  </div>
                                </div>

                                <div>
                                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-black/40 md:hidden">
                                    {headers.col4}
                                  </div>
                                  <div className="text-sm leading-6 text-black/75">
                                    {row.col4}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>

              <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-black/10 bg-[#EFEEE7] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-black/[0.03]"
                >
                  {data.settings_modal.accept_all_btn}
                </button>

                <button
                  type="button"
                  onClick={saveSettings}
                  className="rounded-full bg-[#FE552C] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {data.settings_modal.save_settings_btn}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}