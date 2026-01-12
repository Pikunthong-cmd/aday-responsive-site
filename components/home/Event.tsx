import Image from "next/image";

export default function Event() {
  return (
    <section className="w-full">
      <div className="xl:p-40 px-6">
        <div className="w-full justify-center flex mb-10">
          <svg
            width="205"
            height="47"
            viewBox="0 0 205 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.402 9.13517V18.6035H26.6714V27.4051H11.402V37.6736H28.6718V46.8086H-1.91826e-05V0.000196123H28.6718V9.13517H11.402ZM49.5432 0.000196123L54.9442 35.3399L72.7474 0.000196123H84.8829L60.0118 46.8086H45.7425L37.4077 0.000196123H49.5432ZM96.1828 9.13517V18.6035H111.452V27.4051H96.1828V37.6736H113.453V46.8086H84.7808V0.000196123H113.453V9.13517H96.1828ZM162.729 46.8086H151.327L132.257 17.9367V46.8086H120.855V0.000196123H132.257L151.327 29.0054V0.000196123H162.729V46.8086ZM204.667 0.000196123V9.13517H192.265V46.8086H180.863V9.13517H168.46V0.000196123H204.667Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              image: "/images/event-1.png",
              place: "Agenda",
              title: "Design Perspectives x Golden Pin Salon Bangkok 2025",
              subject: "a team",
            },
            {
              image: "/images/event-2.png",
              place: "Agenda",
              title:
                "BITEC BURI เปิดตัวโครงการน้องใหม่ “SAMA Garden” พื้นที่สีเขียวฮีลใจคนเมือง Green Lifestyle Centre ครบจบ",
              subject: "a day",
            },
            {
              image: "/images/event-3.png",
              place: "Founder",
              title:
                "‘House of Mask & Mime’ กลุ่มละครที่ไม่ได้มีแค่หน้ากากและละครใบ้ แต่คือโชว์อะไรก็ได้ที่ไม่พูด!",
              subject: "สมรภูมิ จันทร์นาคา",
            },
          ].map((item, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* hover overlay (เบา ๆ) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Text under image */}
              <div className="mt-4 space-y-2 transition-all duration-300 group-hover:translate-y-[-2px]">
                {/* Place */}
                <p className="text-xs tracking-widest ">{item.place}</p>

                {/* Title */}
                <p className="text-base font-bold leading-snug text-black line-clamp-2">
                  {item.title}
                </p>

                {/* Subject */}
                <p className="text-xs tracking-widest text-gray-500">
                  เรื่อง {item.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
