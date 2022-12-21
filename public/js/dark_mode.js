/* eslint-disable no-unused-vars */
//Check dark_mode cookie and turn it on if needed
window.onload = (event) => {
    set_translate();
    setDark_mode();
};

var language = {
    eng:{
        login: "Log in",
        pwd:"password",
        o_history: "Order history",
        no_order: "You have no orders",
        orderlabel: "Manage order:",
        order_picked_up:"The client picked up the order",
        order_brought_back: "The client brought back the order",
        payed_deposit: "The deposit was payed",
        archived: "Archived",
        signup: "Sign up",
        add_to_stock: "Add to stock",
        mics:"Microphones of various types + filters",
        audio:"Audio connectors",
        disk:"An external disk drive",
        keybords:"USB keyboards for computers",
        monitors:"Computer monitors",
        reseau:"Network connectors (ethernet): switches, cables and a router",
        sms:"An SMS Module",
        laptops:"Laptops and Towers",
        pc_connect:"Various connectors and connection adapters for pc",
        stock:"Your stock contains the following elements:",
        empty_stock:"Your stock is empty 👀",
        cart_title:"Your cart contains the following elements:",
        product:"Product",
        quantity:"Quantity",
        start_date:"Start date",
        end_date:"End date",
        order_confrim:"Confirm you order",
        fill:"Please fill out this form",
        submit:"submit",
        empty_cart:"Your cart is empty 👀",
        title_index_stock:"Which page would you like to access",
        add_stock:"Add to stock",
        visualise_stock:"Visualise stock",
        out:"Please present the order code below to Kot-à-Projet Louvain-li-Nux in order to collect your ordered:",
        products_title:"Products avaible in the section ?????????",
        add:"Add",
        shop:"Shop",

}};

function aux_t(elem_id){
    if(language.eng[elem_id.id] != undefined){
        try{
            elem_id.innerHTML = language.eng[elem_id.id];
            }catch (TypeError){ /* empty */ }
    }
}

function set_translate() {
    const elements = document.querySelectorAll("*");
    var icon = document.getElementById("trans");
    if (!document.cookie.includes("eng")) {
        document.cookie = "eng=Off";
    } else if (document.cookie.includes("eng=On")) {
        for (const element of elements) {
            aux_t(element);
        }
        icon.src = "/img/eng.png";
        document.cookie = "eng=On";
    }
}

function t(){
    const elements = document.querySelectorAll("*");
    console.log("Before " + document.cookie);
    var icon = document.getElementById("trans");
    if (document.cookie.includes("eng=On")) {
        for (const element of elements) {
            aux_t(element);
        }
        icon.src = "/img/eng.png";
        document.cookie = "eng=On";
    } else {
        location.reload();
        icon.src = "/img/fr.png";
        document.cookie = "eng=Off";
    }
    console.log("After " + document.cookie);

}

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
    let cmd_no = await (await fetch("/next_order_no")).json();
    img.src = "img/llln.png";
    pdf.addImage(img, "png", 14, 13, 10, 10);
    pdf.setFontSize(30).setTextColor(47, 64, 109).text("LOUEvain-Li-Nux", 24, 22);
    pdf.setFontSize(15).setFontStyle("italic").text("kot Louvain Linux", 160, 22);
    pdf.setFontSize(13).setFontStyle("italic").text(`Dirirgez vous au Rue Constantin Meunier 12, 1348 Ottignies-Louvain-la-Neuve\n avec votre catre d'identité afin de récupérer votre commande N°${cmd_no["orderno"]}`, 24, 60);
    pdf.setFontSize(13).setFontStyle("italic").text("Le: " + date, 170, 32);
    pdf.setFontSize(14).setFontStyle("bold").text(`La  commande N°${cmd_no["orderno"]} que vous avez passé contient les éléments suivants:`, 12, 90);
    var table = document.getElementById("commande");
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