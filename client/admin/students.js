import { STUDENTS, DEPARTMENTS } from './student-data.js';

let filteredStudents = [...STUDENTS];

function init() {
    console.log('Initializing Student Management (Table Version)...');
    
    if (!STUDENTS || STUDENTS.length === 0) {
        console.error('Critical Error: No student data found.');
        return;
    }

    populateDeptFilter();
    renderStudentTable(filteredStudents);
    setupFilters();
}

function populateDeptFilter() {
    const filter = document.getElementById('deptFilter');
    if (!filter) return;
    
    // Clear and re-populate
    filter.innerHTML = '<option value="">All Departments</option>' + 
        DEPARTMENTS.map(d => `<option value="${d}">${d}</option>`).join('');
}

function renderStudentTable(students) {
    const tableBody = document.getElementById('studentTableBody');
    const countBadge = document.getElementById('studentCount');
    
    if (!tableBody) {
        console.error('Table body element "studentTableBody" not found.');
        return;
    }

    // Update count
    if (countBadge) {
        countBadge.innerText = `${students.length} TOTAL STUDENTS`;
    }

    if (students.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 3rem; color: var(--text-muted);">
                    No students matching the criteria were found.
                </td>
            </tr>
        `;
        return;
    }

    // Render Rows
    tableBody.innerHTML = students.map((s, idx) => `
        <tr class="anim-row" style="animation-delay: ${idx * 0.02}s">
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${s.profileImage}" style="width: 40px; height: 40px; border-radius: 10px; border: 2px solid var(--bg-main);">
                    <div>
                        <div style="font-weight: 800; color: var(--primary); font-size: 0.95rem;">${s.name}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${s.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge" style="background: var(--bg-main); color: var(--primary); font-weight: 700;">${s.department}</span>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 40px; height: 6px; background: #eee; border-radius: 3px; overflow: hidden;">
                        <div style="width: ${s.gpa * 25}%; height: 100%; background: var(--primary-light);"></div>
                    </div>
                    <span style="font-weight: 900; color: var(--primary); font-size: 1.1rem;">${s.gpa}</span>
                </div>
            </td>
            <td>
                <button class="btn btn-secondary" onclick="window.showPerformance('${s.id}')" style="font-size: 0.75rem; font-weight: 800; padding: 10px 20px;">
                    VIEW ANALYTICS ›
                </button>
            </td>
        </tr>
    `).join('');
}

window.showPerformance = (id) => {
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
                                 s.id.toLowerCase().includes(searchTerm);
            const matchesDept = deptTerm === "" || s.department === deptTerm;
            return matchesSearch && matchesDept;
        });

        renderStudentTable(filteredStudents);
    };

    search.oninput = filterHandler;
    dept.onchange = filterHandler;
}

init();
