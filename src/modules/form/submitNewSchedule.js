// Importando o Day.js para manipular datas
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

// Importa a função que carrega os horários da empresa
import { carregarHorariosDisponiveis } from "../config/opening-hours.js";

// Pegar elementos
const currentDate = document.getElementById("current-date");
const form = document.querySelector(".modal-form");
const modal = document.getElementById("modal");
const newSchedule = document.querySelector("#btn-new-schedule");
const scheduleDate = document.getElementById("schedule-date");
const scheduleTime = document.getElementById("schedule-time");

// Define a data atual
const currentDateDay = dayjs();

// ✅ Verifica se o usuário está em um dispositivo móvel
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

// ✅ Abre o modal e define os valores iniciais
newSchedule.addEventListener("click", () => {
  modal.classList.add("active");
  document.body.classList.add("no-scroll");

  // Definir a data do agendamento
  const dataInput = dayjs(currentDate.value, "YYYY-MM-DD").startOf("day");
  const dataAtual = dayjs().startOf("day");

  if (dataInput.isSameOrAfter(dataAtual)) {
    scheduleDate.value = currentDate.value;
  } else {
    scheduleDate.value = currentDateDay.format("YYYY-MM-DD");
  }

  // Bloquear datas passadas
  scheduleDate.min = currentDateDay.format("YYYY-MM-DD");

  // Carregar horários disponíveis da empresa
  carregarHorariosDisponiveis(scheduleDate.value);

  // Histórico no mobile
  if (isMobile()) {
    history.pushState({ modalOpen: true }, "");
  }
});

// Atualiza horários ao mudar a data manualmente
scheduleDate.addEventListener("change", () => {
  carregarHorariosDisponiveis(scheduleDate.value);
});

// ✅ Fecha modal
function fecharModal() {
  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");

  if (history.state && history.state.modalOpen) {
    history.back();
  }
}

// ✅ Fechar ao clicar fora do conteúdo
modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    fecharModal();
  }
});

// ✅ Submissão do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameTutor = document.getElementById("name-tutor").value;
  const namePet = document.getElementById("name-pet").value;
  const tutorNumber = document.getElementById("tutor-number").value;
  const descService = document.getElementById("desc-service").value;
  const dataAgendamento = scheduleDate.value;
  const horaAgendamento = scheduleTime.value;

  const data = {
    nameTutor,
    namePet,
    tutorNumber,
    descService,
    scheduleDate: dataAgendamento,
    scheduleTime: horaAgendamento,
  };

  fecharModal(); // Fecha o modal ao finalizar
});

// ✅ Botão voltar do celular fecha modal
window.addEventListener("popstate", () => {
  if (modal.classList.contains("active")) {
    fecharModal();
  }
});
