"use client";

import { Store } from "lucide-react";
import Link from "next/link";
import Cart from "./Cart";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-2 px-8">
      <Link href="/" className="flex items-center gap-1 font-bold text-primary">
        <Store />
        <p className="text-xl">Next Dukan</p>
      </Link>

      <Cart />
    </nav>
  );
}
