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
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@abc.edu`,
                department: dept,
                gpa,
                attendance,
                profileImage: `https://i.pravatar.cc/150?u=${id}`,
                skills: [
                    { name: 'Analytics', level: 85 },
                    { name: 'Research', level: 78 },
                    { name: 'Communication', level: 92 }
                ],
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
