// Importando o Day.js para manipular datas
import dayjs from "dayjs";

//  Pegar input data
const currentData = document.getElementById("current-date");

const form = document.querySelector(".modal-form");
const modal = document.getElementById("modal");
const newSchedule = document.querySelector("#btn-new-schedule");

newSchedule.addEventListener("click", (event) => {
  document.querySelector("#modal").classList.add("active");
  document.body.classList.add("no-scroll");
});

modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    event.currentTarget.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }
});

// Enviar formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameTutor = document.getElementById("name-tutor").value;
  const namePet = document.getElementById("name-pet").value;

  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

// Ativar o modal no carregamento para desenvolvimento
document.addEventListener("DOMContentLoaded", function () {
  const dataAtual = dayjs().format("YYYY-MM-DD");

  currentData.value = dataAtual;

  if (modal) {
    modal.classList.add("active");
  }
  document.body.classList.add("no-scroll");
});
