const result = document.getElementById("result");

// ===============================
// DRIVE LINK CONVERTER (FIXED)
// ===============================

function convertDriveLink(url) {
  if (!url) return "";

  const match = url.match(/\/d\/(.*?)\//);

  if (match && match[1]) {
    // ✅ thumbnail endpoint - img tag এ সবচেয়ে reliable
    return "https://drive.google.com/thumbnail?id=" + match[1] + "&sz=w400";
  }

  return url;
}

// ===============================
// SEARCH FUNCTION
// ===============================

async function searchData() {

    const reg = document.getElementById("searchInput").value.trim();

    if (!reg) {
        result.innerHTML = `<p class="error">❌ Enter Registration Number</p>`;
        return;
    }

    result.innerHTML = `<p>🔍 Searching...</p>`;

    try {

        const response = await fetch(API_URL + "?registration=" + reg);
        const data = await response.json();

        console.log("FULL RESPONSE:", data);

        if (!data.found) {
            result.innerHTML = `<p class="error">❌ Not Found</p>`;
            return;
        }

        // ✅ FIXED: thumbnail link use করা হচ্ছে
        const imgUrl = data.image ? convertDriveLink(data.image) : "";

        result.innerHTML = `
        <div class="success">

            <h2>✅ Registration Found</h2>

            <div class="img-box" style="width:150px; height:150px; margin:20px auto;"">
                <img id="profileImg" src="assets/default-user.png" style="opacity:0; transition: opacity 0.3s;">
            </div>

            <p><b>Name:</b> ${data.name}</p>
            <p><b>Reg No:</b> ${data.registration}</p>
            <p><b>Phone:</b> ${data.phone}</p>
            <p><b>Blood:</b> ${data.blood}</p>
            <p><b>Address:</b> ${data.address}</p>

            <button class="submit-btn" onclick="generateIDCardFromSearch()">
                🪪 Generate ID Card
            </button>

        </div>
        `;

        // ✅ FIXED: DOM render হওয়ার পর image set করা হচ্ছে
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

        // CACHE
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