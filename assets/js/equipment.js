document.addEventListener('DOMContentLoaded', () => {
    fetchEquipmentData();
    setupCategoryTabs();
});

async function fetchEquipmentData() {
    try {
        const response = await fetch('../data/equipment.json');
        const equipment = await response.json();
        renderEquipment(equipment);
        setupModal();
    } catch (error) {
        console.error('Error loading equipment data:', error);
    }
}

function renderEquipment(equipment) {
    const grid = document.getElementById('equipmentGrid');
    grid.innerHTML = '';
    
    equipment.forEach(item => {
        const card = document.createElement('div');
        card.className = `equipment-card ${item.category}`;
        card.innerHTML = `
            <img src="assets/images/${item.image}" alt="${item.name}" class="equipment-img">
            <div class="equipment-info">
                <h3>${item.name}</h3>
                <button class="view-details" data-id="${item.id}">View Details</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            const cards = document.querySelectorAll('.equipment-card');
            
            cards.forEach(card => {
                if (category === 'all' || card.classList.contains(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function setupModal() {
    const modal = document.getElementById('equipmentModal');
    const closeBtn = document.querySelector('.close-btn');
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            showEquipmentDetails(id);
        }
    });
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

async function showEquipmentDetails(id) {
    const response = await fetch('../data/equipment.json');
    const equipment = await response.json();
    const item = equipment.find(e => e.id === id);
    
    if (item) {
        document.getElementById('modalImage').src = `assets/images/${item.image}`;
        document.getElementById('modalTitle').textContent = item.name;
        
        const specsList = document.getElementById('modalSpecs');
        specsList.innerHTML = item.specs.map(spec => `<li>${spec}</li>`).join('');
        
        document.getElementById('modalUsage').textContent = item.usage;
        
        const appsList = document.getElementById('modalApplications');
        appsList.innerHTML = item.applications.map(app => `<li>${app}</li>`).join('');
        
        document.getElementById('equipmentModal').style.display = 'block';
    }
}