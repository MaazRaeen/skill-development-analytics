import { STUDENTS, DEPARTMENTS } from './student-data.js';

let filteredStudents = [...STUDENTS];

async function init() {
    console.log('Initializing Student Management...');
    console.log('Departments found:', DEPARTMENTS?.length);
    console.log('Students found:', STUDENTS?.length);

    if (!STUDENTS || STUDENTS.length === 0) {
        console.error('Critical Error: No student data found in student-data.js');
        return;
    }

    populateDeptFilter();
    renderStudentGroups(filteredStudents);
    setupFilters();
    bindEvents();
    console.log('Student Management Ready.');
}

function populateDeptFilter() {
    const filter = document.getElementById('deptFilter');
    if (!filter) return;
    filter.innerHTML = '<option value="">All Departments</option>' + 
        DEPARTMENTS.map(d => `<option value="${d}">${d}</option>`).join('');
}

function renderStudentGroups(students) {
    const container = document.getElementById('studentGroups');
    if (!container) return;

    if (students.length === 0) {
        container.innerHTML = '<div class="card p-3" style="text-align: center; color: var(--text-muted);">No students found matching your criteria.</div>';
        return;
    }

    const deptsPresent = [...new Set(students.map(s => s.department))].sort();

    container.innerHTML = deptsPresent.map(dept => {
        const deptStudents = students.filter(s => s.department === dept);
        return `
            <section class="dept-section" style="animation: fadeInUp 0.4s ease forwards; opacity: 0;">
                <div class="dept-header">
                    <span>${dept}</span>
                    <small>${deptStudents.length} Students</small>
                </div>
                <div class="student-grid-mini">
                    ${deptStudents.map(s => `
                        <div class="student-card-mini" onclick="window.showStudentProfile('${s.id}')">
                            <img src="${s.profileImage}" style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--hover-bg);">
                            <div style="flex: 1;">
                                <div style="font-weight: 700; color: var(--primary); font-size: 0.9rem;">${s.name}</div>
                                <div style="font-size: 0.7rem; color: var(--text-muted);">${s.email}</div>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-weight: 800; color: var(--primary); font-size: 0.85rem;">${s.gpa}</div>
                                <div style="font-size: 0.65rem; color: var(--text-muted);">GPA</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </section>
        `;
    }).join('');
}

window.showStudentProfile = (id) => {
    window.location.href = `student-performance.html?id=${id}`;
};

function setupFilters() {
    const search = document.getElementById('globalSearch');
    const dept = document.getElementById('deptFilter');

    if (!search || !dept) return;

    const filterHandler = () => {
        const searchTerm = search.value.toLowerCase();
        const deptTerm = dept.value;

        filteredStudents = STUDENTS.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchTerm) || 
                                 s.email.toLowerCase().includes(searchTerm) ||
                                 s.department.toLowerCase().includes(searchTerm);
            const matchesDept = deptTerm === "" || s.department === deptTerm;
            return matchesSearch && matchesDept;
        });

        renderStudentGroups(filteredStudents);
    };

    search.oninput = filterHandler;
    dept.onchange = filterHandler;
}

function bindEvents() {
    const closeBtn = document.getElementById('closeOverlay');
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('studentDetailOverlay').classList.add('hidden');
            document.body.style.overflow = 'auto';
        };
    }

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('studentDetailOverlay');
            if (overlay) {
                overlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Close on click outside
    const overlay = document.getElementById('studentDetailOverlay');
    if (overlay) {
        overlay.onclick = (e) => {
            if (e.target.id === 'studentDetailOverlay') {
                overlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        };
    }
}

init();
