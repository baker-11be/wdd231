// ===== FETCH AND DISPLAY MEMBERS =====

const membersContainer = document.getElementById('members-container');

// Fetch members from JSON file
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Failed to load members data');
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
        membersContainer.innerHTML = `
            <div class="error-message">
                <p>⚠️ Unable to load member directory. Please try again later.</p>
            </div>
        `;
    }
}

// Display members as cards
function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';

        // Membership badge class
        let badgeClass = 'member';
        let badgeText = 'Member';
        if (member.membership === 'silver') {
            badgeClass = 'silver';
            badgeText = 'Silver';
        } else if (member.membership === 'gold') {
            badgeClass = 'gold';
            badgeText = 'Gold';
        }

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="address">📍 ${member.address}</p>
            <p class="phone">📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank" class="website">🌐 Visit Website</a>
            <p><span class="membership-badge ${badgeClass}">${badgeText}</span></p>
        `;

        membersContainer.appendChild(card);
    });
}

// ===== GRID / LIST TOGGLE =====

const gridBtn = document.getElementById('grid-view-btn');
const listBtn = document.getElementById('list-view-btn');

// Grid view
gridBtn.addEventListener('click', () => {
    membersContainer.classList.remove('list-view');
    membersContainer.classList.add('grid-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

// List view
listBtn.addEventListener('click', () => {
    membersContainer.classList.remove('grid-view');
    membersContainer.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// ===== LOAD MEMBERS =====
fetchMembers();