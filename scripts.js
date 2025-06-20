// Testando a API usando fetch com async/await
async function loadData() {
  const response = await fetch("http://localhost:3333/schedules");
  const data = await response.json();
  console.log(data);
}

loadData();
