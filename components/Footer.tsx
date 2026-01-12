import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo */}
          <div>
            <Image src="/logo.png" alt="Logo" width={324} height={102} />
          </div>

          {/* Company info */}
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="font-semibold">
              บริษัท เดย์ โพเอทส์ จำกัด
              <br />
              (DAY POETS COMPANY LIMITED)
            </p>
            <p className="text-white/80">
              33 Soi Sunwijai 4, New Phetburi Rd.,
              <br />
              Khwang Bangkapi, Khet Huai Khwang,
              <br />
              Bangkok 10310
            </p>
          </div>

          {/* Main Pages */}
          <div className="space-y-3 text-sm">
            <p className="font-semibold mb-2">Main Pages</p>
            <ul className="space-y-1 text-white/80">
              <li>HOME</li>
              <li>VIDEO</li>
              <li>PODCAST</li>
              <li>SERIES</li>
              <li>MAGAZINE</li>
              <li>ACTIVITIES</li>
            </ul>
          </div>

          {/* Utility Pages */}
          <div className="space-y-3 text-sm">
            <p className="font-semibold mb-2">Utility Pages</p>
            <ul className="space-y-1 text-white/80">
              <li>ABOUT US</li>
              <li>CONTACT</li>
              <li>PRIVACY POLICY</li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <p className="text-sm tracking-wide">follow us on</p>

          <div className="flex gap-6 text-xl">
            {/* <FaFacebookF />
            <FaInstagram />
            <FaSpotify />
            <FaTiktok />
            <FaXTwitter />
            <FaYoutube /> */}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 text-center text-sm text-white/70">
          Privacy Policy / Terms and conditions, ©2025
        </div>
      </div>
    </footer>
  );
}
