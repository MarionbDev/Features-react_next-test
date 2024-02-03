"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth.services";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";

export default function AccountUser() {
  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/email/", {
        //la route est ok puisque resend m'envoie un mail.
        // Alors, pourquoi "error 500 POST" et "error 500 HTTP"
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, message }),
      });

      console.log("Received response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.message) {
        alert(`Thank you for your interest ${firstname}! ${data.message}`);
        setFirstname("");
        setMessage("");
      } else {
        alert("Apologies! Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Ooops! Unfortunately, some error has occurred.`);
    }
  };

  return (
    <div className="mx-10 ">
      <div className="flex justify-between mt-10 gap-20">
        <p>ACCOUNT</p>
        <Button onClick={handleLogout} role="button" className="w-20">
          Logout
        </Button>
      </div>
      <div>
        <div className="">
          <div className="">Contact Me</div>
          <form className=" flex flex-col gap-4" onSubmit={handleSubmitForm}>
            <label htmlFor="firstname" className="sr-only">
              Name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              autoComplete="firstname"
              required
              value={firstname}
              className="rounded-md px-3.5 py-2.5 ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
              placeholder="First name"
              onChange={(e) => setFirstname(e.target.value)}
            />
            {/* <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              // value={email}
              className="rounded-md bg-white/5 px-3.5 py-2.5 text-white ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <label htmlFor="name" className="sr-only">
              Message
            </label>
            <input
              id="message"
              name="message"
              type="text"
              autoComplete="message"
              required
              value={message}
              className="rounded-md px-3.5 py-2.5 ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" className=" flex  w-20">
              Envoyer
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
