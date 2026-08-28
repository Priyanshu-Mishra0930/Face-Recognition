
const navItems =
    document.querySelectorAll(".nav-item");


const pageSections =
    document.querySelectorAll(".page-section");


const createModal =
    document.getElementById("createModal");


const studentModal =
    document.getElementById("studentModal");


const openCreate =
    document.getElementById("openCreate");


const newClassButton =
    document.getElementById("newClassButton");


const closeCreate =
    document.getElementById("closeCreate");


const closeStudent =
    document.getElementById("closeStudent");


const classForm =
    document.getElementById("classForm");


const classroomGrid =
    document.getElementById("classroomGrid");


const totalClassrooms =
    document.getElementById("totalClassrooms");


const generatedCode =
    document.getElementById("generatedCode");


const copyMessage =
    document.getElementById("copyMessage");


const notification =
    document.getElementById("notification");



let activeSessionCount = 0;

let currentClassCode = "";

let notificationTimer;



navItems.forEach(function(item) {

    item.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            const page =
                this.dataset.page;


          
            navItems.forEach(
                function(nav) {

                    nav.classList.remove(
                        "active"
                    );

                }
            );


            
            this.classList.add(
                "active"
            );


            
            pageSections.forEach(
                function(section) {

                    section.classList.remove(
                        "active-section"
                    );

                }
            );


            
            const selectedSection =
                document.getElementById(
                    page
                );


            if (selectedSection) {

                selectedSection.classList.add(
                    "active-section"
                );

            }


            // Create classroom
            if (page === "create") {

                showCreateModal();

            }


            // Notifications
            if (page === "classrooms") {

                showNotification(
                    "My Classrooms opened"
                );

            }


            if (page === "attendance") {

                showNotification(
                    "Attendance opened"
                );

            }


            if (page === "analytics") {

                showNotification(
                    "Analytics opened"
                );

            }


            if (page === "profile") {

                showNotification(
                    "Profile opened"
                );

            }

        }
    );

});



function showCreateModal() {

    createModal.classList.add(
        "show"
    );

}


function hideCreateModal() {

    createModal.classList.remove(
        "show"
    );

    classForm.reset();

}

openCreate.addEventListener(
    "click",
    showCreateModal
);


newClassButton.addEventListener(
    "click",
    showCreateModal
);



closeCreate.addEventListener(
    "click",
    hideCreateModal
);



createModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            createModal
        ) {

            hideCreateModal();

        }

    }
);



classForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


       
        const name =
            document
                .getElementById(
                    "className"
                )
                .value
                .trim();


        const subject =
            document
                .getElementById(
                    "subject"
                )
                .value
                .trim();


        const section =
            document
                .getElementById(
                    "section"
                )
                .value
                .trim();


        const semester =
            document
                .getElementById(
                    "semester"
                )
                .value
                .trim();


        

        const classCode =
            generateClassCode(
                name
            );


     

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "classroom-card";


        card.innerHTML = `

            <div class="class-top">

                <div class="subject-icon">
                    ${getInitials(name)}
                </div>

                <span class="ready-badge">
                    READY
                </span>

            </div>


            <h3>
                ${escapeHTML(name)}
            </h3>


            <p>
                ${escapeHTML(subject)}
                · Section
                ${escapeHTML(section)}
                · ${escapeHTML(semester)}
            </p>


            <div class="card-meta">

                <span>
                    👥
                    <span class="student-count">
                        0
                    </span>
                    Students
                </span>


                <span>
                    CODE:
                    <b>
                        ${classCode}
                    </b>
                </span>

            </div>


            <button
                class="outline-btn start-session"
            >
                Start Session
            </button>


            <button
                class="add-student-btn"
                data-code="${classCode}"
            >
                ＋ Add Student
            </button>

        `;


       
        classroomGrid.insertBefore(
            card,
            newClassButton
        );

        totalClassrooms.textContent =
            Number(
                totalClassrooms.textContent
            ) + 1;



        addCardEvents(card);



        hideCreateModal();


        

        showNotification(
            "Classroom created successfully"
        );


      

        setTimeout(
            function() {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            200
        );

    }
);


function addCardEvents(card) {


    const startButton =
        card.querySelector(
            ".start-session"
        );


    const addStudentButton =
        card.querySelector(
            ".add-student-btn"
        );


    

    if (startButton) {

        startButton.addEventListener(
            "click",
            function() {

                startSession(
                    this
                );

            }
        );

    }


   

    if (addStudentButton) {

        addStudentButton.addEventListener(
            "click",
            function() {

                openStudentModal(
                    this.dataset.code
                );

            }
        );

    }

}



document
    .querySelectorAll(
        ".classroom-card"
    )
    .forEach(
        function(card) {

            addCardEvents(card);

        }
    );


function startSession(button) {


    // Stop session

    if (
        button.classList.contains(
            "session-running"
        )
    ) {


        button.textContent =
            "Start Session";


        button.classList.remove(
            "session-running"
        );


        button.style.color = "";

        button.style.borderColor = "";


        activeSessionCount--;


        if (
            activeSessionCount < 0
        ) {

            activeSessionCount = 0;

        }


        document.getElementById(
            "activeSessions"
        ).textContent =
            activeSessionCount;


        showNotification(
            "Session stopped"
        );


        return;

    }


   

    button.textContent =
        "● Session Live";


    button.classList.add(
        "session-running"
    );


    button.style.color =
        "#22C55E";


    button.style.borderColor =
        "#22C55E";


    activeSessionCount++;


    document.getElementById(
        "activeSessions"
    ).textContent =
        activeSessionCount;


    showNotification(
        "Session started"
    );

}


function openStudentModal(
    classCode
) {


    currentClassCode =
        classCode;


    studentModal.classList.add(
        "show"
    );


    generateStudentCode();

}


function closeStudentModal() {

    studentModal.classList.remove(
        "show"
    );

}


closeStudent.addEventListener(
    "click",
    closeStudentModal
);



studentModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            studentModal
        ) {

            closeStudentModal();

        }

    }
);


function generateStudentCode() {


    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    let code = "";


    for (
        let i = 0;
        i < 6;
        i++
    ) {


        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );


        code +=
            characters[randomIndex];

    }


    generatedCode.textContent =
        code;


    copyMessage.textContent =
        "";

}



document
    .getElementById(
        "generateCodeButton"
    )
    .addEventListener(
        "click",
        generateStudentCode
    );



document
    .getElementById(
        "copyCodeButton"
    )
    .addEventListener(
        "click",
        async function() {


            const code =
                generatedCode.textContent;


            try {


                await navigator
                    .clipboard
                    .writeText(code);


                copyMessage.textContent =
                    "✓ Code copied successfully";

            }

            catch(error) {


                const textArea =
                    document.createElement(
                        "textarea"
                    );


                textArea.value =
                    code;


                document.body.appendChild(
                    textArea
                );


                textArea.select();


                document.execCommand(
                    "copy"
                );


                textArea.remove();


                copyMessage.textContent =
                    "✓ Code copied successfully";

            }


            setTimeout(
                function() {

                    copyMessage.textContent =
                        "";

                },
                2500
            );

        }
    );


function generateClassCode(name) {


    const letters =
        name
            .replace(
                /[^a-zA-Z]/g,
                ""
            )
            .toUpperCase();


    const prefix =
        letters.slice(0, 3) ||
        "CLS";


    const number =
        Math.floor(
            10 +
            Math.random() * 90
        );


    return prefix + number;

}


function getInitials(name) {


    const words =
        name
            .trim()
            .split(/\s+/);


    if (
        words.length === 1
    ) {

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
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


document
    .getElementById(
        "profileButton"
    )
    .addEventListener(
        "click",
        function() {


    

    navItems.forEach(
                function(nav) {

                    nav.classList.remove(
                        "active"
                    );

                }
            );

            document
                .querySelector(
                    '[data-page="profile"]'
                )
                .classList.add(
                    "active"
                );

            pageSections.forEach(
                function(section) {

                    section.classList.remove(
                        "active-section"
                    );

                }
            );

            document
                .getElementById(
                    "profile"
                )
                .classList.add(
                    "active-section"
                );

        }
    );


function showNotification(
    message
) {


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            function() {

                notification.classList.remove(
                    "show"
                );

            },
            2200
        );

}


document.addEventListener(
    "keydown",
    function(event) {


        if (
            event.key === "Escape"
        ) {

            hideCreateModal();

            closeStudentModal();

        }

    }
);