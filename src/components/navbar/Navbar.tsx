import { Store } from "lucide-react";
import Link from "next/link";
import Cart from "./Cart";
import AuthButtons from "./AuthButtons";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Navbar() {
  const session = await getServerAuthSession();

  const currentUser = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user.id as any));

  return (
    <nav className="sticky top-0 z-50 flex w-full items-center gap-2 border-b bg-background px-8 py-3">
      <Link href="/" className="flex items-center gap-1 font-bold text-primary">
        <Store />
        <p className="text-xl">Next Dukan</p>
      </Link>
      <div className="ml-auto flex items-center gap-3">
        <AuthButtons role={currentUser[0]?.role!} />
        <Cart />
      </div>
    </nav>
  );
}
