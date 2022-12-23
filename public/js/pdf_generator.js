/**
 * This function generates a pdf of the client's cart elements in the language that is selected for the website.
 *
 * @returns {Promise<void>}
 */
const {jsPDF} = window.jspdf;

document.getElementById('user_info_form').addEventListener('submit',
    async function generatePDF(event) {
        event.preventDefault()
        const pdf_doc = new jsPDF();
        const date_t = new Date();
        const date = new Date(date_t.getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
        const img = new Image();
        let cmd_no = await (await fetch("/next_order_no")).json();
        img.src = "img/logo_lln.png";
        pdf_doc.addImage(img, "png", 14, 13, 10, 10);
        pdf_doc.setFontSize(30).setTextColor(47, 64, 109).text("LOUEvain-Li-Nux", 24, 22);
        pdf_doc.setFontSize(15).setFont(undefined, "italic").text("kot Louvain Linux", 160, 22);
        if (document.cookie.includes("eng=On")) {
            pdf_doc.setFontSize(13).setFont(undefined, "italic").text(`Go to Rue Constantin Meunier 12, 1348 Ottignies-Louvain-la-Neuve with your identity\n card to collect your order N°${cmd_no["orderno"]}`, 24, 60);
            pdf_doc.setFontSize(13).setFont(undefined, "italic").text("On the: " + date, 162, 32);
            pdf_doc.setFontSize(14).setFont(undefined, "bold").text(`The order #${cmd_no["orderno"]} that you have placed contains the following:`, 30, 90);
        } else {
            pdf_doc.setFontSize(13).setFont(undefined, "italic").text(`Dirirgez vous au Rue Constantin Meunier 12, 1348 Ottignies-Louvain-la-Neuve\n avec votre catre d'identité afin de récupérer votre commande N°${cmd_no["orderno"]}`, 24, 60);
            pdf_doc.setFontSize(13).setFont(undefined, "italic").text("Le: " + date, 170, 32);
            pdf_doc.setFontSize(14).setFont(undefined, "bold").text(`La  commande N°${cmd_no["orderno"]} que vous avez passé contient les éléments suivants:`, 12, 90);
        }
        const table = document.getElementById("commande");
        let b = 0;
        let c = 120;
        for (let i = 0; i < table.rows.length; i++) {
            b += 1;
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                let cellContent = table.rows[i].cells[j].innerHTML;
                if (b === 15) {
                    pdf_doc.addPage();
                    b = 1;
                    c = 20;
                }
                if (i < 1) {
                    pdf_doc.setFont(undefined, "normal").text(cellContent + " :", 17 + (j * 50), 110);
                } else if (i === 1) {
                    pdf_doc.setFontSize(10).setFont(undefined, "normal").text(cellContent, 20 + (j * 50), c + (b * 10));
                } else {
                    pdf_doc.setFont(undefined, "normal").text(cellContent, 20 + (j * 50), c + (b * 10));
                }

            }
        }
        await pdf_doc.save("reçu.pdf");
        this.submit();

    }
);