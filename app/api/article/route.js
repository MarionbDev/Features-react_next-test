import supabase from "@/lib/database";

export const getArticle = async () => {
  try {
    const { data: articles, error } = await supabase
      .from("article")
      .select("*");

    if (error) throw error;
    console.log("Fetched articles:", articles);

    return articles;
  } catch (error) {
    throw error;
  }
};

export const addArticle = async ({ title, photos, description, price }) => {
  try {
    const { data, error } = await supabase
      .from("article")
      .insert([
        {
          title: title,
          description: description,
          photos: photos,
          price: price,
        },
      ])
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};
