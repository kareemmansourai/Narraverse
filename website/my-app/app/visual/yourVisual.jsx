import RightBox from "./boxes/rightbox";
import LeftBox from "./boxes/leftBox";

export default function YourVisual() {
  return (
    <div className="relative z-10 flex justify-end gap-8 pb-[100px] pr-16">
      <LeftBox />
      <RightBox />
    </div>
  );
}
