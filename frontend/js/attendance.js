const params = new URLSearchParams(window.location.search);
const className = params.get("class") || "Data Structures";

const camera = document.getElementById("camera");
const verifyBtn = document.getElementById("verifyBtn");
const backBtn = document.getElementById("backBtn");
const cameraMessage = document.getElementById("cameraMessage");
const verificationLabel = document.getElementById("verificationLabel");
const verificationTitle = document.getElementById("verificationTitle");
const verificationText = document.getElementById("verificationText");
const verificationIcon = document.getElementById("verificationIcon");
const confidenceValue = document.getElementById("confidenceValue");
const confidenceFill = document.getElementById("confidenceFill");
const successModal = document.getElementById("successModal");
const doneBtn = document.getElementById("doneBtn");
const classNameElement = document.getElementById("className");
const cameraTime = document.getElementById("cameraTime");
const successConfidence = document.getElementById("successConfidence");
const successTime = document.getElementById("successTime");

let stream = null;
let cameraStarted = false;

classNameElement.textContent = className;

function updateTime() {
    const now = new Date();

    cameraTime.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

setInterval(updateTime, 1000);
updateTime();

async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",
                width: {
                    ideal: 1280
                },
                height: {
                    ideal: 720
                }
            },
            audio: false
        });

        camera.srcObject = stream;

        await camera.play();

        cameraStarted = true;

        cameraMessage.textContent = "Camera active • Position your face inside the frame";

        verificationLabel.textContent = "CAMERA READY";
        verificationTitle.textContent = "Looking for your face";
        verificationText.textContent = "Position your face clearly inside the frame.";

        verifyBtn.innerHTML = "<span>◉</span> Verify Identity <span>→</span>";

    } catch (error) {
        cameraMessage.textContent = "Camera access was denied";

        verificationLabel.textContent = "CAMERA ERROR";
        verificationTitle.textContent = "Camera unavailable";
        verificationText.textContent = "Please allow camera access and try again.";

        verifyBtn.innerHTML = "<span>◉</span> Try Again";
    }
}

function captureFrame() {
    if (!cameraStarted || !camera.videoWidth) {
        return null;
    }

    const canvas = document.createElement("canvas");

    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;

    const context = canvas.getContext("2d");

    context.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );

    return canvas.toDataURL("image/jpeg", 0.85);
}

async function sendToBackend(imageData) {
    /*
       Future backend integration:

       const response = await fetch("/api/attendance/verify", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               class_name: className,
               image: imageData
           })
       });

       const result = await response.json();

       return result;
    */

    return {
        success: true,
        confidence: 96.4
    };
}

async function verifyIdentity() {
    if (!cameraStarted) {
        await startCamera();
        return;
    }

    verifyBtn.disabled = true;

    verificationLabel.textContent = "VERIFYING";
    verificationTitle.textContent = "Analyzing your face";
    verificationText.textContent = "Please stay still for a moment.";

    cameraMessage.textContent = "Scanning face...";

    verificationIcon.classList.add("scanning");

    const imageData = captureFrame();

    if (!imageData) {
        verificationLabel.textContent = "CAMERA ERROR";
        verificationTitle.textContent = "Unable to capture frame";
        verificationText.textContent = "Please check your camera and try again.";
        verifyBtn.disabled = false;
        return;
    }

    try {
        const result = await sendToBackend(imageData);

        if (result.success) {
            const confidence = result.confidence;

            confidenceValue.textContent = `${confidence}%`;
            confidenceFill.style.width = `${confidence}%`;

            verificationLabel.textContent = "IDENTITY VERIFIED";
            verificationTitle.textContent = "Attendance ready";
            verificationText.textContent = "Your identity has been successfully verified.";

            cameraMessage.textContent = "Face verified successfully";

            successConfidence.textContent = `${confidence}%`;

            const now = new Date();

            successTime.textContent = now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit"
            });

            setTimeout(() => {
                successModal.classList.add("show");
            }, 500);
        }

    } catch (error) {
        verificationLabel.textContent = "VERIFICATION FAILED";
        verificationTitle.textContent = "Something went wrong";
        verificationText.textContent = "Please try again.";

        cameraMessage.textContent = "Verification failed";
    }

    verificationIcon.classList.remove("scanning");
    verifyBtn.disabled = false;
}

verifyBtn.addEventListener("click", verifyIdentity);

backBtn.addEventListener("click", () => {
    stopCamera();
    window.location.href =
        `classrooms.html?class=${encodeURIComponent(className)}`;
});

doneBtn.addEventListener("click", () => {
    stopCamera();

    window.location.href =
        `classrooms.html?class=${encodeURIComponent(className)}`;
});

function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    camera.srcObject = null;
}

window.addEventListener("beforeunload", stopCamera);