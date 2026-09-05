async function loadAttractions() {
  const list = document.getElementById("attractionList");
  const defaultAttractions = [
    {
      name: "City Botanic Gardens",
      location: "Brisbane City, QLD",
      reviews: "5000+",
      image: "City Botanical Gardens Brisbane.png",
      category: "Nature"
    },
    {
      name: "South Bank Parklands",
      location: "South Brisbane, QLD",
      reviews: "3000+",
      image: "South Bank Parklands.png",
      category: "Recreational"
    },
    {
      name: "Story Bridge",
      location: "Brisbane City, QLD",
      reviews: "2000+",
      image: "Story Bridge.png",
      category: "Popular Spot"
    },
    {
      name: "Lone Pine Koala Sanctuary",
      location: "Fig Tree Pocket, QLD",
      reviews: "1500+",
      image: "Lone Pine Koala Sanctuary.png",
      category: "Nature"
    }
  ];
  let databaseAttractions = [];

  try {
    const response = await apiRequest("GET", "/attractions");
    databaseAttractions = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error("Failed to load attractions:", error);
  }

  const databaseNames = new Set(databaseAttractions.map(attraction => attraction.name));
  const attractions = [
    ...defaultAttractions.filter(attraction => !databaseNames.has(attraction.name)),
    ...databaseAttractions
  ];

  list.querySelectorAll(".attraction-card").forEach(card => card.remove());
  attractions.forEach(a => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.dataset.category = a.category || "";
    card.onclick = () => goToAttraction(a.name);

    card.innerHTML = `
      <img src="Images/${a.image || "City Botanical Gardens Brisbane.png"}" class="attraction-image" alt="${a.name}">
      <div class="attraction-info">
        <div class="attraction-title">${a.name}</div>
        <div class="attraction-location">${a.location || ""}</div>
        <div class="attraction-reviews">${a.reviews || (a.name === "QUT" ? "3000+" : a.recommendedCount || 0)} Reviews</div>
      </div>
    `;

    list.appendChild(card);
  });
}

function goToAttraction(name) {
  localStorage.setItem("selectedAttraction", name);
  window.location.href = "attraction.html";
}

const searchInput = document.querySelector(".search-bar .form-input");
const filters = document.querySelectorAll(".filter-item");
const attractionList = document.getElementById("attractionList");
const noResultsMessage = document.createElement("p");
noResultsMessage.className = "no-results-message";
noResultsMessage.textContent = "No attractions found.";
noResultsMessage.hidden = true;
attractionList.appendChild(noResultsMessage);

function filterCards() {
  const keyword = searchInput.value.toLowerCase();
  const selectedFilter = document.querySelector(".filter-item.active")?.textContent;
  let visibleCards = 0;

  document.querySelectorAll(".attraction-card").forEach(card => {
    const searchableText = card.textContent.toLowerCase();
    const category = card.dataset.category;
    const matchesSearch = searchableText.includes(keyword);
    const matchesFilter = !selectedFilter || selectedFilter === "All" || !category || category === selectedFilter;
    const isVisible = matchesSearch && matchesFilter;
    if (isVisible) visibleCards += 1;
    card.style.display = isVisible ? "block" : "none";
  });

  noResultsMessage.hidden = visibleCards > 0;
}

searchInput?.addEventListener("input", filterCards);
filters.forEach(filter => filter.addEventListener("click", () => {
  filters.forEach(item => item.classList.remove("active"));
  filter.classList.add("active");
  filterCards();
}));

filters[0]?.classList.add("active");
document.querySelectorAll(".attraction-card").forEach(card => {
  card.onclick = () => goToAttraction(card.querySelector(".attraction-title").textContent);
});

loadAttractions();
