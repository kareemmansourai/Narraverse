"use client";

import { Cormorant_Garamond } from "next/font/google";
import { useState } from "react";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LeftBox() {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col items-center">
      <div className=" rounded-2xl border border-[rgba(180,160,255,0.25)] bg-[#00000080] py-5 px-10  w-fit h-fit">
        <div className="flex items-center gap-6 justify-center">
          <span className="border border-transparent p-1.5 bg-[#6745af] w-7 h-7 rounded-full  flex items-center justify-center">
            1
          </span>
          <p className={`${cormorant.className} text-[25px]`}>
            Your Original Story
          </p>
        </div>

        <div className="mt-[30px]">
          <p className="text-white/70 mb-5">Upload your story </p>
          <label className="flex gap-3 items-center justify-center w-full py-3 cursor-pointer rounded-xl border-2 border-dashed border-[rgba(180,160,255,0.4)]">
            <input type="file" className="hidden" accept=".txt,.pdf,.docx" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"
              />
            </svg>
            <span className="text-white font-semibold">Upload file</span>
          </label>
          <p className="flex justify-center mt-3 text-sm text-white/70">
            Supports: .txt, .pdf, .docx
          </p>

          <div className="flex items-center gap-4 my-4">
            <hr className="flex-1 border-white/70" />
            <span className="text-white/70 text-sm whitespace-nowrap">
              or paste your story
            </span>
            <hr className="flex-1 border-white/70" />
          </div>
        </div>

        <div>
          <div className="relative">
            <textarea
              maxLength={5000}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your story here.."
              className="w-full h-50 bg-black/50 border border-[rgba(180,160,255,0.25)] rounded-xl p-3 text-white placeholder:text-white/70 resize-none outline-none"
            />
          </div>
          <span className=" text-white/70 text-xs">
            {text.length}/5000 Words
          </span>
        </div>
      </div>

      <div className="flex justify-center my-[30px]">
        <button
          className="px-[50px] py-2 rounded-full text-white cursor-pointer"
          style={{
            background:
              "linear-gradient(to right, rgba(93, 56, 167, 0), rgba(102, 102, 102, 0.45))",
            border: "1px solid rgba(180, 160, 255, 0.5)",
            boxShadow:
              "0 0 15px rgba(180, 160, 255, 0.4), 0 0 30px rgba(180, 160, 255, 0.2)",
          }}
        >
          Generate Visuals
        </button>
      </div>

      <div
        className="relative px-8 py-6 rounded-2xl w-[350px]"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='2' stroke-dasharray='6 4' rx='16'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <FontAwesomeIcon
            icon={faLightbulb}
            className="text-white"
            width={20}
          />
          <p className={`${cormorant.className} text-white text-xl`}>AI Tips</p>
        </div>

        <p className="text-white/60 text-sm leading-relaxed">
          The more details you provide, the better and more unique your sequel
          will be!
        </p>
      </div>
    </div>
  );
}
