"use client";

import { addArticle, getArticle } from "@/app/api/article/route";
import { useEffect, useState } from "react";
import AddArticle from "./AddArticle";
import ListArticle from "./ListArticle";

export default function PageArticle() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const fetchedArticles = await getArticle();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles", error);
    }
  };

  const handleAddArticle = async (newArticle) => {
    try {
      await addArticle(newArticle); // Ajouter l'article
      fetchArticles(); // Mettre à jour la liste des articles
    } catch (error) {
      console.error("Error adding article", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className=" flex gap-10">
      <AddArticle onAddArticle={handleAddArticle} />
      <div className="">
        <ListArticle articles={articles} />
      </div>
    </div>
  );
}
