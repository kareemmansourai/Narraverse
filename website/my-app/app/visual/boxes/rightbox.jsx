import { Cormorant_Garamond } from "next/font/google";
import BottomBox from "./bottomBox";
import star from "@/public/star.png";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RighttBox() {
  return (
    <div className="flex flex-col gap-10">
      <div className=" rounded-2xl border border-[rgba(180,160,255,0.25)] bg-[#00000080] py-5 px-10 w-fit h-fit">
        <div className="flex items-center gap-6 ">
          <span className="border border-transparent p-1.5 bg-[#6745af] w-7 h-7 rounded-full  flex items-center justify-center">
            2
          </span>
          <p className={`${cormorant.className} text-[25px]`}>
            Generated Visuals
          </p>
        </div>
        <p className="text-white/70 text-sm mb-8 mt-4 max-w-[300px]">
          Your AI-generated visuals will appear here.
        </p>

        <div
          className="relative w-[500px] h-[400px] rounded-2xl flex items-center justify-center mb-10"
          style={{
            border: "1px solid rgba(180, 160, 255, 0.25)",
            background: "rgba(10, 5, 30, 0.8)",
          }}
        ></div>
      </div>
      <BottomBox />

      <div className=" mt-[20px] flex justify-center items-center flex-col">
        <p className="text-xs text-white/50 ">
          Visualize Your Imagination, Instantly
        </p>
        <div className="flex items-center ">
          <div className="w-32 h-[1px] bg-[#FFC120]" />

          <div className="w-[60px] h-[70px] mx-[-10px] pb-6 flex items-center justify-center">
            <Image src={star} alt="star" />
          </div>

          <div className="w-32 h-[1px] bg-[#FFC120]" />
        </div>
      </div>
    </div>
  );
}
