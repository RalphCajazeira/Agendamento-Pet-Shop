import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours";
import { API_URL } from "../../config/api";

const scheduleDate = document.getElementById("schedule-date");
const schedulesTime = document.getElementById("schedule-time");

export async function hoursLoad({ date }) {

  // Busca todos os agendamentos da data selecionada
  let existingSchedules = [];
  try {
    const response = await fetch(`${API_URL}/schedules`);
    const allSchedules = await response.json();

    existingSchedules = allSchedules
      .filter((schedule) => schedule.scheduleDate === date)
      .map((schedule) => schedule.scheduleTime); // ex: ["10:00", "14:30"]
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err);
  }

  // Limpa o select
  schedulesTime.innerHTML = `<option disabled selected value="">Selecione</option>`;

  // Gera as opções válidas com base nas horas de funcionamento e nos agendamentos
  openingHours.forEach((hour) => {
    const [hourPart] = hour.split(":");

    const isFuture =
      dayjs(`${date}T${hour}`).isAfter(dayjs()) || dayjs(date).isAfter(dayjs().format("YYYY-MM-DD"));

    const isAlreadyTaken = existingSchedules.includes(hour);

    const option = document.createElement("option");
    option.value = hour;
    option.textContent = hour;

    if (!isFuture || isAlreadyTaken) {
      option.disabled = true;
    }

    schedulesTime.appendChild(option);
  });
}

// Recarrega ao mudar a data
scheduleDate.addEventListener("change", (event) => {
  schedulesTime.textContent = "";
  const date = event.target.value;
  hoursLoad({ date });
});
