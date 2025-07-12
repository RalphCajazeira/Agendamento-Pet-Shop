import dayjs from "dayjs";

export async function carregarHorariosDisponiveis(dataSelecionadaStr) {
  const selectHorario = document.getElementById("schedule-time");
  const dataSelecionada = dayjs(dataSelecionadaStr);
  const hoje = dayjs().startOf("day");
  const agora = dayjs();

  selectHorario.innerHTML = '<option disabled selected value="">Selecione um horário</option>';

  try {
    const response = await fetch("http://localhost:3333/openingHours");
    const horariosJSON = await response.json();
    const horarios = horariosJSON[0]; // Assume que openingHours é um array com 1 array dentro

    const horariosValidos = horarios.filter((horaStr) => {
      const dataHora = dayjs(`${dataSelecionadaStr}T${horaStr}`);
      return (
        dataSelecionada.isAfter(hoje) ||
        dataHora.isAfter(agora.add(10, "minute"))
      );
    });

    if (horariosValidos.length === 0) {
      selectHorario.innerHTML = '<option disabled selected value="">Sem horários disponíveis</option>';
      return;
    }

    for (const h of horariosValidos) {
      const option = document.createElement("option");
      option.value = h;
      option.textContent = h;
      selectHorario.appendChild(option);
    }
  } catch (error) {
    console.error("Erro ao carregar horários:", error);
    selectHorario.innerHTML = '<option disabled selected value="">Erro ao carregar horários</option>';
  }
}
