import dayjs, { Dayjs } from "dayjs";
import { schedulesDay } from "./schedules/load";
import { hoursLoad } from "./form/hours-load";
const selectedDate = document.getElementById("current-date");
const scheduleDate = document.getElementById("schedule-date");

const currentDate = dayjs(new Date());

document.addEventListener("DOMContentLoaded", () => {
  selectedDate.value = currentDate.format("YYYY-MM-DD");

  scheduleDate.value = currentDate.format("YYYY-MM-DD");
  scheduleDate.min = currentDate.format("YYYY-MM-DD");

  // Chamar função para buscar agendamentos e carregar na tela
  schedulesDay();

  const date = selectedDate.value;
  const scheduleDaily = schedulesDay();

  hoursLoad({ date, scheduleDaily });
});
