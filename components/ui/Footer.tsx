import Link from "next/link";
import Image from "next/image";

import {
  IconFacebook,
  IconIG,
  IconSpotify,
  IconTiktok,
  IconTwiiter,
  IconYoutube,
} from "@/components/Icon";

const mainPages = [
  { label: "HOME", href: "/" },
  { label: "VIDEO", href: "/video" },
  { label: "PODCAST", href: "/podcast" },
  { label: "SERIES", href: "/series" },
  { label: "MAGAZINE", href: "/magazine" },
  { label: "ACTIVITIES", href: "/activities" },
];

const utilityPages = [
  { label: "ABOUT US", href: "/about-us" },
  { label: "CONTACT", href: "/contact" },
  { label: "PRIVACY POLICY", href: "/privacy-policy" },
];

const socialLinks = [
  { label: "Facebook", href: "#", Icon: IconFacebook },
  { label: "Instagram", href: "#", Icon: IconIG },
  { label: "Spotify", href: "#", Icon: IconSpotify },
  { label: "TikTok", href: "#", Icon: IconTiktok },
  { label: "X", href: "#", Icon: IconTwiiter },
  { label: "YouTube", href: "#", Icon: IconYoutube },
];

const linkClass =
  "text-white/85 transition-all duration-200 hover:text-[#FE552C] hover:underline hover:underline-offset-4 hover:decoration-[#FE552C]/70 hover:translate-x-[2px]";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-6 md:px-10 lg:px-16 py-14 md:py-16 lg:py-20">
        <div
          className="
            grid grid-cols-1 gap-12 items-start
            md:grid-cols-2
            lg:grid-cols-[460px_1fr_220px_220px]
            lg:gap-14
          "
        >
          
          <div className="md:col-start-1 md:row-start-1 lg:col-start-1 lg:row-start-1">
            <Image
              src="/logo.png"
              alt="a day"
              width={420}
              height={140}
              className="h-auto w-[220px] md:w-[340px] lg:w-[420px]"
            />
          </div>

          
          <div className="md:col-start-1 md:row-start-2 lg:col-start-2 lg:row-start-1 space-y-6">
            <div className="font-semibold text-[22px] leading-snug">
              บริษัท เดย์ โพเอทส์ จำกัด
              <br />
              (DAY POETS COMPANY LIMITED)
            </div>

            <div className="text-white/80 text-[16px] leading-relaxed">
              33 Soi Sunwijai 4, New Phetburi Rd.,
              <br />
              Khwang Bangkapi, Khet Huai Khwang,
              <br />
              Bangkok 10310
            </div>

            <div className="space-y-2 text-white/80 text-[16px]">
              <div>
                Tel.:{" "}
                <a
                  href="tel:+6627166900"
                  className="text-white hover:opacity-80 transition"
                >
                  02 716 6900
                </a>
              </div>
              <div>
                E-mail :{" "}
                <a
                  href="mailto:aday@adaymagazine.com"
                  className="text-white hover:opacity-80 transition"
                >
                  aday@adaymagazine.com
                </a>
              </div>
            </div>
          </div>

          
          <nav className="md:col-start-1 md:row-start-3 lg:col-start-3 lg:row-start-1 space-y-4">
            <div className="text-[22px] font-semibold">Main Pages</div>
            <ul className="space-y-2 text-[14px] tracking-wide">
              {mainPages.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className={linkClass}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          
          <nav className="md:col-start-2 md:row-start-3 lg:col-start-4 lg:row-start-1 space-y-4">
            <div className="text-[22px] font-semibold">Utility Pages</div>
            <ul className="space-y-2 text-[14px] tracking-wide">
              {utilityPages.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className={linkClass}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:row-start-4 lg:col-start-2 lg:col-span-2 lg:row-start-2 mt-6 lg:mt-10">
            <div className="text-[22px] font-semibold">follow us on</div>
            <div className="mt-6 flex flex-wrap items-center gap-7">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-white/90 transition-all duration-200 hover:text-[#FE552C] hover:-translate-y-[1px]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:row-start-5 lg:col-start-2 lg:col-span-1 lg:row-start-3 mt-10 lg:mt-12">
            <div className="text-[20px] text-white/90">
              <Link href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>{" "}
              /{" "}
              <Link href="/terms" className={linkClass}>
                Terms and conditions
              </Link>
              , ©2025
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
