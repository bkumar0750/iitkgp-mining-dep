document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality for UG/PG/PhD programs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Load courses for the active tab
            loadCourses(tabId);
        });
    });
    
    // Semester tabs for UG courses
    const semesterButtons = document.querySelectorAll('.semester-btn');
    semesterButtons.forEach(button => {
        button.addEventListener('click', () => {
            semesterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadCourses('ug', button.getAttribute('data-semester'));
        });
    });
    
    // Specialization tabs for PG courses
    const specializationButtons = document.querySelectorAll('.specialization-btn');
    specializationButtons.forEach(button => {
        button.addEventListener('click', () => {
            specializationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadCourses('pg', button.getAttribute('data-specialization'));
        });
    });
    
    // Research tabs for PhD courses
    const researchButtons = document.querySelectorAll('.research-btn');
    researchButtons.forEach(button => {
        button.addEventListener('click', () => {
            researchButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadCourses('phd', button.getAttribute('data-research'));
        });
    });
    
    // Resource tabs in modal
    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourceSections = document.querySelectorAll('.resource-section');
    
    resourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            resourceTabs.forEach(t => t.classList.remove('active'));
            resourceSections.forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            const resourceId = tab.getAttribute('data-resource') + '-section';
            document.getElementById(resourceId).classList.add('active');
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('resourcesModal');
    const closeModal = document.querySelector('.close-modal');
    const resourceButtons = document.querySelectorAll('.resources-btn');
    
    resourceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const courseCard = button.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-card-header h4').textContent;
            const courseCode = courseCard.querySelector('.course-code').textContent;
            const courseProf = courseCard.querySelector('.course-prof').textContent;
            
            document.getElementById('modalCourseTitle').textContent = courseTitle;
            document.getElementById('modalCourseCode').textContent = courseCode;
            document.getElementById('modalCourseProf').textContent = courseProf;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    const navList = navbar.querySelector('ul');
    
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('show');
        });
    });
    
    // Load initial courses (UG 1st semester by default)
    loadCourses('ug', '1');
});

// Course data - this would typically come from a database in a real application
const courseData = {
    ug: {
        '1': [
            {
                code: 'MN101',
                title: 'Introduction to Mining Engineering',
                prof: 'Prof. S. Bhattacharya',
                credits: '3-0-0-6',
                desc: 'Fundamental concepts, historical development, and scope of mining engineering. Covers basic mining methods, equipment, and safety considerations.'
            },
            {
                code: 'MN102',
                title: 'Engineering Geology',
                prof: 'Prof. A. Kumar',
                credits: '3-0-0-6',
                desc: 'Geological principles applied to mining and mineral exploration. Study of rock formations, structural geology, and their impact on mining operations.'
            },
            {
                code: 'MN103',
                title: 'Minerals and Rocks',
                prof: 'Prof. R. Sharma',
                credits: '3-0-0-6',
                desc: 'Classification, properties and identification of minerals and rocks. Laboratory sessions include hands-on mineral identification techniques.'
            },
            {
                code: 'MN104',
                title: 'Mathematics for Mining Engineers',
                prof: 'Prof. N. Das',
                credits: '3-1-0-8',
                desc: 'Mathematical concepts and techniques relevant to mining engineering problems. Includes calculus, differential equations, and numerical methods.'
            }
        ],
        '2': [
            {
                code: 'MN201',
                title: 'Mine Surveying',
                prof: 'Prof. P. Das',
                credits: '2-0-3-7',
                desc: 'Principles and techniques of mine surveying and mapping. Practical training in surveying instruments and data interpretation.'
            },
            {
                code: 'MN202',
                title: 'Rock Mechanics',
                prof: 'Prof. N. Singh',
                credits: '3-0-0-6',
                desc: 'Behavior of rock masses under various stress conditions. Laboratory testing of rock properties and failure mechanisms.'
            },
            {
                code: 'MN203',
                title: 'Mineral Processing',
                prof: 'Prof. M. Gupta',
                credits: '3-0-0-6',
                desc: 'Principles of mineral beneficiation and processing techniques. Study of comminution, classification, and separation methods.'
            },
            {
                code: 'MN204',
                title: 'Mining Geology',
                prof: 'Prof. S. Roy',
                credits: '3-0-0-6',
                desc: 'Application of geological principles to mine planning and development. Ore body characterization and reserve estimation.'
            }
        ],
        '3': [
            {
                code: 'MN301',
                title: 'Underground Mining Methods',
                prof: 'Prof. S. Mukherjee',
                credits: '3-0-0-6',
                desc: 'Design and operation of underground mining systems. Study of various methods including room-and-pillar, longwall, and block caving.'
            },
            {
                code: 'MN302',
                title: 'Surface Mining',
                prof: 'Prof. A. Chatterjee',
                credits: '3-0-0-6',
                desc: 'Open pit and strip mining methods and equipment. Design of surface mines and optimization of operations.'
            },
            {
                code: 'MN303',
                title: 'Mine Ventilation',
                prof: 'Prof. D. Banerjee',
                credits: '3-0-0-6',
                desc: 'Design and management of mine ventilation systems. Airflow analysis, fan selection, and gas control measures.'
            },
            {
                code: 'MN304',
                title: 'Drilling and Blasting',
                prof: 'Prof. R. Nandi',
                credits: '3-0-0-6',
                desc: 'Techniques of rock drilling and explosive applications in mining. Blast design, safety protocols, and environmental considerations.'
            }
        ],
        '4': [
            {
                code: 'MN401',
                title: 'Mine Planning',
                prof: 'Prof. K. Roy',
                credits: '3-0-0-6',
                desc: 'Strategic and operational planning of mining operations. Computer applications in mine planning and scheduling.'
            },
            {
                code: 'MN402',
                title: 'Mine Economics',
                prof: 'Prof. S. Ghosh',
                credits: '3-0-0-6',
                desc: 'Economic evaluation and feasibility studies of mining projects. Cost estimation, financial analysis, and risk assessment.'
            },
            {
                code: 'MN403',
                title: 'Mine Safety',
                prof: 'Prof. P. Nandi',
                credits: '3-0-0-6',
                desc: 'Safety regulations, risk assessment and management in mines. Case studies of mining accidents and prevention strategies.'
            },
            {
                code: 'MN404',
                title: 'Environmental Management in Mining',
                prof: 'Prof. A. Sen',
                credits: '3-0-0-6',
                desc: 'Environmental impacts of mining and mitigation measures. Mine closure planning and rehabilitation techniques.'
            }
        ],
        '5': [
            {
                code: 'MN501',
                title: 'Project Work',
                prof: 'Various Professors',
                credits: '0-0-12-12',
                desc: 'Independent research project under faculty supervision. Requires original work and formal presentation of results.'
            },
            {
                code: 'MN502',
                title: 'Industrial Training',
                prof: 'Industry Experts',
                credits: '0-0-4-4',
                desc: 'Practical training in mining operations and management. Six-week internship in mining companies with evaluation report.'
            },
            {
                code: 'MN503',
                title: 'Advanced Topics in Mining',
                prof: 'Visiting Faculty',
                credits: '3-0-0-6',
                desc: 'Specialized topics in emerging areas of mining engineering. Recent developments and future trends in the industry.'
            },
            {
                code: 'MN504',
                title: 'Mine Legislation',
                prof: 'Prof. S. Basu',
                credits: '3-0-0-6',
                desc: 'Legal framework governing mining operations. Study of mining laws, regulations, and compliance requirements.'
            }
        ]
    },
    pg: {
        'mining': [
            {
                code: 'MN601',
                title: 'Advanced Rock Mechanics',
                prof: 'Prof. S. Pal',
                credits: '3-0-0-6',
                desc: 'Advanced concepts in rock behavior and numerical modeling. Application to complex mining problems and case studies.'
            },
            {
                code: 'MN602',
                title: 'Mine Design & Planning',
                prof: 'Prof. R. Das',
                credits: '3-0-0-6',
                desc: 'Optimization techniques in mine design and planning. Use of specialized software for mine planning and simulation.'
            },
            {
                code: 'MN603',
                title: 'Mine Automation',
                prof: 'Prof. A. Sen',
                credits: '3-0-0-6',
                desc: 'Automation and robotics applications in mining. Study of autonomous vehicles, remote operation, and smart mining systems.'
            },
            {
                code: 'MN604',
                title: 'Advanced Mineral Economics',
                prof: 'Prof. M. Banerjee',
                credits: '3-0-0-6',
                desc: 'Advanced economic analysis of mining projects. Commodity markets, investment strategies, and risk management.'
            }
        ],
        'rock': [
            {
                code: 'MN611',
                title: 'Rock Slope Engineering',
                prof: 'Prof. N. Ghosh',
                credits: '3-0-0-6',
                desc: 'Stability analysis and design of rock slopes. Monitoring techniques and stabilization methods for unstable slopes.'
            },
            {
                code: 'MN612',
                title: 'Tunneling Technology',
                prof: 'Prof. P. Basu',
                credits: '3-0-0-6',
                desc: 'Design and construction of tunnels in rock masses. Tunnel boring machines, support systems, and safety considerations.'
            },
            {
                code: 'MN613',
                title: 'Numerical Modeling in Rock Mechanics',
                prof: 'Prof. S. Dey',
                credits: '3-0-0-6',
                desc: 'Finite element and discrete element modeling of rock structures. Practical applications using industry-standard software.'
            },
            {
                code: 'MN614',
                title: 'Ground Control',
                prof: 'Prof. A. Mukherjee',
                credits: '3-0-0-6',
                desc: 'Techniques for ground support in underground excavations. Rock bolting, shotcreting, and other support systems.'
            }
        ],
        'mineral': [
            {
                code: 'MN621',
                title: 'Advanced Mineral Processing',
                prof: 'Prof. M. Bose',
                credits: '3-0-0-6',
                desc: 'Modern techniques in mineral separation and beneficiation. Flotation, magnetic separation, and other advanced methods.'
            },
            {
                code: 'MN622',
                title: 'Coal Preparation',
                prof: 'Prof. S. Mitra',
                credits: '3-0-0-6',
                desc: 'Technologies for coal cleaning and quality improvement. Coal washing, dewatering, and quality control processes.'
            },
            {
                code: 'MN623',
                title: 'Mineral Economics',
                prof: 'Prof. A. Roy',
                credits: '3-0-0-6',
                desc: 'Economic aspects of mineral exploration and production. Market analysis, pricing mechanisms, and policy impacts.'
            },
            {
                code: 'MN624',
                title: 'Process Mineralogy',
                prof: 'Prof. R. Chakraborty',
                credits: '3-0-0-6',
                desc: 'Application of mineralogical knowledge to processing problems. Ore characterization and its impact on beneficiation.'
            }
        ]
    },
    phd: {
        'general': [
            {
                code: 'PhD Area',
                title: 'Rock Mechanics and Ground Control',
                prof: 'Various Supervisors',
                credits: 'Research',
                desc: 'Advanced studies in rock behavior, support systems and stability analysis. Both theoretical and experimental approaches.'
            },
            {
                code: 'PhD Area',
                title: 'Mine Automation and Robotics',
                prof: 'Various Supervisors',
                credits: 'Research',
                desc: 'Development of autonomous systems for mining applications. Includes AI, machine learning, and IoT applications in mining.'
            },
            {
                code: 'PhD Area',
                title: 'Sustainable Mining Practices',
                prof: 'Various Supervisors',
                credits: 'Research',
                desc: 'Environmental management and sustainable resource extraction. Studies on mine rehabilitation, waste management, and green mining.'
            },
            {
                code: 'PhD Area',
                title: 'Mineral Processing Innovations',
                prof: 'Various Supervisors',
                credits: 'Research',
                desc: 'Development of new techniques for mineral separation and recovery. Focus on efficiency, environmental impact, and cost reduction.'
            }
        ],
        'current': [
            {
                code: 'Current Project',
                title: 'AI in Mineral Exploration',
                prof: 'Prof. S. Chatterjee',
                credits: 'Ongoing',
                desc: 'Machine learning applications for mineral deposit identification. Integration of geological data with AI algorithms for exploration targeting.'
            },
            {
                code: 'Current Project',
                title: 'Deep Underground Mining',
                prof: 'Prof. A. Mukhopadhyay',
                credits: 'Ongoing',
                desc: 'Challenges and solutions for mining at great depths. Studies on rockburst prediction, cooling systems, and material transport.'
            },
            {
                code: 'Current Project',
                title: 'Mine Waste Utilization',
                prof: 'Prof. R. Banerjee',
                credits: 'Ongoing',
                desc: 'Innovative uses of mining waste materials. Research on converting mine waste into construction materials and other products.'
            },
            {
                code: 'Current Project',
                title: 'Underground Space Utilization',
                prof: 'Prof. D. Sen',
                credits: 'Ongoing',
                desc: 'Alternative uses of abandoned mines and underground spaces. Studies on energy storage, data centers, and urban development.'
            }
        ]
    }
};

// Function to load courses into the appropriate container
function loadCourses(program, subCategory = null) {
    let courses = [];
    const containerId = program + 'Courses';
    const container = document.getElementById(containerId);
    
    if (subCategory) {
        courses = courseData[program][subCategory];
    } else {
        // Get first category's courses as default
        const firstCategory = Object.keys(courseData[program])[0];
        courses = courseData[program][firstCategory];
    }
    
    // Clear existing courses
    container.innerHTML = '';
    
    // Add new courses
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class="course-card-header">
                <h4>${course.title}</h4>
            </div>
            <div class="course-card-body">
                <span class="course-code">${course.code}</span>
                <p class="course-prof"><strong>Professor:</strong> ${course.prof}</p>
                <p class="course-prof"><strong>Credits:</strong> ${course.credits}</p>
                <p class="course-desc">${course.desc}</p>
                <a href="#" class="resources-btn">View Resources</a>
            </div>
        `;
        
        container.appendChild(courseCard);
    });
    
    // Add event listeners to the new resource buttons
    document.querySelectorAll('.resources-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const courseCard = button.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-card-header h4').textContent;
            const courseCode = courseCard.querySelector('.course-code').textContent;
            const courseProf = courseCard.querySelectorAll('.course-prof')[0].textContent;
            const courseCredits = courseCard.querySelectorAll('.course-prof')[1].textContent;
            
            document.getElementById('modalCourseTitle').textContent = courseTitle;
            document.getElementById('modalCourseCode').textContent = courseCode;
            document.getElementById('modalCourseProf').textContent = courseProf;
            document.getElementById('modalCourseCredits').textContent = courseCredits;
            
            document.getElementById('resourcesModal').style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
}