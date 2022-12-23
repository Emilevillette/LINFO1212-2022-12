/**
 * This function sets minimum date that can be selected in cart to today's date.
 */

function min_date(start, end) {
    const date_t = new Date();
    const min_date_sortie = new Date(date_t.getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
    let date_retour = document.getElementById(end);
    let date_sortie = document.getElementById(start);

    if (start == "date_sortie"){
        document.getElementById(start).min = min_date_sortie;
    }
    date_sortie.addEventListener("input", function () {
        date_retour.disabled = false;
        date_retour.min = date_sortie.value;
    });
}