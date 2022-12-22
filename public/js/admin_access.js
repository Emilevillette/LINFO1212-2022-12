// This function transforms the 'shop' button to an 'admin' button by pressing CTRL + A + L.
window.addEventListener("keydown", access_admin);
let keysPressed = {};

function access_admin(event) {
    keysPressed[event.key] = true;
    if (keysPressed["Control"] && keysPressed["a"] && event.keyCode === 76) {
        document.getElementById("user_but").href = "/login";
        document.getElementById("shop").innerHTML = "Admin";
    }
}