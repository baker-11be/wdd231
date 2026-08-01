import { places } from '../data/discover.mjs';

function renderCards() {
  const container = document.getElementById('cards-container');
  if (!container) {
    console.warn('Cards container not found.');
    return;
  }

  container.innerHTML = '';

  places.forEach(place => {
    const card = document.createElement('article');
    card.className = 'place-card';

    const title = document.createElement('h2');
    title.textContent = place.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = place.image;
    img.alt = place.name;
    img.loading = 'lazy';
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = place.address;

    const desc = document.createElement('p');
    desc.textContent = place.description;

    const btn = document.createElement('button');
    btn.textContent = 'Learn more';
    // Optional: add click handler if needed
    // btn.addEventListener('click', () => { ... });

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(btn);

    container.appendChild(card);
  });
}

function displayVisitMessage() {
  const msgDiv = document.getElementById('visit-message');
  if (!msgDiv) {
    console.warn('Visit message container not found.');
    return;
  }

  const now = Date.now();
  const lastVisit = localStorage.getItem('discover_lastVisit');
  let message = '';

  if (!lastVisit) {
    message = '👋 Welcome! Let us know if you have any questions.';
  } else {
    const diff = now - parseInt(lastVisit, 10);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days < 1) {
      message = '🔄 Back so soon! Awesome!';
    } else {
      const dayWord = days === 1 ? 'day' : 'days';
      message = `📅 You last visited ${days} ${dayWord} ago.`;
    }
  }

  msgDiv.textContent = message;
  localStorage.setItem('discover_lastVisit', now.toString());
}

// Run both functions
renderCards();
displayVisitMessage();