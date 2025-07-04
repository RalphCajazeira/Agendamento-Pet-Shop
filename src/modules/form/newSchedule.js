document.querySelector("#new-schedule").addEventListener("click", (event) => {
  document.querySelector("#modal").classList.add("active");
});

document.querySelector("#modal").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    event.currentTarget.classList.remove("active");
  }
});
