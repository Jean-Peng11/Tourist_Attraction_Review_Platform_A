// home.js

// 點擊景點卡片 → 跳轉到 attraction.html
function goToAttraction(name) {
  localStorage.setItem("selectedAttraction", name);
  window.location.href = "attraction.html";
}

// 搜尋功能（前端篩選）
const searchInput = document.querySelector(".form-input");
const cards = document.querySelectorAll(".attraction-card");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector(".attraction-title").innerText.toLowerCase();
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });
}

// Filter 標籤切換
const filters = document.querySelectorAll(".filter-item");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
  });
});
// home.js

async function loadAttractions() {
  const res = await apiRequest("GET", "/attractions");

  const container = document.querySelector(".page-section");
  container.innerHTML = ""; // 清空

  res.forEach(a => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.onclick = () => goToAttraction(a.name);

    card.innerHTML = `
      <img src="Images/${a.image}" class="attraction-image">
      <div class="attraction-info">
        <div class="attraction-title">${a.name}</div>
        <div class="attraction-location">${a.location}</div>
        <div class="attraction-reviews">${a.reviews} Reviews</div>
      </div>
    `;

    container.appendChild(card);
  });
}

function goToAttraction(name) {
  localStorage.setItem("selectedAttraction", name);
  window.location.href = "attraction.html";
}

loadAttractions();
