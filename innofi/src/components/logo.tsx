import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  onlyIcon?: boolean;
  className?: string;
}

export function Logo({ onlyIcon = false, className }: LogoProps) {
  return (
    <Link href={"/"} className={cn("flex items-center gap-2", className)}>
      {!onlyIcon && <span className="font-mono text-xl font-bold">{siteConfig.name}</span>}
    </Link>
  );
}
