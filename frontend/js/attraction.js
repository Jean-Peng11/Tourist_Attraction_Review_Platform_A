// attraction.js

// 顯示景點名稱
const title = document.querySelector(".title");
const selected = localStorage.getItem("selectedAttraction");

if (selected && title) {
  title.innerText = selected;
}

// 新增評論
const reviewList = document.getElementById("reviewList");
const reviewInput = document.querySelector(".review-input");

function submitReview() {
  const text = reviewInput.value.trim();
  if (!text) return;

  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = `
    <div class="review-user">Tourist</div>
    <div class="review-text">${text}</div>
  `;

  reviewList.appendChild(card);
  reviewInput.value = "";
}
