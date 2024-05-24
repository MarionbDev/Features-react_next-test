"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.services";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next-nprogress-bar";

import UseContactForm from "./_components/_herotofu-api/ContactForm";
import ContactForm from "./_components/_resend-email/ContactForm";

// const DynamicMap = dynamic(() => import("../account/_components/Map"), {
//   ssr: false,
// });

export default function AccountUser() {
  const router = useRouter();

  const handleButtonClickMap = async () => {
    router.push("/account/map");
  };

  const handleButtonClickTextEditor = async () => {
    router.push("/account/text-editor");
  };

  const handleButtonClickTDatePicker = async () => {
    router.push("/account/date-picker");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="mx-10 gap-10">
      <div className="flex justify-between mt-10 gap-20">
        <p>ACCOUNT</p>
        <Button onClick={handleLogout} role="button" className="w-20">
          Logout
        </Button>
      </div>{" "}
      <div className="flex mt-20 gap-20">
        <div>
          <div className="">
            <p className=" text-red-600  font-bold">Test RESEND EMAIL</p>
            <div className="">Contactez-moi</div>
            <ContactForm />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className=" text-red-600  font-bold text-center">
            Test HEROTOFU API
          </p>
          <UseContactForm />
        </div>
      </div>
      <div className=" flex gap-10">
        <Button onClick={handleButtonClickMap} role="button">
          Map
        </Button>
        <Button onClick={handleButtonClickTextEditor} role="button">
          Text Editor
        </Button>
        <Button onClick={handleButtonClickTDatePicker} role="button">
          Calendrier
        </Button>
        {/* <DynamicMap /> */}
      </div>
    </div>
  );
}
