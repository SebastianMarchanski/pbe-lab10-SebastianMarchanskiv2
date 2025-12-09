"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const path = usePathname();

  const activeClass = path.startsWith(href) ? "active" : "";

  return (
    <Link href={href} className={`${className ?? ""} ${activeClass}`}>
      {children}
    </Link>
  );
}
