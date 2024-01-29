"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/signup");
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Button onClick={handleButtonClick} role="button" className="w-40 h-20">
        Sign Up
      </Button>
    </div>
  );
}
