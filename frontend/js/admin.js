// admin.js

// 假資料
let pendingReviews = [
  { tourist: "Lucia", attraction: "Botanic Garden", text: "This place you must visit in Queensland!" },
  { tourist: "Charlie", attraction: "Botanic Garden", text: "It is a great place!" }
];

const container = document.getElementById("pendingReviews");

// 顯示待審核評論
pendingReviews.forEach((r, index) => {
  const card = document.createElement("div");
  card.className = "admin-review-card";
  card.innerHTML = `
    <p><b>Tourist:</b> ${r.tourist}</p>
    <p><b>Attraction:</b> ${r.attraction}</p>
    <p>"${r.text}"</p>
    <div class="admin-buttons">
      <button class="admin-accept" onclick="acceptReview(${index})">Accept</button>
      <button class="admin-reject" onclick="rejectReview(${index})">Reject</button>
    </div>
  `;
  container.appendChild(card);
});

// Accept
function acceptReview(i) {
  alert(`Review from ${pendingReviews[i].tourist} accepted.`);
}

// Reject
function rejectReview(i) {
  alert(`Review from ${pendingReviews[i].tourist} rejected.`);
}
// admin.js

async function loadPendingReviews() {
  const res = await apiRequest("GET", "/admin/reviews");

  const container = document.getElementById("pendingReviews");
  container.innerHTML = "";

  res.forEach(r => {
    const card = document.createElement("div");
    card.className = "admin-review-card";

    card.innerHTML = `
      <p><b>Tourist:</b> ${r.user}</p>
      <p><b>Attraction:</b> ${r.attraction}</p>
      <p>"${r.text}"</p>
      <div class="admin-buttons">
        <button class="admin-accept" onclick="verifyReview('${r.id}', true)">Accept</button>
        <button class="admin-reject" onclick="verifyReview('${r.id}', false)">Reject</button>
      </div>
    `;

    container.appendChild(card);
  });
}

loadPendingReviews();

// 審核 API
async function verifyReview(id, status) {
  await apiRequest("PUT", `/admin/reviews/${id}/verify`, { status });

  alert(status ? "Accepted!" : "Rejected!");
  loadPendingReviews();
}
