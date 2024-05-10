"use client";

import { Store } from "lucide-react";
import Link from "next/link";
import Cart from "./Cart";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex w-full items-center gap-2 border-b bg-background px-8 py-3">
      <Link href="/" className="flex items-center gap-1 font-bold text-primary">
        <Store />
        <p className="text-xl">Next Dukan</p>
      </Link>
      <div className="ml-auto flex items-center gap-3">
        <AuthButtons />
        <Cart />
      </div>
    </nav>
  );
}
