"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importez les styles de l'éditeur

function MyEditor() {
  const [text, setText] = useState("");

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div className=" flex flex-col items-center gap-10">
      <p>Editeur de texte</p>
      <ReactQuill
        value={text}
        onChange={handleChange}
        placeholder="Écrivez quelque chose..."
        className=" w-[50rem] h-[30rem] "
      />{" "}
    </div>
  );
}

export default MyEditor;
