const form = document.getElementById('order_search');
form.addEventListener('submit', event => {
    // check if the form element has the correct id
    // prevent the default form submission behavior
    event.preventDefault();

    // get the form data
    const data = new FormData(event.target);
    const table_head_elements = ["Numéro de commande", "Nom complet", "Email", "quantité", "Modèle", "Date sortie", "Date retour", "Date client pickup", "Date client dropoff", "Recu"];
    const table_content_id = ["id", "name", "email", "quantity", "productModelId", "start_date", "end_date", "date_client_pickup", "date_client_return", "receiptNCommande"];
    get_and_insert_table("/get_all_orders?", "order_table", table_head_elements, table_content_id, data.get("orderno"));
});

async function get_and_insert_table(path, tableId, thead_elements, tbody_ids, receiptno) {
    let stock_data = await fetch(path + new URLSearchParams({
        receiptno: receiptno,
    }));
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
    }
}

