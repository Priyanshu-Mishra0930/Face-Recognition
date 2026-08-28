const modal = document.getElementById("modal");
const openCreate = document.getElementById("openCreate");
const newClassButton = document.getElementById("newClassButton");
const closeModal = document.getElementById("closeModal");
const classForm = document.getElementById("classForm");
const classroomGrid = document.getElementById("classroomGrid");
const totalClassrooms = document.getElementById("totalClassrooms");




function showModal() {
    modal.classList.add("show");

    document.getElementById("className").focus();
}


// ===============================
// CLOSE MODAL
// ===============================

function hideModal() {
    modal.classList.remove("show");

    // Clear form
    classForm.reset();
}


// Open modal using "Create Classroom" button
openCreate.addEventListener("click", showModal);


// Open modal using "+" Make a New Class button
newClassButton.addEventListener("click", showModal);


// Close using X button
closeModal.addEventListener("click", hideModal);


// Close when clicking outside modal
modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        hideModal();
    }

});


// ===============================
// CREATE NEW CLASSROOM
// ===============================

classForm.addEventListener("submit", (event) => {

    // Stop page refresh
    event.preventDefault();


    // Get values from form
    const name = document.getElementById("className").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const section = document.getElementById("section").value.trim();

    const semester = document.getElementById("semester").value.trim();


    // Generate classroom join code
    const code = makeJoinCode(name);


    // Create new classroom card
    const card = document.createElement("article");

    card.className = "classroom-card";


    card.innerHTML = `
        <div class="class-top">

            <div class="subject-icon">
                ${getInitials(name)}
            </div>

        </div>


        <h3>
            ${escapeHTML(name)}
        </h3>


        <p>
            ${escapeHTML(subject)}
            · Section ${escapeHTML(section)}
            · ${escapeHTML(semester)}
        </p>


        <div class="card-meta">

            <span>
                👥 0 Students
            </span>

            <span>
                CODE:
                <b>${code}</b>
            </span>

        </div>


        <button class="outline-btn">
            Start Session
        </button>
    `;


    

    classroomGrid.insertBefore(
        card,
        newClassButton
    );


 
    totalClassrooms.textContent =
        Number(totalClassrooms.textContent) + 1;


    hideModal();


    card.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});



function makeJoinCode(name) {

    const letters =
        name
            .replace(/[^a-zA-Z]/g, "")
            .toUpperCase();


    const prefix =
        letters.slice(0, 3) || "CLS";


    const number =
        Math.floor(
            10 + Math.random() * 90
        );


    return prefix + number;
}




function getInitials(name) {

    const words =
        name.trim().split(/\s+/);


   
    if (words.length === 1) {

        return escapeHTML(
            words[0]
                .slice(0, 2)
                .toUpperCase()
        );

    }


   
    return escapeHTML(
        (
            words[0][0] +
            words[1][0]
        ).toUpperCase()
    );
}



function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent = value;


    return div.innerHTML;
}




document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            hideModal();

        }

    }
);