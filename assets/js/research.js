document.addEventListener('DOMContentLoaded', () => {
    // Load research data
    fetchResearchData();
    
    // Setup project filters
    setupProjectFilters();
    
    // Setup publication filters
    setupPublicationFilters();
});

async function fetchResearchData() {
    try {
        const response = await fetch('../data/research.json');
        const data = await response.json();
        renderProjects(data.projects);
        renderPublications(data.publications);
    } catch (error) {
        console.error('Error loading research data:', error);
    }
}

// Projects Functions
function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card ${project.type}`;
        card.innerHTML = `
            <div class="project-image" style="background-image: url('assets/images/${project.image}')"></div>
            <div class="project-info">
                <h4 class="project-title">${project.title}</h4>
                <p class="project-pi"><strong>PI:</strong> ${project.pi}</p>
                <p class="project-desc">${project.description}</p>
                <div class="project-meta">
                    <span class="project-status">${project.status}</span>
                    <span>${project.start} - ${project.end}</span>
                </div>
                ${project.funding ? `<p><strong>Funding:</strong> ${project.funding}</p>` : ''}
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                if (filter === 'all' || project.classList.contains(filter)) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Publications Functions
function renderPublications(pubs) {
    const container = document.getElementById('publicationsList');
    container.innerHTML = '';
    
    pubs.forEach(pub => {
        const item = document.createElement('div');
        item.className = `publication-item ${pub.type} year-${pub.year}`;
        
        let venue = pub.journal ? `<em>${pub.journal}</em>` : pub.conference;
        
        item.innerHTML = `
            <h4 class="pub-title">${pub.title}</h4>
            <p class="pub-authors">${pub.authors}</p>
            <div class="pub-meta">
                <span>${pub.year}</span>
                <span class="pub-type">${pub.type === 'journal' ? 'Journal' : 'Conference'}</span>
                ${pub.doi ? `<span>DOI: ${pub.doi}</span>` : ''}
            </div>
            <div class="pub-links">
                ${pub.pdf ? `<a href="${pub.pdf}" target="_blank"><i class="fas fa-file-pdf"></i> Full Text</a>` : ''}
                ${pub.doi ? `<a href="https://doi.org/${pub.doi}" target="_blank"><i class="fas fa-external-link-alt"></i> DOI</a>` : ''}
            </div>
        `;
        container.appendChild(item);
    });
}

function setupPublicationFilters() {
    const yearFilter = document.getElementById('pubYearFilter');
    const typeFilter = document.getElementById('pubTypeFilter');
    
    [yearFilter, typeFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            const year = yearFilter.value;
            const type = typeFilter.value;
            
            document.querySelectorAll('.publication-item').forEach(item => {
                const showYear = (year === 'all') || item.classList.contains(`year-${year}`);
                const showType = (type === 'all') || item.classList.contains(type);
                
                item.style.display = (showYear && showType) ? 'block' : 'none';
            });
        });
    });
}