
/* ==========================================
   TNF Verification System
========================================== */

const result = document.getElementById("result");

// URL থেকে registration number নেওয়া
const params = new URLSearchParams(window.location.search);
const reg = params.get("id");

async function loadData() {

    if (!reg) {
        result.innerHTML = "<p class='error'>❌ Invalid QR Code</p>";
        return;
    }

    result.innerHTML = "<p>🔍 Verifying...</p>";

    try {

        const response = await fetch(API_URL + "?registration=" + reg);
        const data = await response.json();

        if (data.found) {

            result.innerHTML = `

            <div class="success">

                <h2>✅ Valid Registration</h2>

                <img src="${data.image || 'assets/default-user.png'}"
                     width="120"
                     style="border-radius:10px; margin-top:10px;">

                <h3>${data.name}</h3>

                <p><b>Reg No:</b> ${data.registration}</p>
                <p><b>Blood:</b> ${data.blood}</p>
                <p><b>Phone:</b> ${data.phone}</p>
                <p><b>Address:</b> ${data.address}</p>

            </div>

            `;

        } else {

            result.innerHTML = "<p class='error'>❌ Invalid Registration</p>";

        }

    }

    catch (err) {

        console.log(err);

        result.innerHTML = "<p class='error'>Server Error</p>";

    }

}

loadData();