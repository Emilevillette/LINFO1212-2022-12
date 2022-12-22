// This function allows us to switch from light to dark mode.
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
