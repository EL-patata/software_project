import { eq } from "drizzle-orm";
import { Plus, SquareKanban } from "lucide-react";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";
import NavLink from "~/components/Navlink";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export default async function layout({ children }: PropsWithChildren) {
  const session = await getServerAuthSession();

  const currentUser = await db
    .select()
    .from(users)
    .where(eq(users.id, session?.user.id as any));

  if (currentUser[0]?.role !== "ADMIN") return notFound();

  return (
    <main className="flex flex-row gap-1">
      <div className="sticky top-16 h-fit w-1/4">
        <NavLink href={`/cms`} className="w-full justify-start">
          <SquareKanban className="h-8 w-8 text-base" />
          <p>Home</p>
        </NavLink>
        <NavLink href={`/cms/create`} className="w-full justify-start">
          <Plus className="h-8 w-8 text-base" />
          Create product
        </NavLink>
      </div>
      <section className="p-4">{children}</section>
    </main>
  );
}
