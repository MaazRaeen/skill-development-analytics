import { STUDENTS } from './student-data.js';

function getStudentId() {
    return new URLSearchParams(window.location.search).get('id');
}

function init() {
    const sId = getStudentId();
    const student = STUDENTS.find(s => s.id === sId);
    if (!student) return;

    renderSoftDetails(student);
    animateSoftCharts();
}

function renderSoftDetails(s) {
    const container = document.getElementById('softDetailsContent');
    container.innerHTML = `
        <div class="detail-header animate-fade">
            <h1 style="font-size: 3.2rem; font-weight: 900; letter-spacing: -2px; margin-bottom: 0.5rem; color: #111;">${s.name}</h1>
            <p style="font-size: 1.1rem; color: #777; font-weight: 600;">Deep-Dive Analysis: Mock Interviews, Group Discussions & Academic Records</p>
        </div>

        <!-- Analytical Grid -->
        <div class="skill-grid-detail">
            <!-- MIP Readiness Gauge -->
            <div class="detail-card" style="text-align: center;">
                <h3 style="font-weight: 900; margin-bottom: 2.5rem; font-size: 1rem; color: #555;">MOCK INTERVIEW READINESS (MIP)</h3>
                <div style="position: relative;">
                    <svg class="gauge-svg" viewBox="0 0 100 55">
                        <path class="gauge-bg" d="M10,50 A40,40 0 0,1 90,50" />
                        <path id="mipGauge" class="gauge-fill" d="M10,50 A40,40 0 0,1 90,50" 
                            stroke-dasharray="126" stroke-dashoffset="126" />
                    </svg>
                    <div style="font-size: 3.5rem; font-weight: 900; margin-top: -20px; color: var(--primary);">${s.softSkills.mip}%</div>
                    <div style="font-size: 0.75rem; font-weight: 800; color: var(--success); text-transform: uppercase;">Interview Ready</div>
                </div>
                <p style="margin-top: 2rem; font-size: 0.85rem; color: #888; line-height: 1.6;">Based on verbal articulation, technical accuracy, and response structure during simulated corporate rounds.</p>
            </div>

            <!-- Weekly Test Progression -->
            <div class="detail-card">
                <h3 style="font-weight: 900; margin-bottom: 0.5rem; font-size: 1rem; color: #555;">WEEKLY ASSESSMENT PROGRESSION</h3>
                <p style="font-size: 0.75rem; color: #999; margin-bottom: 2rem;">Discrete tracking of cycle scores (Last 5 Assessments)</p>
                <div class="step-chart-container">
                    <svg width="100%" height="150" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <path id="stepPath" class="step-path" d="" />
                    </svg>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 1rem; font-weight: 900; font-size: 0.65rem; color: #bbb;">
                    ${s.softSkills.weeklyTests.map((_, i) => `<span>CYCLE ${i + 1}</span>`).join('')}
                </div>
            </div>
        </div>

        <!-- Qualitative Feed & Topics -->
        <div style="padding: 0 6rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-bottom: 4rem;">
            <!-- Topic-wise Breakdown -->
            <div class="detail-card">
                <h3 style="font-weight: 900; margin-bottom: 2.5rem; font-size: 1rem; color: #555;">TOPIC-WISE PROFICIENCY</h3>
                ${s.softSkills.topics.map(t => `
                    <div style="margin-bottom: 2rem;">
                        <div class="flex-between" style="margin-bottom: 8px;">
                            <span style="font-weight: 800; font-size: 0.8rem; color: #444;">${t.name.toUpperCase()}</span>
                            <span style="font-weight: 900; color: var(--primary);">${t.score}%</span>
                        </div>
                        <div style="height: 8px; background: #f0f0f0; border-radius: 99px; overflow: hidden;">
                            <div class="topic-bar" style="width: 0%; height: 100%; background: var(--primary); transition: width 1s ease;" data-w="${t.score}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Detailed Feedback Feed -->
            <div class="detail-card" style="background: #fafafa;">
                <h3 style="font-weight: 900; margin-bottom: 2.5rem; font-size: 1rem; color: #555;">EXECUTIVE FEEDBACK</h3>
                <div class="feedback-chip">RECRUITER OVERVIEW</div>
                <p style="font-size: 1rem; color: #555; line-height: 1.8; font-style: italic;">
                    "${s.softSkills.feedback}"
                </p>
                <div style="margin-top: 3rem; display: flex; align-items: center; gap: 15px;">
                    <img src="../assets/star-illustration.png" style="width: 80px;">
                    <div>
                        <div style="font-weight: 900; color: #F57C00;">ACADEMIC RISING STAR</div>
                        <div style="font-size: 0.7rem; font-weight: 800; color: #999;">Tier A+ Candidate</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Relocated Academic Records -->
        <div style="padding: 0 6rem;">
            <div class="detail-card" style="width: 100%;">
                <h3 style="font-weight: 900; margin-bottom: 1rem; font-size: 1rem; color: #555;">COMPLETE PERFORMANCE HISTORY</h3>
                <p style="font-size: 0.8rem; color: #999; margin-bottom: 1rem;">Primary Assessment Cycles & Faculty Reviews</p>
                <table class="history-table">
                    <thead>
                        <tr style="text-align: left; font-size: 0.75rem; font-weight: 900; color: #bbb;">
                            <th style="padding: 1rem 1.5rem;">CATEGORY</th>
                            <th>TYPE</th>
                            <th>SCORE</th>
                            <th>FACULTY NOTES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${s.performance.map(p => `
                            <tr>
                                <td style="font-weight: 800;">${p.category}</td>
                                <td><span class="badge" style="background: #f0f4ff; color: #1a237e; font-size: 0.65rem;">${p.type.toUpperCase()}</span></td>
                                <td style="font-weight: 900; color: var(--primary); font-size: 1.2rem;">${p.score}%</td>
                                <td style="color: #666; font-size: 0.85rem; font-style: italic;">"${p.notes}"</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function animateSoftCharts() {
    setTimeout(() => {
        // Gauge Animation
        const gauge = document.getElementById('mipGauge');
        const sId = getStudentId();
        const student = STUDENTS.find(s => s.id === sId);
        if (!student) return;
        
        const mip = student.softSkills.mip;
        const totalLen = 126; // Approx circumference for 180deg arc with R40
        const offset = totalLen - (mip / 100) * totalLen;
        gauge.style.strokeDashoffset = offset;

        // Step Chart Path Generation
        const tests = student.softSkills.weeklyTests;
        const pathLine = document.getElementById('stepPath');
        let pathD = `M 0 ${150 - tests[0]}`;
        const segmentWidth = 500 / (tests.length - 1);
        
        tests.forEach((val, i) => {
            if (i === 0) return;
            const x = i * segmentWidth;
            const y = 150 - val;
            const prevY = 150 - tests[i-1];
            // Horizontal line then Vertical line for "Step" effect
            pathD += ` L ${x} ${prevY} L ${x} ${y}`;
        });
        
        pathLine.setAttribute('d', pathD);
        const pathLen = pathLine.getTotalLength();
        pathLine.style.strokeDasharray = pathLen;
        pathLine.style.strokeDashoffset = pathLen;
        pathLine.style.transition = 'stroke-dashoffset 2s ease';
        pathLine.getBoundingClientRect();
        pathLine.style.strokeDashoffset = 0;

        // Topic Bars
        document.querySelectorAll('.topic-bar').forEach(bar => {
            bar.style.width = bar.getAttribute('data-w');
        });
    }, 200);
}

init();
