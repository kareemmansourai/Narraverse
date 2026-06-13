"use client";

import RightBox from "./boxes/rightbox";
import LeftBox from "./boxes/leftBox";
import { useSearchParams } from "next/navigation";

export default function YourVisual() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const showLeftBox = from === "services";

  return (
    <div className="relative z-10 flex justify-end gap-8 pb-[100px] pr-16">
      {showLeftBox && <LeftBox num="1" />}
      <RightBox num1={showLeftBox ? "2" : "1"} num2={showLeftBox ? "3" : "2"} />
    </div>
  );
}
