const navItems = document.querySelectorAll(".nav-item");

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

const editBtn = document.getElementById("editBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const saveArea = document.getElementById("saveArea");

const editableFields = [
    document.getElementById("fullName"),
    document.getElementById("email")
];

let originalValues = {};

editBtn.addEventListener("click", () => {
    editableFields.forEach(field => {
        originalValues[field.id] = field.value;
        field.disabled = false;
    });

    saveArea.classList.add("show");
    editBtn.style.display = "none";

    editableFields[0].focus();
});

cancelBtn.addEventListener("click", () => {
    editableFields.forEach(field => {
        field.value = originalValues[field.id];
        field.disabled = true;
    });

    saveArea.classList.remove("show");
    editBtn.style.display = "block";
});

saveBtn.addEventListener("click", () => {
    editableFields.forEach(field => {
        field.disabled = true;
    });

    saveArea.classList.remove("show");
    editBtn.style.display = "block";

    const name = document.getElementById("fullName").value;

    document.querySelector(".profile-name").textContent = name;
    document.querySelector(".profile-identity h2").textContent = name;

    document.querySelector(".profile-avatar").textContent =
        name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

    document.querySelector(".avatar").textContent =
        name
            .split(" ")
            .map(word => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
    const confirmed = confirm("Are you sure you want to sign out?");

    if (confirmed) {
        window.location.href = "../login.html";
    }
});