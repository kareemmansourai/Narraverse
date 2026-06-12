import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function BottomBox() {
  return (
    <div className="rounded-2xl border border-[rgba(180,160,255,0.25)] bg-[#00000080] py-5 px-10 w-full h-fit">
      <div className="flex items-center gap-6">
        <span className="border border-transparent p-1.5 bg-[#6745af] w-7 h-7 rounded-full flex items-center justify-center">
          3
        </span>
        <p className={`${cormorant.className} text-[25px]`}>More Variations</p>
      </div>

      <p className="text-white/70 text-sm mb-8 mt-4 max-w-[300px]">
        More variations based on your prompt
      </p>

      <div className="flex items-center gap-4">
        {/* 4 Image Boxes */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-[100px] h-[100px] rounded-2xl flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(180,160,255,0.2)",
            }}
          />
        ))}

        <div className="ml-auto flex-shrink-0">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background:
                "radial-gradient(circle, #1a1a2e 0%, #0d0d1a 60%, #000 100%)",
              boxShadow:
                "0 0 10px rgba(180,160,255,0.9), 0 0 25px rgba(180,160,255,0.6), 0 0 50px rgba(180,160,255,0.3), inset 0 0 10px rgba(255,255,255,0.1)",
              border: "1px solid rgba(180,160,255,0.6)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5l8 7-8 7V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
