import { places } from "../data/discover.mjs";

const cardsContainer = document.getElementById("discover-cards");
const visitMessage = document.getElementById("visit-message");

if (cardsContainer) {
  const closeAllDetails = () => {
    cardsContainer.querySelectorAll(".detail-panel").forEach((panel) => {
      panel.hidden = true;
    });
    cardsContainer.querySelectorAll(".more-button").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  };

  places.forEach((place, index) => {
    const card = document.createElement("article");
    card.className = `discover-card card-${index + 1}`;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy" />
        <figcaption>${place.name}</figcaption>
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <div class="detail-panel" hidden>
        <h3>${place.detailTitle}</h3>
        <ul>
          ${place.details.map((detail) => `<li>${detail}</li>`).join("")}
        </ul>
      </div>
      <button type="button" class="more-button" aria-expanded="false">Learn more</button>
    `;

    const button = card.querySelector(".more-button");
    const detailPanel = card.querySelector(".detail-panel");

    if (button && detailPanel) {
      button.addEventListener("click", () => {
        const wasHidden = detailPanel.hidden;
        closeAllDetails();
        if (wasHidden) {
          detailPanel.hidden = false;
          button.setAttribute("aria-expanded", "true");
        }
      });
    }

    cardsContainer.appendChild(card);
  });
}

if (visitMessage) {
  const storageKey = "discoverLastVisit";
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem(storageKey));
  let message = "Welcome! Let us know if you have any questions.";

  if (!Number.isNaN(lastVisit)) {
    const daysAgo = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysAgo < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${daysAgo} day${daysAgo === 1 ? "" : "s"} ago.`;
    }
  }

  visitMessage.textContent = message;
  localStorage.setItem(storageKey, String(now));
}