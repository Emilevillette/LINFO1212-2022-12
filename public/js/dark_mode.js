/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// This function allows us to switch from light to dark mode
function dark_mode() {
    let icon = document.getElementById("icon");
    document.body.classList.toggle("dark-theme");
    if (document.cookie.includes("dark_mode=Off")) {
        icon.src = "/img/sun.png";
        document.cookie = "dark_mode=On";
    } else {
        icon.src = "/img/moon.png";
        document.cookie = "dark_mode=Off";
    }
}
function setDark_mode() {
    if (!document.cookie.includes("dark_mode")) {
        document.cookie = "dark_mode=Off";
    } else if (document.cookie.includes("dark_mode=On")) {
        document.body.classList.toggle("dark-theme");
        let icon = document.getElementById("icon");
        icon.src = "/img/sun.png";
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
