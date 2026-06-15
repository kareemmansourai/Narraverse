import Image from "next/image";
import audiobook from "@/public/audiobook.jpeg";
import Title from "./title";
import YourAudio from "./yourAudio";

export default function AudioBook() {
  return (
    <div className="relative min-h-screen">
      <div>
        <Image
          src={audiobook}
          alt="audiobook"
          fill
          priority
          className="object-cover"
        />
      </div>
      <Title />
      <YourAudio />
    </div>
  );
}
