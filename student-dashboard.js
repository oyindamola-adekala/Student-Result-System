const savedUser =
JSON.parse(localStorage.getItem("user"));

console.log("Saved student:", savedUser);
console.log("Matric number:", savedUser.matricNo);

if (!savedUser) {
    window.location.href = "login.html";
}

if (savedUser.role !== "student") {
    alert("Access denied!");
    window.location.href = "login.html";
}

if (savedUser) {

    // Welcome message
    document.getElementById("welcomeName").textContent = savedUser.fullName;
    document.getElementById("studentName").textContent = savedUser.fullName;
    document.getElementById("studentDepartment").textContent = savedUser.department;
    document.getElementById("studentLevel").textContent = savedUser.level;

    // Profile panel information
    document.getElementById("profileName").textContent = savedUser.fullName;
    document.getElementById("profileSchool").textContent = savedUser.school;
    document.getElementById("profileMatric").textContent = savedUser.matricNo;
    document.getElementById("profileDepartment").textContent = savedUser.department;
    document.getElementById("profileLevel").textContent = savedUser.level;
    document.getElementById("profileEmail").textContent = savedUser.email;
}


// ===============================
// PROFILE PANEL
// ===============================

const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");
const closeProfile = document.getElementById("closeProfile");

profileBtn.addEventListener("click", function (e) {
    e.preventDefault();
    profilePanel.classList.add("active");
});

closeProfile.addEventListener("click", function () {
    profilePanel.classList.remove("active");
});


// ===============================
// STUDENT RESULTS
// ===============================

const studentResults = {

    "24/0970": {

        100: {
            first: [
                {
                    code: "IFT 101",
                    title: "Introduction to Information Technology",
                    unit: 3,
                    score: 85,
                    grade: "A",
                    point: 5
                },
                {
                    code: "COSC 101",
                    title: "Introduction to Computer Science",
                    unit: 3,
                    score: 68,
                    grade: "B",
                    point: 4
                }
            ],

            second: [
                {
                    code: "IFT 102",
                    title: "Computer Fundamentals",
                    unit: 3,
                    score: 72,
                    grade: "A",
                    point: 5
                }
            ]
        },

        200: {
            first: [
                {
                    code: "IFT 201",
                    title: "Software Development",
                    unit: 3,
                    score: 78,
                    grade: "A",
                    point: 5
                },
                {
                    code: "COSC 205",
                    title: "Database Systems",
                    unit: 3,
                    score: 65,
                    grade: "B",
                    point: 4
                }
            ],

            second: [
                {
                    code: "IFT 204",
                    title: "Web Technologies",
                    unit: 3,
                    score: 70,
                    grade: "A",
                    point: 5
                }
            ]
        },

        300: {
            first: [
                {
                    code: "IFT 301",
                    title: "Information Systems",
                    unit: 3,
                    score: 74,
                    grade: "A",
                    point: 5
                },
                {
                    code: "IFT 303",
                    title: "Systems Analysis",
                    unit: 3,
                    score: 67,
                    grade: "B",
                    point: 4
                }
            ],

            second: [
                {
                    code: "IFT 305",
                    title: "Cybersecurity Fundamentals",
                    unit: 3,
                    score: 80,
                    grade: "A",
                    point: 5
                }
            ]
        },

        400: {
            first: [
                {
                    code: "IFT 401",
                    title: "Project Management",
                    unit: 3,
                    score: 80,
                    grade: "A",
                    point: 5
                }
            ],

            second: []
        }
    }

};

// ===============================
// CALCULATE GRADE FROM SCORE
// ===============================

function getGrade(score) {

    if (score >= 70) {
        return { grade: "A", point: 5 };
    } 
    else if (score >= 60) {
        return { grade: "B", point: 4 };
    } 
    else if (score >= 50) {
        return { grade: "C", point: 3 };
    } 
    else if (score >= 45) {
        return { grade: "D", point: 2 };
    } 
    else if (score >= 40) {
        return { grade: "E", point: 1 };
    } 
    else {
        return { grade: "F", point: 0 };
    }
}

// ===============================
// DISPLAY RESULTS
// ===============================

function displayResults() {

    const selectedLevel = levelSelect.value;
    const selectedSemester = semesterSelect.value;

    const currentStudentResults =
        studentResults[savedUser.matricNo];

    const selectedResults =
        currentStudentResults &&
        currentStudentResults[selectedLevel]
            ? currentStudentResults[selectedLevel][selectedSemester]
            : [];

    resultsBody.innerHTML = "";

    if (!selectedResults || selectedResults.length === 0) {

        resultsBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No results available for this level and semester.
                </td>
            </tr>
        `;

        return;
    }

    selectedResults.forEach(function (result) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.code}</td>
            <td>${result.title}</td>
            <td>${result.unit}</td>
            <td>${result.score}</td>

            <td>${getGrade(result.score).grade}</td>
            <td>${getGrade(result.score).point}</td>
        `;

        resultsBody.appendChild(row);
    });
}

// ===============================
// CALCULATE CGPA
// ===============================

function calculateCGPA() {

    const currentStudentResults = studentResults[savedUser.matricNo];

    if (!currentStudentResults) {
        return 0;
    }

    let totalQualityPoints = 0;
    let totalUnits = 0;

    const currentLevel = parseInt(savedUser.level);

    for (let level = 100; level <= currentLevel; level += 100) {

        if (!currentStudentResults[level]) {
            continue;
        }

        const semesters = currentStudentResults[level];

        for (const semester in semesters) {

            const semesterResults = semesters[semester];

            semesterResults.forEach(function(result) {

                totalQualityPoints += result.point * result.unit;
                totalUnits += result.unit;

            });
        }
    }

    if (totalUnits === 0) {
        return 0;
    }

    return totalQualityPoints / totalUnits;
}

// ===============================
// DISPLAY CGPA
// ===============================

function displayCGPA() {

    const cgpa = calculateCGPA();

    const cgpaValue = document.getElementById("cgpaValue");
    const cgpaBar = document.getElementById("cgpaBar");
    const cgpaClass = document.getElementById("cgpaClass");

    cgpaValue.textContent = cgpa.toFixed(2);

    const progressPercentage = (cgpa / 5) * 100;

    cgpaBar.style.width = progressPercentage + "%";


    if (cgpa >= 4.50) {
        cgpaClass.textContent = "First Class";
    } 
    else if (cgpa >= 3.50) {
        cgpaClass.textContent = "Second Class Upper";
    } 
    else if (cgpa >= 2.40) {
        cgpaClass.textContent = "Second Class Lower";
    } 
    else if (cgpa >= 1.50) {
        cgpaClass.textContent = "Third Class";
    } 
    else {
        cgpaClass.textContent = "Below Third Class";
    }
}

displayCGPA();


// Display results when the page loads
displayResults();


// Change results when level changes
levelSelect.addEventListener("change", displayResults);


// Change results when semester changes
semesterSelect.addEventListener("change", displayResults);