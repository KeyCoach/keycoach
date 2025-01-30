import Link from "next/link";
import { H1 } from "@/components";
import { Button } from "@/components/button";
import Image from "next/image";


export default function Home() {
  return (
    <div className="-m-3 w-screen h-screen bg-gradient-to-b from-cerulean-400 to-obsidian-200 border-none">
      {/*<div className="absolute top-52 left-32">
        <div className="w-40 h-40 bg-yellow-400 rounded-full shadow-[0_0_70px_#fbbf24]"></div>
      </div>/*}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center pt-52">
        <div className="w-full max-w-3xl">
        <H1 className="text-5xl font-bold text-white mb-20 relative">
          <span className="inline-block">Learn to Type with KeyCoach!</span>
          <span kc-id="cursor" className="inline-block center blink">|</span>
        </H1>
          
          <div className="space-y-8">
            <div className="flex justify-center space-x-8">
              <Button colorTheme="cerulean">
                <Link className="w-40 block text-white no-underline" href="/lesson">Try a Lesson!</Link>
              </Button>

              <Button colorTheme="cerulean">
                <Link className="w-40 block text-white no-underline" href="/typing/test">Test my Speed!</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Clouds */}
      <div className="absolute bottom-0 left-0 w-full min-h-[100px]"> {/* Added min-height and removed fixed */}
        <Image
          src={`https://typing-background-images.s3.us-east-1.amazonaws.com/home/cloud-flat.jpg`}
          alt="Cloud 1"
          width={600}
          height={100}
          className="absolute bottom-[-60%] left-[-5%]"
        />
        <Image
          src={`https://typing-background-images.s3.us-east-1.amazonaws.com/home/cloud-flat.jpg`}
          alt="Cloud 2"
          width={550}
          height={90}
          className="absolute bottom-[-60%] left-[26%]"
        />
          <Image
          src={`https://typing-background-images.s3.us-east-1.amazonaws.com/home/cloud-flat.jpg`}
          alt="Cloud 3"
          width={600}
          height={100}
          className="absolute bottom-[-60%] left-[60%]"
        />
      </div>
    </div>
  );
}