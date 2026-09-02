// manage.js

let attractions = [
  { name: "City Botanic Gardens", desc: "Located in Brisbane City" }
];

const list = document.getElementById("manageList");

// 顯示景點
function renderList() {
  list.innerHTML = "";
  attractions.forEach((a, index) => {
    const item = document.createElement("div");
    item.className = "manage-item";
    item.innerHTML = `
      <b>${a.name}</b>
      <p>${a.desc}</p>
      <div class="manage-actions">
        <button class="admin-reject" onclick="deleteAttraction(${index})">Delete</button>
      </div>
    `;
    list.appendChild(item);
  });
}

renderList();

// 新增景點
function saveAttraction() {
  const name = document.getElementById("manageLocation").value.trim();
  const desc = document.getElementById("manageDesc").value.trim();

  if (!name || !desc) return;

  attractions.push({ name, desc });
  renderList();

  document.getElementById("manageLocation").value = "";
  document.getElementById("manageDesc").value = "";

  alert("Attraction added!");
}

// 刪除景點
function deleteAttraction(i) {
  attractions.splice(i, 1);
  renderList();
}
// manage.js

async function loadAttractions() {
  const res = await apiRequest("GET", "/attractions");

  const list = document.getElementById("manageList");
  list.innerHTML = "";

  res.forEach(a => {
    const item = document.createElement("div");
    item.className = "manage-item";

    item.innerHTML = `
      <b>${a.name}</b>
      <p>${a.description}</p>
    `;

    list.appendChild(item);
  });
}

loadAttractions();

// 新增景點
async function saveAttraction() {
  const name = document.getElementById("manageLocation").value.trim();
  const desc = document.getElementById("manageDesc").value.trim();

  if (!name || !desc) return;

  await apiRequest("POST", "/admin/attractions", {
    name,
    description: desc
  });

  alert("Attraction added!");
  loadAttractions();
}
