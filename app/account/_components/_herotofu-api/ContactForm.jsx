import getRecaptchaToken from "@/app/api/recaptcha";
import { useEffect, useState } from "react";
// import { Variants, motion } from "framer-motion";

// const sectionVariants = {
//   hide: {
//     opacity: 0,
//   },
//   show: {
//     opacity: 1,
//     transition: {
//       duration: 1,
//       delay: 0.3,
//     },
//   },
// };

const FORM_ENDPOINT =
  "https://public.herotofu.com/v1/d5e1a230-eb71-11ee-96b6-0d5b8cafec4b";

function useContactForm() {
  const [status, setStatus] = useState("");

  const handleFormSubmit = async (e) => {
    // empêche la soumission du form
    e.preventDefault();

    const form = e.currentTarget; // récupère l'élément form actuel à partir de l'event "onSubmit"
    const inputData = {}; // initialise un objet vide pour stocker d'éventuelles données supplémentaires

    const token = await getRecaptchaToken();

    const inputsArray = Array.from(form.elements); // convertit les éléments du formulaire en tableau

    const data = inputsArray
      .filter((input) => input.name) // filtre les éléments sans attribut "name" à envoyer au server
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {} // réduit les élements du form à un objet contenant des valeurs
      );

    Object.assign(data, inputData); // fusionne les données du form avec les données supp

    try {
      // envoie des données à l'endpoint via l'API "fetch"
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "g-recaptcha-response": token,
        },
        body: JSON.stringify(data),
      });

      // vérifie le statut de la réponse
      if (response.status === 422) {
        // gestion du cas où le statut est 422 (validation de captcha)
        Object.keys(inputData).forEach((key) => {
          // parcours l'objet "inputData" pour créer un champ caché dans le formulaire
          const el = document.createElement("input");
          el.type = "hidden";
          el.name = key;
          el.value = inputData[key].toString();

          form.appendChild(el);
        });

        form.setAttribute("target", "_blank"); // définit l'attribut "target" du formulaire pour ouvrir le résultat dans une nouvelle fenêtre/onglet
        form.submit();

        throw new Error("Veuillez terminer le défi du captcha."); // lance une nouvelle erreur indiquant de compléter le captcha
      }

      // gestion du cas où il y a une erreur
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      setStatus("Nous vous contacterons bientôt.");
    } catch (err) {
      setStatus(err.toString()); // enregistre l'erreur dans le status "status"
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { status, handleFormSubmit }; // retourne le status et la soumission du formulaire dans ContactForm
}

function ContactForm() {
  const { status, handleFormSubmit } = useContactForm();

  if (status) {
    return (
      <div className="md:w-96 md:max-w-full w-full mx-auto">
        <div className="sm:rounded-md p-6 border border-gray-300">
          <div className="text-2xl">Merci!</div>
          <div className="text-md">{status}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-auto px-[50px] sm:px-[134px] lg:px-[164px] "
      initial="hide"
      whileInView="show"
      exit="hide"
      //   variants={sectionVariants}
    >
      <form
        method="POST"
        action={FORM_ENDPOINT}
        className="flex flex-col gap-4 items-center mb-20"
        onSubmit={handleFormSubmit}
      >
        <label className="w-1/3">
          <input
            name="Prénom"
            type="text"
            className="w-full h-10 border border-marron pl-4 text-green font-light text-left  text-base lg:text-lg xl:text-xl placeholder:text-green  placeholder:font-thin tracking-wide focus:border-green focus:border-2 focus:outline-none"
            placeholder="Prénom*"
          />
        </label>
        <label className="w-1/3">
          <input
            name="Nom"
            type="text"
            className="w-full h-10 border border-marron pl-4 text-green font-light text-left  text-base lg:text-lg xl:text-xl placeholder:text-green  placeholder:font-thin tracking-wide focus:border-green focus:border-2 focus:outline-none"
            placeholder="Nom*"
          />
        </label>
        <label className="w-1/3">
          <input
            name="Email"
            type="email"
            className="w-full h-10 border border-marron pl-4 text-green font-light text-left  text-base lg:text-lg xl:text-xl placeholder:text-green  placeholder:font-thin tracking-wide focus:border-green focus:border-2 focus:outline-none"
            placeholder="E-mail*"
            required
          />
        </label>
        <label className="w-1/3">
          <input
            name="N° téléphone"
            type="tel"
            className="w-full h-10 border border-marron pl-4 text-green font-light text-left  text-base lg:text-lg xl:text-xl placeholder:text-green  placeholder:font-thin tracking-wide focus:border-green focus:border-2 focus:outline-none"
            placeholder="Numéro de téléphone"
            // required
          />
        </label>
        <label className="w-1/3">
          <textarea
            name="Message"
            className="w-full h-40 border border-marron pl-4 pt-3 text-green font-light text-left  text-base lg:text-lg xl:text-xl placeholder:text-green  placeholder:font-thin tracking-wide focus:border-green focus:border-2 focus:outline-none"
            rows={3}
            placeholder="Message..."
          ></textarea>
        </label>

        {/* Bouton reCAPTCHA */}
        <div>
          <button
            className="g-recaptcha"
            data-sitekey="RECAPTCHA_SITE_KEY"
            data-callback="onSubmit"
            data-action="submit"
            type="submit"
          >
            Envoyer
          </button>
        </div>

        {/* Bouton soumission du form */}
        {/* <div className="w-1/3 flex justify-center sm:block">
          <button
            type="submit"
            className="max-[360px]:w-36 w-44 h-12 lg:w-60 lg:h-16 border border-marron p-1 mt-4"
          >
            <div className="bg-marron w-full h-full flex items-center justify-center uppercase tracking-[3px] lg:tracking-[5px] font-light text-white max-[360px]:text-[12px] text-sm lg:text-base ease-in duration-100 hover:bg-white hover:text-marron hover:duration-100 hover:ease-in">
              Envoyer
            </div>
          </button>
        </div> */}

        {/* Champ caché, pour les humains, permettant de detecter les robots malveillants si celui-ci est remplit. */}
        {/* <div
          style={{
            textIndent: "-99999px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            position: "absolute",
          }}
          aria-hidden="true"
        >
          <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
        </div> */}
      </form>
    </div>
  );
}

export default ContactForm;
