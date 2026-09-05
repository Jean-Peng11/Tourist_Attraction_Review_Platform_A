
const selectedAttraction = localStorage.getItem("selectedAttraction") || "South Bank Parklands";
const title = document.querySelector(".attraction-detail-title");
const reviewList = document.getElementById("reviewList");
const reviewInput = document.getElementById("reviewInput");
const storageKey = `reviews-${selectedAttraction}`;
const defaultReviews = [
  { user: "Amy", text: "This is a very great place!" },
  { user: "Charlie", text: "I love South Bank Parklands." },
  { user: "Emily", text: "The weather is perfect here!" }
];
const savedReviews = JSON.parse(localStorage.getItem(storageKey) || "null");
const reviews = Array.isArray(savedReviews) && savedReviews.length > 0 ? savedReviews : [...defaultReviews];
if (title) title.textContent = selectedAttraction;

function goToAttraction(name) {
  localStorage.setItem("selectedAttraction", name);
  window.location.reload();
}

function renderReviews() {
  reviewList.innerHTML = "";
  reviews.forEach(review => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `<div class="review-user">${review.user}:</div><div class="review-text">“${review.text}”</div>`;
    reviewList.appendChild(card);
  });
}

async function submitReview() {
  const text = reviewInput.value.trim();
  if (!text || text.split(/\s+/).length < 5) {
    alert("Your review must contain more than 5 words.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user") || "null");

  try {
    const response = await apiRequest("POST", "/reviews", {
      attractionName: selectedAttraction,
      text,
      user: user?.name || "Tourist"
    });

    if (response.message !== "Review submitted, pending verification") {
      throw new Error(response.message || "Failed to submit review.");
    }

    alert("Review submitted and is waiting for verification.");
    reviewInput.value = "";
  } catch (error) {
    alert(`Unable to save review: ${error.message}`);
  }
}

localStorage.setItem(storageKey, JSON.stringify(reviews));
renderReviews();
