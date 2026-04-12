export const DEPARTMENTS = [
    'Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering',
    'Biomedical Science', 'Data Science', 'Economics', 'Business Administration', 'Psychology',
    'Theoretical Physics', 'Organic Chemistry', 'Mathematics', 'Architecture', 'Aerospace Engineering',
    'Environmental Science', 'International Relations', 'Journalism', 'Philosophy', 'Fine Arts',
    'History', 'Sociology', 'Linguistics', 'Political Science', 'Law', 'Medicine'
];

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const generateStudents = () => {
    const students = [];
    DEPARTMENTS.forEach((dept, deptIdx) => {
        for (let i = 0; i < 5; i++) {
            const firstName = firstNames[(deptIdx + i) % firstNames.length];
            const lastName = lastNames[(deptIdx * i) % lastNames.length];
            const name = `${firstName} ${lastName}`;
            const id = `std_${deptIdx}_${i}`;
            const gpa = (Math.random() * 1.5 + 2.5).toFixed(2);
            const attendance = Math.floor(Math.random() * 25 + 75);

            students.push({
                id,
                name,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@sharda.ac.in`,
                department: dept,
                gpa,
                attendance,
                profileImage: `https://i.pravatar.cc/150?u=${id}`,
                skills: [
                    { name: 'Analytics', level: 85 },
                    { name: 'Research', level: 78 },
                    { name: 'Communication', level: 92 }
                ],
                softSkills: {
                    mip: Math.floor(Math.random() * 20 + 75), // Mock Interview Prep
                    gd: Math.floor(Math.random() * 30 + 60),  // Group Discussion
                    weeklyTests: [78, 82, 85, 88, 92],        // Cycle progression
                    topics: [
                        { name: 'Technical Articulation', score: 88 },
                        { name: 'Crisis Logic', score: 82 },
                        { name: 'Collaborative Flow', score: 90 },
                        { name: 'Language Precision', score: 85 }
                    ],
                    feedback: "Exceptional analytical depth. Needs to focus on non-verbal cues during GD sessions to maintain team leadership."
                },
                performance: [
                    { category: 'Midterm Exam', type: 'Exam', score: 88, notes: 'Solid performance in core concepts.' },
                    { category: 'Final Project', type: 'Project', score: 94, notes: 'Exceptional creativity and execution.' },
                    { category: 'Quiz 1', type: 'Quiz', score: 82, notes: 'Good, but needs focus on details.' },
                    { category: 'Workshop', type: 'Practical', score: 90, notes: 'Active participation.' }
                ]
            });
        }
    });
    return students;
};

export const STUDENTS = generateStudents();
