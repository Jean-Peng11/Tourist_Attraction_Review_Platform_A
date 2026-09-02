// profile.js

// 假資料（你之後可以串接後端）
let user = {
  name: "Lucia",
  email: "lucia@gmail.com",
  reviews: [
    { attraction: "Botanic Garden", text: "This place you must visit in Queensland", status: "Under Verification" },
    { attraction: "QUT", text: "This place you must visit in Queensland", status: "Under Verification" }
  ]
};

// 顯示使用者資料
document.querySelector(".profile-name").innerText = user.name;
document.querySelector(".profile-email").innerText = user.email;

// 顯示評論
const reviewContainer = document.getElementById("myReviews");

user.reviews.forEach(r => {
  const item = document.createElement("div");
  item.className = "review-item";
  item.innerHTML = `
    <b>${r.attraction}</b>
    <p>${r.text}</p>
    <div class="review-status">${r.status}</div>
  `;
  reviewContainer.appendChild(item);
});

// 編輯名稱
function updateProfile() {
  const newName = document.getElementById("editName").value.trim();
  if (!newName) return;

  user.name = newName;
  document.querySelector(".profile-name").innerText = newName;
  alert("Profile updated!");
}
// profile.js

async function loadProfile() {
  const res = await apiRequest("GET", "/profile");

  document.querySelector(".profile-name").innerText = res.name;
  document.querySelector(".profile-email").innerText = res.email;

  const list = document.getElementById("myReviews");
  list.innerHTML = "";

  res.reviews.forEach(r => {
    const item = document.createElement("div");
    item.className = "review-item";
    item.innerHTML = `
      <b>${r.attraction}</b>
      <p>${r.text}</p>
      <div class="review-status">${r.status}</div>
    `;
    list.appendChild(item);
  });
}

loadProfile();

// 更新名稱
async function updateProfile() {
  const newName = document.getElementById("editName").value.trim();
  if (!newName) return;

  await apiRequest("PUT", "/profile", { name: newName });

  alert("Profile updated!");
  loadProfile();
}
