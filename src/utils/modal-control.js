// ✅ Verifica se o usuário está em um dispositivo móvel
export function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent
  );
}

// ✅ Abre o modal e define os valores iniciais
export function openModal(modal) {
  modal.classList.add("active");
  document.body.classList.add("no-scroll");

  // Histórico no mobile
  if (isMobile()) {
    history.pushState({ modalOpen: true }, "");
  }
}

// ✅ Fecha modal
export function closeModal(modal) {
  modal.classList.remove("active");
  document.body.classList.remove("no-scroll");

  if (history.state && history.state.modalOpen) {
    history.back();
  }
}
