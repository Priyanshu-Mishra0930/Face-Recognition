const navItems = document.querySelectorAll(".nav-item");

const classCodeInput = document.getElementById("classCode");
const joinBtn = document.getElementById("joinBtn");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");
const joinedClassName = document.getElementById("joinedClassName");

const classrooms = {
    "DS-A91K": "Data Structures",
    "DB-B72M": "Database Systems",
    "OS-C48P": "Operating Systems"
};

navItems.forEach(item => {
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

classCodeInput.addEventListener("input", () => {
    classCodeInput.value = classCodeInput.value
        .toUpperCase()
        .replace(/\s/g, "");

    errorMessage.classList.remove("show");
});

classCodeInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        joinClassroom();
    }
});

joinBtn.addEventListener("click", joinClassroom);

function joinClassroom() {
    const code = classCodeInput.value.trim().toUpperCase();

    errorMessage.classList.remove("show");
    successMessage.classList.remove("show");

    if (!code) {
        errorMessage.textContent = "Please enter a classroom code.";
        errorMessage.classList.add("show");
        classCodeInput.focus();
        return;
    }

    joinBtn.disabled = true;
    joinBtn.innerHTML = "<span>◌</span> Checking...";

    setTimeout(() => {
        const classroom = classrooms[code];

        if (!classroom) {
            errorMessage.textContent =
                "Invalid classroom code. Please check and try again.";

            errorMessage.classList.add("show");

            joinBtn.disabled = false;
            joinBtn.innerHTML =
                "<span>＋</span> Join Classroom <span>→</span>";

            return;
        }

        joinedClassName.textContent = classroom;
        successMessage.classList.add("show");

        joinBtn.disabled = true;
        joinBtn.innerHTML = "<span>✓</span> Classroom Joined";

        classCodeInput.disabled = true;

        setTimeout(() => {
            window.location.href =
                `classroom.html?class=${encodeURIComponent(classroom)}`;
        }, 1200);

    }, 700);
}