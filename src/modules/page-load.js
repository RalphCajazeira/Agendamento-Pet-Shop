// load.js
import dayjs from "dayjs";
import { schedulesDay } from "./schedules/load";

const currentDate = document.getElementById("current-date");

document.addEventListener("DOMContentLoaded", () => {
  if (currentDate) {
    const dataAtual = dayjs().format("YYYY-MM-DD");
    currentDate.value = dataAtual;
  }
  schedulesDay();
});
