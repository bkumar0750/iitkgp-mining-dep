// Fetch faculty data and render cards
document.addEventListener('DOMContentLoaded', () => {
    fetchFacultyData();
});

async function fetchFacultyData() {
    try {
        const response = await fetch('../data/professors.json');
        const faculty = await response.json();
        renderFacultyCards(faculty);
        setupSearch(faculty);
    } catch (error) {
        console.error('Error loading faculty data:', error);
    }
}

function renderFacultyCards(faculty) {
    const facultyGrid = document.getElementById('facultyGrid');
    facultyGrid.innerHTML = '';

    faculty.forEach(professor => {
        const card = document.createElement('div');
        card.className = 'faculty-card';
        card.innerHTML = `
            <img src="assets/images/${professor.image}" alt="${professor.name}" class="faculty-img">
            <div class="faculty-info">
                <h3 class="faculty-name">${professor.name}</h3>
                <p class="faculty-title">${professor.title}</p>
                <p class="faculty-research"><strong>Research:</strong> ${professor.research}</p>
                <div class="faculty-contact">
                    <a href="mailto:${professor.email}" title="Email"><i class="fas fa-envelope"></i></a>
                    <a href="tel:${professor.phone}" title="Phone"><i class="fas fa-phone"></i></a>
                    <a href="#" title="Profile"><i class="fas fa-user-graduate"></i></a>
                </div>
            </div>
        `;
        facultyGrid.appendChild(card);
    });
}

function setupSearch(faculty) {
    const searchInput = document.getElementById('facultySearch');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFaculty = faculty.filter(prof => 
            prof.name.toLowerCase().includes(searchTerm) || 
            prof.research.toLowerCase().includes(searchTerm)
        );
        renderFacultyCards(filteredFaculty);
    });
}