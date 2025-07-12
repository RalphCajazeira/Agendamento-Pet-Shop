import { openModal, closeModal } from "../../utils/modal-control";

const formSchedule = document.getElementById("form-schedule");
const modal = document.getElementById("modal-schedule");
const newSchedule = document.querySelector("#btn-new-schedule");

// ✅ Abrir o modal
newSchedule.addEventListener("click", () => {
  openModal(modal);
});

// ✅ Enviar o formulário
formSchedule.onsubmit = (event) => {
  event.preventDefault();

  const data = getFormData();
  const scheduleItem = createScheduleItem(data);

  const [dayHours] = document.getElementById("schedule-time").value.split(":");

  console.log(Number(dayHours));

  const periodMorning = document.getElementById("period-morning");
  const periodAfternoon = document.getElementById("period-afternoon");
  const periodNight = document.getElementById("period-night");

  if (dayHours <= 12) {
    periodMorning.appendChild(scheduleItem);
  } else if (dayHours > 12 && dayHours < 18) {
    periodAfternoon.appendChild(scheduleItem);
  } else {
    periodNight.appendChild(scheduleItem);
  }

  closeModal(modal);
};

function getFormData() {
  return {
    nameTutor: document.getElementById("name-tutor").value,
    namePet: document.getElementById("name-pet").value,
    tutorNumber: document.getElementById("tutor-number").value,
    descService: document.getElementById("desc-service").value,
    scheduleDate: document.getElementById("schedule-date").value,
    scheduleTime: document.getElementById("schedule-time").value,
  };
}

function createScheduleItem({ namePet, nameTutor, descService, scheduleTime }) {
  const li = document.createElement("li");

  const strong = document.createElement("strong");
  strong.textContent = scheduleTime;

  const div = document.createElement("div");
  div.classList.add("animal-owner");
  div.innerHTML = `${namePet} <span>/</span> <span>${nameTutor}</span>`;

  const span = document.createElement("span");
  span.classList.add("service");
  span.textContent = descService;

  const button = document.createElement("button");
  button.classList.add("remove-schedule");
  button.textContent = "Remover agendamento";
  button.addEventListener("click", () => li.remove());

  li.appendChild(strong);
  li.appendChild(div);
  li.appendChild(span);
  li.appendChild(button);

  return li;
}

// ✅ Fechar ao clicar fora do conteúdo
modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal(modal);
  }
});

// ✅ Botão voltar do celular fecha modal
window.addEventListener("popstate", () => {
  if (modal.classList.contains("active")) {
    closeModal(modal);
  }
});

// ✅ Remover agendamento
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-schedule")) {
    const li = event.target.closest("li");
    if (li) li.remove();
  }
});
