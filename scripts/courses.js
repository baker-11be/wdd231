// ===== COURSE DATA (Update completed: true for courses you've taken) =====
const courses = [
    { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { code: 'WDD 231', name: 'Web Frontend Development I', credits: 2, completed: false },
    { code: 'CSE 111', name: 'Programming with Functions', credits: 2, completed: true },
    { code: 'CSE 210', name: 'Programming with Classes', credits: 2, completed: true },
    { code: 'ITM 111', name: 'Introduction to databases', credits: 3, completed: true },
    { code: 'ITM 211', name: 'Database Design and Development', credits: 3, completed: false },
];

// ===== DOM REFERENCES =====
const courseContainer = document.getElementById('course-cards');
const creditTotal = document.getElementById('credit-total');
const filterButtons = document.querySelectorAll('.course-filters button');

// ===== RENDER FUNCTION =====
function renderCourses(filter = 'all') {
    let filteredCourses = [];

    // Filter logic
    if (filter === 'all') {
        filteredCourses = courses;
    } else if (filter === 'wdd') {
        filteredCourses = courses.filter(course => course.code.startsWith('WDD'));
    } else if (filter === 'cse') {
        filteredCourses = courses.filter(course => course.code.startsWith('CSE'));
    }

    // Clear container
    courseContainer.innerHTML = '';

    // Build course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
        `;

        courseContainer.appendChild(card);
    });

    // ===== TOTAL CREDITS using reduce() =====
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = total;
}

// ===== FILTER BUTTON EVENT LISTENERS =====
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Get filter value from button id
        const filterValue = button.id.replace('filter-', '');
        renderCourses(filterValue);
    });
});

// ===== INITIAL RENDER =====
renderCourses('all');