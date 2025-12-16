import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-screen flex gap-4 justify-center items-center">
      <Image src="/loader.svg" alt="loading" height={70} width={70} />{" "}
      <span className="text-black text-7xl font-black">LOADING</span>
    </div>
  );
}
