"use client";

import { useMemo, useState } from "react";
import HeroStatic from "@/components/layout/HeroStatic";

type Lang = "th" | "en";

type SectionKey = "intro" | "s1" | "s2" | "s3" | "s4" | "s5" | "s6";

const SECTIONS: { id: SectionKey; th: string; en: string }[] = [
  { id: "intro", th: "บทนำ", en: "Introduction" },
  { id: "s1", th: "ข้อมูลส่วนบุคคลที่บริษัทประมวลผล", en: "Personal data we process" },
  { id: "s2", th: "วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูล", en: "Purposes of collection and use" },
  { id: "s3", th: "ระยะเวลาในการประมวลผลข้อมูล", en: "Retention period" },
  { id: "s4", th: "การเปิดเผยข้อมูลส่วนบุคคล", en: "Disclosure" },
  { id: "s5", th: "สิทธิของเจ้าของข้อมูล", en: "Your rights" },
  { id: "s6", th: "ข้อมูลติดต่อบริษัท", en: "Contact" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function BulletLine({ no, children }: { no: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[26px_1fr] gap-3">
      <div className="pt-[2px] text-xs font-semibold text-[#FE552C]">{no}</div>
      <div className="text-sm leading-relaxed text-black/70">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<Lang>("th");

  const navItems = useMemo(
    () =>
      SECTIONS.map((s, i) => ({
        id: s.id,
        no: pad2(i + 1),
        title: lang === "th" ? s.th : s.en,
      })),
    [lang],
  );

  const introText = useMemo(
    () => ({
      th:
        'บริษัท เดย์ โพเอทส์ จำกัด ("บริษัท") ขอแจ้งให้ท่านที่ติดต่อมายังบริษัททราบว่า บริษัทมีความจำเป็นต้องเก็บ รวบรวม และใช้ข้อมูลส่วนบุคคลของท่านที่ติดต่อมาใช้บริการของบริษัท ภายใต้นโยบายข้อมูลส่วนบุคคลฉบับนี้ และเมื่อท่านติดต่อมายังบริษัท ส่งต่อเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่บริษัท บริษัทจะถือว่าท่านตกลงและยอมรับที่จะปฏิบัติตามนโยบายข้อมูลส่วนบุคคลฉบับนี้แล้ว',
      en:
        'Day Poets Company Limited ("we" or the "Company") informs you that we need to collect, use, and process your personal data when you contact us or use our services under this Personal Data Policy. When you contact us or disclose/transmit your personal data to us, we deem that you agree to and accept this policy.',
    }),
    [],
  );

  const s1 = useMemo(
    () => ({
      blocks: [
        {
          items: [
            {
              th: "บริษัทอาจได้รับข้อมูลส่วนบุคคลของท่านได้จากหลายช่องทาง ดังนี้",
              en: "We may receive your personal data through various channels, including:",
              isLead: true,
            },
            {
              th: "ได้รับโดยตรงจากการติดต่อสื่อสารระหว่างบริษัทและท่าน",
              en: "Directly from communications between you and the Company.",
            },
            {
              th: "ได้รับทางอ้อมจากการอ้างอิงจากบุคคลอื่น ซึ่งท่านอาจให้ความยินยอมให้บุคคลดังกล่าวเปิดเผยส่งต่อข้อมูลส่วนบุคคลของท่านให้แก่บริษัท",
              en: "Indirectly via referrals from other persons where you may have consented to them disclosing/transferring your personal data to us.",
            },
            {
              th: "เก็บรวบรวมโดยอัตโนมัติด้วยระบบ เมื่อท่านเข้ามาเยี่ยมชมเว็บไซต์ และ/หรือใช้บริการต่าง ๆ ของบริษัท",
              en: "Automatically through systems when you visit our website and/or use our services.",
            },
          ],
        },
        {
          items: [
            {
              th: "ข้อมูลส่วนบุคคลที่บริษัทมีความจำเป็นต้องเก็บ รวบรวม ใช้ และประมวลผล ได้แก่",
              en: "The personal data that we need to collect, use, and process includes:",
              isLead: true,
            },
            {
              th: "ชื่อนามสกุล รวมถึงข้อมูลที่เกี่ยวเนื่อง หรือของตัวแทนของท่าน ซึ่งอาจรวมถึงข้อมูลเอกสารการแสดงตนของท่าน",
              en: "Full name (including related information), or your representative’s details, which may include identification documents.",
            },
            {
              th: "ข้อมูลการติดต่อ อาทิ เบอร์โทรศัพท์ อีเมล หรือข้อมูล Social Media Account",
              en: "Contact information such as phone number, email, or social media account details.",
            },
            {
              th: "ข้อมูลส่วนบุคคลอื่น ๆ ที่ท่านอาจให้แก่บริษัทระหว่างการติดต่อสื่อสาร เช่น ข้อมูลเรื่องที่ต้องการติดต่อสอบถาม ข้อมูลความสนใจ หรือข้อมูลประกอบอื่น ๆ ที่อาจระบุตัวตนของท่านได้",
              en: "Other personal data you provide during communications, such as the subject of your inquiry, interests, or supporting information that may identify you.",
            },
            {
              th: "กรณีการติดต่อผ่าน Website อาจรวมถึงข้อมูลทางเทคนิค ได้แก่ IP Address, Cookies รวมถึงข้อมูลพฤติกรรมการสืบค้นของท่าน",
              en: "If you contact us via the website, technical data may be collected, such as IP address, cookies, and browsing behavior.",
            },
          ],
        },
      ],
    }),
    [],
  );

  const s2 = useMemo(
    () => ({
      items: [
        {
          th: "เพื่อการจัดการตอบรับการสื่อสารที่ท่านติดต่อมายังบริษัท เช่น เพื่อการตอบคำถาม การส่งข้อมูลที่เกี่ยวข้อง การจัดการข้อร้องเรียน การตอบรับความคิดเห็น รวมถึงการประสานงานต่อเนื่องไปจนถึงการให้บริการ การจัดทำสัญญา และ/หรือการปฏิบัติสิทธิและหน้าที่ที่บริษัทและท่านอาจตกลงระหว่างกัน",
          en: "To manage and respond to communications you make to us (e.g., answering questions, providing relevant information, handling complaints, acknowledging feedback), including ongoing coordination leading to service delivery, contract preparation, and/or exercising rights and obligations agreed between you and the Company.",
        },
        {
          th: "เพื่อการปฏิบัติหน้าที่ตามกฎหมายที่บริษัทอาจอยู่ภายใต้เงื่อนไขที่ต้องปฏิบัติตาม ซึ่งอาจรวมถึงการจัดทำเอกสารบัญชี และภาษี",
          en: "To comply with legal obligations applicable to the Company, which may include preparing accounting and tax documentation.",
        },
        {
          th: "เพื่อการสร้างและปรับปรุงความสัมพันธ์ทางธุรกิจ รวมถึงการปรับปรุงการให้บริการ ซึ่งบริษัทอาจรวบรวมข้อมูลเพื่อประโยชน์ในการควบคุม การรับประกันคุณภาพ และการวิเคราะห์การบริหาร",
          en: "To build and improve business relationships and enhance our services, including collection for control, quality assurance, and management analysis purposes.",
        },
        {
          th: "เพื่อประโยชน์ในการปกป้องและต่อสู้สิทธิอันชอบด้วยกฎหมายของบริษัท ในกรณีที่อาจเกิดข้อพิพาทระหว่างท่านและบริษัท",
          en: "To protect and defend the Company’s legitimate rights in case of disputes between you and the Company.",
        },
        {
          th: "กรณีที่บริษัทได้รับความยินยอมจากท่านในการประมวลผลด้วยจุดประสงค์เฉพาะ เช่น เพื่อการติดต่อประชาสัมพันธ์ทางการตลาด บริษัทจะประมวลผลข้อมูลตามวัตถุประสงค์ดังกล่าว",
          en: "Where we obtain your consent for specific purposes (e.g., marketing communications), we will process your personal data according to those purposes.",
        },
      ],
    }),
    [],
  );

  const s3 = useMemo(
    () => ({
      items: [
        {
          th: "สำหรับวัตถุประสงค์การให้บริการและการจัดทำสัญญา บริษัทจำเป็นต้องประมวลผลข้อมูลส่วนบุคคลของท่านตราบเท่าที่บริษัทยังมีหน้าที่ให้บริการแก่ท่าน",
          en: "For service provision and contracting purposes, we need to process your personal data for as long as we still have a duty to provide services to you.",
        },
        {
          th: "สำหรับวัตถุประสงค์การปฏิบัติหน้าที่ตามกฎหมาย บริษัทจำเป็นต้องประมวลผลข้อมูลตามระยะเวลาที่กฎหมายที่เกี่ยวข้องกำหนด",
          en: "For legal compliance purposes, we will process personal data for the period required by applicable laws.",
        },
        {
          th: "สำหรับวัตถุประสงค์การสร้างและปรับปรุงความสัมพันธ์ทางธุรกิจ บริษัทสงวนสิทธิในการเก็บรักษาข้อมูลเท่าที่มีความจำเป็นทางธุรกิจ โดยรับประกันไม่ให้กระทบสิทธิของท่านเกินสมควร",
          en: "For building and improving business relationships, we reserve the right to retain data as necessary for business needs, ensuring it does not unreasonably affect your rights.",
        },
        {
          th: "สำหรับวัตถุประสงค์การปกป้องสิทธิของบริษัท บริษัทมีความจำเป็นเก็บรักษาข้อมูลตลอดอายุความที่เกี่ยวข้อง",
          en: "For protecting the Company’s rights, we may retain data for the relevant statutory limitation period.",
        },
        {
          th: "กรณีที่ท่านให้ความยินยอมแก่บริษัท บริษัทจะประมวลผลข้อมูลส่วนบุคคลของท่านจนกว่าท่านจะถอนความยินยอม",
          en: "Where you have provided consent, we will process your personal data until you withdraw your consent.",
        },
      ],
    }),
    [],
  );

  const s4 = useMemo(
    () => ({
      lead: {
        th: "โดยหลักการแล้ว ข้อมูลส่วนบุคคลของท่านจะไม่ถูกเปิดเผย ยกเว้นเป็นการเปิดเผยที่บริษัทจำเป็นต้องดำเนินการให้แก่กลุ่มบุคคลดังนี้",
        en: "In principle, your personal data will not be disclosed, except where the Company needs to disclose it to the following parties:",
      },
      items: [
        {
          th: "ผู้ให้บริการภายนอกของบริษัท ที่ให้การช่วยเหลือสนับสนุนในการให้บริการแก่ท่าน รวมถึงที่ปรึกษาด้านการดำเนินธุรกิจ โดยบริษัทจะส่งต่อข้อมูลตามขอบเขตของวัตถุประสงค์และบนพื้นฐานเท่าที่จำเป็นเท่านั้น",
          en: "Our external service providers who support service delivery (including business consultants). We will share data only within the scope of purposes and on a need-to-know basis.",
        },
        {
          th: "กรณีที่บริษัทอาจอยู่ภายใต้บังคับคำสั่งหรือคำพิพากษาของหน่วยงานราชการ บริษัทอาจมีความจำเป็นในการส่งต่อเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่หน่วยงานดังกล่าว",
          en: "Where the Company is subject to orders or judgments by government authorities, we may need to disclose your personal data to such authorities.",
        },
      ],
      security: {
        th: "บริษัทรับประกันการจัดให้มีมาตรการการรักษาความมั่นคงปลอดภัยที่เหมาะสม เพื่อป้องกันการเข้าถึง การใช้ การเปลี่ยนแปลง หรือการเปิดเผยข้อมูลส่วนบุคคลโดยปราศจากอำนาจหรือโดยมิชอบ และจะทบทวนมาตรการดังกล่าวเป็นระยะตามความเหมาะสม",
        en: "We ensure appropriate security measures to prevent unauthorized or unlawful access, use, alteration, or disclosure of personal data, and we will review such measures periodically as appropriate.",
      },
    }),
    [],
  );

  const rightsCards = useMemo(
    () => [
      {
        th: "ถอนความยินยอม",
        en: "Withdraw consent",
        descTH: "สิทธิในการถอนความยินยอมที่เคยให้ไว้ในการประมวลผลข้อมูล",
        descEN: "The right to withdraw consent previously given for data processing.",
      },
      {
        th: "ขอเข้าถึงข้อมูล",
        en: "Access data",
        descTH: "สิทธิในการขอเข้าถึงและรับสำเนาข้อมูลส่วนบุคคลของท่าน",
        descEN: "The right to access and obtain a copy of your personal data.",
      },
      {
        th: "ปรับปรุงข้อมูล",
        en: "Rectify data",
        descTH: "สิทธิในการขอปรับปรุงข้อมูลส่วนบุคคลให้ถูกต้องและเป็นปัจจุบัน",
        descEN: "The right to rectify your personal data to ensure it is accurate and up to date.",
      },
      {
        th: "คัดค้านการประมวลผล",
        en: "Object processing",
        descTH: "สิทธิในการขอคัดค้านการประมวลผลข้อมูลส่วนบุคคลของท่าน",
        descEN: "The right to object to the processing of your personal data.",
      },
      {
        th: "โอนถ่ายข้อมูล",
        en: "Data portability",
        descTH: "สิทธิในการขอโอนถ่ายข้อมูลในรูปแบบอิเล็กทรอนิกส์ไปยังผู้ควบคุมข้อมูลอื่น",
        descEN: "The right to request transfer of data in an electronic format to another data controller.",
      },
      {
        th: "ลบ / ระงับ / ร้องเรียน",
        en: "Erase / Restrict / Complain",
        descTH: "สิทธิขอให้ลบข้อมูลเมื่อหมดความจำเป็น ระงับการประมวลผล และสิทธิในการร้องเรียน",
        descEN: "The right to request deletion when no longer necessary, restrict processing, and lodge a complaint.",
      },
    ],
    [],
  );

  return (
    <div className="bg-white">
      <HeroStatic
        variant="privacy"
        title="Privacy policy"
        eyebrow="— นโยบายความเป็นส่วนตัว"
        rightNote={`Your trust is our responsibility. We are fully transparent
about how we handle your personal data.`}
        rightSubNote="บริษัท เดย์ โพเอทส์ จำกัด"
        desktopSrc="/images/bg-other-desktop.png"
        tabletSrc="/images/bg-other-tablet.png"
        mobileSrc="/images/bg-other-mobile.png"
      />

      {/* container */}
      <div className="mx-auto w-full px-4 pb-16 pt-6 md:px-6">
        {/* language pills */}
        <div className="flex items-center gap-3 border-b border-black/10 pb-5">
          <button
            onClick={() => setLang("th")}
            className={[
              "rounded-full border px-5 py-2 text-xs font-semibold transition",
              lang === "th"
                ? "border-black bg-black text-white"
                : "border-black/25 bg-white text-black hover:border-black/40",
            ].join(" ")}
          >
            ภาษาไทย
          </button>
          <button
            onClick={() => setLang("en")}
            className={[
              "rounded-full border px-5 py-2 text-xs font-semibold transition",
              lang === "en"
                ? "border-black bg-black text-white"
                : "border-black/25 bg-white text-black hover:border-black/40",
            ].join(" ")}
          >
            English
          </button>
        </div>

        {/* layout: sidebar / divider / content */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1px_1fr] md:gap-10">
          {/* sidebar */}
          <aside className="hidden md:block mt-10">
            <div className="sticky top-24">
              <div className="text-xs text-black/40">
                {lang === "th" ? "สารบัญ" : "Contents"}
              </div>

              <div className="mt-4 space-y-1">
                {navItems.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => scrollToId(it.id)}
                    className="flex w-full items-start gap-3 rounded-md px-3 py-2 text-left text-xs transition hover:bg-black/[0.04]"
                  >
                    {/* <span className="mt-[1px] w-6 shrink-0 text-[#FE552C]">{it.no}</span> */}
                    <span className="text-black/60">{it.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* divider */}
          <div className="hidden md:block bg-black/10" />

          {/* mobile dropdown */}
          <div className="md:hidden">
            <select
              className="w-full border-black/10 bg-[#FE552C] px-4 py-3 text-sm text-white my-0"
              onChange={(e) => scrollToId(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                {lang === "th" ? "สารบัญ / เลือกหัวข้อ" : "Contents / Choose section"}
              </option>
              {navItems.map((it) => (
                <option key={it.id} value={it.id}>
                  {it.no} — {it.title}
                </option>
              ))}
            </select>
          </div>

          {/* content */}
          <main className="space-y-0">
            {navItems.map((it) => (
              <section key={it.id} id={it.id} className="py-10 border-t border-black/10">
                {/* number line */}
                <div className="text-xs font-semibold text-[#FE552C]">——— {it.no}</div>

                <h2 className="mt-3 text-xl font-bold text-black md:text-2xl">
                  {it.title}
                </h2>

                {/* INTRO */}
                {it.id === "intro" ? (
                  <div className="mt-6">
                    <p className="text-sm leading-relaxed text-black/60">
                      {lang === "th" ? introText.th : introText.en}
                    </p>
                  </div>
                ) : null}

                {/* S1 */}
                {it.id === "s1" ? (
                  <div className="mt-6 space-y-6">
                    {s1.blocks.map((b, blockIdx) => (
                      <div key={blockIdx} className="space-y-4">
                        {b.items.map((x, idx) => (
                          <BulletLine key={idx} no={pad2(idx + 1)}>
                            <span className={x.isLead ? "font-semibold text-black/70" : ""}>
                              {lang === "th" ? x.th : x.en}
                            </span>
                          </BulletLine>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* S2 */}
                {it.id === "s2" ? (
                  <div className="mt-6 space-y-4">
                    {s2.items.map((x, idx) => (
                      <BulletLine key={idx} no={pad2(idx + 1)}>
                        {lang === "th" ? x.th : x.en}
                      </BulletLine>
                    ))}
                  </div>
                ) : null}

                {/* S3 */}
                {it.id === "s3" ? (
                  <div className="mt-6 space-y-4">
                    {s3.items.map((x, idx) => (
                      <BulletLine key={idx} no={pad2(idx + 1)}>
                        {lang === "th" ? x.th : x.en}
                      </BulletLine>
                    ))}
                  </div>
                ) : null}

                {/* S4 */}
                {it.id === "s4" ? (
                  <div className="mt-6 space-y-4">
                    <p className="text-sm leading-relaxed text-black/60">
                      {lang === "th" ? s4.lead.th : s4.lead.en}
                    </p>

                    <div className="space-y-4">
                      {s4.items.map((x, idx) => (
                        <BulletLine key={idx} no={pad2(idx + 1)}>
                          {lang === "th" ? x.th : x.en}
                        </BulletLine>
                      ))}
                    </div>

                    <div className="pt-2">
                      <p className="text-sm leading-relaxed text-black/60">
                        {lang === "th" ? s4.security.th : s4.security.en}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* S5 */}
                {it.id === "s5" ? (
                  <div className="mt-8">
                    <p className="text-sm leading-relaxed text-black/60">
                      {lang === "th"
                        ? "บริษัทเคารพสิทธิของท่านในฐานะเจ้าของข้อมูลภายใต้กฎหมายที่เกี่ยวข้อง ท่านสามารถติดต่อบริษัทเพื่อขอใช้สิทธิ ดังนี้"
                        : "We respect your rights as a data subject under applicable laws. You may contact us to exercise the following rights:"}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {rightsCards.map((c, idx) => (
                        <div key={idx} className="border border-black/10 bg-white p-5">
                          <div className="text-xs font-semibold text-[#FE552C]">
                            {pad2(idx + 1)}
                          </div>
                          <div className="mt-2 text-sm font-bold text-black/80">
                            {lang === "th" ? c.th : c.en}
                          </div>
                          <div className="mt-2 text-xs leading-relaxed text-black/50">
                            {lang === "th" ? c.descTH : c.descEN}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* S6 */}
                {it.id === "s6" ? (
                  <div className="mt-8  pt-6">
                    <div className="text-sm font-extrabold text-[#FE552C]">
                      {lang === "th"
                        ? "เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)"
                        : "Data Protection Officer (DPO)"}
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-black/60">
                      <div>
                        {lang === "th"
                          ? "ที่อยู่ เลขที่ 33 ซอยศูนย์วิจัย 4 แขวงบางกะปิ เขตห้วยขวาง กรุงเทพมหานคร 10310"
                          : "Address: 33 Soi Sunwijai 4, Khwang Bangkapi, Khet Huai Khwang, Bangkok 10310"}
                      </div>
                      <div>{lang === "th" ? "อีเมล admin@daypoets.com" : "Email: admin@daypoets.com"}</div>
                      <div>{lang === "th" ? "โทร 02 716 6900" : "Tel: 02 716 6900"}</div>
                    </div>
                  </div>
                ) : null}
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}