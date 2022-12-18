//https://stackoverflow.com/questions/29775797/fetch-post-json-data
async function mark_archived() {
    let orderno = document.getElementById("popup_var").value;
    await fetch("/mark_archived", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderno: orderno})
    })
}

async function mark_payed() {

    let orderno = document.getElementById("popup_var").value;
    await fetch("/mark_payed", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderno: orderno})
    })
}

async function mark_picked_up() {
    let orderno = document.getElementById("popup_var").value;
    let date = document.getElementById("cmd_clt_gone").value;
    console.log(date);
    await fetch("/picked_up", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderno: orderno,
            date: date
        })
    });
}

async function mark_dropped_off() {
    let orderno = document.getElementById("popup_var").value;
    let date = document.getElementById("cmd_clt_back").value;
    console.log(date);
    await fetch("/dropped_off", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderno: orderno,
            date: date
        })
    });
}