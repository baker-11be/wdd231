// Directory Page JavaScript

const url = './data/members.json';
const memberContainer = document.querySelector('#member-container');
const gridBtn = document.querySelector('#grid-view');
const listBtn = document.querySelector('#list-view');
const memberCount = document.querySelector('#member-count');
let memberData = [];

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch member data');
        }
        const data = await response.json();
        memberData = data.members;
        displayMembers(memberData);
        memberCount.textContent = memberData.length;
    } catch (error) {
        console.error('Error fetching members:', error);
        memberContainer.innerHTML = `
            <div class="error-message">
                <p>⚠️ Unable to load member data. Please try again later.</p>
            </div>
        `;
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const isGridView = memberContainer.classList.contains('grid-view');
    
    memberContainer.innerHTML = members.map(member => {
        const membershipLevel = getMembershipLabel(member.membershipLevel);
        const levelClass = getMembershipClass(member.membershipLevel);
        const imageMarkup = isGridView ? `
                <div class="member-image">
                    <img 
                        src="images/${member.image}" 
                        alt="${member.name} logo" 
                        loading="lazy"
                        onerror="this.src='images/placeholder.jpg'"
                    />
                </div>
            ` : '';
        
        return `
            <article class="member-card ${levelClass}">
                ${imageMarkup}
                <div class="member-details">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-description">${member.description}</p>
                    <div class="member-contact">
                        <p class="member-address">📍 ${member.address}</p>
                        <p class="member-phone">📞 ${member.phone}</p>
                        <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="member-website">🌐 Visit Website</a>
                    </div>
                    <span class="member-badge ${levelClass}">${membershipLevel}</span>
                </div>
            </article>
        `;
    }).join('');
}

// Helper function to get membership level label
function getMembershipLabel(level) {
    switch(level) {
        case 3: return '⭐ Gold Member';
        case 2: return '✨ Silver Member';
        case 1: return '💎 Member';
        default: return 'Member';
    }
}

// Helper function to get membership class for styling
function getMembershipClass(level) {
    switch(level) {
        case 3: return 'gold';
        case 2: return 'silver';
        case 1: return 'basic';
        default: return 'basic';
    }
}

// Toggle between grid and list view
function setGridView() {
    memberContainer.classList.remove('list-view');
    memberContainer.classList.add('grid-view');
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    displayMembers(memberData);
}

function setListView() {
    memberContainer.classList.remove('grid-view');
    memberContainer.classList.add('list-view');
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    displayMembers(memberData);
}

// Event Listeners
gridBtn.addEventListener('click', setGridView);
listBtn.addEventListener('click', setListView);

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('#hamburger');
    const nav = document.querySelector('#primary-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            hamburger.textContent = isOpen ? '✕' : '☰';
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });
    }
});

// Initialize
getMembers();