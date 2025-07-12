// Importando o Day.js para manipular datas
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);

// Pegar input data
const currentDate = document.getElementById("current-date");

const form = document.querySelector(".modal-form");
const modal = document.getElementById("modal");
const newSchedule = document.querySelector("#btn-new-schedule");
const scheduleDate = document.getElementById("schedule-date");
const scheduleTime = document.getElementById("schedule-time");

// Define a data atual
const currentDateDay = dayjs(new Date());

document.addEventListener("DOMContentLoaded", function () {
  const dataAtual = currentDateDay.format("YYYY-MM-DD");
  currentDate.value = dataAtual;
});

// ✅ [ALTERADO] — Verifica se o usuário está em um dispositivo móvel
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent
  );
}

// ✅ [ALTERADO] — Adiciona estado ao histórico ao abrir o modal
newSchedule.addEventListener("click", (event) => {
  modal.classList.add("active");
  document.body.classList.add("no-scroll");
  scheduleTime.value = currentDateDay.format("HH:mm");

  // converte os dois em dayjs e zera a hora para garantir consistência
  const dataInput = dayjs(currentDate.value, "YYYY-MM-DD").startOf("day");
  const dataAtual = dayjs().startOf("day");

  // comparação segura
  if (dataInput.isSameOrAfter(dataAtual)) {
    scheduleDate.value = currentDate.value;
  } else {
    scheduleDate.value = currentDateDay.format("YYYY-MM-DD");
  }

  // Bloquear data anterior
  scheduleDate.min = currentDateDay.format("YYYY-MM-DD");

  // ✅ [ADICIONADO] — Adiciona um novo estado ao histórico do navegador
  if (isMobile()) {
    history.pushState({ modalOpen: true }, "");
  }
});

// ✅ [ADICIONADO] — Função para fechar o modal e voltar no histórico se necessário
function fecharModal() {
  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");

  // ✅ [ADICIONADO] — Volta no histórico se o modal estiver ativo
  if (history.state && history.state.modalOpen) {
    history.back();
  }
}

// ✅ [ALTERADO] — Usa a função fecharModal ao clicar fora do conteúdo do modal
modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    fecharModal();
  }
});

// ✅ [ALTERADO] — Usa a função fecharModal ao enviar o formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameTutor = document.getElementById("name-tutor").value;
  const namePet = document.getElementById("name-pet").value;
  const tutorNumber = document.getElementById("tutor-number").value;
  const descService = document.getElementById("desc-service").value;
  const scheduleDate = document.getElementById("schedule-date").value;
  const scheduleTime = document.getElementById("schedule-time").value;

  const data = {
    nameTutor,
    namePet,
    tutorNumber,
    descService,
    scheduleDate,
    scheduleTime,
  };

  fecharModal(); // ✅ fecha modal corretamente e limpa o histórico
});

// ✅ [ADICIONADO] — Ouvinte para fechar o modal se o botão "voltar" for pressionado
window.addEventListener("popstate", () => {
  if (modal.classList.contains("active")) {
    fecharModal();
  }
});
