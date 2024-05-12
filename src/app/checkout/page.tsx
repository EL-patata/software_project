import { getServerAuthSession } from "~/server/auth";
import Checkout from "./_component/Checkout";
import { notFound } from "next/navigation";

export default async function page() {
  const session = await getServerAuthSession();

  if (!session) return notFound();

  return (
    <div>
      <Checkout />
    </div>
  );
}
