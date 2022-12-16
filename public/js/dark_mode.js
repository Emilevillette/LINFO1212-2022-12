/* eslint-disable no-unused-vars */


//Check dark_mode cookie and turn it on if needed
window.onload = (event) => {
    setDark_mode();
}

function setDark_mode(){
    if (!document.cookie.includes("dark_mode")){
        document.cookie = "dark_mode=Off";
    }else if (document.cookie.includes("dark_mode=On")){
        document.body.classList.toggle("dark-theme");
        var icon = document.getElementById("icon");
        icon.src = "/img/sun.png";
    }
}

// This function allows us to switch from light to dark mode
function dark_mode() {
    var icon = document.getElementById("icon");
    document.body.classList.toggle("dark-theme");
    console.log("Before " + document.cookie);
    if (document.cookie.includes("dark_mode=Off")) {
        icon.src = "/img/sun.png";
        document.cookie = "dark_mode=On";
    } else {
        icon.src = "/img/moon.png";
        document.cookie = "dark_mode=Off";
    }
    console.log("After " + document.cookie);
}

// access admin
window.addEventListener("keydown", access_admin);
let keysPressed = {};
function access_admin(event) {
    
    keysPressed[event.key] = true;
    console.log(keysPressed);
    console.log(event.key);
    console.log(event.keyCode);
if (keysPressed['Control'] && keysPressed['a'] && event.keyCode === 76){
    document.getElementById("admin_butt").hidden = false;
}}

//sets minimum date in cart
function min_date(){
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

//generates pdf in cart
function generatePDF() {
  // eslint-disable-next-line no-undef
  var pdf = new jsPDF;
  var date_t = new Date();
  var date = new Date(date_t.getTime() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10);
  var img = new Image();
  img.src = "img/llln.png";

  pdf.addImage(img, "png", 14, 13, 10, 10);
  pdf.setFontSize(30).setTextColor(47, 64, 109).text("LOUEvain-Li-Nux", 24, 22);
  pdf.setFontSize(15).setFontStyle("italic").text("kot Louvain Linux", 160, 22);
  pdf.setFontSize(13).setFontStyle("italic").text("Le: " + date, 170, 32);
  pdf.setFontSize(16).setFontStyle("bold").text("La  commande que vous avez passé contient les éléments suivants:", 16, 90);
  var table = document.getElementById("commande");
  var b = 0;
  var c = 120;

  for (var i = 0; i < table.rows.length; i++) {
      b+=1;
   for (var j = 0; j < table.rows[i].cells.length; j++) {
       var cellContent = table.rows[i].cells[j].innerHTML;
       console.log(i);
       console.log(table.rows[i].cells[j].innerHTML);
      if (b==15){
          pdf.addPage();
          b = 1;
          c = 20;
      }
      if (i<1){
          pdf.setFontStyle("normal").text(cellContent + " :", 17+(j*50), 110);
      } else if (i == 1){
          pdf.setFontSize(10).setFontStyle("normal").text(cellContent, 20+(j*50), c+(b*10));
      } else {
          pdf.setFontStyle("normal").text(cellContent, 20+(j*50), c+(b*10));
      }
      
   }}

   pdf.save("reçu.pdf");
}




//Modify
function translate(hash) {
    // Define the language reload anchors
    var language = {
      Eng: {
          login: "Login",
          e_mail: "Email adress",
          log: "Order history",
          order_num: "Order number",
          client_name: "Client's full name",
          client_email: "Client's mail adress",
          S_date: "Borrowing date",
          R_date: "Return date",
          V_S_date: "Real borrowing date",
          V_R_date: "Real return date",
          admin_com: "Admin's comment",
          enter_o_num: "Please enter the order number you wish to view below:",
        
      },
    };
  
    // Check if a hash value exists in the URL
    if (hash) {
      // Set the content of the webpage
      // depending on the hash values
      if (hash == "#Eng") {
        login.placeholder = language.Eng.login;
        e_mail.placeholder = language.Eng.e_mail;
        enter_o_num.textContent = language.Eng.enter_o_num;
      } else {
        location.reload();
      }
    }
  }