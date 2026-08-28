let selectedRole = "teacher";

function selectRole(role, button) {
    selectedRole = role;

    document.querySelectorAll(".role").forEach(function(btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");
}

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const registrationId = document.getElementById("registrationId").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (registrationId === "" || password === "") {
        message.style.color = "#EF4444";
        message.textContent = "Please enter your registration ID and password.";
        return;
    }

    if (selectedRole === "teacher") {
        window.location.href = "pages/teacher.html";
    } else {
        window.location.href = "pages/student.html";
    }
});