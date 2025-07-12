import dayjs from "dayjs";
import { openModal, closeModal } from "../../utils/modal-control";

const formSchedule = document.getElementById("form-schedule");
const modal = document.getElementById("modal-schedule");
const newSchedule = document.querySelector("#btn-new-schedule");

// Abre o modal ao clicar no botão
newSchedule.addEventListener("click", () => {
  openModal(modal);
});

// Envia o formulário de novo agendamento
formSchedule.onsubmit = (event) => {
  event.preventDefault(); // previne recarregamento da página

  const formData = getFormData(); // coleta os dados do formulário

  // Salva no banco de dados (JSON Server)
  fetch("http://localhost:3333/schedules", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Agendamento criado com sucesso!", result);

      // Verifica se a data do agendamento é igual à data atualmente exibida
      const scheduleDate = formData.scheduleDate;
      const currentDate = document.getElementById("current-date").value;

      if (scheduleDate === currentDate) {
        // Cria o elemento visual do agendamento com o ID retornado do backend
        const scheduleItem = createScheduleItem({
          ...formData,
          id: result.id,
        });

        const [dayHours] = formData.scheduleTime.split(":");
        const hour = Number(dayHours);

        const periodMorning = document.getElementById("period-morning");
        const periodAfternoon = document.getElementById("period-afternoon");
        const periodNight = document.getElementById("period-night");

        // Insere o agendamento no período correspondente (manhã, tarde ou noite)
        if (hour <= 12) {
          periodMorning.appendChild(scheduleItem);
        } else if (hour < 18) {
          periodAfternoon.appendChild(scheduleItem);
        } else {
          periodNight.appendChild(scheduleItem);
        }
      }

      closeModal(modal); // fecha o modal após o envio
    })
    .catch((error) => {
      console.error("Erro ao criar agendamento:", error);
    });
};

// Coleta os dados preenchidos no formulário
function getFormData() {
  return {
    nameTutor: document.getElementById("name-tutor").value,
    namePet: document.getElementById("name-pet").value,
    tutorNumber: document.getElementById("tutor-number").value,
    descService: document.getElementById("desc-service").value,
    scheduleDate: document.getElementById("schedule-date").value,
    scheduleTime: document.getElementById("schedule-time").value,
    creationDate: dayjs().toISOString(), // salva a data de criação
  };
}

// Cria visualmente o agendamento na tela
export function createScheduleItem({
  namePet,
  nameTutor,
  descService,
  scheduleTime,
  id,
}) {
  const li = document.createElement("li");
  li.dataset.id = id; // armazena o ID no DOM para poder deletar depois

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

  // Ao clicar no botão "Remover agendamento", faz DELETE no servidor e remove da tela
  button.addEventListener("click", () => {
    const scheduleId = li.dataset.id;

    if (scheduleId) {
      fetch(`http://localhost:3333/schedules/${scheduleId}`, {
        method: "DELETE",
      })
        .then(() => {
          li.remove();
          console.log(`Agendamento ${scheduleId} removido com sucesso.`);
        })
        .catch((err) => {
          console.error("Erro ao remover agendamento do servidor:", err);
        });
    } else {
      li.remove(); // fallback caso não haja ID
    }
  });

  li.appendChild(strong);
  li.appendChild(div);
  li.appendChild(span);
  li.appendChild(button);

  return li;
}

// Fecha o modal ao clicar fora do conteúdo
modal.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closeModal(modal);
  }
});

// Botão voltar do celular fecha modal
window.addEventListener("popstate", () => {
  if (modal.classList.contains("active")) {
    closeModal(modal);
  }
});
