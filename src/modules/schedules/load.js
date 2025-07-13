import { API_URL } from "../../config/api";
import { createScheduleItem } from "../form/submit";

export function schedulesDay() {
  const currentDateInput = document.getElementById("current-date");

  // Função que carrega os dados filtrados com base na data atual
  function fetchAndFilterSchedules() {
    const currentDate = currentDateInput.value;

    if (!currentDate) return; // evita erros se estiver vazio

    fetch(`${API_URL}/schedules`)
      .then((response) => response.json())
      .then((schedules) => {
        const filtered = schedules.filter((schedule) => {
          return schedule.scheduleDate === currentDate;
        });

        // limpa todos os itens anteriores antes de renderizar os novos
        const periodMorning = document.getElementById("period-morning");
        const periodAfternoon = document.getElementById("period-afternoon");
        const periodNight = document.getElementById("period-night");

        periodMorning.innerHTML = "";
        periodAfternoon.innerHTML = "";
        periodNight.innerHTML = "";

        // agora sim pode iterar e preencher
        filtered.forEach((schedule) => {
          const { id, namePet, nameTutor, descService, scheduleTime } =
            schedule;
          const dayHours = Number(scheduleTime.split(":")[0]);

          const item = createScheduleItem({
            id, // <-- ESSENCIAL!
            namePet,
            nameTutor,
            descService,
            scheduleTime,
          });

          if (dayHours <= 12) {
            periodMorning.appendChild(item);
          } else if (dayHours < 18) {
            periodAfternoon.appendChild(item);
          } else {
            periodNight.appendChild(item);
          }
        });

        // Aqui você pode renderizar os agendamentos filtrados na interface
      })
      .catch((error) => {
        console.error("Erro ao buscar agendamentos:", error);
      });
  }

  // Executa assim que a função é chamada (ex: ao carregar a página)
  fetchAndFilterSchedules();

  // Executa sempre que o campo de data for alterado
  currentDateInput.addEventListener("change", fetchAndFilterSchedules);
}
