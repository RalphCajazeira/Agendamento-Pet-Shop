const form = document.querySelector(".modal-form");

form.onsubmit = (event) => {
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
};
