import { STUDENTS } from './student-data.js';

function getStudentId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function init() {
    const studentId = getStudentId();
    const student = STUDENTS.find(s => s.id === studentId);

    if (!student) {
        document.getElementById('performanceContent').innerHTML = `
            <div style="text-align: center; padding: 5rem;">
                <h2 style="color: #f44336;">Student Not Found</h2>
                <a href="students.html" class="btn btn-primary mt-2">Return to Directory</a>
            </div>
        `;
        return;
    }

    renderPerformance(student);
    animatePerformance();
}

function renderPerformance(student) {
    const container = document.getElementById('performanceContent');
    container.innerHTML = `
        <!-- High-Fidelity Header -->
        <div class="performance-header animate-fade">
            <div style="position: relative;">
                <img src="${student.profileImage}" style="width: 160px; height: 160px; border-radius: 50%; border: 8px solid rgba(255,255,255,0.15); box-shadow: 0 15px 35px rgba(0,0,0,0.2);">
                <div style="position: absolute; bottom: 10px; right: 10px; background: #4caf50; width: 30px; height: 30px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1);"></div>
            </div>
            <div style="flex: 1;">
                <h1 style="font-size: 3.2rem; margin-bottom: 0.5rem; font-weight: 800; letter-spacing: -1px;">${student.name}</h1>
                <div style="display: flex; gap: 1.5rem; align-items: center; opacity: 0.9; margin-bottom: 2rem; font-weight: 600;">
                    <span>🎓 ${student.department}</span>
                    <span>📍 ID: ${student.id}</span>
                    <span>📧 ${student.email}</span>
                </div>
                <div style="display: flex; gap: 2rem;">
                    <div style="background: rgba(255,255,255,0.1); padding: 15px 30px; border-radius: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                        <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; opacity: 0.8; margin-bottom: 6px;">CUMULATIVE GPA</div>
                        <div style="font-size: 2.22rem; font-weight: 800;">${student.gpa}</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.1); padding: 15px 30px; border-radius: 20px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                        <div style="font-size: 0.75rem; font-weight: 800; letter-spacing: 1.5px; opacity: 0.8; margin-bottom: 6px;">ATTENDANCE</div>
                        <div style="font-size: 2.22rem; font-weight: 800;">${student.attendance}%</div>
                    </div>
                </div>
            </div>
            <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;">
                <div class="badge" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; font-size: 0.9rem; font-weight: 800; border-radius: 12px; border: 1px solid rgba(255,255,255,0.3);">ACTIVE STATUS</div>
                <div style="font-size: 0.8rem; font-weight: 600; opacity: 0.8;">Rank: Top 5% of Dept.</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem;">
            <!-- Progression Chart -->
            <div class="card p-2" style="position: relative; overflow: hidden;">
                <div class="flex-between" style="margin-bottom: 2.5rem;">
                    <h2 style="color: var(--primary); font-weight: 800; font-size: 1.5rem;">Academic Progression</h2>
                    <div style="color: var(--text-muted); font-size: 0.8rem; font-weight: 700;">Spring 2026 Batch</div>
                </div>
                
                <div class="progression-chart">
                    <div class="progression-node" data-h="62%">
                        <span class="node-label">Fall '24 (S1)</span>
                        <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); font-weight: 800; color: var(--primary); font-size: 0.85rem;">3.10</div>
                    </div>
                    <div class="progression-node" data-h="78%">
                        <span class="node-label">Spring '25 (S2)</span>
                        <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); font-weight: 800; color: var(--primary); font-size: 0.85rem;">3.45</div>
                    </div>
                    <div class="progression-node" data-h="85%">
                        <span class="node-label">Fall '25 (S3)</span>
                        <div style="position: absolute; top: -30px; left: 50%; transform: translateX(-50%); font-weight: 800; color: var(--primary); font-size: 0.85rem;">3.68</div>
                    </div>
                    <div class="progression-node" data-h="${student.gpa * 25}%" style="background: linear-gradient(to top, var(--primary), var(--accent));">
                        <span class="node-label" style="color: var(--primary); font-weight: 800;">Current (S4)</span>
                        <div style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%); font-weight: 900; color: var(--primary); font-size: 1.2rem;">${student.gpa}</div>
                    </div>
                </div>
                <div style="margin-top: 4rem; display: flex; justify-content: center; gap: 3rem; border-top: 1px solid #f0f2f5; padding-top: 2rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">${(student.gpa * 3.5).toFixed(1)}%</div>
                        <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-muted);">GROWTH RATE</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">A+</div>
                        <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-muted);">CURRENT GRADE</div>
                    </div>
                </div>
            </div>

            <!-- Skill Distribution -->
            <div class="card p-2">
                <h2 style="color: var(--primary); font-weight: 800; font-size: 1.5rem; margin-bottom: 2rem;">Competency Map</h2>
                ${student.skills.map(s => `
                    <div style="margin-bottom: 2rem;">
                        <div class="flex-between" style="margin-bottom: 10px;">
                            <span style="font-weight: 800; font-size: 0.9rem; color: var(--text-main);">${s.name.toUpperCase()}</span>
                            <span style="font-weight: 800; color: var(--accent);">${s.level}%</span>
                        </div>
                        <div class="progress-container" style="height: 10px; background: #eaedf2; border-radius: 99px; overflow: hidden;">
                            <div class="progress-bar-h" style="width: 0%; height: 100%; background: var(--primary); transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);" data-w="${s.level}%"></div>
                        </div>
                    </div>
                `).join('')}
                
                <div class="mt-2" style="background: rgba(68, 138, 255, 0.05); padding: 1.5rem; border-radius: 16px; border: 1px dashed var(--accent);">
                    <h4 style="font-size: 0.8rem; font-weight: 800; color: var(--primary); margin-bottom: 8px;">INSIGHTS</h4>
                    <p style="font-size: 0.75rem; color: var(--text-muted); line-height: 1.6;">Matches 94% of top-tier industry requirements for ${student.department} role profiles. Recommendation: Advanced Certification.</p>
                </div>
            </div>
        </div>

        <!-- Academic Record Timeline -->
        <div class="card mt-2">
            <div class="flex-between" style="border-bottom: 1px solid var(--border); padding-bottom: 1.5rem; margin-bottom: 2rem;">
                <h2 style="color: var(--primary); font-weight: 800; font-size: 1.4rem;">Performance History & Faculty Review</h2>
                <div style="display: flex; gap: 10px;">
                    <div class="badge" style="background: #e3f2fd; color: #1565c0; font-weight: 800; font-size: 0.7rem;">SPRING '26</div>
                    <div class="badge" style="background: #f3e5f5; color: #7b1fa2; font-weight: 800; font-size: 0.7rem;">DEAN'S LIST</div>
                </div>
            </div>

            <table class="marks-table">
                <thead>
                    <tr>
                        <th>ASSESSMENT CATEGORY</th>
                        <th>DELIVERY TYPE</th>
                        <th>QUARTILE</th>
                        <th>SCORE</th>
                        <th>REVIEW / FEEDBACK</th>
                    </tr>
                </thead>
                <tbody>
                    ${student.performance.map((p, idx) => `
                        <tr class="anim-row" style="animation-delay: ${0.2 + (idx * 0.1)}s">
                            <td><strong style="font-size: 1rem;">${p.category}</strong></td>
                            <td><span class="badge" style="background: rgba(68, 138, 255, 0.1); color: var(--accent); font-weight: 800; font-size: 0.65rem;">${p.type.toUpperCase()}</span></td>
                            <td>
                                <div style="display: flex; gap: 4px;">
                                    ${[20, 40, 60, 80, 100].map(val => `
                                        <div style="width: 14px; height: 14px; border-radius: 3px; background: ${p.score >= val ? 'var(--primary)' : '#eee'}"></div>
                                    `).join('')}
                                </div>
                            </td>
                            <td><span style="font-size: 1.3rem; font-weight: 900; color: var(--primary);">${p.score}%</span></td>
                            <td style="font-style: italic; color: var(--text-muted); font-size: 0.85rem; max-width: 300px; line-height: 1.5;">"${p.notes}"</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="mt-2 text-muted" style="text-align: center; font-size: 0.7rem; padding-bottom: 3rem;">
            ABC University • Student Performance Management System • Official Transcript Dashboard
        </div>
    `;
}

function animatePerformance() {
    setTimeout(() => {
        // Bar Charts (Vertical)
        document.querySelectorAll('.progression-node').forEach(node => {
            node.style.height = node.getAttribute('data-h');
        });

        // Skill Bars (Horizontal)
        document.querySelectorAll('.progress-bar-h').forEach(bar => {
            bar.style.width = bar.getAttribute('data-w');
        });
    }, 100);
}

init();
