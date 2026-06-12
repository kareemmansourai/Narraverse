import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import star from "@/public/star.png";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Header() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
        <h1
          className={`${cormorant.className} text-6xl font-bold text-white leading-tight text-center`}
          style={{
            textShadow: `
              0 0 15px rgba(255, 255, 255, 0.6),
              0 0 40px rgba(200, 150, 255, 0.35),
              0 0 80px rgba(180, 100, 255, 0.15)
            `,
          }}
        >
          Your Story <br />
          Isn&apos;t{" "}
          <span
            style={{
              color: "#f0a500",
              textShadow: "0 0 30px rgba(240, 165, 0, 0.8)",
            }}
          >
            Over
          </span>{" "}
          Yet.
        </h1>

        <div className="flex items-center my-6">
          <div className="w-32 h-[1px] bg-[#FFC120]" />

          <div className="w-[120px] h-[118px] mx-[-20px] pb-6 flex items-center justify-center">
            <Image src={star} alt="star" />
          </div>

          <div className="w-32 h-[1px] bg-[#FFC120]" />
        </div>

        <p className="text-white/70 text-lg max-w-md">
          We help storytellers, dreamers, and creators bring their ideas to life
          and share them with the world
        </p>

        <button
          className="mt-8 cursor-pointer px-10 py-3 rounded-full text-white font-semibold text-lg"
          style={{
            background: "linear-gradient(to right, #FF3A93, #FFC120)",
            boxShadow: `
              0 6px 12px rgba(255, 255, 255, 0.3),
              -6px 0 12px rgba(255, 255, 255, 0.15),
              6px 0 12px rgba(255, 255, 255, 0.15),
              0 10px 25px rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          Get Started!
        </button>
      </div>
    </div>
  );
}
