"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";

type Props = {};

export default function SignInButtons({}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google", { redirect: true, callbackUrl: "/" });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong with your sign in.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function signInWithGithub() {
    setIsLoading(true);
    try {
      await signIn("github", { redirect: true, callbackUrl: "/" });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong with your sign in.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex max-w-52 flex-col gap-2">
      <Button onClick={signInWithGoogle} variant="outline" className="gap-4">
        <Image src={`/google_logo.png`} width={30} height={30} alt="" />
        <p>
          <span className="hidden md:inline">Sign in with</span> Google
        </p>
      </Button>
      <Button
        disabled={isLoading}
        onClick={signInWithGithub}
        variant="outline"
        className="gap-4"
      >
        <Image
          src={`/github_logo.png`}
          className="rounded-full"
          width={30}
          height={30}
          alt=""
        />
        <p>
          <span className="hidden md:inline">Sign in with</span> Github
        </p>{" "}
      </Button>
    </div>
  );
}
