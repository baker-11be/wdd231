const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.prophets);
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Unable to load prophet data:', error);
    cards.textContent = 'Sorry, the prophet data could not be loaded right now.';
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    card.classList.add('card');

    const fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    const portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    const details = document.createElement('div');
    details.classList.add('details');

    const birthdate = document.createElement('p');
    birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;

    const birthplace = document.createElement('p');
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

    const order = document.createElement('p');
    order.textContent = `Prophet Order: ${prophet.order}`;

    details.appendChild(birthdate);
    details.appendChild(birthplace);
    details.appendChild(order);

    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(details);

    cards.appendChild(card);
  });
};

getProphetData();
