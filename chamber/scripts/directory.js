const url = 'data/members.json';
const directoryCards = document.querySelector('#directory-cards');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');
const yearElement = document.querySelector('#current-year');
const modifiedElement = document.querySelector('#last-modified');
let memberData = [];

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch member data');
    }
    const data = await response.json();
    memberData = data.members;
    displayMembers(memberData);
  } catch (error) {
    console.error('Error fetching members:', error);
    directoryCards.innerHTML = `
      <div class="error-message">
        <p>⚠️ Unable to load member data. Please try again later.</p>
      </div>
    `;
  }
}

const displayMembers = (members) => {
  const isListView = directoryCards.classList.contains('list-view');
  directoryCards.innerHTML = members
    .map((member) => {
      const membershipLevel = getMembershipLabel(member.membership_level);
      const levelClass = getMembershipClass(member.membership_level);

      return `
        <article class="member-card ${levelClass}">
          <img
            src="images/${member.image}"
            alt="${member.company_name} logo"
            loading="lazy"
            onerror="this.src='images/chamber.webp'; this.alt='Kisoro City Chamber logo';"
          />
          <div class="member-card-content">
            <div class="member-card-header">
              <h2>${member.company_name}</h2>
              <span class="membership-pill ${levelClass}">${membershipLevel}</span>
            </div>
            <p class="member-description">${member.description}</p>
            <p class="member-meta">📍 ${member.address}</p>
            <p class="member-meta">📞 ${member.phone}</p>
            <p class="member-meta">🌐 <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
          </div>
        </article>
      `;
    })
    .join('');
};

const getMembershipLabel = (level) => {
  switch (level) {
    case 3:
      return '⭐ Gold Member';
    case 2:
      return '✨ Silver Member';
    case 1:
      return '💎 Member';
    default:
      return 'Member';
  }
};

const getMembershipClass = (level) => {
  switch (level) {
    case 3:
      return 'gold';
    case 2:
      return 'silver';
    case 1:
      return 'basic';
    default:
      return 'basic';
  }
};

const setView = (view) => {
  if (view === 'list') {
    directoryCards.classList.add('list-view');
    gridBtn.classList.remove('active');
    listBtn.classList.add('active');
  } else {
    directoryCards.classList.remove('list-view');
    listBtn.classList.remove('active');
    gridBtn.classList.add('active');
  }
};

const updateFooterDates = () => {
  yearElement.textContent = new Date().getFullYear();
  modifiedElement.textContent = document.lastModified || 'Unknown';
};

gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

window.addEventListener('DOMContentLoaded', () => {
  setView('grid');
  updateFooterDates();
  getMembers();
});