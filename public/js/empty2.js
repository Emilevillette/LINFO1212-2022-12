window.addEventListener("load", empty);

function empty(){
    if (document.querySelector("td") != null){
        console.log(document.querySelector("td").innerHTML);
        document.getElementById("full").hidden = false;
        document.getElementById("empty").hidden = true;
    } else{
        document.getElementById("empty").hidden = false;
    }
}
