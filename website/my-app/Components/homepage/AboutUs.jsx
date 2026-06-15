import { Krona_One, Roboto } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import lens from "@/public/lens.png";
import Link from "next/link";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const krona = Krona_One({
  subsets: ["latin"],
  weight: "400",
});

export default function AboutUs() {
  return (
    <>
      <div className="flex mt-[300px] pb-[100px] justify-between">
        <div className="flex flex-col pl-[80px] ">
          <div className="mb-[50px] ml-20">
            <p className={`${krona.className} text-[40px]`}>About Us</p>
            <p className={`${roboto.className} text-[#FFC120]`}>
              We are story lovers just like you.
            </p>
          </div>

          <div className={`${roboto.className} ml-[40px] max-w-[600px]`}>
            <p>
              Narraverse is an AI-powered platform that brings fictional worlds
              to life — analyzing your books to map characters, relationships,
              timelines, and events, then using that foundation to generate
              continuity-aware sequels, story expansions, visuals, and audio —
              all true to the original canon.
            </p>
          </div>
          <div>
            <button
              className={`${roboto.className} ml-20 mt-[40px] text-xl cursor-pointer border border-[#FFC120] rounded-full px-5 py-2 flex items-center gap-6 text-white`}
            >
              <Link href="/about">Learn More About Us</Link>
              <FontAwesomeIcon
                icon={faLocationArrow}
                className="rotate-45 w-8 h-8"
              />
            </button>
          </div>
        </div>

        <div className="pr-[80px]">
          <Image src={lens} alt="lens" width={300} />
        </div>
      </div>
    </>
  );
}
