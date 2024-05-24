"use client";

import { addCalendar, getCalendar } from "@/app/api/calendar/route";
import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/utils/utils"; // Assurez-vous que 'cn' est correctement importé
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import * as React from "react";

export function DatePickerWithRange() {
  const [selectedDates, setSelectedDates] = React.useState({
    from: null,
    to: null,
  });
  const [reservedDates, setReservedDates] = React.useState([]);

  console.log("selectedDates:", selectedDates);
  console.log("reservedDates:", reservedDates);

  // Récupérer les dates aux chargements depuis Supabase
  const fetchCalendar = async () => {
    try {
      const fetchedCalendar = await getCalendar();
      setReservedDates(fetchedCalendar);
    } catch (error) {
      console.error("Error fetching calendar", error);
    }
  };

  // Envoyer les dates pré sélectionnées à Supabase
  const handleSubmit = async () => {
    try {
      // Soumettre les dates sélectionnées à la base de données
      await addCalendar({
        start_date: selectedDates.from,
        end_date: selectedDates.to,
      });
      // Rafraîchir les données après la soumission réussie
      await fetchCalendar();
      // Réinitialiser les dates sélectionnées après la soumission
      setSelectedDates({ from: null, to: null });
    } catch (error) {
      console.error("Error submitting dates:", error.message);
    }
  };

  React.useEffect(() => {
    fetchCalendar();
  }, []);

  return (
    <div className=" ">
      <Calendar
        initialFocus
        mode="range"
        selected={selectedDates}
        onSelect={setSelectedDates}
        numberOfMonths={2}
        locale={fr}
      />

      <div>
        <p>Réservation : Saisir une date de début et une date de fin :</p>
        {selectedDates.from && selectedDates.to ? (
          <p>
            Du {format(selectedDates.from, "dd MMMM yyyy", { locale: fr })} au{" "}
            {format(selectedDates.to, "dd MMMM yyyy", { locale: fr })}
          </p>
        ) : (
          <p>
            {selectedDates.from
              ? `Sélectionné : ${format(selectedDates.from, "dd MMMM yyyy", {
                  locale: fr,
                })}`
              : "Pas de date sélectionnée"}
          </p>
        )}
      </div>

      <div>
        <button onClick={handleSubmit} className=" bg-slate-300">
          Submit
        </button>
      </div>
      <div>
        <p>Récap des dates réservées : </p>
        {reservedDates.map((date) => (
          <li key={date.id}>
            <p>
              {format(date.start_date, "dd MMMM yyyy", { locale: fr })} et{" "}
              {format(date.end_date, "dd MMMM yyyy", { locale: fr })}{" "}
            </p>
          </li>
        ))}
      </div>
    </div>
  );
}
