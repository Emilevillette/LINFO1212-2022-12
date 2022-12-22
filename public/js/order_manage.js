//https://stackoverflow.com/questions/29775797/fetch-post-json-data
// This function allows us to mark orders as archives in our database.
async function mark_archived() {
    let orderno = document.getElementById("popup_var").value;
    await fetch("/mark_archived", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({orderno: orderno})
    });
}

// This function allows us to mark orders as payed in our database.
async function mark_payed() {

    let orderno = document.getElementById("popup_var").value;
    await fetch("/mark_payed", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({orderno: orderno})
    });
}

// This function allows us to mark the date at which an order has been picked up in our database.
async function mark_picked_up() {
    let orderno = document.getElementById("popup_var").value;
    let date = document.getElementById("cmd_clt_gone").value;
    await fetch("/picked_up", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderno: orderno,
            date: date
        })
    });
}

// This function allows us to mark the date at which an order has been brought back in our database.
async function mark_dropped_off() {
    let orderno = document.getElementById("popup_var").value;
    let date = document.getElementById("cmd_clt_back").value;
    await fetch("/dropped_off", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orderno: orderno,
            date: date
        })
    });
}