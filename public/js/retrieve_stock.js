const table_head_elements = ["Catégorie", "Modèle", "Description", "Quantité"]
const table_content_id = ["productCategoryId", "id", "description", "quantity"];


async function get_stock() {
    let stock_data = await fetch(`/get_stock`);
    stock_data = await stock_data.json();
    console.log(stock_data);

    const thead = document.getElementById("stock_table").tHead;
    thead.innerHTML = null;
    const row = thead.insertRow();
    for (let i = 0; i<table_head_elements.length; i++) {
        const cell = row.insertCell(i);
        cell.innerText = table_head_elements[i];
    }

    const tbody = document.getElementById("stock_table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = null;
    for (const element in stock_data) {
        const row = tbody.insertRow(0);

        for (let j = 0; j < table_content_id.length; j++) {
            const cell = row.insertCell();
            cell.innerText = stock_data[element][table_content_id[j]];
        }
    }
}