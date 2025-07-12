import dayjs, { Dayjs } from "dayjs";
import { openingHours } from "../../utils/opening-hours";

const scheduleDate = document.getElementById("schedule-date");
const schedulesTime = document.getElementById("schedule-time");

const currentDate = dayjs(new Date());

export function hoursLoad({ date }) {
  console.log("Load de horas do dia...");

  // Buscar adengamentos na API para mudar a disponibilidade
  const opening = openingHours.map((hour) => {
    const [hoursDays] = hour.split(":");

    // Adicionar a hora na date e verificar se está no passado
    const isHourPast = dayjs(date).add(hoursDays, "hour").isAfter(dayjs());

    return {
      hour,
      available: isHourPast,
    };
  });

  // Renderizar os horários

  schedulesTime.innerHTML = `<option disabled selected value="">Selecione</option>`;

  opening.forEach(({ hour, available }) => {
    const option = document.createElement("option");
    option.innerHTML = hour;
    option.value = hour;
    if (available) {
      schedulesTime.appendChild(option);
    } else {
      schedulesTime.appendChild(option);
      option.disabled = true;
    }
  });
}

scheduleDate.addEventListener("change", (event) => {
  schedulesTime.textContent = "";
  const date = event.target.value;
  hoursLoad({ date });
});
