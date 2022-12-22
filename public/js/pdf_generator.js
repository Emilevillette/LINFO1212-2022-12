//generates pdf in cart
async function generatePDF() {
    // eslint-disable-next-line no-undef
    var pdf = new jsPDF;
    var date_t = new Date();
    var date = new Date(date_t.getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
    var img = new Image();
    let cmd_no = await (await fetch("/next_order_no")).json();
    img.src = "img/llln.png";
    pdf.addImage(img, "png", 14, 13, 10, 10);
    pdf.setFontSize(30).setTextColor(47, 64, 109).text("LOUEvain-Li-Nux", 24, 22);
    pdf.setFontSize(15).setFontStyle("italic").text("kot Louvain Linux", 160, 22);
    if (document.cookie.includes("eng=On")) {
        pdf.setFontSize(13).setFontStyle("italic").text(`Go to Rue Constantin Meunier 12, 1348 Ottignies-Louvain-la-Neuve with your identity\n card to collect your order N°${cmd_no["orderno"]}`, 24, 60);
        pdf.setFontSize(13).setFontStyle("italic").text("On the: " + date, 162, 32);
        pdf.setFontSize(14).setFontStyle("bold").text(`The order #${cmd_no["orderno"]} that you have placed contains the following:`, 30, 90);
    }else{
        pdf.setFontSize(13).setFontStyle("italic").text(`Dirirgez vous au Rue Constantin Meunier 12, 1348 Ottignies-Louvain-la-Neuve\n avec votre catre d'identité afin de récupérer votre commande N°${cmd_no["orderno"]}`, 24, 60);
        pdf.setFontSize(13).setFontStyle("italic").text("Le: " + date, 170, 32);
        pdf.setFontSize(14).setFontStyle("bold").text(`La  commande N°${cmd_no["orderno"]} que vous avez passé contient les éléments suivants:`, 12, 90);
    }
    var table = document.getElementById("commande");
    var b = 0;
    var c = 120;
    for (var i = 0; i < table.rows.length; i++) {
        b += 1;
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            var cellContent = table.rows[i].cells[j].innerHTML;
            if (b == 15) {
                pdf.addPage();
                b = 1;
                c = 20;
            }
            if (i < 1) {
                pdf.setFontStyle("normal").text(cellContent + " :", 17 + (j * 50), 110);
            } else if (i == 1) {
                pdf.setFontSize(10).setFontStyle("normal").text(cellContent, 20 + (j * 50), c + (b * 10));
            } else {
                pdf.setFontStyle("normal").text(cellContent, 20 + (j * 50), c + (b * 10));
            }

        }
    }
    pdf.save("reçu.pdf");
}