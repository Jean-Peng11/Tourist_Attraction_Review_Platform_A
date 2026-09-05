
const profile = JSON.parse(localStorage.getItem("user") || "null") || {
  name: "Lucia",
  email: "lucia@gmail.com"
};

const submittedReviews = [
  { attraction: "Botanic Garden", text: "This place you must visit in Queensland" },
  { attraction: "QUT", text: "This place you must visit in Queensland" }
];

function renderProfile() {
  document.querySelector(".profile-name").textContent = profile.name;
  document.querySelector(".profile-email").textContent = profile.email;

  const list = document.getElementById("myReviews");
  list.innerHTML = submittedReviews.map((review, index) => `
    <div class="review-item">
      <b>${review.attraction}</b>
      <p>${review.text}</p>
      <div class="review-status">Under Verification</div>
      <div class="review-actions">
        <button type="button" onclick="editReview(${index})">Edit</button>
        <button type="button" onclick="deleteReview(${index})">Delete</button>
      </div>
    </div>
  `).join("");
}

function editReview(index) {
  const newText = prompt("Edit your review:", submittedReviews[index].text);
  if (!newText?.trim()) return;
  submittedReviews[index].text = newText.trim();
  renderProfile();
}

function deleteReview(index) {
  submittedReviews.splice(index, 1);
  renderProfile();
}

function updateProfile() {
  const input = document.getElementById("editName");

  if (input.hidden) {
    input.hidden = false;
    input.focus();
    document.querySelector(".profile-edit-button").textContent = "Save Profile";
    return;
  }

  const newName = input.value.trim();
  if (!newName) return;

  profile.name = newName;
  localStorage.setItem("user", JSON.stringify(profile));
  input.value = "";
  input.hidden = true;
  document.querySelector(".profile-edit-button").textContent = "Edit Profile";
  renderProfile();
}

renderProfile();
