import { buttonVariants } from "~/components/ui/button";
import { Store } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3">
        <Store className="h-16 w-16 text-primary" />
        <h1 className="text-3xl font-bold ">
          <span className="text-primary">404</span> Not found.
        </h1>
        <Link href={`/`} className={buttonVariants()}>
          Go back to home page &rarr;
        </Link>
      </div>
    </div>
  );
};

export default page;
