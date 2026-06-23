
/* ==========================================
   TNF ID CARD GENERATOR + QR
========================================== */

function generateIDCard(data) {

    const cardId = "idCardBox";

    const qrData = data.registration;

    const cardHTML = `

    <div id="${cardId}" style="
        width:300px;
        background:#fff;
        border:2px solid #0f766e;
        border-radius:12px;
        padding:2px;
        text-align:center;
        font-family:Poppins;
        margin-top:20px;
    ">

    

        <!-- HEADER -->
<div style="display:flex;align-items:center;justify-content:center;gap:10px;">

    <img src="assets/logo.png" style="width:50px;height:50px;">

    <div style="display:flex;flex-direction:column;align-items:flex-start;">

        <h3 style="color:#0f766e;margin:0;">
            THE NAAS FOUNDATION
        </h3>

        <p style="font-size:10px;color:#000;margin:2px 0 0 0;">
            Kadamtali Bazar, Gabtoli, Bogura
        </p>

    </div>

</div>
        

        <p style="font-size:12px;color:#000;margin-top:5px;">
            Official Registration Card
        </p>

        <hr style="border:0; border-top:2px solid #000; margin:2px 0;">

        <!-- PHOTO -->
        <img src="${data.image || 'assets/default-user.png'}"
            style="width:100px;height:100px;border-radius:10px;border:2px solid #0f766e;object-fit:cover;">

        <!-- INFO -->
        <h3 style="margin:10px 0 5px 0;">${data.name}</h3>

        <p style="margin:2px;"><b>Reg No:</b> ${data.registration}</p>
        <p style="margin:2px;"><b>Blood:</b> ${data.blood}</p>
        <p style="margin:2px;"><b>Phone:</b> ${0+data.phone}</p>

        <hr style="border:0; border-top:2px solid #000; margin:2px 0;">

        <!-- QR CODE -->
        <div id="qrcode" style="display:flex; justify-content:center; align-items:center;"></div>

        <p style="font-size:10px;color:gray;margin-top:8px;">
            Scan for Verification
        </p>

    </div>

    <button onclick="printCard()" style="
        margin-top:10px;
        padding:10px 20px;
        background:#0f766e;
        color:white;
        border:none;
        border-radius:8px;
        cursor:pointer;
    ">
        🖨️ Print / Download
    </button>

    `;

    document.getElementById("result").innerHTML += cardHTML;

    // ===============================
    // QR CODE GENERATE
    // ===============================

    setTimeout(() => {

        const qrContainer = document.getElementById("qrcode");

        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {

            text: qrData,
            width: 50,
            height: 50

        });

    }, 200);

}


// ===============================
// PRINT FUNCTION
// ===============================

function printCard() {

    const printContent = document.getElementById("idCardBox").outerHTML;

    const newWin = window.open("");

    newWin.document.write(`

        <html>
        <head>
            <title>TNF ID CARD</title>
        </head>

        <body onload="window.print()">
            ${printContent}
        </body>

        </html>

    `);

    newWin.document.close();

}

/* ==========================================
   TNF ID CARD + PDF DOWNLOAD
========================================== */

function downloadPDF() {

    const element = document.getElementById("idCardBox");

    const opt = {

        margin: 0.5,
        filename: 'TNF-ID-CARD.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }

    };

    html2pdf().set(opt).from(element).save();

}