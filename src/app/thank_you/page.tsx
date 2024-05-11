import ThankYou from "~/components/ThankYou";
import { stripe } from "~/lib/stripe";
import { notFound } from "next/navigation";
import { FC } from "react";

type Props = {
  searchParams: { session_id: string };
};

const page: FC<Props> = async ({ searchParams }) => {
  const token = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
  );

  if (token.status === "open") notFound();

  return (
    <div>
      <ThankYou />
    </div>
  );
};

export default page;
