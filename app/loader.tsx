import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 text-center">
      <Image
        src="/loader.svg"
        alt="loading"
        height={70}
        width={70}
        className="w-12 h-12 sm:w-[70px] sm:h-[70px] dark:invert"
      />
      {/* dark:invert => for svg color change which is initially black */}

      <span className="text-black dark:text-white font-black tracking-wide
        text-3xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
      ">
        LOADING
      </span>
    </div>
  );
}
