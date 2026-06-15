import Image from "next/image";
import logo from "@/public/logo.png";
import { Outfit } from "next/font/google";
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Footer() {
  return (
    <>
      <div className="bg-black flex justify-between ">
        <div className="flex flex-col justify-between py-8 pl-[30px]">
          <div className="flex  items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              width={65}
              height={63}
              className="rotate-[0.5deg]"
            />
            <p className={`${outfit.className} text-[20px]`}>NARRAVERSE</p>
          </div>
          <p className="pl-[40px] text-white/50">
            © 2026 Narraverse. All Rights Reserved.
          </p>
        </div>

        <div
          className={`${outfit.className} flex gap-[70px]  py-12 px-[100px]`}
        >
          <div className="flex flex-col gap-8">
            <p>Services</p>
            <p className="text-white/50">Sequel Generation</p>
            <p className="text-white/50">Image Generation</p>
          </div>

          <div className="flex flex-col gap-8">
            <p>Resources</p>
            <p className="text-white/50">FAQs</p>
            <p className="text-white/50">Help Center</p>
          </div>

          <div className="flex flex-col gap-8">
            <p>Company</p>
            <p className="text-white/50">Contact Us</p>
            <p className="text-white/50">About Us</p>
          </div>
        </div>
      </div>
    </>
  );
}
