function toggle_popup() {
    let div = document.getElementById("popup");
    let style = getComputedStyle(div);
    if (style.display === "none") {
        div.style.display = "block";

    } else {
        div.style.display = "none";
    }
}

function change_product_input(productId) {
    document.getElementById("popup_product").value = productId;
}