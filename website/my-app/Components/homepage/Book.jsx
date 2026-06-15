import { Krona_One } from "next/font/google";
import book from "@/public/book.png";
import stars from "@/public/stars.png";
import mic from "@/public/mic.png";
import war from "@/public/war.jpeg";
import Image from "next/image";

const krona = Krona_One({
  subsets: ["latin"],
  weight: "400",
});

const sfPro = "font-sfpro";

const cards = [
  {
    image: book,
    title: "Make Your Book",
    description: "Continue the story that left everyone wanting more.",
  },
  {
    image: war,
    title: "Image Generation",
    description: "Cinematic visuals that brings your favorite story to life",
  },
  {
    image: mic,
    title: "Voice Your Story",
    description: "Turn your words into lifelike audio.",
  },
];

export default function Book() {
  return (
    <div className="text-center pb-[100px]">
      <p
        className={`${krona.className} text-4xl`}
        style={{
          textShadow: `
              0 0 15px rgba(255, 255, 255, 0.6),
              0 0 40px rgba(200, 150, 255, 0.35),
              0 0 80px rgba(180, 100, 255, 0.15)
            `,
        }}
      >
        Your Story. Our <span className="text-[#FFC120]">Superpowers</span>.
      </p>

      <p
        className={`${sfPro} text-lg mt-2`}
        style={{
          background:
            "linear-gradient(to right, #D59BFF, rgba(255, 193, 32, 0.69))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Here&apos;s What We Do
      </p>
      <div className="flex justify-around mt-10">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-col w-[320px]">
            {/* Image Box */}
            <div className="aspect-square rounded-[16px] border-4 border-[#D9D9D9] bg-white/15 mb-4 relative p-5">
              <div className="relative w-full h-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            <p
              className={`${krona.className} mb-[6px] text-[1.1rem] font-bold text-white`}
            >
              {card.title}
            </p>
            <p className=" text-[0.85rem] text-white/60">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mx-auto px-10 py-8 mt-[70px] max-w-[800px] rounded-[20px] border-[4px] border-[#D9D9D9]/50 bg-white/20 relative">
        <div className="flex items-start gap-2">
          <p
            className={`${krona.className} text-white text-xl font-bold leading-tight`}
          >
            Every great story begins <br /> with a single step.
          </p>

          {/* STAR ONLY POSITIONED */}
          <Image
            src={stars}
            alt="stars"
            className="w-8 h-8 absolute bottom-2 left-[325px] bottom-[25px]"
          />
        </div>

        <button
          className="cursor-pointer px-10 py-3 rounded-full text-white font-semibold text-lg whitespace-nowrap
    bg-gradient-to-r from-[rgba(255,58,147,0.75)] to-[rgba(255,193,32,0.75)]
    shadow-[0_6px_12px_rgba(255,255,255,0.3),-6px_0_12px_rgba(255,255,255,0.15),6px_0_12px_rgba(255,255,255,0.15),0_10px_25px_rgba(255,255,255,0.1)]"
        >
          Start Your Journey!
        </button>
      </div>
    </div>
  );
}
