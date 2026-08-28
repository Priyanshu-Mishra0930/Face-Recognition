const className = new URLSearchParams(window.location.search).get("class");

const classData = {
    "Data Structures": {
        code: "DS",
        section: "CSE-A",
        semester: "Semester 3",
        teacher: "Dr. Sharma",
        classroomCode: "DS-A91K",
        attendance: "92.4%",
        present: "24",
        absent: "02",
        total: "26"
    },
    "Database Systems": {
        code: "DB",
        section: "CSE-A",
        semester: "Semester 3",
        teacher: "Prof. Mehta",
        classroomCode: "DB-B72M",
        attendance: "87%",
        present: "22",
        absent: "03",
        total: "25"
    },
    "Operating Systems": {
        code: "OS",
        section: "CSE-A",
        semester: "Semester 3",
        teacher: "Dr. Verma",
        classroomCode: "OS-C48P",
        attendance: "84%",
        present: "21",
        absent: "04",
        total: "25"
    }
};

const selectedClass = classData[className] || classData["Data Structures"];

document.getElementById("className").textContent = className || "Data Structures";
document.getElementById("teacherName").textContent = selectedClass.teacher;

const subjectIcon = document.querySelector(".subject-icon");
const classDetails = document.querySelector(".class-details");
const classCode = document.querySelector(".class-code strong");
const statCards = document.querySelectorAll(".stat-card");

subjectIcon.textContent = selectedClass.code;

classDetails.innerHTML = `
    <span>${selectedClass.section}</span>
    <span>•</span>
    <span>${selectedClass.semester}</span>
    <span>•</span>
    <span>${selectedClass.teacher}</span>
`;

classCode.textContent = selectedClass.classroomCode;

statCards[0].querySelector(".stat-value").textContent = selectedClass.attendance;
statCards[0].querySelector(".progress-fill").style.width = selectedClass.attendance;

statCards[1].querySelector(".stat-value").textContent = selectedClass.present;
statCards[2].querySelector(".stat-value").textContent = selectedClass.absent;
statCards[3].querySelector(".stat-value").textContent = selectedClass.total;

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

document.getElementById("markAttendance").addEventListener("click", () => {
    const params = new URLSearchParams({
        class: className || "Data Structures"
    });

    window.location.href = `attendance.html?${params.toString()}`;
});

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
        const page = item.dataset.page;

        if (page === "dashboard") {
            window.location.href = "dashboard.html";
        }

        if (page === "classrooms") {
            window.location.href = "dashboard.html";
        }

        if (page === "join") {
            window.location.href = "join-classroom.html";
        }

        if (page === "attendance") {
            window.location.href = "attendance.html";
        }

        if (page === "profile") {
            window.location.href = "profile.html";
        }
    });
});