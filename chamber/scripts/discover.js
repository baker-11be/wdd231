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

    const detailText = [place.description, ...place.details]
      .map((sentence) => sentence.trim().endsWith('.') ? sentence.trim() : `${sentence.trim()}.`)
      .filter(Boolean)
      .slice(0, 3)
      .join(' ');

    card.innerHTML = `
      <div class="card-inner">
        <div>
          <h2>${place.name}</h2>
          <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy" />
            <figcaption>${place.name}</figcaption>
          </figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button type="button" class="more-button" aria-expanded="false">Learn more</button>
        </div>
        <div class="detail-panel" hidden>
          <header>
            <h3>Other to know</h3>
            <button type="button" class="detail-close" aria-label="Close details">×</button>
          </header>
          <p class="detail-text">${detailText}</p>
        </div>
      </div>
    `;

    const button = card.querySelector(".more-button");
    const detailPanel = card.querySelector(".detail-panel");

    if (button && detailPanel) {
      const closeButton = detailPanel.querySelector(".detail-close");

      const openDetails = () => {
        closeAllDetails();
        detailPanel.hidden = false;
        button.setAttribute("aria-expanded", "true");
      };

      const hideDetails = () => {
        detailPanel.hidden = true;
        button.setAttribute("aria-expanded", "false");
      };

      button.addEventListener("click", () => {
        if (detailPanel.hidden) {
          openDetails();
        } else {
          hideDetails();
        }
      });

      if (closeButton) {
        closeButton.addEventListener("click", hideDetails);
      }

      card.addEventListener("mouseleave", () => {
        if (!detailPanel.hidden) {
          hideDetails();
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