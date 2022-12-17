window.addEventListener("load", empty);
function empty(){
if (document.querySelector("tbody").innerHTML != ""){
    document.getElementById("full").hidden = false;
    document.getElementById("empty").hidden = true;
} else{
    document.getElementById("empty").hidden = false;
}}



