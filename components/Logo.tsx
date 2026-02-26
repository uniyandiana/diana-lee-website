import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="group relative block">
      <Image
        src="/images/Diana Lee Logo 1.png"
        alt="Diana Lee"
        width={150}
        height={45}
        priority
        className="h-10 sm:h-12 w-auto transition-opacity group-hover:opacity-80"
      />
    </Link>
  );
}
