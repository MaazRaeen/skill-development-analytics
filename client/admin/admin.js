import { STUDENTS, DEPARTMENTS } from './student-data.js';

let filteredStudents = [...STUDENTS].sort((a, b) => b.gpa - a.gpa).slice(0, 8); // Top 8 for the dashboard

function init() {
    renderStats();
    renderDeptBars();
    renderStudentList(filteredStudents);
    animateCharts();
}

function renderStats() {
    const total = STUDENTS.length;
    const avgGpa = (STUDENTS.reduce((acc, s) => acc + parseFloat(s.gpa), 0) / total).toFixed(2);
    
    animateValue('totalStudents', 0, total, 0);
    animateValue('avgGpa', 0, avgGpa, 2);
}

function renderDeptBars() {
    const container = document.getElementById('deptBars');
    if (!container) return;

    // Get average GPA per department for the top 10 departments
    const deptStats = DEPARTMENTS.slice(0, 10).map(dept => {
        const students = STUDENTS.filter(s => s.department === dept);
        const avg = students.reduce((acc, s) => acc + parseFloat(s.gpa), 0) / (students.length || 1);
        return { name: dept.split(' ')[0], avg: avg.toFixed(2) };
    });

    container.innerHTML = deptStats.map(d => `
        <div class="anim-bar" style="height: 0%;" data-height="${(d.avg / 4) * 100}%">
            <span class="bar-label">${d.name}</span>
            <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.6rem; font-weight: 800; color: var(--primary);">${d.avg}</div>
        </div>
    `).join('');
}

function animateCharts() {
    setTimeout(() => {
        document.querySelectorAll('.anim-bar').forEach(bar => {
            bar.style.height = bar.getAttribute('data-height');
        });
    }, 300);
}

function renderStudentList(students) {
    const list = document.getElementById('studentList');
    if (!list) return;

    list.innerHTML = students.map(student => `
        <tr class="anim-row">
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${student.profileImage}" style="width: 38px; height: 38px; border-radius: 50%; border: 2px solid #e8eaf6;">
                    <div>
                        <div style="font-weight: 700; color: var(--primary); font-size: 0.9rem;">${student.name}</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${student.email}</div>
                    </div>
                </div>
            </td>
            <td><span style="font-size: 0.8rem; font-weight: 600;">${student.department}</span></td>
            <td>
                <span class="badge" style="background: rgba(76, 175, 80, 0.1); color: #4caf50; font-weight: 800; font-size: 0.65rem;">
                    EXCELLENT
                </span>
            </td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="font-weight: 800; color: var(--primary);">${student.gpa}</div>
                    <div class="progress-container" style="width: 40px; height: 4px; background: #eee;">
                        <div class="progress-bar" style="width: ${(student.gpa/4)*100}%;"></div>
                    </div>
                </div>
            </td>
            <td>
                <a href="student-performance.html?id=${student.id}" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.75rem;">View Profile</a>
            </td>
        </tr>
    `).join('');
}

function animateValue(id, start, end, decimals) {
    const obj = document.getElementById(id);
    if (!obj) return;
    const duration = 1500;
    const startTime = performance.now();
    
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease out
        const current = (ease * (parseFloat(end) - start) + start).toFixed(decimals);
        obj.innerText = current;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

init();
