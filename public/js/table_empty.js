/**
 * This function hides the tables (that do not import elements from the db) when they're empty and displays a message.
 */
window.addEventListener("load", empty);

function empty() {
    if (document.querySelector("td") != null){
        document.getElementById("full").hidden = false;
        document.getElementById("empty").hidden = true;
    } else{
        document.getElementById("empty").hidden = false;
    }
}
