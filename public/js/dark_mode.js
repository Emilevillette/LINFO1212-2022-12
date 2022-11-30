// This function allows us to switch from light to dark mode
function dark_mode() {
    var icon = document.getElementById("icon");
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "/img/sun.png";
    } else {
        icon.src = "/img/moon.png";
    }
}