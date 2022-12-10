async function get_and_insert_table(path, tableId, thead_elements, tbody_ids) {
    let stock_data = await fetch(path);
    stock_data = await stock_data.json();

    const thead = document.getElementById(tableId).tHead;
    thead.innerHTML = null;
    const row = thead.insertRow();
    for (let i = 0; i<thead_elements.length; i++) {
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