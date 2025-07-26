// State Management
let appState = {
    isLoggedIn: false,
    currentPage: 'home',
    user: {
        name: 'John Doe',
        email: 'john.doe@university.edu',
        major: 'Computer Science',
        year: '3rd Year',
        gpa: 3.8,
        completedCredits: 92,
        requiredCredits: 128
    },
    skills: [
        { name: 'JavaScript', level: 'Advanced', progress: 85 },
        { name: 'React', level: 'Intermediate', progress: 70 },
        { name: 'Python', level: 'Intermediate', progress: 75 },
        { name: 'HTML/CSS', level: 'Advanced', progress: 90 },
        { name: 'Node.js', level: 'Beginner', progress: 45 },
        { name: 'Data Analysis', level: 'Beginner', progress: 30 }
    ],
    projects: [
        { name: 'E-commerce Website', status: 'Completed', tech: ['React', 'Node.js', 'MongoDB'] },
        { name: 'Weather App', status: 'Completed', tech: ['JavaScript', 'API Integration'] },
        { name: 'Portfolio Website', status: 'In Progress', tech: ['HTML', 'CSS', 'JavaScript'] },
        { name: 'Chat Application', status: 'Planning', tech: ['React', 'Socket.io'] }
    ],
    certificates: [
        { name: 'React Developer Certification', issuer: 'Meta', date: '2024-01-15' },
        { name: 'JavaScript Fundamentals', issuer: 'FreeCodeCamp', date: '2023-11-20' },
        { name: 'Web Development Bootcamp', issuer: 'Udemy', date: '2023-09-10' },
        { name: 'Python for Data Science', issuer: 'Coursera', date: '2023-08-05' },
        { name: 'Git Version Control', issuer: 'GitHub', date: '2023-07-12' }
    ]
};

// Initialize Lucide icons
function initializeLucide() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// DOM Elements
const elements = {
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Buttons
    profileBtn: document.getElementById('profile-btn'),
    loginBtn: document.getElementById('login-btn'),
    signupBtn: document.getElementById('signup-btn'),
    getStartedBtn: document.getElementById('get-started-btn'),
    logoutBtn: document.getElementById('logout-btn'),
    
    // Pages
    landingPage: document.getElementById('landing-page'),
    dashboardPage: document.getElementById('dashboard-page'),
    homeContent: document.getElementById('home-content'),
    skillsContent: document.getElementById('skills-content'),
    projectsContent: document.getElementById('projects-content'),
    certificatesContent: document.getElementById('certificates-content'),
    progressContent: document.getElementById('progress-content'),
    
    // Modals
    profileModal: document.getElementById('profile-modal'),
    authModal: document.getElementById('auth-modal'),
    authModalTitle: document.getElementById('auth-modal-title'),
    authForm: document.getElementById('auth-form'),
    authSubmitText: document.getElementById('auth-submit-text'),
    authToggle: document.getElementById('auth-toggle'),
    
    // Modal close buttons
    modalCloses: document.querySelectorAll('.modal-close'),
    modalOverlays: document.querySelectorAll('.modal-overlay')
};

// Utility Functions
function showPage(pageName) {
    // Hide all page contents
    const pageContents = document.querySelectorAll('.page-content');
    pageContents.forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show specific content based on page and login status
    if (appState.isLoggedIn && pageName !== 'home') {
        // Show dashboard layout with specific content
        elements.dashboardPage.classList.remove('hidden');
        showDashboardContent(pageName);
    } else if (appState.isLoggedIn && pageName === 'home') {
        // Show dashboard
        elements.dashboardPage.classList.remove('hidden');
    } else {
        // Show landing page
        elements.landingPage.classList.remove('hidden');
        showLandingContent(pageName);
    }
    
    // Update navigation
    updateNavigation(pageName);
    appState.currentPage = pageName;
}

function showLandingContent(pageName) {
    // Hide all landing content sections
    const contentSections = [
        elements.homeContent,
        elements.skillsContent,
        elements.projectsContent,
        elements.certificatesContent,
        elements.progressContent
    ];
    
    contentSections.forEach(section => {
        if (section) section.classList.add('hidden');
    });
    
    // Show specific content
    switch(pageName) {
        case 'home':
            if (elements.homeContent) elements.homeContent.classList.remove('hidden');
            break;
        case 'skills':
            if (elements.skillsContent) {
                elements.skillsContent.classList.remove('hidden');
                renderSkills();
            }
            break;
        case 'projects':
            if (elements.projectsContent) {
                elements.projectsContent.classList.remove('hidden');
                renderProjects();
            }
            break;
        case 'certificates':
            if (elements.certificatesContent) {
                elements.certificatesContent.classList.remove('hidden');
                renderCertificates();
            }
            break;
        case 'progress':
            if (elements.progressContent) {
                elements.progressContent.classList.remove('hidden');
                renderProgress();
            }
            break;
    }
}

function showDashboardContent(pageName) {
    // This would update the dashboard content based on the page
    // For now, just show the main dashboard
    console.log(`Showing dashboard content for: ${pageName}`);
}

function updateNavigation(activePage) {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === activePage) {
            link.classList.add('active');
        }
    });
}

function showModal(modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function hideAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        hideModal(modal);
    });
}

// Render Functions
function renderSkills() {
    const container = elements.skillsContent.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = appState.skills.map(skill => `
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-white">${skill.name}</h3>
                <span class="px-3 py-1 text-xs rounded-full ${getLevelColor(skill.level)}">${skill.level}</span>
            </div>
            <div class="w-full bg-white/20 rounded-full h-2 mb-2">
                <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500" style="width: ${skill.progress}%"></div>
            </div>
            <p class="text-white/70 text-sm">${skill.progress}% Complete</p>
        </div>
    `).join('');
}

function renderProjects() {
    const container = elements.projectsContent.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = appState.projects.map(project => `
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-white">${project.name}</h3>
                <span class="px-3 py-1 text-xs rounded-full ${getStatusColor(project.status)}">${project.status}</span>
            </div>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.tech.map(tech => `
                    <span class="px-2 py-1 text-xs bg-white/20 text-white rounded">${tech}</span>
                `).join('')}
            </div>
            <button class="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-md hover:from-cyan-600 hover:to-purple-700 transition-all duration-300">
                View Details
            </button>
        </div>
    `).join('');
}

function renderCertificates() {
    const container = elements.certificatesContent.querySelector('.grid');
    if (!container) return;
    
    container.innerHTML = appState.certificates.map(cert => `
        <div class="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div class="flex items-center mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <i data-lucide="award" class="w-6 h-6 text-white"></i>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white">${cert.name}</h3>
                    <p class="text-white/70 text-sm">${cert.issuer}</p>
                </div>
            </div>
            <p class="text-white/60 text-sm">Earned: ${formatDate(cert.date)}</p>
            <button class="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-md hover:from-cyan-600 hover:to-purple-700 transition-all duration-300">
                View Certificate
            </button>
        </div>
    `).join('');
    
    // Re-initialize Lucide icons for new content
    initializeLucide();
}

function renderProgress() {
    const container = elements.progressContent.querySelector('.max-w-4xl');
    if (!container) return;
    
    const overallProgress = Math.round((appState.user.completedCredits / appState.user.requiredCredits) * 100);
    
    container.innerHTML = `
        <div class="space-y-8">
            <!-- Overall Progress -->
            <div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
                <h2 class="text-2xl font-bold text-white mb-6">Academic Progress</h2>
                <div class="grid md:grid-cols-3 gap-6 mb-6">
                    <div class="text-center">
                        <div class="text-3xl font-bold text-cyan-400">${appState.user.gpa}</div>
                        <div class="text-white/70">Current GPA</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-purple-400">${appState.user.completedCredits}</div>
                        <div class="text-white/70">Credits Completed</div>
                    </div>
                    <div class="text-center">
                        <div class="text-3xl font-bold text-pink-400">${overallProgress}%</div>
                        <div class="text-white/70">Progress to Graduation</div>
                    </div>
                </div>
                <div class="w-full bg-white/20 rounded-full h-4">
                    <div class="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 h-4 rounded-full transition-all duration-1000" style="width: ${overallProgress}%"></div>
                </div>
            </div>
            
            <!-- Skills Progress -->
            <div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
                <h2 class="text-2xl font-bold text-white mb-6">Skills Development</h2>
                <div class="space-y-4">
                    ${appState.skills.map(skill => `
                        <div>
                            <div class="flex justify-between text-white mb-2">
                                <span>${skill.name}</span>
                                <span>${skill.progress}%</span>
                            </div>
                            <div class="w-full bg-white/20 rounded-full h-2">
                                <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500" style="width: ${skill.progress}%"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Helper Functions
function getLevelColor(level) {
    switch(level) {
        case 'Advanced': return 'bg-green-500 text-white';
        case 'Intermediate': return 'bg-yellow-500 text-white';
        case 'Beginner': return 'bg-blue-500 text-white';
        default: return 'bg-gray-500 text-white';
    }
}

function getStatusColor(status) {
    switch(status) {
        case 'Completed': return 'bg-green-500 text-white';
        case 'In Progress': return 'bg-yellow-500 text-white';
        case 'Planning': return 'bg-blue-500 text-white';
        default: return 'bg-gray-500 text-white';
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Authentication Functions
function handleLogin(email, password) {
    // Simple authentication simulation
    if (email && password) {
        appState.isLoggedIn = true;
        hideAllModals();
        showPage('home');
        return true;
    }
    return false;
}

function handleSignup(email, password) {
    // Simple signup simulation
    if (email && password) {
        appState.isLoggedIn = true;
        hideAllModals();
        showPage('home');
        return true;
    }
    return false;
}

function handleLogout() {
    appState.isLoggedIn = false;
    showPage('home');
}

// Event Listeners
function setupEventListeners() {
    // Navigation
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            showPage(page);
        });
    });

    // Profile button
    if (elements.profileBtn) {
        elements.profileBtn.addEventListener('click', () => {
            showModal(elements.profileModal);
        });
    }

    // Auth buttons
    if (elements.loginBtn) {
        elements.loginBtn.addEventListener('click', () => {
            setupAuthModal('login');
            showModal(elements.authModal);
        });
    }

    if (elements.signupBtn) {
        elements.signupBtn.addEventListener('click', () => {
            setupAuthModal('signup');
            showModal(elements.authModal);
        });
    }

    if (elements.getStartedBtn) {
        elements.getStartedBtn.addEventListener('click', () => {
            setupAuthModal('signup');
            showModal(elements.authModal);
        });
    }

    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', () => {
            handleLogout();
        });
    }

    // Modal close buttons
    elements.modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            hideAllModals();
        });
    });

    // Modal overlay clicks
    elements.modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            hideAllModals();
        });
    });

    // Auth form
    if (elements.authForm) {
        elements.authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = e.target.querySelector('input[type="email"]').value;
            const password = e.target.querySelector('input[type="password"]').value;
            
            const isLogin = elements.authModalTitle.textContent === 'Login';
            
            if (isLogin) {
                handleLogin(email, password);
            } else {
                handleSignup(email, password);
            }
        });
    }

    // Auth toggle
    if (elements.authToggle) {
        elements.authToggle.addEventListener('click', () => {
            const isLogin = elements.authModalTitle.textContent === 'Login';
            setupAuthModal(isLogin ? 'signup' : 'login');
        });
    }

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideAllModals();
        }
    });
}

function setupAuthModal(type) {
    if (type === 'login') {
        elements.authModalTitle.textContent = 'Login';
        elements.authSubmitText.textContent = 'Login';
        elements.authToggle.textContent = "Don't have an account? Sign up";
    } else {
        elements.authModalTitle.textContent = 'Sign Up';
        elements.authSubmitText.textContent = 'Sign Up';
        elements.authToggle.textContent = 'Already have an account? Login';
    }
}

// Initialize App
function initializeApp() {
    // Initialize Lucide icons
    initializeLucide();
    
    // Setup event listeners
    setupEventListeners();
    
    // Show initial page
    showPage('home');
    
    // Add some delay to ensure icons are loaded
    setTimeout(() => {
        initializeLucide();
    }, 100);
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}