"use client";

import { cn } from "~/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, FC } from "react";

type Props = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const NavLink: FC<Props> = ({ className, children, href, ...props }) => {
  const pathname = usePathname();

  const currentPath = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex h-12 w-12 items-center justify-center gap-1.5 rounded px-2  font-semibold transition-colors",
        className,
        currentPath
          ? "bg-gradient-to-tr  from-primary/40 to-primary/50  text-primary "
          : "bg-transparent hover:bg-accent",
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
