/**
 * You can access the admin button by clicking Ctrl + A + L
 */

window.addEventListener("keydown", access_admin);
let keysPressed = {};

function access_admin(event) {
    keysPressed[event.key] = true;
    if (keysPressed["Control"] && keysPressed["a"] && event.keyCode === 76) {
        document.getElementById("user_but").href = "/login";
        document.getElementById("user_but2").innerHTML = "Admin";
    }
}