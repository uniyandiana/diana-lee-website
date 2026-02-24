import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold text-[#5A9AB4] tracking-tight transition-colors group-hover:text-[#3E7C92]">
          Diana
        </span>
        <div className="flex items-center gap-1.5">
          <div className="h-[2px] w-3 bg-[#F6C98D] rounded-full" />
          <span className="text-xl font-light text-[#4A4A4A] tracking-wide">
            Lee
          </span>
        </div>
      </div>
    </Link>
  );
}
