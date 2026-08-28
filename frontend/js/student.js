const currentDate = document.getElementById("currentDate");

const today = new Date();

currentDate.textContent = today.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
});

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
    item.addEventListener("click", () => {
        navItems.forEach(nav => nav.classList.remove("active"));
        item.classList.add("active");

        const page = item.dataset.page;

        if (page === "dashboard") {
            window.location.href = "dashboard.html";
        }

        if (page === "classrooms") {
            window.location.href = "classrooms.html";
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

const classCards = document.querySelectorAll(".class-card");

classCards.forEach(card => {
    card.addEventListener("click", () => {
        const className = card.dataset.class;

        window.location.href =
            "classrooms.html?class=" +
            encodeURIComponent(className);
    });
});

const sectionAction = document.querySelector(".section-action");

if (sectionAction) {
    sectionAction.addEventListener("click", () => {
        window.location.href = "classrooms.html";
    });
}

const joinButtons = document.querySelectorAll(".join-btn");

joinButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.stopPropagation();

        const classItem = button.closest(".today-item");
        const className = classItem.querySelector(".today-name").textContent;

        window.location.href =
            "classroom.html?class=" +
            encodeURIComponent(className);
    });
});