let attractions = [];
let pendingDeleteIndex = null;
let editingIndex = null;

const list = document.getElementById("manageList");

function renderList() {
  list.innerHTML = "";
  attractions.forEach((attraction, index) => {
    const item = document.createElement("div");
    item.className = "manage-item";
    item.innerHTML = `
      <b>${attraction.name}</b>
      <p>${attraction.description}</p>
      <img src="Images/${attraction.image || "City Botanical Gardens Brisbane.png"}" alt="${attraction.name}">
      <div class="manage-actions">
        <button type="button" onclick="editAttraction(${index})">Edit</button>
        <button type="button" onclick="deleteAttraction(${index})">Delete</button>
      </div>
    `;
    list.appendChild(item);
  });
}

function saveAttraction() {
  const nameInput = document.getElementById("manageLocation");
  const descriptionInput = document.getElementById("manageDesc");
  const name = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!name || !description) {
    alert("Please enter an attraction name and description.");
    return;
  }

  const endpoint = editingIndex === null
    ? "/attractions/admin/add"
    : `/attractions/${attractions[editingIndex]._id}`;
  const method = editingIndex === null ? "POST" : "PUT";

  apiRequest(method, endpoint, {
    name,
    location: "Queensland",
    description
  }).then(response => {
    const expectedMessage = editingIndex === null ? "Attraction saved" : "Attraction updated";
    if (response.message !== expectedMessage) {
      throw new Error(response.message || "Failed to save attraction.");
    }
    editingIndex = null;
    nameInput.value = "";
    descriptionInput.value = "";
    document.getElementById("attractionForm").hidden = true;
    loadAttractions();
  }).catch(error => alert(`Unable to save attraction: ${error.message}`));
}

function deleteAttraction(index) {
  pendingDeleteIndex = index;
  document.getElementById("deleteConfirmation").hidden = false;
}

async function confirmDelete() {
  if (pendingDeleteIndex === null) return;

  const attraction = attractions[pendingDeleteIndex];
  if (!attraction?._id) {
    alert("This attraction does not have a database ID. Please reload the page.");
    return;
  }

  try {
    const response = await apiRequest("DELETE", `/attractions/${attraction._id}`);
    if (response.message !== "Attraction deleted") {
      throw new Error(response.message || "Failed to delete attraction.");
    }
    pendingDeleteIndex = null;
    document.getElementById("deleteConfirmation").hidden = true;
    loadAttractions();
  } catch (error) {
    alert(`Unable to delete attraction: ${error.message}`);
  }
}

function cancelDelete() {
  pendingDeleteIndex = null;
  document.getElementById("deleteConfirmation").hidden = true;
}

function toggleAttractionForm() {
  const form = document.getElementById("attractionForm");
  form.hidden = !form.hidden;
}

function editAttraction(index) {
  const attraction = attractions[index];
  editingIndex = index;
  document.getElementById("manageLocation").value = attraction.name;
  document.getElementById("manageDesc").value = attraction.description;
  document.getElementById("attractionForm").hidden = false;
}

async function loadAttractions() {
  try {
    const response = await apiRequest("GET", "/attractions");
    attractions = Array.isArray(response) ? response : [];
    renderList();
  } catch (error) {
    alert(`Unable to load attractions: ${error.message}`);
  }
}

loadAttractions();
