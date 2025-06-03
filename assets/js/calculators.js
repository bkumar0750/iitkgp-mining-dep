document.addEventListener('DOMContentLoaded', () => {
    fetchFormulas();
    setupFilters();
});

async function fetchFormulas() {
    try {
        const response = await fetch('../data/formulas.json');
        const data = await response.json();
        renderCalculators(data.formulas);
    } catch (error) {
        console.error('Error loading formulas:', error);
    }
}

function renderCalculators(formulas) {
    const grid = document.getElementById('calculatorsGrid');
    grid.innerHTML = '';
    
    formulas.forEach(formula => {
        const calc = document.createElement('div');
        calc.className = `calculator-card year-${formula.year} ${formula.subject}`;
        calc.innerHTML = `
            <h3>${formula.name}</h3>
            <div class="formula-display">
                <p>${formula.formula}</p>
                <div class="latex-formula">$$${formula.latex}$$</div>
            </div>
            <div class="calculator-form">
                ${formula.inputs.map(input => `
                    <label>${input.label}</label>
                    <input type="${input.type}" id="${formula.id}_${input.name}" placeholder="Enter value">
                `).join('')}
                ${formula.constants ? formula.constants.map(c => `
                    <p class="constant"><small>${c.description} = ${c.value}</small></p>
                `).join('') : ''}
                <button onclick="calculateFormula(${formula.id})">Calculate</button>
                <div class="result" id="result_${formula.id}"></div>
            </div>
        `;
        grid.appendChild(calc);
    });
}

function setupFilters() {
    // Year filter
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.year-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const year = btn.getAttribute('data-year');
            filterCalculators(year, document.getElementById('subjectFilter').value);
        });
    });
    
    // Subject filter
    document.getElementById('subjectFilter').addEventListener('change', (e) => {
        const year = document.querySelector('.year-btn.active').getAttribute('data-year');
        filterCalculators(year, e.target.value);
    });
}

function filterCalculators(year, subject) {
    document.querySelectorAll('.calculator-card').forEach(card => {
        const showYear = (year === 'all') || card.classList.contains(`year-${year}`);
        const showSubject = (subject === 'all') || card.classList.contains(subject);
        
        card.style.display = (showYear && showSubject) ? 'block' : 'none';
    });
}

// Global function for calculation
function calculateFormula(id) {
    fetch('../data/formulas.json')
        .then(response => response.json())
        .then(data => {
            const formula = data.formulas.find(f => f.id === id);
            if (formula) {
                const inputs = {};
                formula.inputs.forEach(input => {
                    const value = parseFloat(document.getElementById(`${id}_${input.name}`).value);
                    if (isNaN(value)) {
                        alert(`Please enter valid ${input.label}`);
                        return;
                    }
                    inputs[input.name] = value;
                });
                
                // WARNING: Using eval is generally unsafe, but acceptable here for educational purposes
                // In production, use a proper expression evaluator library
                const result = eval(formula.calculation);
                
                document.getElementById(`result_${id}`).innerHTML = `
                    Result: ${result.toFixed(4)} ${formula.unit}
                    <div class="latex-formula">$$\\text{Result} = ${result.toFixed(4)}~\\text{${formula.unit}}$$</div>
                `;
                
                // Re-render MathJax
                if (window.MathJax) {
                    MathJax.typeset();
                }
            }
        });
}