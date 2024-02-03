"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/signup");
  };

  const handleButtonClickLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen gap-20">
      <Button onClick={handleButtonClick} role="button" className="w-40 h-20">
        Sign Up
      </Button>
      <Button
        onClick={handleButtonClickLogin}
        role="button"
        className="w-40 h-20"
      >
        Login
      </Button>
    </div>
  );
}
