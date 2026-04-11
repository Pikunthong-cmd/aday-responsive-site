import HeroStatic from "@/components/layout/HeroStatic";

function Divider() {
  return <div className="h-px w-full bg-black/10" />;
}

function OrangeDivider() {
  return <div className="h-[2px] w-10 bg-[#FE552C]" />;
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-[#FE552C]">
      <path
        d="M8.5 3.5l2.2 4.7-1.6 1.6c1.2 2.2 3 4 5.2 5.2l1.6-1.6 4.7 2.2v3.1c0 .9-.7 1.6-1.6 1.6C10.9 21.5 2.5 13.1 2.5 3.1c0-.9.7-1.6 1.6-1.6h4.4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" className="text-[#FE552C]">
      <path
        d="M4 6.5h16v11H4v-11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7l7.5 6 7.5-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div>
      <HeroStatic
        variant="contact"
        title="CONTACT"
        desktopSrc="/images/bg-other-desktop.png"
        tabletSrc="/images/bg-other-tablet.png"
        mobileSrc="/images/bg-other-mobile.png"
      />

      {/* content block (white panel on beige bg like design) */}
      <div className="mx-auto w-full  px-4 pb-14 pt-10 md:px-6">
        <div className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr]">
            {/* LEFT */}
            <section className="px-6 py-12 md:px-14 md:py-16">
              <p className="text-xs text-black/30">บริษัท / Company</p>

              <h2 className="mt-10 text-lg font-semibold text-[#FE552C] md:text-xl">
                เดย์ โพเอทส์ จำกัด
              </h2>
              <p className="mt-2 text-xs tracking-[0.12em] text-black/40">
                DAY POETS COMPANY LIMITED
              </p>

              <h3 className="mt-10 text-lg font-semibold text-[#FE552C]">
                ที่อยู่
              </h3>

              <p className="mt-6 text-sm leading-relaxed text-black/60">
                33 ซอยศูนย์วิจัย 4 <br />
                แขวงบางกะปิ เขตห้วยขวาง <br />
                กรุงเทพมหานคร 10310
              </p>

              <div className="my-10 w-16">
                <OrangeDivider />
              </div>

              <p className="text-sm leading-relaxed text-black/50">
                33 Soi Sunwijai 4, New Phetburi Rd. <br />
                Khwang Bangkapi, Khet Huai Khwang <br />
                Bangkok 10310
              </p>
            </section>

            {/* V divider */}
            <div className="hidden md:block bg-black/10" />

            {/* RIGHT */}
            <section className="px-6 py-12 md:px-14 md:py-16">
              <p className="text-xs text-black/30">— ติดต่อ / Contact</p>

              {/* Advertising card */}
              <div className="relative mt-10 overflow-hidden bg-[#FE552C] px-6 py-7 text-white md:px-10 md:py-9">
                {/* watermark (subtle, like screenshot) */}
                <div className="pointer-events-none absolute -right-6 top-0 select-none text-[80px] font-black leading-none text-black/10 md:text-[96px]">
                  a day
                </div>

                <div className="text-xs opacity-90">★ For Advertising</div>
                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                  ติดต่อลงโฆษณา
                </h2>
                <p className="mt-3 text-sm leading-relaxed opacity-95">
                  สนใจลงโฆษณากับเรา <br />
                  Contact us for advertising inquiries
                </p>
              </div>

              {/* Telephone box */}
              <div className="mt-8 border border-[#FE552C] bg-white px-6 py-6 md:px-10 md:py-7">
                <div className="flex items-center gap-2 text-xs text-[#FE552C]">
                  <PhoneIcon />
                  <span>Telephone</span>
                </div>

                <div className="mt-3 text-2xl font-extrabold text-black md:text-3xl">
                  02 716 6900
                </div>

                <div className="mt-2 text-xs text-black/60">
                  วันจันทร์–ศุกร์ 09:00–18:00 น.
                </div>
              </div>

              {/* Email box */}
              <div className="mt-6 border border-[#FE552C] bg-white px-6 py-6 md:px-10 md:py-7">
                <div className="flex items-center gap-2 text-xs text-[#FE552C]">
                  <MailIcon />
                  <span>E-mail</span>
                </div>

                <div className="mt-3 text-xl font-extrabold tracking-wide text-black md:text-2xl">
                  ADAY@ADAYMAGAZINE.COM
                </div>

                <div className="mt-2 text-xs text-black/60">
                  ส่งอีเมลถึงเราได้ตลอด 24 ชั่วโมง
                </div>
              </div>
            </section>
          </div>

          {/* bottom divider like design */}
          <div className="px-6 pb-10 md:px-14">
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
}
