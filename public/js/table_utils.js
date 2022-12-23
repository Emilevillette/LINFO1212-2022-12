/* eslint-disable no-unused-vars */

/**
 * This function sets the right parameters for the get_and_insert_table().
 *
 * @param type
 * @param receiptno
 */
async function table(type, receiptno){
    var tables = {
        order:{
            get: "/get_all_orders",
            tab : "order_table",
            table_heads : ["Numéro de commande", "Nom complet", "Email", "quantité", "Modèle", "Date sortie", "Date retour", "Date client pickup", "Date client dropoff", "Recu"],
            table_content : ["id", "name", "email", "quantity", "productModelId", "start_date", "end_date", "date_client_pickup", "date_client_return", "receiptId"],
            man: true,
        },
        stock : {
            get :"/get_stock",
            tab : "stock_table",
            table_heads : ["Catégorie", "Modèle", "Description", "Quantité disp.","Quantité tot."],
            table_content : ["productCategoryId", "id", "description", "quantity", "maxQuantity"],
            man: false,
        }
    };
    await get_and_insert_table(tables[type].get, tables[type].tab, tables[type].table_heads, tables[type].table_content, tables[type].man, receiptno);
    empty();
}


const form = document.getElementById("order_search");
if (form !== null) {
    form.addEventListener("submit", event => {
        // check if the form element has the correct id
        // prevent the default form submission behavior
        event.preventDefault();

        // get the form data
        const data = new FormData(event.target);
        const table_head_elements = ["Numéro de commande", "Nom complet", "Email", "quantité", "Modèle", "Date sortie", "Date retour", "Date client pickup", "Date client dropoff", "Recu"];
        const table_content_id = ["id", "name", "email", "quantity", "productModelId", "start_date", "end_date", "date_client_pickup", "date_client_return", "receiptId"];
        get_and_insert_table("/get_all_orders", "order_table", table_head_elements, table_content_id, data.get("orderno"));
    });
    empty();
}

// This function inserts headers and content onto the tables.
async function get_and_insert_table(path, tableId, thead_elements, tbody_ids, manage_button, receiptno) {
    let stock_data;
    if (receiptno !== "undefined") {
        stock_data = await fetch(path + "?" + new URLSearchParams({
            receiptno: receiptno,
        }));
    } else {
        stock_data = await fetch(path);
    }

    stock_data = await stock_data.json();
    const thead = document.getElementById(tableId).tHead;
    thead.innerHTML = null;
    const row = thead.insertRow();
    for (let i = 0; i < thead_elements.length; i++) {
        const cell = row.insertCell(i);
        cell.innerText = thead_elements[i];
    }

    const tbody = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    tbody.innerHTML = null;
    for (const element in stock_data) {
        const row = tbody.insertRow(0);

        for (let j = 0; j < tbody_ids.length; j++) {
            const cell = row.insertCell();
            cell.innerText = stock_data[element][tbody_ids[j]];
        }

        if (manage_button === true) {
            const cell = row.insertCell();
            const button = document.createElement("button")
            button.innerText = "Gérer";
            button.setAttribute("onClick", "toggle_popup()");
            button.setAttribute("class", "popup_button");
            button.setAttribute("value", stock_data[element]["id"]);
            button.addEventListener("click", function () {
                document.getElementById("popup_var").setAttribute("value", button.value);
                document.getElementById("paid").checked = !!Number(stock_data[element]["is_paid"]);
                document.getElementById("archive").checked = !!Number(stock_data[element]["is_archived"]);
                document.getElementById("cmd_clt_gone").value = stock_data[element]["date_client_pickup"].split(" ")[0];
                document.getElementById("cmd_clt_back").value = stock_data[element]["date_client_return"].split(" ")[0];

                document.getElementById("orderlabel").innerText = `Gérer la commande N° ${stock_data[element]["id"]}`
            });
            cell.appendChild(button);
        }
    }
    if (manage_button === true){/** */}
}
