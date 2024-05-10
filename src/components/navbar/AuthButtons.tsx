"use client";
import { KanbanSquare, LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import SignInButtons from "../auth/SignInButtons";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

export default function AuthButtons() {
  const { data } = useSession();

  if (data?.user)
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"}>
              {data.user.name}
              <Image
                className="rounded-full"
                src={data.user.image!}
                alt={`${data.user.name} profile pic`}
                width={30}
                height={30}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="hover:bg-background focus:bg-background">
              <Button
                variant={"outline"}
                onClick={() => signOut().then(() => redirect("/"))}
              >
                Log out <LogOut />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-background focus:bg-background">
              <Link href={`/cms`} className={buttonVariants()}>
                Studio <KanbanSquare />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"}>
          Log in <LogIn />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="hover:bg-background focus:bg-background">
          <SignInButtons />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
