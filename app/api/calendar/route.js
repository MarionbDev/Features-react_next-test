import supabase from "@/lib/database";

export const getCalendar = async () => {
  try {
    const { data, error } = await supabase.from("calendar").select("*");
    if (error) throw error;
    console.log("Fetched calendar :", data);

    return data;
  } catch (error) {
    throw error;
  }
};

export const addCalendar = async ({ start_date, end_date }) => {
  try {
    const { data, error } = await supabase
      .from("calendar")
      .insert([{ start_date: start_date, end_date: end_date }])
      .select();
    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};
