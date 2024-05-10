import { PropsWithChildren } from "react";
import { ListOrdered, Plus, SquareKanban } from "lucide-react";
import NavLink from "~/components/Navlink";

export default function layout({ children }: PropsWithChildren) {
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
        <NavLink href={`/cms/orders`} className="w-full justify-start">
          <ListOrdered className="h-8 w-8 text-base" />
          Orders
        </NavLink>
      </div>
      <section className="p-4">{children}</section>
    </main>
  );
}
