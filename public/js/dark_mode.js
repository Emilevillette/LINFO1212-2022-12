/* eslint-disable no-unused-vars */


//Check dark_mode cookie and turn it on if needed
window.onload = (event) => {
    setDark_mode();
};

function setDark_mode() {
    if (!document.cookie.includes("dark_mode")) {
        document.cookie = "dark_mode=Off";
    } else if (document.cookie.includes("dark_mode=On")) {
        document.body.classList.toggle("dark-theme");
        var icon = document.getElementById("icon");
        icon.src = "/img/sun.png";
    }
}

// This function allows us to switch from light to dark mode
function dark_mode() {
    var icon = document.getElementById("icon");
    document.body.classList.toggle("dark-theme");
    console.log("Before " + document.cookie);
    if (document.cookie.includes("dark_mode=Off")) {
        icon.src = "/img/sun.png";
        document.cookie = "dark_mode=On";
    } else {
        icon.src = "/img/moon.png";
        document.cookie = "dark_mode=Off";
    }
    console.log("After " + document.cookie);
}

// access admin
window.addEventListener("keydown", access_admin);
let keysPressed = {};

function access_admin(event) {

    keysPressed[event.key] = true;
    console.log(keysPressed);
    console.log(event.key);
    console.log(event.keyCode);
    if (keysPressed["Control"] && keysPressed["a"] && event.keyCode === 76) {
        document.getElementById("admin_butt").hidden = false;
    }
}

//sets minimum date in cart
function min_date() {
    var date_t = new Date();
    var min_date_sortie = new Date(date_t.getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
    var date_retour = document.getElementById("date_retour");
    var date_sortie = document.getElementById("date_sortie");

    document.getElementById("date_sortie").min = min_date_sortie;
    date_sortie.addEventListener("input", function () {
        date_retour.disabled = false;
        date_retour.min = date_sortie.value;
    });
}

//generates pdf in cart
async function generatePDF() {
    // eslint-disable-next-line no-undef
    var pdf = new jsPDF;
    var date_t = new Date();
    var date = new Date(date_t.getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
    var img = new Image();
    img.src = "img/llln.png";
    let cmd_no = await (await fetch("/next_order_no")).json();
    var iframe = document.getElementById("iframe");
    var doc = iframe.contentWindow.document;
    var table = doc.getElementById("commande");
    console.log(table);
    
    pdf.addImage(img, "png", 14, 13, 10, 10);
    pdf.setFontSize(30).setTextColor(47, 64, 109).text("LOUEvain-Li-Nux", 24, 22);
    pdf.setFontSize(15).setFontStyle("italic").text("kot Louvain Linux", 160, 22);
    pdf.setFontSize(13).setFontStyle("italic").text(`Dirirgez vous au Rue Constantin Meunier 12, 1348 Ottignies-Louvain-la-Neuve\n avec votre catre d'identité afin de récupérer votre commande N°${cmd_no["orderno"]}`, 24, 60);
    pdf.setFontSize(13).setFontStyle("italic").text("Le: " + date, 170, 32);
    pdf.setFontSize(14).setFontStyle("bold").text(`La  commande N°${cmd_no["orderno"]} que vous avez passé contient les éléments suivants:`, 12, 90);

    var b = 0;
    var c = 120;
    for (var i = 0; i < table.rows.length; i++) {
        b += 1;
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            var cellContent = table.rows[i].cells[j].innerHTML;
            console.log(i);
            console.log(table.rows[i].cells[j].innerHTML);
            if (b == 15) {
                pdf.addPage();
                b = 1;
                c = 20;
            }
            if (i < 1) {
                pdf.setFontStyle("normal").text(cellContent + " :", 17 + (j * 50), 110);
            } else if (i == 1) {
                pdf.setFontSize(10).setFontStyle("normal").text(cellContent, 20 + (j * 50), c + (b * 10));
            } else {
                pdf.setFontStyle("normal").text(cellContent, 20 + (j * 50), c + (b * 10));
            }

        }
    }
    pdf.save("reçu.pdf");
}


/* !!!!!!MODIFY OR REMOVE !!!!!*/
function mail() {
    var pdf = generatePDF();
    var email = document.getElementById("email").value;
    console.log(email);

    var link = document.getElementById("mail_");
    link.href = "mailto" + email + "?subject=Document&body=Please find the attached document.&attach=" + pdf;
    console.log("here");
}