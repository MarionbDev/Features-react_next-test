import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function ContactForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, message, email }),
      });

      console.log("Received response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data client", data);

      if (data && data.message) {
        alert(`Thank you for your interest ! ${data.message}`);
        setFirstname("");
        setLastname("");
        setMessage("");
        setEmail("");
      } else {
        alert("Apologies! Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Ooops! Unfortunately, some error has occurred.`);
    }
  };
  return (
    <>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmitForm}>
        <label htmlFor="firstname" className="sr-only">
          Prénom
        </label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          autoComplete="firstname"
          required
          value={firstname}
          className="rounded-md px-3.5 py-2.5 ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
          placeholder="Prénom"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label htmlFor="lastname" className="sr-only">
          Nom
        </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          autoComplete="Nom"
          required
          value={lastname}
          className="rounded-md px-3.5 py-2.5 ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
          placeholder="Nom"
          onChange={(e) => setLastname(e.target.value)}
        />
        <label htmlFor="email-address" className="sr-only">
          Adresse email
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          className="rounded-md  px-3.5 py-2.5 ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
          placeholder="Votre message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className=" flex  w-20">
          Envoyer
        </Button>
      </form>
    </>
  );
}
