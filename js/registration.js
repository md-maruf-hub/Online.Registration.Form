
/* ==========================================
   TNF Registration System
   FIXED VERSION (NO CORS ERROR)
========================================== */

const form = document.getElementById("registrationForm");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const previewImage = document.getElementById("previewImage");
const imageInput = document.getElementById("image");


// ===============================
// Image Preview
// ===============================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    if (!IMAGE.TYPES.includes(file.type)) {

        alert("Only JPG, PNG & WEBP images allowed");

        this.value = "";

        previewImage.src = "assets/default-user.png";

        return;
    }

    if (file.size > IMAGE.MAX_SIZE) {

        alert("Max 2MB allowed");

        this.value = "";

        previewImage.src = "assets/default-user.png";

        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        previewImage.src = e.target.result;
    };

    reader.readAsDataURL(file);

});


// ===============================
// FORM SUBMIT (FIXED FETCH)
// ===============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    loading.style.display = "block";
    result.innerHTML = "";

    const submitButton = document.querySelector(".submit-btn");
    submitButton.disabled = true;

    try {

        const file = imageInput.files[0];

        let imageBase64 = "";

        if (file) {
            imageBase64 = await convertToBase64(file);
        }

        const payload = {

            name: document.getElementById("name").value.trim(),
            dob: document.getElementById("dob").value,
            blood: document.getElementById("blood").value,
            phone: document.getElementById("phone").value.trim(),
            job: document.getElementById("job").value.trim(),
            address: document.getElementById("address").value.trim(),
            opinion: document.getElementById("opinion").value.trim(),
            image: imageBase64

        };

        // ===============================
        // FIXED FETCH (NO HEADERS)
        // ===============================

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        loading.style.display = "none";
        submitButton.disabled = false;

        if (data.success) {

            result.innerHTML = `

            <div class="success">

                <h3>✅ Registration Successful</h3>

                <h2>${data.registration}</h2>

            </div>

            `;

            form.reset();
            previewImage.src = "assets/default-user.png";

        }

        else {

            result.innerHTML = `

            <div class="error">
                ${data.message}
            </div>

            `;

        }

    }

    catch (error) {

        loading.style.display = "none";
        submitButton.disabled = false;

        result.innerHTML = `
        <div class="error">
            Server Error / Network Failed
        </div>
        `;

        console.log(error);
    }

});


// ===============================
// BASE64 CONVERTER
// ===============================

function convertToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}