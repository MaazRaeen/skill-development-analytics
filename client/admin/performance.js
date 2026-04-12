import { STUDENTS } from './student-data.js';

function getStudentId() {
    return new URLSearchParams(window.location.search).get('id');
}

function init() {
    const sId = getStudentId();
    const student = STUDENTS.find(s => s.id === sId);
    if (!student) return;

    renderSaaSLayout(student);
    animateSaaSCharts();
}

function renderSaaSLayout(s) {
    const container = document.getElementById('performanceContent');
    container.innerHTML = `
        <div class="flex-between">
            <div>
                <h1 style="font-size: 1.8rem; font-weight: 900; color: var(--primary); letter-spacing: -0.5px;">${s.name}</h1>
                <p style="color: var(--text-muted); font-size: 0.85rem; font-weight: 700;">Student Analytics Cockpit • ${s.department}</p>
            </div>
            <div style="display: flex; gap: 1rem;">
                <div class="badge" style="background: rgba(26, 35, 126, 0.05); color: var(--primary); font-size: 0.75rem; border: 1px solid var(--border);">Active Portfolio</div>
            </div>
        </div>

        <!-- Top Row Grid (Main Visuals) -->
        <div class="performance-grid-top" style="flex: 1; min-height: 0;">
            <!-- Multi-Ring Card -->
            <div class="card" style="display: flex; flex-direction: column;">
                <h4 style="font-size: 0.8rem; font-weight: 800; margin-bottom: 1rem; color: var(--text-muted);">TOP COMPETENCIES</h4>
                <div class="ring-chart-container" style="flex: 1; display: flex; align-items: center; justify-content: center;">
                    <div style="position: relative; width: 160px; height: 160px;">
                        <svg class="ring-svg" width="160" height="160" viewBox="0 0 100 100">
                            ${s.skills.map((skill, i) => {
                                const radius = 40 - (i * 10);
                                const circum = 2 * Math.PI * radius;
                                return `
                                    <circle class="ring-path" cx="50" cy="50" r="${radius}" 
                                        stroke="var(--ring-${i + 1})" 
                                        stroke-dasharray="${circum}" 
                                        stroke-dashoffset="${circum}"
                                        data-val="${skill.level}" data-c="${circum}" />
                                `;
                            }).join('')}
                        </svg>
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                            <div style="font-size: 1.2rem; font-weight: 900;">${s.gpa}</div>
                            <div style="font-size: 0.5rem; color: var(--text-muted); font-weight: 800;">GPA INDEX</div>
                        </div>
                    </div>
                </div>
                <div style="margin-top: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                    ${s.skills.slice(0, 4).map((skill, i) => `
                        <div style="font-size: 0.65rem; font-weight: 800; display: flex; align-items: center; gap: 6px;">
                            <span style="width: 6px; height: 12px; background: var(--ring-${i + 1}); border-radius: 2px; display: block;"></span>
                            ${skill.name}
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Wave Chart Card -->
            <div class="card" style="display: flex; flex-direction: column;">
                <div class="flex-between" style="margin-bottom: 1rem;">
                    <h4 style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted);">GROWTH CURVE</h4>
                    <span class="badge" style="background: rgba(76, 175, 80, 0.1); color: var(--success); font-size: 0.65rem;">+12% TREND</span>
                </div>
                <div class="wave-container" style="flex: 1; min-height: 100px;">
                    <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style="stop-color: var(--success); stop-opacity: 0.3" />
                                <stop offset="100%" style="stop-color: white; stop-opacity: 0" />
                            </linearGradient>
                        </defs>
                        <path d="M0,100 Q40,40 100,80 T200,30 T300,60 V120 H0 Z" fill="url(#waveGrad)" />
                        <path id="wavePath" d="M0,100 Q40,40 100,80 T200,30 T300,60" fill="none" stroke="var(--success)" stroke-width="3" />
                    </svg>
                </div>
                <div style="display: flex; justify-content: space-around; padding-top: 1rem; border-top: 1px solid var(--border);">
                    <div style="text-align: center;">
                        <div style="font-weight: 900; font-size: 1rem; color: var(--primary);">A+</div>
                        <div style="font-size: 0.55rem; color: var(--text-muted); font-weight: 800;">ACADEMIC TIER</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-weight: 900; font-size: 1rem; color: var(--primary);">94%</div>
                        <div style="font-size: 0.55rem; color: var(--text-muted); font-weight: 800;">RECRUITER RATING</div>
                    </div>
                </div>
            </div>

            <!-- Split Bar Card -->
            <div class="card" style="display: flex; flex-direction: column;">
                <h4 style="font-size: 0.8rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text-muted);">ENGAGEMENT VS CREDITS</h4>
                <div class="split-bar-group" style="flex: 1; align-items: flex-end; padding-bottom: 10px;">
                    ${[0.8, 0.9, 0.75, 0.65, 0.85, 0.95].map((v, i) => `
                        <div class="split-bar-wrapper">
                            <div class="bar-top" style="height: 0%;" data-h="${v * 50}%"></div>
                            <div style="height: 4px;"></div>
                            <div class="bar-bottom" style="height: 0%; m" data-h="${(1 - v) * 40}%"></div>
                            <div style="margin-top: 6px; font-size: 0.55rem; color: var(--text-muted); font-weight: 800;">W${i + 1}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- KPI Row (Footer Section of Dashboard) -->
        <div class="performance-kpi-row" style="flex-shrink: 0;">
            <div class="card" style="padding: 1rem;">
                <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-muted);">GPA INDEX</div>
                <div style="font-size: 1.4rem; font-weight: 900; margin: 4px 0; color: var(--primary);">${s.gpa}</div>
                <svg class="pulse-svg" viewBox="0 0 100 30" style="height: 20px;"><path d="M0,20 L10,15 L20,25 L30,5 L40,25 L50,15 L100,10" /></svg>
            </div>
            <div class="card" style="padding: 1rem;">
                <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-muted);">ATTENDANCE</div>
                <div style="font-size: 1.4rem; font-weight: 900; margin: 4px 0; color: var(--primary);">${s.attendance}%</div>
                <svg class="pulse-svg" viewBox="0 0 100 30" style="height: 20px;"><path d="M0,10 L10,20 L20,10 L30,20 L100,20" style="stroke: #ff9800" /></svg>
            </div>
            <div class="card" style="padding: 1rem;">
                <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-muted);">MIP READINESS</div>
                <div style="font-size: 1.4rem; font-weight: 900; margin: 4px 0; color: var(--primary);">${s.softSkills.mip}%</div>
                <svg class="pulse-svg" viewBox="0 0 100 30" style="height: 20px;"><path d="M0,25 Q25,5 50,25 T100,5" style="stroke: #4caf50" /></svg>
            </div>
            <div class="card" style="padding: 1rem;">
                <div style="font-size: 0.65rem; font-weight: 800; color: var(--text-muted);">GD PERFORMANCE</div>
                <div style="font-size: 1.4rem; font-weight: 900; margin: 4px 0; color: var(--primary);">${s.softSkills.gd}%</div>
                <svg class="pulse-svg" viewBox="0 0 100 30" style="height: 20px;"><path d="M0,5 L100,25" style="stroke: #1a237e" /></svg>
            </div>
        </div>

        <!-- Expansion Trigger -->
        <div class="details-trigger-container">
            <button class="btn btn-primary" onclick="window.location.href='soft-details.html?id=${s.id}'" style="width: 100%; max-width: 400px; padding: 1.2rem; border-radius: 99px; font-size: 0.9rem; letter-spacing: 1px; box-shadow: 0 15px 35px rgba(26, 35, 126, 0.25);">
                SHOW SOFT SKILLS & PERFORMANCE DETAILS ›
            </button>
        </div>
    `;
}

function animateSaaSCharts() {
    setTimeout(() => {
        // Rings
        document.querySelectorAll('.ring-path').forEach(path => {
            const val = path.getAttribute('data-val');
            const circum = parseFloat(path.getAttribute('data-c'));
            const offset = circum - (val / 100) * circum;
            path.style.strokeDashoffset = offset;
        });

        // Split Bars
        document.querySelectorAll('.bar-top, .bar-bottom').forEach(bar => {
            bar.style.height = bar.getAttribute('data-h');
        });

        // Pulse Paths
        document.querySelectorAll('.pulse-svg path').forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)';
            path.getBoundingClientRect();
            path.style.strokeDashoffset = 0;
        });
    }, 200);
}

init();
