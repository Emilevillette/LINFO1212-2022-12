// This  function allows pop ups to be shown to the user.
function toggle_popup() {
    let div = document.getElementById("popup");
    let style = getComputedStyle(div);
    if (style.display === "none") {
        div.style.display = "block";

    } else {
        div.style.display = "none";
    }
}

/*
** This function allows to set max quantity when trying to add a product to the cart 
and the product id to match id.
*/
function change_product_input(productId) {
    document.getElementById("popup_product").value = productId;
    document.getElementById("popup_quantity").max = document.getElementById("product_quantity").value;
}