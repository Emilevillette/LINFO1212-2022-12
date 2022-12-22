// This function sets minimum date that can be selected in cart to today's date.
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