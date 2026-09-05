
const sampleReviews = [
  {
    _id: "sample-lucia",
    user: "Lucia",
    attractionName: "Botanic Garden",
    text: "This place you must visit in Queensland!"
  },
  {
    _id: "sample-charlie",
    user: "Charlie",
    attractionName: "Botanic Garden",
    text: "It is a great place!"
  }
];

async function loadPendingReviews() {
  const container = document.getElementById("pendingReviews");

  try {
    const res = await apiRequest("GET", "/reviews/pending");
    renderReviews(Array.isArray(res) && res.length > 0 ? res : sampleReviews);
  } catch (err) {
    console.error("Failed to load reviews:", err);
    renderReviews(sampleReviews);
  }
}

function renderReviews(reviews) {
  const container = document.getElementById("pendingReviews");
  container.innerHTML = "";

  reviews.forEach(r => {
      const card = document.createElement("div");
      card.className = "admin-review-card";

      card.innerHTML = `
        <p><b>Tourist:</b> ${r.user}</p>
        <p><b>Attraction:</b> ${r.attractionName}</p>
        <p>"${r.text}"</p>
        <p><b>Status:</b> Under Verification</p>
        <div class="admin-buttons">
          <button class="admin-accept" onclick="verifyReview('${r._id}', true)">Accept</button>
          <button class="admin-reject" onclick="verifyReview('${r._id}', false)">Reject</button>
        </div>
      `;

      container.appendChild(card);
  });
}

async function verifyReview(id, approve) {
  if (id.startsWith("sample-")) {
    const card = document.querySelector(`[onclick*="${id}"]`)?.closest(".admin-review-card");
    card?.remove();
    return;
  }

  try {
    const response = await apiRequest("POST", `/reviews/${id}/verify`, { approve });
    if (response.message !== "Review verification updated") {
      throw new Error(response.message || "Review verification failed.");
    }
    await loadPendingReviews();
  } catch (err) {
    alert(`Unable to verify review: ${err.message}`);
  }
}

loadPendingReviews();