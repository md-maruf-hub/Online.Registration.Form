const result = document.getElementById("result");

// ===============================
// DRIVE LINK CONVERTER (FIXED)
// ===============================

function convertDriveLink(url) {
  if (!url) return "";

  const match = url.match(/\/d\/(.*?)\//);

  if (match && match[1]) {
    return "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w400";
  }

  return url;
}

// ===============================
// SEARCH FUNCTION (REG + PHONE FIXED)
// ===============================

async function searchData() {

    const reg = document.getElementById("searchInput").value.trim();

    if (!reg) {
        result.innerHTML = `<p class="error">❌ Enter Registration Number or Phone Number</p>`;
        return;
    }

    result.innerHTML = `<p>🔍 Searching...</p>`;

    try {

        let url = "";

        // 🔥 Registration Number Search
        if (reg.toUpperCase().startsWith("TNF")) {

            url = API_URL + "?registration=" + encodeURIComponent(reg);

        }

        // 🔥 Phone Number Search (Leading 0 Ignore)
        else {

            const phone = reg.replace(/^0/, "");

            url = API_URL + "?phone=" + encodeURIComponent(phone);

        }

        const response = await fetch(url);
        const data = await response.json();

        console.log("FULL RESPONSE:", data);

        if (!data.found) {
            result.innerHTML = `<p class="error">❌ Not Found</p>`;
            return;
        }

        // ===============================
        // IMAGE PROCESS
        // ===============================

        const imgUrl = data.image ? convertDriveLink(data.image) : "";

        result.innerHTML = `
        <div class="success">

            <h2>✅ Registration Found</h2>

            <div class="img-box" style="width:150px; height:150px; margin:20px auto;">
                <img id="profileImg"
                     src="assets/default-user.png"
                     style="opacity:0; transition: opacity 0.3s;">
            </div>

            <p><b>Name:</b> ${data.name}</p>
            <p><b>Reg No:</b> ${data.registration}</p>
            <p><b>Phone:</b> ${0+data.phone}</p>
            <p><b>Blood:</b> ${data.blood}</p>
            <p><b>Address:</b> ${data.address}</p>

            <button class="submit-btn" onclick="generateIDCardFromSearch()">
                🪪 Generate ID Card
            </button>

        </div>
        `;

        // ===============================
        // IMAGE LOAD SMOOTH FIX
        // ===============================

        setTimeout(() => {

            const img = document.getElementById("profileImg");
            if (!img) return;

            if (imgUrl) {

                const tempImg = new Image();

                tempImg.onload = () => {
                    img.src = imgUrl;
                    img.style.opacity = "1";
                };

                tempImg.onerror = () => {
                    img.src = "assets/default-user.png";
                    img.style.opacity = "1";
                };

                tempImg.src = imgUrl;

            } else {
                img.src = "assets/default-user.png";
                img.style.opacity = "1";
            }

        }, 50);

        // ===============================
        // CACHE FOR ID CARD
        // ===============================

        window.searchDataCache = {
            name: data.name,
            registration: data.registration,
            phone: data.phone,
            blood: data.blood,
            image: imgUrl
        };

    } catch (err) {
        console.log(err);
        result.innerHTML = `<p class="error">❌ Server Error</p>`;
    }
}


// ===============================
// ID CARD FUNCTION
// ===============================

function generateIDCardFromSearch() {

    if (!window.searchDataCache) {
        alert("No data found");
        return;
    }

    generateIDCard({
        name: window.searchDataCache.name,
        registration: window.searchDataCache.registration,
        phone: window.searchDataCache.phone,
        blood: window.searchDataCache.blood,
        image: window.searchDataCache.image
    });

}